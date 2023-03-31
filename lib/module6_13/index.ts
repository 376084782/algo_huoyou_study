var _ = require("lodash");

const deskDefault = [
  [0, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 1, 0]
];

export class GameData6_13 {
  player: number = 1;
  typeSet: number = 1;
  desk: number[][] = [];
  constructor() {
    this.desk = _.cloneDeep(deskDefault);
  }
}
export class GameAction6_13 {
  score: number = 0;
  // [x,y][]
  listIdxs: number[][] = [];
}
export class module6_13 {
  getRiddle() {
    return new GameData6_13();
  }
  sortPos(list: number[][]) {
    return list.sort(([x1, y1], [x2, y2]) => {
      if (y1 == y2) {
        return y2 - y1;
      } else {
        return x2 - x1;
      }
    });
  }
  checkAction(desk: GameData6_13, act: GameAction6_13) {
    let listIdxs = _.uniqWith(act.listIdxs, _.isEqual);
    let listP = this.sortPos(listIdxs);
    if (listP.length == 0) {
      return false;
    }
    let pStart = listP[0];
    let pEnd = listP[listP.length - 1];
    let vStart = desk.desk[pStart[1]][pStart[0]];
    let vEnd = desk.desk[pEnd[1]][pEnd[0]];
    if (vStart != desk.player && vEnd != desk.player) {
      // 检查起始点和终点的格子，都不是自己的颜色，判为非法
      return false;
    }
    // 判断都未被吃掉
    for (let i = 0; i < listP.length; i++) {
      let [x, y] = listP[i];
      if (desk.desk[y][x] <= 0) {
        return false;
      }
    }
    if (listP.length >= 2) {
      // 判断方向 0横向增长 1纵向增长
      let dir = pEnd[0] == pStart[0] ? 1 : 0;
      for (let i = 0; i < listP.length; i++) {
        // 两个点以上，判断是否连续
        let [x2, y2] = pStart;
        if (dir == 0) {
          x2 += i;
        } else {
          y2 += i;
        }
        let [x, y] = listP[i];
        if (x != x2 || y != y2) {
          return false;
        }
      }
    }
    return true;
  }
  doAction(deskIn: GameData6_13, act: GameAction6_13) {
    let desk: GameData6_13 = _.cloneDeep(deskIn);
    if (!this.checkAction(desk, act)) {
      return [-1, desk];
    }
    act.listIdxs.forEach(e => {
      
    });
    return [0, desk];
  }

  checkRiddle(desk: GameData6_13) {
    // todo: 没有可行的路径
  }
}
