var _ = require('lodash');

export class GameData3_12 {
  player: number = 1;
  desk: number[][] = [[1], [1, 2, 3, 4], [1], [1, 2], [1, 2], [1, 2, 3, 4, 1]];
  typeSet: number = 1;
  score1: number = 0;
  score2: number = 0;
}
export class GameAction3_12 {
  p1: number = -1;
  p2: number = -1;
  score: number = 0
}
export class module3_12 {
  getRiddle() {
    let desk = new GameData3_12();
    return desk;
  }
  checkRiddle(desk: GameData3_12) {
    // 3~12个
    if (desk.desk.length < 3 || desk.desk.length > 12) {
      return -1
    }
    // 大小介于1~10之间的整数
    if (desk.desk.some(e => e.length < 1 || e.length > 10)) {
      return -1
    }
    return 0
  }
  checkDesk(desk: GameData3_12) {
    if (desk.desk.length == 1) {
      // 合并为1堆即获胜
      if (desk.score1 == desk.score2) {
        return 3
      } else {
        return desk.score1 > desk.score2 ? 1 : 2
      }
    }
    return -1
  }

  checkAction(desk: GameData3_12, act: GameAction3_12) {
    if (!desk.desk[act.p1]) {
      return -1
    }
    if (!desk.desk[act.p2]) {
      return -1
    }
    return 0
  }
  doAction(deskIn: GameData3_12, act: GameAction3_12): [flag: number, desk: GameData3_12] {
    let desk: GameData3_12 = _.cloneDeep(deskIn)
    // 将1合并到2
    desk.desk[act.p2] = desk.desk[act.p2].concat(desk.desk[act.p1]);
    // 删除原来的1
    let scoreAdd = desk.desk[act.p2].length;
    desk.desk.splice(act.p1, 1)
    if (desk.player == 1) {
      desk.score1 += scoreAdd
    } else {
      desk.score2 += scoreAdd
    }
    return [0, desk]
  }
  getActionAuto(desk: GameData3_12): any[] {
    let actionAll = this.getActionAll(desk);

    let playerSelf = desk.player as 1 | 2;
    let playerOppo = 3 - desk.player;
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let scoreWillAdd = desk.desk[act1Self.p1].length + desk.desk[act1Self.p2].length;
      act1Self.score += scoreWillAdd;

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
    for (let i = 0; i < desk.desk.length; i++) {
      let act = new GameAction3_12()
      act.p1 = i;
      act.p2 = i + 1;
      if (this.checkAction(desk, act) != -1) {
        listActionAll.push(act);
      }
    }
    return listActionAll
  }
}