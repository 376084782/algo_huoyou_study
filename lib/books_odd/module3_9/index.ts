var _ = require('lodash');

export class GameData3_9 {
  player: number = 1;
  desk: number[] = [];
  list1: number[] = [];
  list2: number[] = [];
  targetNum: number = 15;
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
    let max = Math.max(...list);
    let map: any = {
      9: 15,
      10: 18,
      11: 21,
      12: 24
    }
    desk.targetNum = map[max] || 15;
    return desk;
  }
  checkRiddle(desk: GameData3_9) {
    return 0
  }
  checkDesk(desk: GameData3_9) {
    if (this.checkThree(desk, desk.player)) {
      return desk.player
    }
    if (this.checkThree(desk, 3 - desk.player)) {
      return 3 - desk.player
    }
    // 如果没有牌了
    if (desk.desk.length == desk.list1.length + desk.list2.length) {
      return 3
    }
    return -1
  }
  checkThree(desk: GameData3_9, color: number) {
    let list = color == 1 ? desk.list1 : desk.list2
    for (let a = 0; a < list.length; a++) {
      for (let b = a + 1; b < list.length; b++) {
        for (let c = b + 1; c < list.length; c++) {
          var i1 = list[a];
          var i2 = list[b];
          var i3 = list[c];

          let v1 = desk.desk[i1];
          let v2 = desk.desk[i2];
          let v3 = desk.desk[i3];
          let total = v1 + v2 + v3
          if (total == desk.targetNum) {
            return [i1, i2, i3]
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