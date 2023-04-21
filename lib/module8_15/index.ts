var _ = require('lodash');

export class GameData8_15 {
  player: number = 1;
  desk: number[][] = [];
  listLine1: number[][][] = [];
  listLine2: number[][][] = [];
  typeSet: number = 1;
}
export class GameAction8_15 {
  list: number[][] = [];
  score: number = 0
}
export class module8_15 {
  getRiddle(count: number) {
    let l: number[][] = []
    for (let y = 0; y < count; y++) {
      let row: number[] = []
      l.push(row)
      for (let x = 0; x < count; x++) {
        row.push(0)
      }
    }
    let desk = new GameData8_15();
    desk.desk = l;
    return desk;
  }
  checkRiddle(desk: GameData8_15) {
    let len = desk.desk.length;
    let sizeList = [3, 5, 7, 9];
    if (sizeList.indexOf(len) == -1) {
      return -1
    }
    if (this.checkDesk(desk) != -1) {
      return -1
    }
    return 0
  }
  checkDesk(desk: GameData8_15) {
    let acts = this.getActionAll(desk);
    if (acts.length == 0) {
      // 无棋可走，获胜
      return desk.player
    }
    return -1
  }


  sortLinePos(list: number[][]) {
    return list.sort((a: number[], b: number[]) => {
      let [x1, y1] = a;
      let [x2, y2] = b;
      if (x1 != x2) {
        return x1 - x2
      } else {
        return y1 - y2
      }
    })
  }
  doAction(deskIn: GameData8_15, act: GameAction8_15): [flag: number, desk: GameData8_15] {
    let desk = _.cloneDeep(deskIn)
    // 将点位排序
    act.list = this.sortLinePos(act.list);
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk]
    }
    let listFull = this.getListBetween(act.list);
    // 如果是线段，存到列表
    if (act.list.length > 1) {
      if (desk.player == 1) {
        desk.listLine1.push(act.list)
      } else {
        desk.listLine2.push(act.list)
      }
    }
    // 在线段上的每一个点都修改归属
    for (let i = 0; i < listFull.length; i++) {
      let [x, y] = listFull[i];
      let color = listFull.length > 1 ? desk.player + 2 : desk.player
      desk.desk[y][x] = color;
    }
    return [0, desk]
  }
  checkAction(desk: GameData8_15, act: GameAction8_15) {
    if (act.list.length < 2) {
      return -1
    }
    if (act.list.length >= 2) {
      // 多个点，校验是否是一条直线
      let flagValid = this.checkLineValid(act.list);
      if (!flagValid) {
        return -1
      }
    }
    // 校验这些点是否都为空
    let posInLine = this.getListBetween(act.list)
    for (let i = 0; i < posInLine.length; i++) {
      let [x, y] = posInLine[i];
      if (!desk.desk[y] || desk.desk[y][x] != 0) {
        return -1
      }
    }
    if (posInLine.length >= 2) {
      // 如果是斜向的，
      // 要检验与已有的线段是否有交错
      let listLineGot: any[] = desk.listLine1.concat(desk.listLine2)
      for (let i = 0; i < listLineGot.length; i++) {
        let l = listLineGot[i]
        let p1 = l[0];
        let p2 = l[1]
        let p3 = act.list[0]
        let p4 = act.list[1]
        if (this.judgeIntersect(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1])) {
          return -1
        }
      }
    }

    return 0
  }
  judgeIntersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {

    //快速排斥：
    //两个线段为对角线组成的矩形，如果这两个矩形没有重叠的部分，那么两条线段是不可能出现重叠的

    //这里的确如此，这一步是判定两矩形是否相交
    //1.线段ab的低点低于cd的最高点（可能重合）
    //2.cd的最左端小于ab的最右端（可能重合）
    //3.cd的最低点低于ab的最高点（加上条件1，两线段在竖直方向上重合）
    //4.ab的最左端小于cd的最右端（加上条件2，两直线在水平方向上重合）
    //综上4个条件，两条线段组成的矩形是重合的
    //特别要注意一个矩形含于另一个矩形之内的情况

    if (!(Math.min(x1, x2) <= Math.max(x3, x4) && Math.min(y3, y4) <= Math.max(y1, y2) && Math.min(x3, x4) <= Math.max(x1, x2) && Math.min(y1, y2) <= Math.max(y3, y4)))
      return false;

    //跨立实验：
    //如果两条线段相交，那么必须跨立，就是以一条线段为标准，另一条线段的两端点一定在这条线段的两段
    //也就是说a b两点在线段cd的两端，c d两点在线段ab的两端
    var u, v, w, z
    u = (x3 - x1) * (y2 - y1) - (x2 - x1) * (y3 - y1);
    v = (x4 - x1) * (y2 - y1) - (x2 - x1) * (y4 - y1);
    w = (x1 - x3) * (y4 - y3) - (x4 - x3) * (y1 - y3);
    z = (x2 - x3) * (y4 - y3) - (x4 - x3) * (y2 - y3);
    return (u * v <= 0.00000001 && w * z <= 0.00000001);
  }
  checkLineValid(line: number[][]): boolean {
    // 去重然后判断
    let listSorted = this.sortLinePos(_.uniqWith(line, _.isEqual));
    if (listSorted.length < 2) {
      // 是个点
      return false
    }
    let pos1 = listSorted[0];
    let pos2 = listSorted[listSorted.length - 1];
    if (pos1[0] == pos2[0] && pos1[1] == pos2[1]) {
      return false
    }
    if (Math.abs(pos2[1] - pos1[1]) == Math.abs(pos2[0] - pos1[0]) || pos2[1] - pos1[1] == 0 || pos2[0] - pos1[0] == 0) {
      return true
    }
    return false
  }
  getListBetween(line: number[][]) {
    let listSorted = this.sortLinePos(line);
    if (!this.checkLineValid(line)) {
      return []
    }
    let listRes = []
    let posMin = listSorted[0];
    let posMax = listSorted[listSorted.length - 1];
    if (posMin[0] == posMax[0]) {
      // 纵向
      let off = posMax[1] - posMin[1];
      for (let i = 0; i <= off; i++) {
        listRes.push([posMin[0], posMin[1] + i])
      }
    } else if (posMin[1] == posMax[1]) {
      // 横向
      let off = posMax[0] - posMin[0];
      for (let i = 0; i <= off; i++) {
        listRes.push([posMin[0] + i, posMin[1]])
      }
    } else {
      // 斜向45度
      let off = posMax[0] - posMin[0];
      let offY = posMax[1] - posMin[1];
      for (let i = 0; i <= off; i++) {
        if (offY < 0) {
          listRes.push([posMin[0] + i, posMin[1] - i])
        } else {
          listRes.push([posMin[0] + i, posMin[1] + i])
        }
      }
    }
    return listRes;

  }
  getActionAuto(desk: GameData8_15): any[] {
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
      if (actionAll.length < 20) {
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
  getAllActionByXY(desk: GameData8_15, x: number, y: number): number[][][] {
    let listPosAll: number[][][] = [];
    if (!desk.desk[y] || desk.desk[y][x] != 0) {
      return []
    }
    listPosAll.push([[x, y]]);
    for (let dir = 0; dir < 8; dir++) {
      // 从正上开始，顺时针绕圈8个方向
      let xEnd = x;
      let yEnd = y;
      let listP = [[x, y]]
      while (desk.desk[yEnd] && desk.desk[yEnd][xEnd] == 0) {
        if (yEnd != y || xEnd != x) {
          listP.push([xEnd, yEnd])
          listPosAll.push(this.sortLinePos(_.cloneDeep(listP)));
        }
        if (dir == 0) {
          yEnd--;
        } else if (dir == 1) {
          xEnd++;
          yEnd--
        } else if (dir == 2) {
          xEnd++;
        } else if (dir == 3) {
          xEnd++;
          yEnd++
        } else if (dir == 4) {
          yEnd++
        } else if (dir == 5) {
          xEnd--;
          yEnd++
        } else if (dir == 6) {
          xEnd--;
        } else if (dir == 7) {
          xEnd--;
          yEnd--
        }
      }
    }
    return listPosAll
  }
  getActionAll(desk: GameData8_15): GameAction8_15[] {
    // 先遍历所有可以放的点，然后根据点再按照四个方向辐射推出可以画的线
    let listPosAll: number[][][] = []
    for (let y = 0; y < desk.desk.length; y++) {
      let row: number[] = desk.desk[y]
      for (let x = 0; x < row.length; x++) {
        if (desk.desk[y][x] == 0) {
          let l = this.getAllActionByXY(desk, x, y)
          listPosAll = listPosAll.concat(l)
        }
      }
    }
    // 过滤相同的线段
    listPosAll = _.uniqWith(listPosAll, _.isEqual);
    let listActionAll: GameAction8_15[] = []
    listPosAll.forEach(e => {
      let act = new GameAction8_15();
      act.list = e;
      if (this.checkAction(desk, act) != -1) {
        listActionAll.push(act)
      }
    })
    return listActionAll
  }
}