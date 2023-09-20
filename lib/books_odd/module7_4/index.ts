import RandomGenerater from "../../util/RandomGenerater";

var _ = require('lodash');
let randomer = new RandomGenerater(1)

export class GameData7_4 {
  player: number = 1;
  desk: number[][] = [];
  curQuesIdx = 0;
  score1: number = 0;
  score2: number = 0;
  typeSet: number = 1;
}
export class GameAction7_4 {
  listCalculate: string[] = []
  score: number = 0
}
export class module7_4 {
  listQues = [
    [1, 1, 1, 8],
    [1, 1, 2, 6],
    [1, 1, 2, 7],
    [1, 1, 2, 8],
    [1, 1, 2, 9],
    [1, 1, 3, 4],
    [1, 1, 3, 5],
    [1, 1, 3, 6],
    [1, 1, 3, 7],
    [1, 1, 3, 8],
    [1, 1, 3, 9],
    [1, 1, 4, 4],
    [1, 1, 4, 5],
    [1, 1, 4, 6],
    [1, 1, 4, 7],
    [1, 1, 4, 8],
    [1, 1, 4, 9],
    [1, 1, 5, 5],
    [1, 1, 5, 6],
    [1, 1, 5, 7],
    [1, 1, 5, 8],
    [1, 1, 6, 6],
    [1, 1, 6, 8],
    [1, 1, 6, 9],
    [1, 1, 8, 8],
    [1, 2, 2, 4],
    [1, 2, 2, 5],
    [1, 2, 2, 6],
    [1, 2, 2, 7],
    [1, 2, 2, 8],
    [1, 2, 2, 9],
    [1, 2, 3, 3],
    [1, 2, 3, 4],
    [1, 2, 3, 5],
    [1, 2, 3, 6],
    [1, 2, 3, 7],
    [1, 2, 3, 8],
    [1, 2, 3, 9],
    [1, 2, 4, 4],
    [1, 2, 4, 5],
    [1, 2, 4, 6],
    [1, 2, 4, 7],
    [1, 2, 4, 8],
    [1, 2, 4, 9],
    [1, 2, 5, 5],
    [1, 2, 5, 6],
    [1, 2, 5, 7],
    [1, 2, 5, 8],
    [1, 2, 5, 9],
    [1, 2, 6, 6],
    [1, 2, 6, 7],
    [1, 2, 6, 8],
    [1, 2, 6, 9],
    [1, 2, 7, 7],
    [1, 2, 7, 8],
    [1, 2, 7, 9],
    [1, 2, 8, 8],
    [1, 2, 8, 9],
    [1, 3, 3, 3],
    [1, 3, 3, 4],
    [1, 3, 3, 5],
    [1, 3, 3, 6],
    [1, 3, 3, 7],
    [1, 3, 3, 8],
    [1, 3, 3, 9],
    [1, 3, 4, 4],
    [1, 3, 4, 5],
    [1, 3, 4, 6],
    [1, 3, 4, 7],
    [1, 3, 4, 8],
    [1, 3, 4, 9],
    [1, 3, 5, 6],
    [1, 3, 5, 7],
    [1, 3, 5, 8],
    [1, 3, 5, 9],
    [1, 3, 6, 6],
    [1, 3, 6, 7],
    [1, 3, 6, 8],
    [1, 3, 6, 9],
    [1, 3, 7, 7],
    [1, 3, 7, 8],
    [1, 3, 7, 9],
    [1, 3, 8, 8],
    [1, 3, 8, 9],
    [1, 3, 9, 9],
    [1, 4, 4, 4],
    [1, 4, 4, 5],
    [1, 4, 4, 6],
    [1, 4, 4, 7],
    [1, 4, 4, 8],
    [1, 4, 4, 9],
    [1, 4, 5, 5],
    [1, 4, 5, 6],
    [1, 4, 5, 7],
    [1, 4, 5, 8],
    [1, 4, 5, 9],
    [1, 4, 6, 6],
    [1, 4, 6, 7],
    [1, 4, 6, 8],
    [1, 4, 6, 9],
  ]
  getRiddleLev() {
    let listQues = this.listQues
    let map: any = {};
    for (let i = 0; i < 10; i++) {
      let lev = i + 1;
      if (!map[lev]) {
        map[lev] = []
      }
      let list = listQues.slice(i * 10, (i + 1) * 10);
      list.forEach(ques => {
        let desk = this.getRiddle(ques)
        map[lev].push(desk)
      })
    }
    return map;
  }
  getRiddle(list: number[], count = 1) {
    let desk = new GameData7_4();
    if (list.length > 0) {
      desk.desk = [list];
    } else {
      let listQues = _.shuffle(_.cloneDeep(this.listQues))
      desk.desk = listQues.slice(0, count);
    }
    return desk;
  }
  checkRiddle(desk: GameData7_4) {
    // 检查每张牌[1,20]
    for (let i = 0; i < desk.desk.length; i++) {
      let ques = desk.desk[i]
      for (let m = 0; m < ques.length; m++) {
        let n = +ques[i];
        if (isNaN(n) || n > 20 || n < 1) {
          return -1
        }
      }
      // 不足四张
      if (ques.length != 4) {
        return -1
      }
    }
    return 0
  }
  checkDesk(desk: GameData7_4, timeFinished = false) {
    let { score1, score2 } = desk;
    if (timeFinished || desk.curQuesIdx >= desk.desk.length) {
      if (score1 == score2) {
        return 3
      } else {
        return score1 > score2 ? 1 : 2
      }
    }
    return -1
  }

  split(str: string) {
    let separator = /\+|-|\*|\/| |,|，|(|)/;
    return str.split(separator)
  }
  checkAction(desk: GameData7_4, act: GameAction7_4) {
    // 先检查是否四个数字都用上了
    let listNumUsed = act.listCalculate.map(e => +e).filter(e => e > 0);
    let quesCurrent = desk.desk[desk.curQuesIdx];
    if (!quesCurrent) {
      return -1
    }
    for (let i = 0; i < quesCurrent.length; i++) {
      let n = quesCurrent[i]
      let idx = listNumUsed.indexOf(n)
      if (idx == -1) {
        return -1
      } else {
        listNumUsed.splice(idx, 1)
      }
    }
    // 检查去掉括号之后每个数字之间都有且只有一个符号，避免把数字直接相连或者加号当作正号的非法情况
    let listOnlyNumAndFH = act.listCalculate.filter(e => e != '(' && e != ')');
    // 即去掉括号之后所有的奇数位必须是数字，偶数位必须是符号
    for (let i = 0; i < listOnlyNumAndFH.length; i++) {
      let v = listOnlyNumAndFH[i];
      let isNum = !isNaN(+v);
      if (i % 2 == 0 != isNum) {
        return -1
      }
    }

    // 然后检查算式是否合法
    try {
      // 最后检查结果是否等于24
      let res = eval(act.listCalculate.join(''))
    } catch (e) {
      return -1
    }
    return 0
  }
  doAction(deskIn: GameData7_4, act: GameAction7_4): [flag: number, desk: GameData7_4] {
    let desk = _.cloneDeep(deskIn);
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk];
    }

    let res = eval(act.listCalculate.join(''))
    let score = res != 24 ? -1 : 1;
    if (desk.player == 1) {
      desk.score1 += score
    } else {
      desk.score2 += score
    }
    desk.curQuesIdx++;
    return [0, desk]
  }
  getActionAuto(desk: GameData7_4): any[] {
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
  getActionAll(desk: GameData7_4): GameAction7_4[] {
    let listActionAll: GameAction7_4[] = []
    return listActionAll
  }
}