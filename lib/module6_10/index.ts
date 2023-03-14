var _ = require('lodash');

const listComp = [{
  id: 1,
  color: 1,
  data: [
    [-1, -1, -1, -1],
    [-1, 1, 1, -1],
    [1, 1, 1, 1]
  ]
}, {
  id: 2,
  color: 6,
  data: [
    [-1, 6, -1],
    [6, 6, 6],
    [6, 6, -1]
  ]
}, {
  id: 3,
  color: 3,
  data: [
    [3, 3, -1],
    [3, 3, 3],
    [3, -1, -1]
  ]
}, {
  id: 4,
  color: 4,
  data: [
    [4, 4, -1],
    [-1, 4, 4],
    [-1, -1, 4],
    [-1, -1, 4],
  ]
}, {
  id: 5,
  color: 4,
  data: [
    [4, 4],
    [4, 4],
    [4, -1],
    [4, -1],
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
    [-1, 3, -1],
    [-1, 3, -1],
    [3, 3, -1],
    [-1, 3, 3],
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
    [-1, -1, 6],
    [-1, 6, 6],
    [6, 6, -1],
    [6, -1, -1],
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
    [-1, -1, -1],
    [5, 5, 5],
    [5, 5, 5],
  ]
}, {
  id: 12,
  color: 7,
  data: [
    [-1, -1, -1],
    [-1, 7, 7],
    [7, 7, -1],
    [7, 7, -1],
  ]
}, {
  id: 13,
  color: 8,
  data: [
    [8, 8, 8],
    [8, 8, 8],
  ]
}, {
  id: 14,
  color: 8,
  data: [
    [-1, -1, -1],
    [8, 8, 8],
    [8, 8, -1],
    [8, -1, -1],
  ]
}, {
  id: 15,
  color: 8,
  data: [
    [-1, -1, -1],
    [-1, 8, 8],
    [8, 8, -1],
    [8, -1, -1],
    [8, -1, -1],
  ]
}, {
  id: 16,
  color: 2,
  data: [
    [2, -1],
    [2, -1],
    [2, 2],
    [2, 2],
  ]
}, {
  id: 17,
  color: 7,
  data: [
    [-1, -1, 7],
    [-1, 7, 7],
    [7, 7, -1],
    [-1, 7, -1],
  ]
}, {
  id: 18,
  color: 2,
  data: [
    [-1, 2],
    [2, 2],
    [2, 2],
    [-1, 2],
  ]
}, {
  id: 19,
  color: 5,
  data: [
    [-1, 5, -1],
    [-1, 5, 5],
    [5, 5, -1],
    [-1, 5, -1],
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

export class GameData6_10 {
  desk: number[][] = []
  block1 = [];
  block2 = [];
  typeSet: number = 1
  player: number = 1;
  compUsed: number[] = []
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

  getCompDataById(id: number) {
    return listComp.find(e => e.id == id)
  }
  getRiddle() {
    return new GameData6_10()
  }
  checkRiddle(desk: GameData6_10) {
    if (desk.block1.length != desk.block2.length) {
      return -1
    }
    //验证不能直接获胜
    let flagWin = this.checkDesk(desk);
    if (flagWin > -1) {
      return -1
    }
  }
  checkDesk(desk: GameData6_10) {
    return -1
  }
  checkAction(desk: GameData6_10, action: number) {

    return 0
  }
  doAction(desk: GameData6_10, action: number): { flag: number, desk: GameData6_10 } {
    if (this.checkAction(desk, action) == -1) {
      return {
        flag: -1, desk: desk
      }
    }
    return {
      flag: 0,
      desk: desk
    }
  }

  getActionAuto(desk: GameData6_10) {
    return {}
  }

}

