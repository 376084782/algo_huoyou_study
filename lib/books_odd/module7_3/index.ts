var _ = require('lodash');

export class GameData7_3 {
  player: number = 1;
  desk: number[] = [20];
  finishedDui: number[] = [];
  typeSet: number = 1;
}
export class GameAction7_3 {
  idDui = -1;
  count = -1;
  score: number = 0
}
export class module7_3 {
  getRiddle() {
    let desk = new GameData7_3();
    return desk;
  }
  getRiddleLev() {
    let countMap: any = {
      1: [
        [4],
        [5],
        [6],
        [7],
        [3, 5],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 7],
      ],
      2: [
        [8],
        [9],
        [10],
        [4, 7],
        [4, 8],
        [4, 9],
        [4, 10],
        [5, 5],
        [5, 7],
        [5, 8],
        [5, 9],
        [5, 10],
      ],
      3: [
        [11],
        [12],
        [13],
        [6, 8],
        [6, 9],
        [6, 10],
        [6, 11],
        [6, 12],
        [6, 13],
        [7, 9],
        [7, 10],
        [7, 11],
        [7, 12],
        [7, 13],
        [8, 10],
        [8, 11],
        [8, 12],
        [8, 13],
        [9, 11],
        [9, 12],
        [9, 13],
        [10, 13],
      ],
      4: [
        [14],
        [15],
        [16],
        [17],
        [18],
        [19],
        [20],
        [3, 3, 8],
        [3, 3, 9],
        [3, 4, 5],
        [3, 4, 8],
        [3, 5, 9],
        [3, 6, 10],
        [4, 4, 7],
        [4, 5, 8],
        [4, 5, 10],
        [4, 6, 11],
      ]
    }

    let map: any = {
      1: [], 2: [], 3: [], 4: []
    }
    let listLevMap: any = { 1: [1], 2: [2], 3: [3, 4] }
    for (let lev = 1; lev < 4; lev++) {
      let listLev = listLevMap[lev];
      listLev.forEach((lev2: number) => {
        let conf = countMap[lev2]
        conf.forEach((c: number[]) => {
          let desk = new GameData7_3();
          desk.desk = c;
          map[lev].push(desk)
        });
      });

    }
    return map;

  }
  checkRiddle(desk: GameData7_3) {
    let sum = 0
    for (let i = 0; i < desk.desk.length; i++) {
      let n = desk.desk[i];
      if (n < 2) {
        return -1
      }
      sum += n;
    }
    if (sum > 30) {
      return -1
    }
    return 0
  }
  checkDesk(desk: GameData7_3) {
    let allSmall = desk.desk.every(e => e < 2);
    if (allSmall) {
      return desk.player
    }
    return -1
  }

  checkAction(desk: GameData7_3, act: GameAction7_3) {
    let targetNum = desk.desk[act.idDui];
    if (targetNum < 2) {
      return -1
    }
    if (act.count >= targetNum) {
      return -1
    }
    let left = targetNum - act.count;
    if (left == act.count) {
      return -1
    }
    return 0
  }
  doAction(deskIn: GameData7_3, act: GameAction7_3): [flag: number, desk: GameData7_3] {
    let desk: GameData7_3 = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk]
    }
    let targetNum = desk.desk[act.idDui];
    let left = targetNum - act.count;
    desk.desk[act.idDui] = act.count;
    desk.desk.push(left);
    this.updateDesk(desk);
    return [0, desk]
  }
  updateDesk(desk: GameData7_3) {
    let listDesk: number[] = [];
    let listNoUse: number[] = _.cloneDeep(desk.finishedDui);
    desk.desk.forEach(v => {
      if (v <= 2) {
        listNoUse.push(v)
      } else {
        listDesk.push(v);
      }
    })
    desk.desk = listDesk;
    desk.finishedDui = listNoUse
  }
  getActionAuto(desk: GameData7_3): any[] {
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
  getActionAll(desk: GameData7_3): GameAction7_3[] {
    let listActionAll: GameAction7_3[] = [];
    desk.desk.forEach((dui, idDui) => {
      for (let i = 1; i < dui; i++) {
        let act = new GameAction7_3();
        act.idDui = idDui;
        act.count = i;
        if (this.checkAction(desk, act) != -1) {
          listActionAll.push(act);
        }
      }
    })
    return listActionAll
  }
}