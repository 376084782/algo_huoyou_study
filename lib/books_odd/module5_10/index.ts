var _ = require('lodash');

export class GameDataGrid5_10 {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0
}
export class GameData5_10 {
  player: number = 1;
  desk: GameDataGrid5_10[][] = [];
  typeSet: number = 1;
}
export class GameAction5_10 {
  score: number = 0;
  listPos: number[][] = []
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
    for (let y = 0; y < desk.desk.length; y++) {
      let listRow = desk.desk[y]
      for (let x = 0; x < listRow.length; x++) {
        let data = listRow[x];
        if (x != listRow.length - 1 && data.vx == 0) {
          return -1
        }
        if (y != desk.desk.length - 1 && data.vy == 0) {
          return -1
        }
      }
    }
    return desk.player
  }

  checkAction(desk: GameData5_10, act: GameAction5_10) {
    try {
      if (act.listPos.length == 0) {
        return -1
      }
      let [x, y] = act.listPos[0];
      let dataBlock = desk.desk[y][x];
      if (!dataBlock) {
        return -1
      }
      

    } catch (e) {
      return -1
    }
  }
  doAction(deskIn: GameData5_10, act: GameAction5_10): [flag: number, desk: GameData5_10] {
    let desk = _.cloneDeep(deskIn)
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
    return listActionAll
  }
}