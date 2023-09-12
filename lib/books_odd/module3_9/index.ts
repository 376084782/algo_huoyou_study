var _ = require('lodash');

export class GameData3_9 {
  player: number = 1;
  desk: number[] = [];
  list1: number[] = [];
  list2: number[] = [];
  typeSet: number = 1;
}
export class GameAction3_9 {
  idx: number = -1;
  score: number = 0
}
export class module3_9 {
  getRiddle(list: number[]) {
    let desk = new GameData3_9();
    desk.desk = list;
    return desk;
  }
  checkRiddle(desk: GameData3_9) {
    return 0
  }
  checkDesk(desk: GameData3_9) {
    if (this.checkThree(desk, desk.player)) {
      return desk.player
    }
    return -1
  }
  checkThree(desk: GameData3_9, color: number) {
    let list = color == 1 ? desk.list1 : desk.list2
    for (let a = 0; a < list.length; a++) {
      for (let b = a + 1; b < list.length; b++) {
        for (let c = b + 1; c < list.length; c++) {
          let v1 = desk.desk[a];
          let v2 = desk.desk[b];
          let v3 = desk.desk[c];
          if (v1 + v2 + v3 == 15) {
            return true
          }
        }
      }
    }
    return false
  }
  doAction(deskIn: GameData3_9, act: GameAction3_9): [flag: number, desk: GameData3_9] {
    let desk = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk]
    }
    if (desk.player == 1) {
      desk.list1.push(act.idx)
    } else {
      desk.list2.push(act.idx)
    }
    return [0, desk]
  }
  checkAction(desk: GameData3_9, act: GameAction3_9) {
    let listUsed: number[] = []
    listUsed = listUsed.concat(desk.list1, desk.list2);
    if (listUsed.indexOf(act.idx) > -1) {
      return -1
    }
    if (!desk.desk[act.idx]) {
      return -1
    }
    return 0
  }
  getActionAuto(desk: GameData3_9): any[] {
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
  getActionAll(desk: GameData3_9): GameAction3_9[] {
    let listActionAll: GameAction3_9[] = []
    desk.desk.forEach((v, idx) => {
      let act = new GameAction3_9();
      act.idx = idx;
      if (this.checkAction(desk, act) != -1) {
        listActionAll.push(act);
      }
    })
    return listActionAll
  }
}