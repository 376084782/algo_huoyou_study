
var _ = require('lodash');

const deskNum = [
  [-1, 5, 4, 3, 2],
  [1, 0, 1, 2, 3],
  [4, 5, 6, 7, 8],
  [9, 10, 11, 12, -1],
];
const deskDefault = [
  [-1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, -1],
];

export class GameData4_9 {
  desk: number[][] = []
  deskNum: number[][] = []
  player: number = 1;
  constructor() {
    this.desk = _.cloneDeep(deskDefault)
    this.deskNum = _.cloneDeep(deskNum)
  }
}
export class GameAction4_9 {
  numList: number[] = []
  pos: number[] = []
}

export class Algo4_9 {
  getRiddle() {
    return new GameData4_9();
  }
  checkRiddle(deskData: GameData4_9) {
    let finishColor = this.checkDesk(deskData);
    if (finishColor > 0) {
      return -1
    }
    return 0
  }

  getAllPath(deskData: GameData4_9, x: number, y: number) {
    // 按照方向分3组，每组按照所处的相对序号再分三个
    let listPathCombine = [];
    for (let dir = 0; dir < 4; dir++) {
      for (let offset = 0; offset < 3; offset++) {
        if (dir == 0) {
          // 水平方向，x变化，y不变
          listPathCombine.push([
            [x - offset, y],
            [x + 1 - offset, y],
            [x + 2 - offset, y],
          ])
        } else if (dir == 1) {
          // 斜着 x变化，y变化
          listPathCombine.push([
            [x - offset, y - offset],
            [x + 1 - offset, y + 1 - offset],
            [x + 2 - offset, y + 2 - offset],
          ])
        } else if (dir == 2) {
          // 竖着 x不变，y变化
          listPathCombine.push([
            [x, y - offset],
            [x, y + 1 - offset],
            [x, y + 2 - offset],
          ])
        } else if (dir == 3) {
          // 斜着 x变化，y变化
          listPathCombine.push([
            [x - offset, y + offset],
            [x + 1 - offset, y - 1 + offset],
            [x + 2 - offset, y - 2 + offset],
          ])
        }
      }
    }

    // 遍历出所有可能的组合后，筛掉不合法的组合

    return listPathCombine.filter(e => e.every(p => this.checkValidPosition(deskData, p[0], p[1])))
  }
  checkValidPosition(desk: GameData4_9, x: number, y: number) {
    return desk.desk[y] && desk.desk[y][x] == 0
  }
  checkDesk(deskData: GameData4_9) {
    // 如果有三个相连，返回获胜
    for (let y = 0; y < deskData.desk.length; y++) {
      let row = deskData.desk[y]
      for (let x = 0; x < row.length; x++) {
        let value = row[x];
        let pathAll = this.getAllPath(deskData, x, y);
        for (let c = 0; c < pathAll.length; c++) {
          let line = pathAll[c];
          let sameColor = this.checkThreeSame(line, deskData)
          if (sameColor > 0) {
            return sameColor
          }
        }
      }
    }
    return -1
  }
  checkThreeSame(listPath: number[][], desk: GameData4_9) {
    let p0 = listPath[0];
    let v = desk.desk[p0[1]][p0[0]]
    if (v > 0) {
      let isAllSame = listPath.every(([x, y]) => desk.desk[y][x] == v);
      return isAllSame ? v : -1
    } else {
      return -1
    }
  }
  doAction(deskData: GameData4_9, dataAction: GameAction4_9) {
    let flagCheck = this.checkAction(deskData, dataAction);
    if (flagCheck == -1) {
      return {
        flag: false,
        desk: deskData
      }
    }
    let deskNew = _.cloneDeep(deskData)
    // 占有格子
    deskNew.desk[dataAction.pos[0]][dataAction.pos[1]] = deskData.player;
    return {
      flag: true,
      desk: deskNew
    }
  }

  checkAction(deskData: GameData4_9, dataAction: GameAction4_9) {
    // 检验是筛子数的和或差，并且对应的位置上没有棋子
    let num = deskData.deskNum[dataAction.pos[0]][dataAction.pos[1]];
    let value = deskData.desk[dataAction.pos[0]][dataAction.pos[1]];
    let numMin = Math.min(...dataAction.numList)
    let numMax = Math.max(...dataAction.numList)
    if (num != numMin + numMax && num != numMax - numMin) {
      return -1
    }
    if (value != 0) {
      return -1
    }

    return 0
  }

  getActionAuto(deskData: GameData4_9) {

  }



}