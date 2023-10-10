var _ = require('lodash');

export class GameData3_12 {
  player: number = 1;
  desk: number[][] = [[1], [1, 2, 3, 4], [1], [1, 2], [1, 2], [1, 2, 3, 4, 1]];
  typeSet: number = 1;
}
export class GameAction3_12 {
  p1: number = -1;
  p2: number = -1;
  score: number = 0
}
export class module3_12 {
  getRiddle(count: number) {
    let desk = new GameData3_12();
    return desk;
  }
  checkRiddle(desk: GameData3_12) {
    return 0
  }
  checkDesk(desk: GameData3_12) {
    return -1
  }

  doAction(deskIn: GameData3_12, act: GameAction3_12): [flag: number, desk: GameData3_12] {
    let desk = _.cloneDeep(deskIn)
    return [0, desk]
  }
  checkAction(desk: GameData3_12, act: GameAction3_12) {
    return 0
  }
  getActionAuto(desk: GameData3_12): any[] {
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
  getActionAll(desk: GameData3_12): GameAction3_12[] {
    let listActionAll: GameAction3_12[] = []
    return listActionAll
  }
}