var _ = require('lodash');

export class GameData7_12 {
  player: number = 1;
  desk: number[] = [];
  typeSet: number = 1;
}
export class GameAction7_12 {
  idxFrom: number = -1;
  idxTo: number = -1
  score: number = 0
}

export class module7_12 {
  getRiddle(count: number) {
    let desk = new GameData7_12();
    let map: any = {
      9: [1, 1, 1, 0, 0, 0, 2, 2, 2],
      11: [1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2],
      13: [1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2],
      15: [1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2],
    }
    desk.desk = map[count];
    return desk;
  }
  checkRiddle(desk: GameData7_12) {
    return 0
  }
  checkDesk(desk: GameData7_12) {
    let count1 = desk.desk.filter(e => e == 1).length;
    if (count1 < 2) {
      return 2
    }
    let count2 = desk.desk.filter(e => e == 2).length;
    if (count2 < 2) {
      return 1
    }
    return -1
  }

  checkAction(desk: GameData7_12, act: GameAction7_12) {
    return 0
  }
  doAction(deskIn: GameData7_12, act: GameAction7_12): [flag: number, desk: GameData7_12] {
    let desk = _.cloneDeep(deskIn)
    return [0, desk]
  }
  getActionAuto(desk: GameData7_12): any[] {
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
  getActionAll(desk: GameData7_12): GameAction7_12[] {
    let listActionAll: GameAction7_12[] = []
    return listActionAll
  }
}