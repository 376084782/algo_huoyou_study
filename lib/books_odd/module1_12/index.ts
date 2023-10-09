var _ = require('lodash');

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
    } else if (this.getActionAll(desk).length == 0) {
      // 如果堵死了，直接判输
      return 3 - desk.player;
    }
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
  getActionAuto(desk: GameData1_12): any[] {
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
          desk2Oppo.player = playerOppo;
          let [flagSelf, desk2Self] = this.doAction(desk2Oppo, act1Oppo);
          let res2 = this.checkDesk(desk2Self);
          if (res2 == playerOppo) {
            // 如果对方会获胜，得分-100
            act1Self.score -= 100
          }
        }
      }
      let [x1, y1] = act1Self.p1;
      let [x2, y2] = act1Self.p1;
      let color = desk.desk[y1][x1]

      let offX = x2 - x1;
      let offY = y2 - y1;
      // 红色优先往右走
      if (color == 1 && offX == 1) {
        act1Self.score += 10
      }
      // 蓝色优先往上走
      if (color == 2 && offY == -1) {
        act1Self.score += 10
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
}