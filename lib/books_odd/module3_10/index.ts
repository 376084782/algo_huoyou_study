var _ = require('lodash');

export class GameData3_10 {
  player: number = 1;
  desk1: number = 5;
  desk2: number = 7;
  desk1Got: number = 0;
  desk2Got: number = 0;
  typeSet: number = 1;
}
export class GameAction3_10 {
  count1: number = 0;
  count2: number = 0;
  score: number = 0
}
export class module3_10 {
  getRiddle(count: number) {
    let desk = new GameData3_10();
    return desk;
  }
  checkRiddle(desk: GameData3_10) {
    if (desk.desk1 > 30 || desk.desk1 < 1) {
      return -1
    }
    if (desk.desk2 > 30 || desk.desk2 < 1) {
      return -1
    }
    return 0
  }
  checkDesk(desk: GameData3_10) {
    if (desk.desk1 == desk.desk1Got && desk.desk2 == desk.desk2Got) {
      return desk.player
    }
    return -1
  }

  checkAction(desk: GameData3_10, act: GameAction3_10) {
    if (act.count1 > 0 && act.count2 > 0) {
      // 如果两堆都拿，必须相等
      return act.count1 == act.count2 ? 0 : -1
    } else if (act.count1 == 0 && act.count2 == 0) {
      return -1
    } else if (act.count1 > desk.desk1 - desk.desk1Got) {
      return -1
    } else if (act.count2 > desk.desk2 - desk.desk2Got) {
      return -1
    }
    return 0
  }
  doAction(deskIn: GameData3_10, act: GameAction3_10): [flag: number, desk: GameData3_10] {
    let desk: GameData3_10 = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk];
    }
    desk.desk1Got += act.count1;
    desk.desk2Got += act.count2;
    return [0, desk]
  }
  getActionAuto(desk: GameData3_10): any[] {
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
  getActionAll(desk: GameData3_10): GameAction3_10[] {
    let listActionAll: GameAction3_10[] = []
    // 只取1堆
    let count1Left = desk.desk1 - desk.desk1Got
    let count2Left = desk.desk2 - desk.desk2Got
    for (let i = 1; i <= count1Left; i++) {
      let act = new GameAction3_10()
      act.count1 = i;
      listActionAll.push(act);
    }
    for (let i = 1; i <= count2Left; i++) {
      let act = new GameAction3_10()
      act.count2 = i;
      listActionAll.push(act);
    }
    // 同时取
    let min = Math.min(count1Left, count2Left)
    for (let i = 1; i <= min; i++) {
      let act = new GameAction3_10()
      act.count1 = i;
      act.count2 = i;
      listActionAll.push(act);
    }
    return listActionAll
  }
}