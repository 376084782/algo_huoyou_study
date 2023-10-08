var _ = require('lodash');

export class GameData7_13 {
  player: number = 1;
  desk: number[][] = [];
  typeSet: number = 1;
}
export class GameAction7_13 {
  score: number = 0
}

class SearchPoint7_13 {
  x: number = -1;
  y: number = -1;
  v: number = -1
  listOpen: number[][] = [];
  listChecked: number[][] = []
  listClosed: number[][] = [];
  isClosed: boolean = false;
  aWallId: number[] = [];

  from?: number[];
  constructor(desk: GameData7_13, x: number, y: number, from?: number[]) {
    this.v = desk.desk[y][x];
    this.x = x;
    this.y = y;
    // 如果是边界点
    if (this.y == 0) {
      this.aWallId.push(1)
    }
    if (this.y == desk.desk.length - 1) {
      this.aWallId.push(2)
    }
    if (this.x == 0) {
      this.aWallId.push(3)
    }
    if (this.x == desk.desk[0].length - 1) {
      this.aWallId.push(4)
    }

    // 获取周围连续的点
    let listAroundAndOpen: number[][] = []
    let listOffsetAround = [[-1, -1], [0, -1], [-1, 0], [1, 0], [0, 1], [1, 1]]
    listOffsetAround.forEach(([offX, offY], idx) => {
      let [x1, y1] = [offX + x, offY + y];
      if (desk.desk[y1] && desk.desk[y1][x1] != undefined) {
        let v1 = desk.desk[y1][x1]
        if (v1 != undefined && v1 == this.v) {
          // 空点位可以走
          listAroundAndOpen.push([x1, y1])
        }
      }
    })
    this.listOpen = listAroundAndOpen;
    // 不查回头路
    if (from) {
      this.from = from
      this.listClosed.push(from);
      this.listChecked.push(from);
    }

  }
}
export class module7_13 {
  getSearchPointAround(desk: GameData7_13, p: SearchPoint7_13) {
    let listAround: number[][] = []
    let listOffsetAround = [[-1, -1], [0, -1], [-1, 0], [1, 0], [0, 1], [1, 1]]
    listOffsetAround.forEach(([offX, offY], idx) => {
      let v = this.getValueFromDesk(desk, offX + p.x, offY + p.y)
      if (v != undefined) {
        // 空点位可以走
        listAround.push([offX + p.x, offY + p.y])
      }
    })
    return listAround;
  }
  getValueFromDesk(desk: GameData7_13, x: number, y: number) {
    if (desk.desk[y] && desk.desk[y][x] != undefined) {
      return desk.desk[y][x]
    }
    return undefined
  }
  getRiddle(count: number) {
    let desk = new GameData7_13();
    for (let y = 0; y < count; y++) {
      let r: number[] = []
      desk.desk.push(r)
      for (let x = 0; x < count; x++) {
        r.push(0)
      }
    }
    return desk;
  }
  checkRiddle(desk: GameData7_13) {
    if (desk.desk.length > 11 || desk.desk.length < 3) {
      return -1
    }
    return 0
  }
  /**
   * 寻找路径算法
   * @param p 开始点
   * @param desk 桌面数据
   * @param wallId 要寻获的墙壁的方向
   */
  findPath(p: number[], desk: GameData7_13, wallId: number) {
    let pCheck: SearchPoint7_13 = new SearchPoint7_13(desk, p[0], p[1]);
    let listChecked: SearchPoint7_13[] = [];
    function getPointSearch(x: number, y: number, from?: number[]) {
      let pTarget = listChecked.find(e => e.x == x && e.y == y)
      if (!pTarget) {
        pTarget = new SearchPoint7_13(desk, x, y, from)
        listChecked.push(pTarget)
      }
      return pTarget
    }
    let isFirst = true;
    let listPath: number[][] = []
    while (true) {
      let pLast = listPath[listPath.length - 1];
      if (!pLast || (pLast.join(',') != [pCheck.x, pCheck.y].join(','))) {
        listPath.push([pCheck.x, pCheck.y]);
      }
      if (pCheck.x == p[0] && pCheck.y == p[1]) {
        // 如果转了一圈转回起点了，那这一段的路径没有必要记录
        listPath = [p]
      }
      if (pCheck.isClosed) {
        // 被封闭无解的点
        this.log('被封闭无解的点')
        if (!isFirst && pCheck.x == p[0] && pCheck.y == p[1]) {
          // 回到原点，说明没有符合的路径
          this.log('回到原点，说明没有符合的路径')
          listPath = []
          break;
        } else if (pCheck.from) {
          // 回到来源点
          pCheck = getPointSearch(pCheck.from[0], pCheck.from[1])
          listPath.pop()
          this.log('回到来源点')
        } else {
          // 未知异常，没有来源标记
          this.log('未知异常，没有来源标记')
          break
        }
      } else if (pCheck.aWallId.indexOf(wallId) > -1) {
        // 获取到了目标点
        this.log('目标点寻获')
        break
      } else {
        let listNotChecked = pCheck.listOpen.filter(eOpen => (pCheck.listChecked.map(e2 => e2.join(',')).indexOf(eOpen.join(',')) == -1))
        // 检查一次是否应该被关闭
        if (listNotChecked.length == 0) {
          // 所有的点都被检查过了的，关闭
          this.log('关闭点', pCheck.x, pCheck.y)
          pCheck.isClosed = true
        } else {
          // 根据权重获取下一个遍历点位目标
          listNotChecked = listNotChecked.sort((a: number[], b: number[]) => {
            let offX1 = a[0] - p[0];
            let offX2 = b[0] - p[0];
            let offY1 = a[1] - p[1];
            let offY2 = b[1] - p[1];
            if (wallId == 1) {
              return offY1 - offY2
            } else if (wallId == 2) {
              return offY2 - offY1
            } else if (wallId == 3) {
              return offX1 - offX2
            } else if (wallId == 4) {
              return offX2 - offX1
            } else {
              return 0
            }
          })
          let pNext = listNotChecked[0];


          pCheck.listChecked.push(pNext)
          pCheck = getPointSearch(pNext[0], pNext[1], [pCheck.x, pCheck.y])
          this.log('获取下一个遍历点位目标', pNext)
        }
      }
      isFirst = false;
    }
    return listPath
  }

  log(a?: any, b?: any, c?: any) {
    // console.log(...arguments)
  }
  checkDesk(desk: GameData7_13) {
    if (desk.player == 1) {
      // 如果是红方。从上方的格子开始查是否可以连到下方
      let row1 = desk.desk[0];
      for (let x = 0; x < row1.length; x++) {
        let p = [x, 0]
        let v = row1[x]
        if (v == 1) {
          let path = this.findPath(p, desk, 4);
          if (path.length > 0) {
            return 1
          }
        }
      }
    } else {
      // 如果是蓝方，从左边的格子开始查是否可以连到右边
      let rowy1 = desk.desk.map(e => e[0]);
      for (let y = 0; y < rowy1.length; y++) {
        let v = rowy1[y]
        if (v == 2) {
          let p = [0, y]
          let path = this.findPath(p, desk, 2);
          if (path.length > 0) {
            return 2
          }
        }
      }
    }
    return -1
  }

  checkPathWin(p: number[], desk: GameData7_13) {
    let path1 = []
    let path2 = []
    if (desk.player == 1) {
      path1 = this.findPath(p, desk, 1);
      path2 = this.findPath(p, desk, 2);
    } else {
      path1 = this.findPath(p, desk, 3);
      path2 = this.findPath(p, desk, 4);
    }
    return path1.length > 0 && path2.length > 0
  }

  doAction(deskIn: GameData7_13, act: GameAction7_13): [flag: number, desk: GameData7_13] {
    let desk = _.cloneDeep(deskIn)
    return [0, desk]
  }
  checkAction(desk: GameData7_13, act: GameAction7_13) {
    return 0
  }
  getActionAuto(desk: GameData7_13) {
    let actionAll = this.getActionAll(desk);

    // 遍历整个局面，如果这个点位已经被围死了无法
  }
  getActionAll(desk: GameData7_13): GameAction7_13[] {
    let listActionAll: GameAction7_13[] = [];
    

    return listActionAll
  }
}