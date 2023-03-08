var _ = require('lodash');


const comp1 = [[-1, 1, -1], [1, 1, 1]]
const comp2 = [[1, -1, -1], [1, 1, 1]]
const comp3 = [[1, 1], [1, 1]]
const comp4 = [[1, 1, 1, 1]]

const listCompAfterTrans1 = [[[-1, 1], [1, 1], [-1, 1]], [[-1, 1, -1], [1, 1, 1]], [[1, -1], [1, 1], [1, -1]], [[1, 1, 1], [-1, 1, -1]]]
const listCompAfterTrans2 = [[[-1, 1], [-1, 1], [1, 1]], [[1, -1, -1], [1, 1, 1]], [[1, 1], [1, -1], [1, -1]], [[1, 1, 1], [-1, -1, 1]], [[1, -1], [1, -1], [1, 1]], [[1, 1, 1], [1, -1, -1]], [[1, 1], [-1, 1], [-1, 1]], [[-1, -1, 1], [1, 1, 1]]]
const listCompAfterTrans3 = [[[1, 1], [1, 1]]]
const listCompAfterTrans4 = [[[1], [1], [1], [1]], [[1, 1, 1, 1]]]

export class GameAction2_7 {
  score: number = 0;
  idx: number = 0;
  listData: number[][] = []
  action: number[] = []
  constructor() {

  }
}

export class GameData2_7 {
  typeSet: number = 1
  player: number = 1
  maxX = 8;
  maxY = 8;
  desk: number[][] = [];
  compIdxsUsed: number[] = []
  listIdxCompAll = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]
  constructor(desk?: number[][]) {
    if (!desk) {
      desk = [];
      for (let y = 0; y < this.maxY; y++) {
        let listRow: number[] = []
        desk.push(listRow)
        for (let x = 0; x < this.maxX; x++) {
          listRow.push(0)
        }
      }
    }
    this.desk = desk;
  }
}

export class Algo2_7 {
  getRiddle() {
    return new GameData2_7();
  }
  getCompDataByIdx(id: number) {
    if (id == 1) {
      return comp1
    } else if (id == 2) {
      return comp2
    } else if (id == 3) {
      return comp3
    } else if (id == 4) {
      return comp4
    }
  }

  doAction(desk: GameData2_7, action: GameAction2_7): { flag: number, desk: GameData2_7 } {
    if (this.checkAction(desk, action) != 0) {
      return { flag: -1, desk }
    }
    // 做一次深拷贝防止数据污染
    let deskNew: GameData2_7 = _.cloneDeep(desk)
    deskNew.compIdxsUsed.push(action.idx)
    action.listData.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v > -1) {
          deskNew.desk[y + action.action[0]][x + action.action[1]] = 1;
        }
      })
    })
    return { flag: 0, desk: deskNew }
  }
  checkAction(desk: GameData2_7, action: GameAction2_7) {
    // 如果没有这个块块了，不能放
    if (desk.compIdxsUsed.filter(id => id == action.idx).length >= 4) {
      return -1
    }
    for (let y = 0; y < action.listData.length; y++) {
      let listRow = action.listData[y]
      for (let x = 0; x < listRow.length; x++) {
        let v = listRow[x];
        if (v > -1) {
          if (!desk.desk[y + action.action[0]] || desk.desk[y + action.action[0]][x + action.action[1]] != 0) {
            // 如果有目标块已经有方块了不能放的情况
            return -1
          }
        }
      }
    }
    return 0
  }

  getActionAuto(desk: GameData2_7) {
    let actionAll = this.getCanPutPlaceAll(desk);

    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let { desk: desk2Oppo } = this.doAction(desk, act1Self);
      let actionAllOppo = this.getCanPutPlaceAll(desk2Oppo);
      // 放之后对方可行棋子为0，说明必胜,直接使用
      if (actionAllOppo.length == 0) {
        return {
          best: act1Self, nobest: act1Self
        }
      }
      if (actionAll.length < 40) {
        // 可放的方式不多，有制胜局的可能性，多考虑一步
        for (let m = 0; m < actionAllOppo.length; m++) {
          let act1Oppo = actionAllOppo[m];
          let { desk: desk2Self } = this.doAction(desk2Oppo, act1Oppo);
          let actionAllSelf2 = this.getCanPutPlaceAll(desk2Self);
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
      return {
        best: actionAll[0], nobest: actionAll[1]
      }
    } else {
      return {
        best: actionAll[0], nobest: actionAll[0]
      }
    }
  }

  // 根据组件结构获取所有可以放的位置
  getCanPutPlaceAll(desk: GameData2_7) {
    let listActionAll: GameAction2_7[] = []

    for (let idxComp = 1; idxComp <= 4; idxComp++) {
      if (desk.compIdxsUsed.filter(id => id == idxComp).length < 4) {
        let listActionByIdx: GameAction2_7[] = this.getActionAllByCompIdx(idxComp, desk, 15);
        listActionAll = listActionAll.concat(listActionByIdx);
      }
    }
    return listActionAll;
  }
  getActionAllByCompIdx(idxComp: number, desk: GameData2_7, max = 10): GameAction2_7[] {
    let listActionAll: GameAction2_7[] = []
    let listDatas: number[][][] = [];
    if (idxComp == 1) {
      listDatas = listCompAfterTrans1
    } else if (idxComp == 2) {
      listDatas = listCompAfterTrans2
    } else if (idxComp == 3) {
      listDatas = listCompAfterTrans3
    } else if (idxComp == 4) {
      listDatas = listCompAfterTrans4
    }
    for (let c = 0; c < listDatas.length; c++) {
      let listData = listDatas[c]


      for (let y = 0; y < desk.desk.length; y++) {
        let row = desk.desk[y]
        for (let x = 0; x < row.length; x++) {
          let v = row[x]
          if ((listData[0][0] < 0 || (v == 0 && listData[0][0] > 0))) {
            let act = new GameAction2_7();
            act.action = [y, x];
            act.listData = listData;
            act.idx = idxComp
            let flagCanPut = this.checkAction(desk, act);
            if (flagCanPut >= 0) {
              listActionAll.push(act)
            }
            if (listActionAll.length >= max) {
              return listActionAll
            }
          }
        }
      }
    }
    return listActionAll
  }
  // 获取目标组件可以通过旋转变化达到的所有数据
  getCompDataAfterTrans(dataComp: number[][]) {
    let list = [];
    let dataBack = _.cloneDeep(dataComp)
    for (let a = 0; a < 2; a++) {
      // 水平翻转2次
      dataBack = this.bian(dataBack, 2)
      for (let b = 0; b < 2; b++) {
        // 垂直翻转2次
        dataBack = this.bian(dataBack, 3)
        for (let c = 0; c < 4; c++) {
          // 旋转4次
          dataBack = this.bian(dataBack, 5)
          let dataStr = JSON.stringify(dataBack);
          if (list.indexOf(dataStr) == -1) {
            list.push(dataStr)
          }
        }
      }
    }

    list.forEach((e, i) => {
      list[i] = JSON.parse(e);
    })
  }

  checkDesk(desk: GameData2_7) {
    let all = this.getCanPutPlaceAll(desk);
    if (all.length == 0) {
      // 本方无棋可走，返回对方获胜
      return 3 - desk.player
    }
    return -1
  }

  bian(square: number[][], type: number): number[][] {
    if (type == 1) {
      return square
    } else if (type == 2) {
      return this.bian2(square)
    } else if (type == 3) {
      return this.bian3(square)
    } else if (type == 4) {
      return this.bian4(square)
    } else if (type == 5) {
      return this.bian5(square)
    }
    return square
  }

  //操作方式 1 原样放置 2 水平翻转 3 垂直翻转 4左旋转90° 5右旋转90°】
  bian2(square: number[][]): number[][] {
    let result: number[][] = []
    // 水平翻转
    for (let i = 0; i < square.length; i++) {
      const row = square[i];
      let tmprow: number[] = []
      for (let j = row.length - 1; j >= 0; j--) {
        const tmp = row[j];
        tmprow.push(tmp)
      }
      result.push(tmprow)
    }
    return result
  }
  bian3(square: number[][]): number[][] {
    let result: number[][] = []
    for (let i = square.length - 1; i >= 0; i--) {
      const row = square[i];
      let tmprow: number[] = []
      for (let j = 0; j < row.length; j++) {
        const tmp = row[j];
        tmprow.push(tmp)
      }
      result.push(tmprow)
    }
    return result
  }

  // 左旋转90°
  bian4(square: number[][]): number[][] {
    let result: number[][] = []
    for (let i = 0; i < square[0].length; i++) {
      let tmprow: number[] = []
      for (let j = 0; j < square.length; j++) {
        tmprow.push(0)
      }
      result.push(tmprow)
    }

    for (let i = 0; i < square.length; i++) {
      const row = square[i];
      for (let x = 0, j = row.length - 1; j >= 0; j--, x++) {
        // for (let j = 0; j < row.length; j++) {
        const tmp = row[x];
        result[j][i] = tmp
      }
    }
    return result
  }
  // 右旋转90°
  bian5(square: number[][]): number[][] {
    let result: number[][] = []
    for (let i = 0; i < square[0].length; i++) {
      let tmprow: number[] = []
      for (let j = 0; j < square.length; j++) {
        tmprow.push(0)
      }
      result.push(tmprow)
    }

    for (let y = 0, i = square.length - 1; i >= 0; i--, y++) {
      const row = square[i];
      for (let x = 0, j = row.length - 1; j >= 0; j--, x++) {
        // for (let j = 0; j < row.length; j++) {
        const tmp = row[x];
        result[x][y] = tmp
      }
    }
    return result
  }
  checkRiddle(desk: GameData2_7) {
    let all = this.getCanPutPlaceAll(desk);
    if (all.length == 0) {
      return -1
    }
    return 0
  }
}