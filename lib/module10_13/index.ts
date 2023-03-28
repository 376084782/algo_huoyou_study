var _ = require('lodash');

export class GameData10_13 {
  player: number = 1;
  typeSet: number = 1;
  desk: number[] = [];
}
export class GameAction10_13 {
  idxGroup: number = 0;
  count: number = 0;
  score: number = 0;
}
export class module10_13 {
  getRiddleDefault() {
    let desk = new GameData10_13();
    desk.desk = [4, 5, 6, 8]
    return desk;
  }
  checkRiddle(desk: GameData10_13) {
    if (desk.desk.length > 4 || desk.desk.length < 1) {
      return -1
    }
    for (let i = 0; i < desk.desk.length; i++) {
      let c = desk.desk[i];
      if (c > 9) {
        return -1
      }
      if (c < 1) {
        return -1
      }
    }
    return 1;
  }
  isCoprime(a: number, b: number) {
    let x = a
    let y = b
    let tmp = 1

    while (true) {
      tmp = x % y
      if (tmp === 0) {
        break
      }
      x = y
      y = tmp
    }

    return y === 1// 是否最大公约数为1
  }
  checkAction(desk: GameData10_13, act: GameAction10_13) {
    if (act.count < 0) {
      return false
    }
    let cLeft = desk.desk[act.idxGroup];
    if (!cLeft || cLeft < act.count) {
      return false
    }
    // 如果不是互质的
    let f = this.isCoprime(cLeft, act.count)
    if (!f) {
      return false
    }
    return true
  }
  doAction(deskIn: GameData10_13, act: GameAction10_13): { flag: number, desk: GameData10_13 } {
    let desk: GameData10_13 = _.cloneDeep(deskIn)
    if (!this.checkAction(desk, act)) {
      return { flag: -1, desk }
    }
    desk.desk[act.idxGroup] -= act.count;
    return { flag: 0, desk }
  }
  checkDesk(desk: GameData10_13) {
    if (desk.desk.every(e => e == 0)) {
      return desk.player
    }
    return -1
  }

  getActionAll(desk: GameData10_13) {
    let listActAll: GameAction10_13[] = [];
    desk.desk.forEach((c, iGroup) => {
      for (let i = 0; i <= c; i++) {
        if (i > 0) {
          let act = new GameAction10_13();
          act.idxGroup = iGroup;
          act.count = i;
          let f = this.checkAction(desk, act);
          if (f) {
            listActAll.push(act);
          }
        }
      }
    })
    return listActAll;
  }
  getActionAuto(desk: GameData10_13) {
    let actionAll = this.getActionAll(desk);
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let { desk: desk2Oppo } = this.doAction(desk, act1Self);
      let actionAllOppo = this.getActionAll(desk2Oppo);
      // 放之后对方可行棋子为0，说明必胜,直接使用
      if (actionAllOppo.length == 0) {
        return {
          best: act1Self, nobest: act1Self
        }
      }
      if (actionAll.length < 40) {
        // 可放的方式不多，有制胜局的可能性，多考虑一步
        for (let m = 0; m < actionAllOppo.length; m++) {
          let act1Oppo = actionAllOppo[m];
          let { desk: desk2Self } = this.doAction(desk2Oppo, act1Oppo);
          let actionAllSelf2 = this.getActionAll(desk2Self);
          if (actionAllSelf2.length == 0) {
            // 我可能面对的局面，该棋面下我无棋可走，得分-100
            act1Self.score -= 100
          }
        }
      }
    }
    // 增加一点随机性，避免计算机很呆都是一样的走法
    actionAll = _.shuffle(actionAll)
    actionAll = actionAll.sort((a, b) => b.score - a.score)
    if (actionAll.length >= 2) {
      return {
        best: actionAll[0], nobest: actionAll[1]
      }
    } else {
      return {
        best: actionAll[0], nobest: actionAll[0]
      }
    }
  }

}