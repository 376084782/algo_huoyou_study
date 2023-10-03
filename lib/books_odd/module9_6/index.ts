import RandomGenerater from "../../util/RandomGenerater";
import { QuesList } from "./QuesList";

var _ = require('lodash');
let randomer = new RandomGenerater(1)

export class GameData9_6 {
  player: number = 1;
  desk: number[][][] = [];
  curQuesIdx = 0;
  score1: number = 0;
  score2: number = 0;
  typeSet: number = 1;
}
export class GameAction9_6 {
  selectedCardIdx: number = -1
  listCalculate: string[] = []
  score: number = 0
}
export class module9_6 {
  listQues = QuesList
  getRiddleLev() {
    let map: any = {};

    let listFen: number[][][] = [];
    this.listQues.forEach(e => {
      let min = Math.min(...e);
      if (!listFen[min]) {
        listFen[min] = []
      }
      listFen[min].push(e)
    })

    for (let i = 0; i < 5; i++) {
      let lev = i + 1;
      let delNum = i + 1
      if (!map[lev]) {
        map[lev] = []
      }
      let list11 = listFen[i + 1]

      if (list11.length < 10) {
        // 如果数量太少，顺序排列
        for (let a = 0; a < list11.length; a++) {
          for (let b = a; b < list11.length; b++) {
            console.log(a, b, i + 1, list11.length, 'aabababab')
            let desk = this.createQues(list11[a], list11[b], delNum, true)
            if (desk) {
              map[lev].push(desk);
            }
          }
        }
      } else {
        while (map[lev].length < 10) {
          // 随机抽取 生成10个题目
          let listShuffle = _.shuffle(list11);
          let desk1 = listShuffle.slice(0, 2);
          let desk = this.createQues(desk1[0], desk1[1], delNum, true)
          if (desk) {
            map[lev].push(desk);
          }
        }
      }


    }
    return map;
  }
  delNum(list: number[], delNum: number) {
    list = _.shuffle(list)
    let idx = list.indexOf(delNum);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    return list
  }
  createQues(list1: number[], list2: number[], delNum: number, skipSame = false) {
    let desk = new GameData9_6();
    // 先删掉对应的数字
    list1 = this.delNum(list1, delNum);
    list2 = this.delNum(list2, delNum);
    if (JSON.stringify(list1) == JSON.stringify(list2)) {
      console.log('skiiiiiiiiip')
      return
    }
    // 然后依次填入
    let ques = [[list1[0], list1[1], list1[2], 0], [list2[0], list2[1], 0, list2[2]]]
    desk.desk = [ques]
    return desk
  }
  getRiddleDefault() {
    let desk = new GameData9_6();
    let ques = [[3, 4, 7, 0], [5, 2, 0, 8]]
    desk.desk = [ques];
    return desk;
  }
  getRiddle(count = 1) {

    let listFen: number[][][] = [];
    this.listQues.forEach(e => {
      let min = Math.min(...e);
      if (!listFen[min]) {
        listFen[min] = []
      }
      listFen[min].push(e)
    })

    let desk = new GameData9_6();
    for (let i = 0; i < count; i++) {
      // 随机选取两组有统一数字的
      // 1-7随机选一个数字
      let num = randomer.RangeInteger(1, 7 + 1)
      let listQ = _.shuffle(listFen[num]);

      let [list1, list2] = listQ.slice(0, 2)
      // 先删掉对应的数字
      list1 = this.delNum(list1, num);
      list2 = this.delNum(list2, num);
      // 然后依次填入
      let ques = [[list1[0], list1[1], list1[2], 0], [list2[0], list2[1], 0, list2[2]]]
      desk.desk.push(ques);
    }
    return desk;
  }
  checkRiddle(desk: GameData9_6) {
    // 检查每张牌[1,20]
    for (let i = 0; i < desk.desk.length; i++) {
      let ques = desk.desk[i]
      for (let m = 0; m < ques.length; m++) {
        let card = ques[m];
        for (let j = 0; j < card.length; j++) {
          let n = +card[j];
          if (j != (m == 0 ? 3 : 2)) {
            if (isNaN(n) || n > 20 || n < 1) {
              return -1
            }
          }
        }
        // 不足四张
        if (card.length != 4) {
          return -1
        }
      }
    }
    return 0
  }
  checkDesk(desk: GameData9_6, timeFinished = false) {
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
  checkCalculate(act: GameAction9_6) {
    // 先检查是否四个数字都用上了
    let listNumUsed = act.listCalculate.map(e => +e).filter(e => e > 0);
    if (listNumUsed.length != 4) {
      console.log('没有用全四个数字')
      return -1
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
  checkAction(desk: GameData9_6, act: GameAction9_6) {
    // 先检查是否四个数字都用上了
    let listNumUsed = act.listCalculate.map(e => +e).filter(e => e > 0);


    let quesCurrent = desk.desk[desk.curQuesIdx];
    if (!quesCurrent) {
      return -1
    }
    if (listNumUsed.length != 4) {
      console.log('没有用全四个数字')
      return -1
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
  doAction(deskIn: GameData9_6, act: GameAction9_6): [flag: number, desk: GameData9_6] {
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
  getActionAuto(desk: GameData9_6): any[] {
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
  getActionAll(desk: GameData9_6): GameAction9_6[] {
    let listActionAll: GameAction9_6[] = []
    return listActionAll
  }
}