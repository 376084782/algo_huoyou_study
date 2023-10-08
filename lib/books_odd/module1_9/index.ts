import { QuesList } from "./quesList";

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
  getRiddleLev() {
    let map: any = {};
    for (let lev in QuesList) {
      let list = QuesList[lev];
      map[lev] = []
      list.forEach((deskList: number[][], idx: number) => {
        let desk = new GameData1_9();
        desk.desk = deskList;
        desk.player = 1;
        if (+lev == 3 && idx != list.length - 1) {
          desk.player = 2;
        }
        map[lev].push(desk);
      });
    }
    return map
  }
  checkRiddle(desk: GameData1_9) {
    return 0
  }
  checkDesk(desk: GameData1_9) {
    // 检查如果有连成3子则获胜
    let flagAllPut = true;
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
        } else {
          flagAllPut = false;
        }
      }
    }
    if (flagAllPut) {
      return 3
    } else {
      return -1
    }
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
    let playerSelf = desk.player;
    let playerOppo = 3 - desk.player;
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let [flagOppo, desk2Oppo] = this.doAction(desk, act1Self);
      let res = this.checkDesk(desk2Oppo);
      // 必胜,直接使用
      if (res == playerSelf) {
        return [act1Self, act1Self]
      }
      let actionAllOppo = this.getActionAll(desk2Oppo);
      if (actionAll.length < 40) {
        // 可放的方式不多，有制胜局的可能性，多考虑一步
        for (let m = 0; m < actionAllOppo.length; m++) {
          let act1Oppo = actionAllOppo[m];
          desk2Oppo.player = playerOppo;
          let [flagSelf, desk2Self] = this.doAction(desk2Oppo, act1Oppo);
          let res2 = this.checkDesk(desk2Self);
          if (res2 == playerOppo) {
            // 如果走了之后对方有可能获胜，不能这么走
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