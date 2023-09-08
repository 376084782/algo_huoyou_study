var _ = require('lodash');

export class GameData1_9 {
  player: number = 1;
  desk: number[][] = [];
  typeSet: number = 1;
}
export class GameAction1_9 {
  pos: number[] = [];
  score: number = 0
}
export class module1_9 {
  getRiddle() {
    let desk = new GameData1_9();
    desk.desk = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
    return desk;
  }
  checkRiddle(desk: GameData1_9) {
    return 0
  }
  checkDesk(desk: GameData1_9) {
    // 检查如果有连成3子则获胜
    for (let y = 0; y < desk.desk.length; y++) {
      let row = desk.desk[y];
      for (let x = 0; x < row.length; x++) {
        let color = row[x];
        if (color != 0) {
          let listThreeAll = this.getAllSeriesThree(x, y);
          for (let i = 0; i < listThreeAll.length; i++) {
            let listThree = listThreeAll[i];
            var count = 0;
            for (let i1 = 0; i1 < listThree.length; i1++) {
              let p = listThree[i1];
              if (i1 == 0) {
                count = 0
              }
              let [x1, y1] = p;
              if (!desk.desk[y1] || !desk.desk[y1][x1] || desk.desk[y1][x1] != color) {
                break
              } else {
                count++
                if (count == 3) {
                  return color
                }
              }
            }
          }
        }
      }
    }
    return -1
  }
  getAllSeriesThree(x: number, y: number) {
    let mapDir = [[[-1, 1], [1, -1]], [[-1, 0], [1, 0]], [[-1, -1], [1, 1]], [[0, 1], [0, -1]]]
    let listThreeAll = []
    for (let dir = 0; dir < mapDir.length; dir++) {
      let listDir = mapDir[dir]
      let listThree = []
      listThree.push([x + listDir[0][0], y + listDir[0][1]])
      listThree.push([x, y])
      listThree.push([x + listDir[1][0], y + listDir[1][1]])
      listThreeAll.push(listThree)
    }
    return listThreeAll
  }

  checkAction(desk: GameData1_9, act: GameAction1_9) {
    let [x, y] = act.pos;
    if (!desk.desk[y] || desk.desk[y][x] != 0) {
      return -1
    }
    return 0
  }
  doAction(deskIn: GameData1_9, act: GameAction1_9): [flag: number, desk: GameData1_9] {
    let desk = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk]
    }
    let [x, y] = act.pos;
    desk.desk[y][x] = desk.player;
    return [0, desk]
  }
  getActionAuto(desk: GameData1_9): any[] {
    let actionAll = this.getActionAll(desk);

    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let [flagOppo, desk2Oppo] = this.doAction(desk, act1Self);
      let actionAllOppo = this.getActionAll(desk2Oppo);
      // 放之后对方可行棋子为0，说明必胜,直接使用
      if (actionAllOppo.length == 0) {
        return [act1Self, act1Self]
      }
      if (actionAll.length < 40) {
        // 可放的方式不多，有制胜局的可能性，多考虑一步
        for (let m = 0; m < actionAllOppo.length; m++) {
          let act1Oppo = actionAllOppo[m];
          let [flagSelf, desk2Self] = this.doAction(desk2Oppo, act1Oppo);
          let actionAllSelf2 = this.getActionAll(desk2Self);
          if (actionAllSelf2.length == 0) {
            // 我可能面对的局面，该棋面下我无棋可走，得分-100
            act1Self.score -= 100
          }
        }
      }
    }
    // 增加一点随机性，避免计算机很呆都是走一样的地方从左往右放
    actionAll = _.shuffle(actionAll)
    actionAll = actionAll.sort((a, b) => b.score - a.score)
    if (actionAll.length >= 2) {
      return [actionAll[0], actionAll[1]]
    } else {
      return [actionAll[0], actionAll[0]]
    }
  }
  getActionAll(desk: GameData1_9): GameAction1_9[] {
    let listActionAll: GameAction1_9[] = []
    for (let y = 0; y < desk.desk.length; y++) {
      let row = desk.desk[y];
      for (let x = 0; x < row.length; x++) {
        let color = row[x];
        if (color == 0) {
          let act = new GameAction1_9();
          act.pos = [x, y];
          listActionAll.push(act);
        }
      }
    }
    return listActionAll
  }
}