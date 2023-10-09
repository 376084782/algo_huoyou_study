var _ = require('lodash');

export class GameDataGrid5_10 {
  x: number = 0;
  y: number = 0;
  // 横着的线
  vx: number = 0;
  // 竖着的线
  vy: number = 0;
}
export class GameData5_10 {
  player: number = 1;
  desk: GameDataGrid5_10[][] = [];
  typeSet: number = 1;
  player1Dir = 0;
}
export class GameAction5_10 {
  score: number = 0;
  // 1竖着切 2横着切
  dir: number = 1;
  p: number[] = [];
  pLine: number[][] = []
}
export class module5_10 {
  getRiddle(maxX: number, maxY: number) {
    let desk = new GameData5_10();
    for (let y = 0; y < maxY; y++) {
      let listRow: GameDataGrid5_10[] = []
      desk.desk[y] = listRow;
      for (let x = 0; x < maxX; x++) {
        desk.desk[y].push({ x, y, vx: 0, vy: 0 })
      }
    }
    return desk;
  }
  checkRiddle(desk: GameData5_10) {
    let countY = desk.desk.length;
    if (countY < 1) {
      return -1
    }
    let countX = desk.desk[0].length;
    if (countX == countY && countX == 1) {
      return -1
    }
    if (countX > 12 || countY > 12) {
      return -1
    }
    return 0
  }
  checkDesk(desk: GameData5_10) {
    if (this.getActionAll(desk).length == 0) {
      return desk.player
    }

    for (let y = 0; y < desk.desk.length; y++) {
      let listRow = desk.desk[y]
      for (let x = 0; x < listRow.length; x++) {
        let data = listRow[x];
        if (x != listRow.length - 1 && data.vy == 0) {
          return -1
        }
        if (y != desk.desk.length - 1 && data.vx == 0) {
          return -1
        }
      }
    }
    return desk.player
  }

  checkAction(desk: GameData5_10, act: GameAction5_10) {
    let [x, y] = act.p;
    let dataBlock = desk.desk[y][x];
    if (!dataBlock) {
      return -1
    }
    if (desk.player1Dir > 0) {
      let targetDir = desk.player == 1 ? desk.player1Dir : 3 - desk.player1Dir;
      if (targetDir != act.dir) {
        return -1
      }
    }
    // 如果切过了
    if (act.dir == 1 && dataBlock.vy == 1) {
      // 竖着切检查竖着的线
      return -1
    }
    if (act.dir == 2 && dataBlock.vx == 1) {
      // 横着切检查横着的线
      return -1
    }

    // 如果存在，但是是边缘的蛋糕，也不用切
    let maxY = desk.desk.length;
    let maxX = desk.desk[0].length;
    // 竖着切
    if (act.dir == 1 && x >= maxX - 1) {
      return -1
    }
    // 横着切
    if (act.dir == 2 && y >= maxY - 1) {
      return -1
    }
  }
  // dir2 左右上下1234
  getListPByDir(p: number[], dir2: number, desk: GameData5_10) {
    let listAll: number[][] = []
    let [x, y] = p;
    let xCheck = x;
    let yCheck = y;
    let map: any = {
      1: [-1, 0],
      2: [1, 0],
      3: [0, -1],
      4: [0, 1],
    }

    let [xOff, yOff] = map[dir2];
    while (desk.desk[yCheck] && desk.desk[yCheck][xCheck]) {
      if (desk.desk[yCheck][xCheck].vy != 0 || desk.desk[yCheck][xCheck].vx != 0) {
        break
      }
      listAll.push([xCheck, yCheck]);
      xCheck += xOff
      yCheck += yOff

    }

    return listAll;
  }
  getListPByDirAll(p: number[], dir: number, desk: GameData5_10) {
    let list1: number[][] = []
    let list2: number[][] = []
    if (dir == 1) {
      list1 = this.getListPByDir(p, 3, desk);
      list2 = this.getListPByDir(p, 4, desk);
    } else {
      list1 = this.getListPByDir(p, 1, desk);
      list2 = this.getListPByDir(p, 2, desk);
    }
    let listAll: number[][] = list1.concat(list2)
    if (listAll.length == 0) {
      listAll.push(p)
    }
    return listAll;
  }
  doAction(deskIn: GameData5_10, act: GameAction5_10): [flag: number, desk: GameData5_10] {
    let desk: GameData5_10 = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk];
    }
    if (desk.player1Dir == 0) {
      desk.player1Dir = act.dir;
    }
    // 根据方向获取相邻的所有
    let listP = this.getListPByDirAll(act.p, act.dir, desk)
    listP.forEach(([x, y], idx) => {
      let grid = desk.desk[y][x]
      if (act.dir == 1) {
        grid.vy = 1
      } else {
        grid.vx = 1
      }
    })
    act.pLine = listP;
    return [0, desk]
  }
  getActionAuto(desk: GameData5_10): any[] {
    let actionAll = this.getActionAll(desk);

    let playerSelf = desk.player;
    let playerOppo = 3 - desk.player;
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let [flagOppo, desk2Oppo] = this.doAction(desk, act1Self);
      let res = this.checkDesk(desk2Oppo);
      // 必胜,直接使用
      if (res == playerSelf) {
        return [act1Self, act1Self]
      }
      let actionAllOppo = this.getActionAll(desk2Oppo);
      if (actionAll.length < 40) {
        // 可放的方式不多，有制胜局的可能性，多考虑一步
        for (let m = 0; m < actionAllOppo.length; m++) {
          let act1Oppo = actionAllOppo[m];
          let [flagSelf, desk2Self] = this.doAction(desk2Oppo, act1Oppo);
          let res2 = this.checkDesk(desk2Self);
          if (res2 == playerOppo) {
            // 如果对方会获胜，得分-100
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
  getActionAll(desk: GameData5_10): GameAction5_10[] {
    let listActionAll: GameAction5_10[] = []
    desk.desk.forEach((row, y) => {
      row.forEach((grid, x) => {
        let act1 = new GameAction5_10()
        act1.p = [x, y];
        act1.dir = 1;
        if (this.checkAction(desk, act1) != -1) {
          listActionAll.push(act1)
        }

        let act2 = new GameAction5_10()
        act2.p = [x, y];
        act2.dir = 2;
        if (this.checkAction(desk, act2) != -1) {
          listActionAll.push(act2)
        }
      })
    })
    return listActionAll
  }

  getCombinedLines(deskIn: GameData5_10) {
    let desk: GameData5_10 = _.cloneDeep(deskIn)
    let listP: { p: number[][], dir: number }[] = [];
    for (let y = 0; y < desk.desk.length; y++) {
      let row = desk.desk[y]
      for (let x = 0; x < row.length; x++) {
        let grid = desk.desk[y][x];
        // 从每个点出发，往右往下遍历寻找连续的点，并将找到的点的线占用状态置为空
        if (grid.vx == 1) {
          let xNext = x + 1;
          let pXEnd = [x, y];
          while (true) {
            if (!desk.desk[y] || !desk.desk[y][xNext] || !desk.desk[y][xNext].vx) {
              break
            } else {
              pXEnd = [xNext, y]
              desk.desk[y][xNext].vx = 0
              xNext++;
            }
          }
          if (pXEnd) {
            listP.push({
              p: [[x, y], pXEnd], dir: 2
            })
          }
        }

        if (grid.vy == 1) {
          let yNext = y + 1;
          let pYEnd = [x, y];
          while (true) {
            if (!desk.desk[yNext] || !desk.desk[yNext][x] || !desk.desk[yNext][x].vy) {
              break
            } else {
              pYEnd = [x, yNext]
              desk.desk[yNext][x].vy = 0
              yNext++;
            }
          }
          if (pYEnd) {
            listP.push({
              p: [[x, y], pYEnd], dir: 1
            })
          }
        }
      }
    }

    return listP
  }
}