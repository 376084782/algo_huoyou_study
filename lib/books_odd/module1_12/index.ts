import RandomGenerater from "../../util/RandomGenerater";

var _ = require('lodash');
let randomer = new RandomGenerater(1)
export class SearchPoint1_12 {
  x: number = -1;
  y: number = -1;
  v: number = -1
  listOpen: number[][] = [];
  listChecked: number[][] = []
  listClosed: number[][] = [];
  isClosed: boolean = false;
  aWallId: number[] = [];

  from?: number[];
  constructor(desk: GameData1_12, x: number, y: number, from?: number[]) {
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
    let v = desk.player;
    let listAroundAndOpen: number[][] = []
    let listOffsetAround: number[][] = []
    if (v == 1) {
      // 上下右
      listOffsetAround = [[0, -1], [0, 1], [1, 0]]
    } else if (v == 2) {
      // 左上右
      listOffsetAround = [[-1, 0], [0, -1], [1, 0]]
    }
    listOffsetAround.forEach(([offX, offY], idx) => {
      let [x1, y1] = [offX + x, offY + y];
      if (desk.desk[y1] && desk.desk[y1][x1] != undefined) {
        let v1 = desk.desk[y1][x1]
        if (v1 == 0 || v1 == v) {
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
export class GameData1_12 {
  player: number = 1;
  desk: number[][] = [];
  typeSet: number = 1;
}
export class GameAction1_12 {
  score: number = 0
  p1: number[] = [];
  p2: number[] = []
}
export class module1_12 {
  getRiddleLev() {
    let mapStep: any = {
      1: [
        [3, 3].join(','),
        [3, 4].join(','),
        [4, 3].join(',')
      ],
      2: [
        [4, 4].join(','),
        [4, 5].join(','),
        [5, 4].join(',')
      ],
      3: [
        [5, 5].join(','),
        [5, 6].join(','),
        [6, 5].join(',')
      ]
    }
    let map: any = []
    while (true) {
      let desk = this.getRandomRiddle();
      let score1 = this.getPathScore(desk, 1);
      let score2 = this.getPathScore(desk, 2);
      for (let lev in mapStep) {
        if (mapStep[lev].indexOf([score1, score2].join(',')) > -1) {
          if (!map[lev]) {
            map[lev] = []
          }
          if (map[lev].length < 30) {
            map[lev].push(desk)
          }
        }
      }
      if (map[1] && map[1].length == 30 && map[2] && map[2].length == 30 && map[3] && map[3].length == 30) {
        break
      }
    }
    return map
  }
  getRandomRiddle() {
    let desk = this.getRiddle(3);
    desk.desk = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    for (let c = 0; c < 4; c++) {
      let listY = desk.desk.map((v, idx) => v.some(e => e == 0) ? idx : -1).filter(e => e != -1)
      let yIdx = randomer.RangeInteger(0, listY.length);
      let y = listY[yIdx];
      let listX = desk.desk[y].map((v, x) => v == 0 ? x : -1).filter(e => e != -1)
      let xIdx = randomer.RangeInteger(0, listX.length);
      let x = listX[xIdx];
      let color = c < 2 ? 1 : 2;
      desk.desk[y][x] = color;
    }
    return desk
  }
  getRiddle(count: number) {
    let desk = new GameData1_12();
    if (count == 3) {
      desk.desk = [
        [1, 0, 0],
        [1, 0, 0],
        [0, 2, 2],
      ]
    } else if (count == 4) {
      desk.desk = [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 2, 2, 2],
      ]
    }
    return desk;
  }
  checkRiddle(desk: GameData1_12) {
    return 0
  }
  checkDesk(desk: GameData1_12) {
    let listAll: number[] = [];
    desk.desk.forEach((row, y) => {
      listAll = listAll.concat(row);
    })
    if (listAll.filter(e => e == 1).length == 0) {
      return 1
    } else if (listAll.filter(e => e == 2).length == 0) {
      return 2
    }
    //  else if (this.getActionAll(desk).length == 0) {
    //   // 如果堵死了，直接判输
    //   return 3 - desk.player;
    // }
    return -1
  }

  checkAction(desk: GameData1_12, act: GameAction1_12) {
    let dirX = act.p2[0] - act.p1[0]
    let dirY = act.p2[1] - act.p1[1]
    let { p1 } = act;
    let [x, y] = p1;
    let [x2, y2] = act.p2;
    if (!desk.desk[y] || desk.desk[y][x] != desk.player) {
      return -1
    }
    if (desk.desk[y2] && desk.desk[y2][x2] > 0) {
      return -1
    }
    if (dirX * dirY != 0) {
      return -1
    }
    if (Math.abs(dirX) != 1 && Math.abs(dirY) != 1) {
      return -1
    }
    if (desk.player == 1) {
      if (!desk.desk[y2]) {
        return -1
      }
      // 红棋不能往左走
      if (dirX < 0) {
        return -1
      }
    } else if (desk.player == 2) {
      if (desk.desk[y2] && desk.desk[y2][x2] == undefined) {
        return -1
      }
      // 蓝棋不能往下走
      if (dirY > 0) {
        return -1
      }
    }
    return 0
  }
  doAction(deskIn: GameData1_12, act: GameAction1_12): [flag: number, desk: GameData1_12] {
    let desk = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk];
    }
    let { p1, p2 } = act;
    desk.desk[p1[1]][p1[0]] = 0;
    if (desk.desk[p2[1]] && desk.desk[p2[1]][p2[0]] == 0) {
      desk.desk[p2[1]][p2[0]] = desk.player;
    }
    return [0, desk]
  }
  getPathScore(desk: GameData1_12, color: number) {
    // 一步1分，卡住算20分
    let score = 0
    for (let y = 0; y < desk.desk.length; y++) {
      let row = desk.desk[y]
      for (let x = 0; x < row.length; x++) {
        let v = row[x];
        if (v == color) {
          // score += 10;
          // 计算需要的路径长度
          let path = this.findPath([x, y], desk, v == 1 ? 4 : 1)
          if (path.length == 0) {
            score += 20
          } else {
            score += path.length
          }
        }
      }
    }
    return score
  }
  getCount(desk: GameData1_12, color: number) {
    let count = 0
    for (let y = 0; y < desk.desk.length; y++) {
      let row = desk.desk[y]
      for (let x = 0; x < row.length; x++) {
        let v = row[x];
        if (v == color) {
          count++
        }
      }
    }
    return count
  }
  getListOnWay(desk: GameData1_12, p: number[], color: number) {
    let [x, y] = p
    let v = desk.desk[y][x];
    let listAfter: number[] = [];
    let listBefore: number[] = []
    let way = []
    if (color == 1) {
      way = desk.desk[y]
      listBefore = way.slice(0, x)
      listAfter = way.slice(x + 1, way.length);
    } else {
      way = desk.desk.map(e => e[x])
      listAfter = way.slice(0, y)
      listBefore = way.slice(y + 1, way.length);
    }
    return {
      after: listAfter, before: listBefore
    }
  }
  getActionAuto(desk: GameData1_12): any[] {
    let actionAll = this.getActionAll(desk);

    let playerSelf = desk.player;
    let playerOppo = 3 - desk.player;
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let offX = act1Self.p2[0] - act1Self.p1[0];
      let offY = act1Self.p2[1] - act1Self.p1[1];
      // 获胜方向移动优先
      let isBestDir = false;
      if (playerSelf == 1 && offX > 0) {
        isBestDir = true
      } else if (playerSelf == 2 && offY == -1) {
        isBestDir = true
      }

      // 走出棋盘
      let [x2, y2] = act1Self.p2;
      let way1Self = this.getListOnWay(desk, act1Self.p1, playerSelf);
      let way1Oppo = this.getListOnWay(desk, act1Self.p1, playerOppo);
      // 能挡住对方棋子的尽量不动
      if (way1Oppo.before.some(e => e == playerOppo)) {
        act1Self.score -= 3
      }

      if (!desk.desk[y2] || desk.desk[y2][x2] == undefined) {
        act1Self.score += 1;
      } else {
        // 还在棋盘上
        let [f2, deskNew] = this.doAction(desk, act1Self);
        // 没有被拦截的优先
        let way2Self = this.getListOnWay(deskNew, act1Self.p2, playerSelf);
        let way2Oppo = this.getListOnWay(deskNew, act1Self.p2, playerOppo);

        if (isBestDir) {
          act1Self.score += 1
        }

        if (way2Self.after.every(e => e != playerOppo)) {
          if (isBestDir) {
            console.log('没有被拦截的优先')
            act1Self.score += 5;
          }
          if (way1Self.after.some(e => e == playerOppo)) {
            console.log('甩开拦截的优先')
            act1Self.score += 3;
          }
        }
        // 能额外拦住对方棋子的优先
        if (way1Oppo.before.every(e => e != playerOppo) && way2Oppo.before.some(e => e == playerOppo)) {
          console.log('能额外拦住对方棋子的优先')
          act1Self.score += 10;
        }
      }
    }

    // 增加一点随机性，避免计算机很呆都是走一样的地方从左往右放
    actionAll = _.shuffle(actionAll)
    actionAll = actionAll.sort((a, b) => b.score - a.score)
    console.log('actionAll3:', actionAll)
    if (actionAll.length >= 2) {
      return [actionAll[0], actionAll[1]]
    } else {
      return [actionAll[0], actionAll[0]]
    }
  }
  getDirsCanMove(player: number) {
    let mapDir: number[][] = []
    if (player == 1) {
      mapDir = [
        [1, 0],
        [-1, 0],
        [0, -1],
      ]
    } else {
      mapDir = [
        [1, 0],
        [0, 1],
        [0, -1],
      ]
    }
    return mapDir
  }
  getActionAll(desk: GameData1_12): GameAction1_12[] {
    let listActionAll: GameAction1_12[] = []
    let listDirs = [
      [1, 0],
      [-1, 0],
      [0, -1],
      [0, 1],
    ]
    desk.desk.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v == desk.player) {
          // 自己的棋子可以移动
          listDirs.forEach(([offX, offY], idx) => {
            let act = new GameAction1_12()
            act.p1 = [x, y];
            act.p2 = [x + offX, y + offY]
            if (this.checkAction(desk, act) != -1) {
              listActionAll.push(act);
            }
          })
        }
      })
    });
    return listActionAll
  }

  /**
 * 寻找路径算法
 * @param p 开始点
 * @param desk 桌面数据
 * @param wallId 要寻获的墙壁的方向
 */
  findPath(p: number[], desk: GameData1_12, wallId: number) {
    let pCheck: SearchPoint1_12 = new SearchPoint1_12(desk, p[0], p[1]);
    let listChecked: SearchPoint1_12[] = [];
    function getPointSearch(x: number, y: number, from?: number[]) {
      let pTarget = listChecked.find(e => e.x == x && e.y == y)
      if (!pTarget) {
        pTarget = new SearchPoint1_12(desk, x, y, from)
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
}