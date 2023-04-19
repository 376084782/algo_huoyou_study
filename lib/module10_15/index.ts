var _ = require('lodash');

export class GameData10_15 {
  player: number = 1;
  typeSet: number = 1;
  desk: number[] = [];
  lastNumber: number = 0;
  list1Used: number[] = [];
  list2Used: number[] = [];
  min = 1;
  max = 100;
  listNotUsed: number[] = []
}
export class GameAction10_15 {
  number: number = 0;
  score: number = 0;
}
export class module10_15 {
  getRiddle(max = 100) {
    let desk = new GameData10_15();
    desk.max = max;
    desk.desk = [];
    for (let i = 0; i < max; i++) {
      desk.desk.push(i + 1);
    }
    return desk;
  }
  checkRiddle(desk: GameData10_15) {
    if (desk.desk.length < 10 || desk.desk.length > 120) {
      return false
    }
    return true;
  }
  checkAction(deskIn: GameData10_15, act: GameAction10_15) {
    let desk: GameData10_15 = _.cloneDeep(deskIn);
    let listUsedAll = desk.list1Used.concat(desk.list2Used);
    if (listUsedAll.indexOf(act.number) > -1) {
      // 已被使用
      return -1
    }
    if (desk.desk.indexOf(act.number) == -1) {
      // 桌面无该数字
      return -1
    }
    if (desk.lastNumber > 0) {
      // 存在上一个数字，检查当前数字是否是上一个数字的因数或者倍数
      let listValid = this.getvalidNumberList(desk.lastNumber);
      if (listValid.indexOf(act.number) == -1) {
        return -1
      }
    }
    return 0
  }
  doAction(deskIn: GameData10_15, act: GameAction10_15): [f: number, desk: GameData10_15] {
    let desk: GameData10_15 = _.cloneDeep(deskIn);
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk]
    }
    desk.lastNumber = act.number;
    if (desk.player == 1) {
      desk.list1Used.push(act.number)
    } else {
      desk.list2Used.push(act.number)
    }
    return [0, desk];
  }
  getActionAll(deskIn: GameData10_15) {
    let desk: GameData10_15 = _.cloneDeep(deskIn);
    let listAct: GameAction10_15[] = [];
    let listNum: number[] = []
    if (desk.lastNumber <= 0) {
      listNum = _.cloneDeep(desk.desk);
    } else {
      let listValid = this.getvalidNumberList(desk.lastNumber);
      listNum = listValid.filter(e => {
        let listAll = desk.list1Used.concat(desk.list2Used);
        return desk.desk.indexOf(e) > -1 && listAll.indexOf(e) == -1
      })
    }
    listNum.forEach((n: number) => {
      let act = new GameAction10_15()
      act.number = n;
      listAct.push(act);
    })
    return listAct
  }
  getActionAuto(desk: GameData10_15): any[] {
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

    // 增加一点随机性，避免计算机很呆都是走一样的地方
    actionAll = _.shuffle(actionAll)
    actionAll = actionAll.sort((a, b) => b.score - a.score)
    if (actionAll.length >= 2) {
      return [actionAll[0], actionAll[1]]
    } else {
      return [actionAll[0], actionAll[0]]
    }
  }
  // 获取所有的因数或者倍数
  getvalidNumberList(nLast: number) {
    let list = []
    for (var a = 1; a <= 120; a++) {
      let min = Math.min(a, nLast);
      let max = Math.max(a, nLast);
      if (max % min == 0) {
        list.push(a);
      }
    }
    return list
  }
  checkDesk(desk: GameData10_15) {
    let list = this.getActionAll(desk);
    if (list.length == 0) {
      return desk.player
    }
    return -1
  }

}