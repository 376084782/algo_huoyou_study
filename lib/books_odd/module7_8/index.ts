var _ = require('lodash');

export class GameData7_8 {
  player: number = 1;
  numCurrent: number = 0;
  numTarget: number = 22;
  desk: number[] = [];
  list1: number[] = [];
  list2: number[] = [];
  typeSet: number = 1;
}
export class GameAction7_8 {
  idx: number = -1
  score: number = 0
}
export class module7_8 {
  getRiddle() {
    let desk = new GameData7_8();
    let list = []
    for (let n = 1; n <= 4; n++) {
      for (let c = 0; c < 4; c++) {
        list.push(n);
      }
    }
    desk.desk = list;
    return desk;
  }
  checkRiddle(desk: GameData7_8) {
    // 1-5每种牌不超过5张
    for (let n = 1; n <= 5; n++) {
      let listFilterN = desk.desk.filter(e => e == n);
      if (listFilterN.length > 5) {
        return -1
      }
    }
    // 目标分不超过所有牌的总和
    let numTotal = desk.desk.reduce(function (a, b) {
      return a + b
    })
    if (desk.numTarget > numTotal) {
      return -1
    }
    return 0
  }
  checkDesk(desk: GameData7_8) {
    // 检查目标分是否达到
    if (desk.numCurrent == desk.numTarget) {
      // 先达到的胜利
      return desk.player
    } else if (desk.numCurrent > desk.numTarget) {
      // 超过的输
      return 3 - desk.player
    }
    // 还没有到的继续
    return -1
  }

  checkAction(desk: GameData7_8, act: GameAction7_8) {
    let cardIdxUsed: number[] = []
    cardIdxUsed = cardIdxUsed.concat(desk.list1, desk.list2)
    if (cardIdxUsed.indexOf(act.idx) > -1) {
      // 已经使用过了
      return -1
    }
    if (!desk.desk[act.idx]) {
      // 不存在这个牌
      return -1
    }
    return 0
  }
  doAction(deskIn: GameData7_8, act: GameAction7_8): [flag: number, desk: GameData7_8] {
    let desk = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk]
    }
    let num = desk.desk[act.idx];
    desk.numCurrent += num;
    let list = desk.player == 1 ? desk.list1 : desk.list2;
    list.push(act.idx);
    return [0, desk]
  }

  getActionAuto(desk: GameData7_8): any[] {
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
  getActionAll(desk: GameData7_8): GameAction7_8[] {
    let listActionAll: GameAction7_8[] = [];
    desk.desk.forEach((num, idx) => {
      let act = new GameAction7_8();
      act.idx = idx;
      if (this.checkAction(desk, act) != -1) {
        listActionAll.push(act)
      }
    })
    return listActionAll
  }
}