var _ = require('lodash');

// 部分行补空，为保证奇数行偶数列的对称结构，否则对称后三角形方向会反
const listComp = [{
  id: 1,
  color: 1,
  data: [
    [-1, -1, 1, 1, -1, -1],
    [-1, 1, 1, 1, 1, -1],
    [-1, -1, -1, -1, -1, -1],
  ]
}, {
  id: 2,
  color: 6,
  data: [
    [-1, 6, -1, -1],
    [6, 6, 6, -1],
    [6, 6, -1, -1],
  ]
}, {
  id: 3,
  color: 3,
  data: [
    [3, 3, -1, -1],
    [3, 3, 3, -1],
    [3, -1, -1, -1],
  ]
}, {
  id: 4,
  color: 4,
  data: [
    [4, 4, -1, -1],
    [-1, 4, 4, -1],
    [-1, -1, 4, -1],
    [-1, -1, 4, -1],
    [-1, -1, -1, -1]
  ]
}, {
  id: 5,
  color: 4,
  data: [
    [4, 4],
    [4, 4],
    [4, -1],
    [4, -1],
    [-1, -1]
  ]
}, {
  id: 6,
  color: 1,
  data: [
    [-1, -1, 1, 1],
    [-1, 1, 1, -1],
    [1, 1, -1, -1],
  ]
}, {
  id: 7,
  color: 3,
  data: [
    [-1, 3, -1, -1],
    [-1, 3, -1, -1],
    [3, 3, -1, -1],
    [-1, 3, 3, -1],
    [-1, -1, -1, -1]
  ]
}, {
  id: 8,
  color: 7,
  data: [
    [7, 7],
    [7, 7],
    [7, 7],
  ]
}, {
  id: 9,
  color: 6,
  data: [
    [-1, -1, 6, -1],
    [-1, 6, 6, -1],
    [6, 6, -1, -1],
    [6, -1, -1, -1],
    [-1, -1, -1, -1]
  ]
}, {
  id: 10,
  color: 3,
  data: [
    [-1, -1],
    [-1, 3],
    [3, 3],
    [3, 3],
    [3, -1],
  ]
}, {
  id: 11,
  color: 5,
  data: [
    [-1, 5, 5, 5,],
    [-1, 5, 5, 5,],
    [-1, -1, -1, -1]
  ]
}, {
  id: 12,
  color: 7,
  data: [
    [-1, -1, 7, 7],
    [-1, 7, 7, -1],
    [-1, 7, 7, -1],
  ]
}, {
  id: 13,
  color: 8,
  data: [
    [8, 8, 8, -1],
    [8, 8, 8, -1],
    [-1, -1, -1, -1]
  ]
}, {
  id: 14,
  color: 8,
  data: [
    [-1, 8, 8, 8],
    [-1, 8, 8, -1],
    [-1, 8, -1, -1],
  ]
}, {
  id: 15,
  color: 8,
  data: [
    [-1, -1, 8, 8],
    [-1, 8, 8, -1],
    [-1, 8, -1, -1],
    [-1, 8, -1, -1],
    [-1, -1, -1, -1]
  ]
}, {
  id: 16,
  color: 2,
  data: [
    [2, -1],
    [2, -1],
    [2, 2],
    [2, 2],
    [-1, -1]
  ]
}, {
  id: 17,
  color: 7,
  data: [
    [-1, -1, 7, -1],
    [-1, 7, 7, -1],
    [7, 7, -1, -1],
    [-1, 7, -1, -1],
    [-1, -1, -1, -1]
  ]
}, {
  id: 18,
  color: 2,
  data: [
    [-1, 2],
    [2, 2],
    [2, 2],
    [-1, 2],
    [-1, -1]
  ]
}, {
  id: 19,
  color: 5,
  data: [
    [-1, 5, -1, -1],
    [-1, 5, 5, -1],
    [5, 5, -1, -1],
    [-1, 5, -1, -1],
    [-1, -1, -1, -1]
  ]
}]

const deskDefault = [
  [-1, -1, 0, 0, 0, 0, 0, 0, -1, -1],
  [-1, -1, 0, 0, 0, 0, 0, 0, -1, -1],
  [-1, -1, 0, 0, 0, 0, 0, 0, -1, -1],
  [-1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
  [-1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
  [-1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
  [-1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
  [-1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
  [-1, -1, 0, 0, 0, 0, 0, 0, -1, -1],
  [-1, -1, 0, 0, 0, 0, 0, 0, -1, -1],
  [-1, -1, 0, 0, 0, 0, 0, 0, -1, -1],
]

export class GameAction6_10 {
  score: number = 0;
  idx: number = 0;
  listData: number[][] = []
  action: number[] = []
  constructor() {

  }
}
export class GameData6_10 {
  desk: number[][] = []
  blockInit = [];
  typeSet: number = 1
  player: number = 1;
  compIdxsUsed: number[] = []
  constructor() {
    this.desk = _.cloneDeep(deskDefault)
  }
}

export class module6_10 {
  // 传进组件的原始数组结构，传出向右转1次后的结构
  // listComp是组件配置，可以拿来测试用
  doRotate(dataList: number[][]) {
    let pos = [];
    dataList.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v != -1) {
          pos.push({
            x, y, v
          })
        }
      })
    })
    // pos.forEach(e => {
    //   console.log(this.rotateXY(e.x, e.y,))

    // })
    return dataList;
  }



  getXY(x: number, y: number): { x: number, y: number } {
    let s = 1;
    if (y % 2 == 0) {
      s = x % 2 == 0 ? -1 : 1
    } else {
      s = x % 2 == 1 ? -1 : 1
    }
    let startX = -this.w * 5 + this.w / 2
    let startY = this.h * 15 / 2 - this.h / 2
    return {
      x: (x - startX) / this.w, y: (y - startY) / - this.h
    }
  }
  w = 67;
  h = 77 / 2;
  getPosition(x: number, y: number): { x: number, y: number } {
    let s = 1;
    if (y % 2 == 0) {
      s = x % 2 == 0 ? -1 : 1
    } else {
      s = x % 2 == 1 ? -1 : 1
    }
    let startX = -this.w * 5 + this.w / 2
    let startY = this.h * 15 / 2 - this.h / 2
    return {
      x: startX + x * this.w, y: startY - this.h * y
    }
  }




  // 根据组件结构获取所有可以放的位置
  getCanPutPlaceAll(desk: GameData6_10) {
    let listActionAll: GameAction6_10[] = []
    let listCompIdCanUse = listComp.filter(e => desk.compIdxsUsed.indexOf(e.id) == -1);

    for (let i = 0; i < listCompIdCanUse.length; i++) {
      let idxComp = listCompIdCanUse[i].id
      if (desk.compIdxsUsed.filter(id => id == idxComp).length < 4) {
        let listActionByIdx: GameAction6_10[] = this.getActionAllByCompIdx(idxComp, desk, 15);
        listActionAll = listActionAll.concat(listActionByIdx);
      }
    }
    return listActionAll;
  }
  getActionAllByCompIdx(idxComp: number, desk: GameData6_10, max = 10): GameAction6_10[] {
    let listActionAll: GameAction6_10[] = []
    // todo:这里需要改，需要遍历出所有组件通过n次变化后可能的结构
    let dataList = this.getCompDataById(idxComp)
    let listDatas: number[][][] = [dataList.data];

    for (let c = 0; c < listDatas.length; c++) {
      let listData = listDatas[c]
      for (let y = 0; y < desk.desk.length; y++) {
        let row = desk.desk[y]
        for (let x = 0; x < row.length; x++) {
          let v = row[x]
          if ((listData[0][0] < 0 || (v == 0 && listData[0][0] > 0))) {
            let act = new GameAction6_10();
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

  bian(square: number[][], type: number): number[][] {
    if (type == 1) {
      return square
    } else if (type == 2) {
      return this.bian2(square)
    } else if (type == 3) {
      return this.bian3(square)
    } else if (type == 4) {
      return this.doRotate(square)
    }
    return square
  }
  checkDesk(desk: GameData6_10) {
    let all = this.getCanPutPlaceAll(desk);
    if (all.length == 0) {
      // 本方无棋可走，返回对方获胜
      return 3 - desk.player
    }
    return -1
  }

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
    let result: number[][] = [];
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

  getCompDataById(id: number) {
    return listComp.find(e => e.id == id)!
  }
  getRiddle() {
    return new GameData6_10()
  }
  checkRiddle(desk: GameData6_10) {
    if (desk.blockInit.length % 2 == 1) {
      return -1
    }
    //验证不能直接获胜
    let flagWin = this.checkDesk(desk);
    if (flagWin > -1) {
      return -1
    }
  }
  getGridDir(x: number, y: number) {
    let s = 1
    if (y % 2 == 0) {
      s = x % 2 == 0 ? -1 : 1
    } else {
      s = x % 2 == 1 ? -1 : 1
    }
    return s

  }
  checkAction(desk: GameData6_10, action: GameAction6_10) {
    // 如果没有这个块块了，不能放
    if (desk.compIdxsUsed.indexOf(action.idx) > -1) {
      return -1
    }
    // 左上第一个位置三角形方向必须向左
    if (this.getGridDir(action.action[1], action.action[0]) == 1) {
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

  doAction(desk: GameData6_10, action: GameAction6_10): { flag: number, desk: GameData6_10 } {
    if (this.checkAction(desk, action) != 0) {
      return { flag: -1, desk }
    }
    // 做一次深拷贝防止数据污染
    let deskNew: GameData6_10 = _.cloneDeep(desk)
    deskNew.compIdxsUsed.push(action.idx)
    action.listData.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v > -1) {
          deskNew.desk[y + action.action[0]][x + action.action[1]] = v;
        }
      })
    })
    return { flag: 0, desk: deskNew }
  }


  getActionAuto(desk: GameData6_10) {
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

}

