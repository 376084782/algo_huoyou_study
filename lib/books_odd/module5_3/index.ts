var _ = require('lodash');

export class GameData5_3 {
  player: number = 1;
  desk: number[][] = [];
  typeSet: number = 1;
}
export class GameAction5_3 {
  p1: number[] = [];
  p2: number[] = []
  score: number = 0
}
export class module5_3 {
  getRiddle(size: number, defaultPosList?: number[][]) {
    let desk = new GameData5_3();
    desk.desk = [];
    for (let y = 0; y < size; y++) {
      let row: number[] = [];
      desk.desk.push(row)
      for (let x = 0; x < size; x++) {
        row.push(0);
      }
    }
    if (!defaultPosList) {
      // 默认四个圆片放到左上角
      for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 2; x++) {
          desk.desk[y][x] = 1
        }
      }
    } else {
      defaultPosList.forEach(([x, y]) => {
        desk.desk[y][x] = 1
      })
    }
    return desk;
  }
  getRiddleDefault() {
    let desk = this.getRiddle(8, [[3, 4], [4, 4], [3, 3], [4, 2]]);
    return desk
  }
  checkRiddle(desk: GameData5_3) {
    return 0
  }
  checkDesk(desk: GameData5_3) {
    let maxX = desk.desk[0].length;
    let maxY = desk.desk.length;
    let finalPos = [[maxX - 2, 0], [maxX - 1, 0], [maxX - 2, 1], [maxX - 1, 1]];
    // 如果目标点的每一个格子都有棋子，说明胜利
    if (finalPos.every(([x, y]) => desk.desk[y][x] == 1)) {
      return desk.player
    }
    return -1
  }

  checkAction(desk: GameData5_3, act: GameAction5_3): boolean {
    let [x1, y1] = act.p1;
    let [x2, y2] = act.p2;
    if (x1 == x2) {
      // 纵向
      let off = Math.abs(y1 - y2);
      let min = Math.min(y1, y2);
      if (off == 1) {
        return true
      } else if (off == 2 && desk.desk[min + 1][x1] == 1) {
        return true
      }
    } else if (y1 == y2) {
      // 横向
      let off = Math.abs(x1 - x2);
      let min = Math.min(x1, x2);
      if (off == 1) {
        return true
      } else if (off == 2 && desk.desk[y1][min + 1] == 1) {
        return true
      }
    }
    return false
  }
  doAction(deskIn: GameData5_3, act: GameAction5_3): [flag: number, desk: GameData5_3] {
    let desk: GameData5_3 = _.cloneDeep(deskIn)
    if (!this.checkAction(desk, act)) {
      return [-1, desk]
    }
    let [x1, y1] = act.p1;
    let [x2, y2] = act.p2;
    desk.desk[y1][x1] = 0;
    desk.desk[y2][x2] = 1;
    return [0, desk]
  }
  getActionAuto(desk: GameData5_3): any[] {
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
  getActionAll(desk: GameData5_3): GameAction5_3[] {
    let listActionAll: GameAction5_3[] = []
    return listActionAll
  }
}