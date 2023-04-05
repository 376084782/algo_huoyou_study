
var _ = require('lodash');

import RandomGenerater from '../util/RandomGenerater';
let randomer = new RandomGenerater(0);
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
  typeSet?: number = 1;
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
  score: number = 0
}

export class module4_9 {
  getRiddle() {
    return new GameData4_9();
  }
  checkRiddle(deskData: GameData4_9) {
    let count1 = 0;
    let count2 = 0;
    deskData.desk.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v == 1) {
          count1++;
        }
        if (v == 2) {
          count2++
        }
      })
    })
    if (count1 != count2) {
      return -1
    }
    let finishColor = this.checkDesk(deskData);
    if (finishColor > 0) {
      return -1
    }
    return 0
  }

  getAllPath(deskData: GameData4_9, x: number, y: number, forceBlank = true) {
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
    return listPathCombine.filter(e => e.every(p => this.checkValidPosition(deskData, p[0], p[1], forceBlank)))
  }
  checkValidPosition(desk: GameData4_9, x: number, y: number, forceBlank = true) {
    if (forceBlank) {
      return desk.desk[y] && desk.desk[y][x] == 0
    } else {
      return desk.desk[y] && desk.desk[y][x] != -1
    }
  }
  checkDesk(deskData: GameData4_9) {
    // 如果有三个相连，返回获胜
    let flagFull = true;
    for (let y = 0; y < deskData.desk.length; y++) {
      let row = deskData.desk[y]
      for (let x = 0; x < row.length; x++) {
        let value = row[x];
        if (value == 0) {
          flagFull = false;
        }
        let pathAll = this.getAllPath(deskData, x, y, false);
        for (let c = 0; c < pathAll.length; c++) {
          let line = pathAll[c];
          let sameColor = this.checkThreeSame(line, deskData)
          if (sameColor > 0) {
            return sameColor
          }
        }
      }
    }
    if (flagFull) {
      return 3
    } else {
      return -1
    }
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
  randomNumByTarget(num: number): number[] {
    // 根据目标点数随机出骰子
    let numList: number[] = []
    let randomJian = Math.random() < .5;
    if (num <= 1) {
      randomJian = true;
    }
    if (num < 6 && randomJian) {
      // 通过减法
      let max = randomer.RangeInteger(num + 1, 7);
      let min = max - num;
      numList = [min, max]
    } else {
      // 通过加法获得
      let randomMin = num - 6;
      if (randomMin < 1) {
        randomMin = 1
      }
      let randomMax = 7;
      if (num < 6) {
        randomMax = num;
      }
      let num1 = randomer.RangeInteger(randomMin, randomMax);
      let num2 = num - num1;
      numList = [num1, num2]
    }
    // 增强随机性加个大乱
    return _.shuffle(numList)
  }

  getActionAuto(deskData: GameData4_9): { best: any, nobest: any } {
    // 机器人避免投掷筛子对应的格子都被占满的情况
    let numCanGet: number[] = [];
    deskData.desk.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v == 0) {
          numCanGet.push(deskData.deskNum[y][x]);
        }
      })
    })
    if (numCanGet.length == 0) {
      return { nobest: undefined, best: undefined }
    }
    // 根据空位置，随机出筛子点数
    let randomIdx = randomer.RangeInteger(0, numCanGet.length)
    let numTarget = numCanGet[randomIdx];

    let numList = this.randomNumByTarget(numTarget);
    let cha = Math.abs(numList[0] - numList[1])
    let he = numList[0] + numList[1];
    let numCanPut = [cha, he];

    // 递归出所有合法的操作
    let listActionAll: GameAction4_9[] = [];
    deskData.desk.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v == 0) {
          let value = deskData.deskNum[y][x]
          if (numCanPut.indexOf(value) > -1) {
            let act = new GameAction4_9();
            act.numList = numList;
            act.pos = [y, x]
            listActionAll.push(act)
          }
        }
      })
    })

    if (listActionAll.length == 0) {
      return { nobest: undefined, best: undefined }
    }

    listActionAll.forEach(e => {
      this.scoreAction(deskData, e)
    })
    listActionAll = listActionAll.sort((a, b) => b.score - a.score);
    if (listActionAll.length > 1) {
      // 进行降级
      let best = listActionAll[0]
      let listActionNotBest = listActionAll.filter(e => {
        e.score <= best.score - 10
      })
      if (listActionNotBest.length > 0) {
        return {
          best: listActionAll[0],
          nobest: listActionNotBest[0]
        }
      } else {
        return {
          best: listActionAll[0],
          nobest: listActionAll[1]
        }
      }
    } else {
      return {
        best: listActionAll[0],
        nobest: listActionAll[0]
      }
    }


  }

  scoreAction(deskData: GameData4_9, act: GameAction4_9) {
    // 获取所有可连线位置
    let paths = this.getAllPath(deskData, act.pos[1], act.pos[0], false);
    // 如果这个路径上已有两个以上相连
    paths.forEach(line => {
      let countSelf = 0;
      let countOppo = 0;
      line.forEach(([x, y]) => {
        let color = deskData.desk[y][x];
        if (color == deskData.player) {
          countSelf++
        } else if (color == 3 - deskData.player) {
          countOppo++
        }
        if (countSelf == 2) {
          // 最优先，score+100
          act.score += 100
        }
        if (countOppo == 2) {
          // 拦截 +20
          act.score += 20
        }
        if (countSelf == 1 && countOppo == 0) {
          act.score += 5
        }
        if (countSelf == 0 && countOppo == 0) {
          // 无人占据 +2
          act.score += 2
        }
      })
    })
  }



}