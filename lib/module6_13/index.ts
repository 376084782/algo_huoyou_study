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
  getRiddleByStep(step = 1) {
    let player = 1;
    let desk = this.getRiddle();
    for (let i = 0; i < step; i++) {
      desk.player = player;
      let act = this.getActionAuto(desk);
      let [f, desk2] = this.doAction(desk, act.nobest)
      desk = desk2;
      player = 3 - player;
    }
    return desk;

  }
  getRiddlesByLev(lev = 1) {
    let step = 2 + lev * 2;
    let listDesk = []
    for (let i = 0; i < 10; i++) {
      let desk = this.getRiddleByStep(step);
      listDesk.push(desk);
    }
    return listDesk
  }
  getRiddle() {
    return new GameData6_13();
  }
  sortPos(list: number[][]) {
    return list.sort(([x1, y1], [x2, y2]) => {
      if (y1 == y2) {
        return x1 - x2;
      } else {
        return y1 - y2;
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
  doAction(deskIn: GameData6_13, act: GameAction6_13): [f: number, desk: GameData6_13] {
    let desk: GameData6_13 = _.cloneDeep(deskIn);
    if (!this.checkAction(desk, act)) {
      return [-1, desk];
    }
    act.listIdxs.forEach(([x, y]) => {
      desk.desk[y][x] = -desk.player;
    });
    return [0, desk];
  }

  checkRiddle(desk: GameData6_13) {
    let f = this.checkDesk(desk)
    // todo: 没有可行的路径
    if (f != -1) {
      return -1
    }
    return 0
  }

  getActionAuto(deskIn: GameData6_13) {
    let desk = _.cloneDeep(deskIn)
    let playerSelf = desk.player;
    let playerOppo = 3 - desk.player;
    let actionAll = this.getActionAll(desk);
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      desk.player = playerOppo;
      let [fOppo, desk2Oppo] = this.doAction(desk, act1Self);
      let actionAllOppo = this.getActionAll(desk2Oppo);
      // 放之后对方可行棋子为0，说明必胜,直接使用
      if (actionAllOppo.length == 0) {
        return {
          best: act1Self,
          nobest: act1Self
        };
      }
      if (actionAll.length < 10) {
        // 可放的方式不多，有制胜局的可能性，多考虑一步
        for (let m = 0; m < actionAllOppo.length; m++) {
          let act1Oppo = actionAllOppo[m];
          let [f, desk2Self] = this.doAction(desk2Oppo, act1Oppo);
          desk2Self.player = playerSelf
          let actionAllSelf2 = this.getActionAll(desk2Self);
          if (actionAllSelf2.length == 0) {
            // 我可能面对的局面，该棋面下我无棋可走，得分-100
            act1Self.score -= 100;
          }
        }
      }
      // 吃掉的棋子的颜色差值作为得分，尽可能以更少的自己的棋子吃掉更多对方的
      let countSelf = 0;
      let countOppo = 0;
      act1Self.listIdxs.forEach(([x, y]) => {
        let color = desk.desk[y][x];
        if (color == playerSelf) {
          countSelf++
        } else if (color == playerOppo) {
          countOppo++
        }
      })
      act1Self.score += (countOppo - countSelf)
    }
    // 增加一点随机性，避免计算机很呆都是一样的走法
    actionAll = _.shuffle(actionAll);
    actionAll = actionAll.sort((a, b) => b.score - a.score);
    if (actionAll.length >= 2) {
      return {
        best: actionAll[0],
        nobest: actionAll[1]
      };
    } else {
      return {
        best: actionAll[0],
        nobest: actionAll[0]
      };
    }
  }
  getActionAll(desk: GameData6_13) {
    let pAll = this.getCanputPoints(desk, 20);
    let listAct: GameAction6_13[] = [];
    pAll.forEach(p => {
      let list = this.getActionByPos(desk, p[0], p[1])
      listAct = listAct.concat(list);
    })
    return listAct;
  }
  getCanputPoints(desk: GameData6_13, max = 20) {
    let listP: number[][] = []
    for (let y = 0; y < desk.desk.length; y++) {
      let row = desk.desk[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x] == desk.player) {
          // 可以走的路
          listP.push([x, y])
          if (listP.length > max) {
            return listP
          }
        }
      }
    }
    return listP
  }
  getActionByPos(desk: GameData6_13, x: number, y: number) {
    // 获取所有可以作为起始点的位置，然后从上下左右三个方向去挨个遍历查询，至到无解
    let act: GameAction6_13[] = []

    for (let dir = 0; dir < 4; dir++) {
      // dir0123上下左右
      let l = this.getPlistByDir(desk, x, y, dir)
      act = act.concat(l);
    }
    return act
  }
  getPlistByDir(desk: GameData6_13, x: number, y: number, dir: number) {
    let l = [];
    let plist = []
    while (desk.desk[y] && desk.desk[y][x] > 0) {
      plist.push([x, y]);
      let act = new GameAction6_13();
      act.listIdxs = _.cloneDeep(plist)
      l.push(act);
      if (dir == 0) {
        y--
      } else if (dir == 1) {
        y++
      } else if (dir == 2) {
        x--
      } else if (dir == 3) {
        x++
      }
    }
    return l;
  }
  checkDesk(desk: GameData6_13) {
    let count1 = 0
    let count2 = 0;
    for (let y = 0; y < desk.desk.length; y++) {
      let row = desk.desk[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x] == 1) {
          count1++;
        }
        if (row[x] == 2) {
          count2++;
        }
      }
    }
    if (count1 == 0) {
      return 2
    }
    if (count2 == 0) {
      return 1
    }
  }
}
