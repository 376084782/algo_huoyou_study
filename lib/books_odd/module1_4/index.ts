var _ = require('lodash');

export class GameData1_4 {
  player: number = 1;
  desk: number[][] = [];
  ques: number[][] = []
  typeSet: number = 1;
}
export class GameAction1_4 {
  color: number = -1;
  listP: number[][] = []
  score: number = 0
}
export class module1_4 {
  getRiddle(maxX: number, maxY: number) {
    let desk = new GameData1_4();
    let l = []
    for (let y = 0; y < maxY; y++) {
      let row: number[] = []
      l.push(row)
      for (let x = 0; x < maxX; x++) {
        row.push(0)
      }
    }
    desk.desk = _.cloneDeep(l);
    desk.ques = _.cloneDeep(l);
    return desk;
  }
  getRiddleDefault() {
    let desk = this.getRiddle(4, 4)
    let l = [
      [6, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 0, 3],
      [0, 0, 0, 3]]
    desk.ques = _.cloneDeep(l)
    return desk;
  }
  checkRiddle(desk: GameData1_4) {
    if (desk.desk.length < 4 || desk.desk.length > 8) {
      return -1
    }
    if (desk.desk[0].length < 4 || desk.desk[0].length > 8) {
      return -1
    }
    return 0
  }
  checkDesk(deskIn: GameData1_4) {
    let desk: GameData1_4 = _.cloneDeep(deskIn)
    // 先把所有未填色的都补一个999，如果只有一个矩形了，那这个矩形就不需要填色了，可以自动检测
    for (let y = 0; y < desk.desk.length; y++) {
      let row = desk.desk[y]
      for (let x = 0; x < row.length; x++) {
        let v = row[x];
        if (v == 0) {
          row[x] = 999;
        }
      }
    }
    // 开始判断
    for (let y = 0; y < desk.desk.length; y++) {
      let row = desk.desk[y]
      for (let x = 0; x < row.length; x++) {
        let v = row[x];
        if (v < 0) {
          continue
        }
        let maxX = this.getSeriesMax(row, x);
        let maxY = -1;
        // 检查纵向是否满足一个矩形
        for (let xIn = x; xIn <= maxX; xIn++) {
          let listY = this.getListY(desk.desk, xIn);
          let maxYIn = this.getSeriesMax(listY, y);
          if (maxY == -1) {
            maxY = maxYIn
          } else if (maxY != maxYIn) {
            // 说明纵向不是一个矩形
            console.log('纵向不是一个矩形')
            return -1
          }
        }
        // 检查横向是否满足一个矩形标准
        for (let yIn = y; yIn < maxY; yIn++) {
          if (desk.desk[yIn][maxX + 1] == v) {
            console.log('横向是否满足一个矩形标准')
            return -1
          }
        }

        // 获取这个矩形范围内的需求数字，如果数字不止一个或者没有数字，则答题错误
        let countNeed = this.getCountNeed(desk.ques, [x, y], [maxX, maxY]);
        if (countNeed == -1) {
          console.log('获取这个矩形范围内的需求数字，如果数字不止一个或者没有数字，则答题错误')
          return -1
        }

        let countReal = 0
        // 能到这里就说明这个范围是一个矩形，而且范围内只有一个目标数字，把颜色置负，用于区分是否已扫描
        for (let yIn = y; yIn <= maxY; yIn++) {
          for (let xIn = x; xIn <= maxX; xIn++) {
            console.log('zhife')
            desk.desk[yIn][xIn] *= -1;
            countReal++;
          }
        }
        // 然后判断一下这个矩形的大小是否符合条件
        if (countNeed != countReal) {
          return -1
        }
      }

    }
    return desk.player
  }
  getCountNeed(ques: number[][], p1: number[], p2: number[]) {
    let [x, y] = p1;
    let [maxX, maxY] = p2;
    let countList = []
    for (let yIn = y; yIn <= maxY; yIn++) {
      for (let xIn = x; xIn <= maxX; xIn++) {
        if (ques[yIn][xIn] > 0) {
          countList.push(ques[yIn][xIn])
        }
        if (countList.length > 1) {
          return -1
        }
      }
    }
    if (countList.length == 0) {
      return -1
    }
    return countList[0]
  }

  getListY(list: number[][], x: number) {
    return list.map(e => e[x]);
  }
  getSeriesMax(list: number[], idx: number) {
    if (idx > list.length - 1) {
      return -1
    }
    let color = list[idx];
    for (let i = idx; i < list.length; i++) {
      if (list[i] != color) {
        return i - 1
      }
    }
    return list.length - 1;
  }

  doAction(deskIn: GameData1_4, act: GameAction1_4): [flag: number, desk: GameData1_4] {
    let desk: GameData1_4 = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk];
    }
    act.listP.forEach(([x, y]) => {
      desk.desk[y][x] = act.color;
    })
    return [0, desk]
  }
  checkAction(desk: GameData1_4, act: GameAction1_4) {
    return 0
  }
  getActionAuto(desk: GameData1_4): any[] {
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
  getActionAll(desk: GameData1_4): GameAction1_4[] {
    let listActionAll: GameAction1_4[] = []
    return listActionAll
  }
}