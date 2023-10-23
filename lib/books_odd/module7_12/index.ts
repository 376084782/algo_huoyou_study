var _ = require('lodash');

export class GameData7_12 {
  player: number = 1;
  desk: number[] = [];
  typeSet: number = 1;
}
export class GameAction7_12 {
  idxFrom: number = -1;
  idxTo: number = -1
  score: number = 0
}

export class module7_12 {
  getRiddle(count: number) {
    let desk = new GameData7_12();
    let map: any = {
      9: [1, 1, 1, 0, 0, 0, 2, 2, 2],
      11: [1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2],
      13: [1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2],
      15: [1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2],
    }
    desk.desk = map[count];
    return desk;
  }
  checkRiddle(desk: GameData7_12) {
    return 0
  }
  checkDesk(desk: GameData7_12) {
    let count1 = desk.desk.filter(e => e == 1).length;
    if (count1 < 2) {
      return 2
    }
    let count2 = desk.desk.filter(e => e == 2).length;
    if (count2 < 2) {
      return 1
    }
    return -1
  }

  checkAction(desk: GameData7_12, act: GameAction7_12) {
    if (desk.desk[act.idxTo] != 0) {
      return -1
    }
    if (desk.desk[act.idxFrom] != desk.player) {
      return -1
    }
    return 0
  }
  doAction(deskIn: GameData7_12, act: GameAction7_12): [flag: number, desk: GameData7_12] {
    let desk = _.cloneDeep(deskIn) as GameData7_12;
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk];
    }
    desk.desk[act.idxFrom] = 0;
    desk.desk[act.idxTo] = desk.player;
    // 筛选自己的棋子，把被自己的棋子夹住的棋子都吃掉
    let listIdxWillClear: number[] = [];
    // 用来保存一组待定是否需要清楚的序号
    let listGroup: number[] = []
    let flagSaveStart = false;
    let colorOppo = 3 - desk.player;
    let colorSelf = desk.player;
    desk.desk.forEach((v, idx) => {
      if (flagSaveStart) {
        if (v == colorSelf) {
          listGroup.push(idx);
        } else if (v == colorOppo) {
          // 提交清除
          listIdxWillClear = listIdxWillClear.concat(listGroup);
          listGroup = []
        } else {
          listGroup = []
        }
      } else {
        if (v == colorOppo) {
          flagSaveStart = true
        }
      }
    })

    // 执行吃子操作
    listIdxWillClear.forEach((idx) => {
      desk.desk[idx] = 0
    })
    return [0, desk]
  }
  getActionAuto(desk: GameData7_12): any[] {
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
  getActionAll(desk: GameData7_12): GameAction7_12[] {
    let listActionAll: GameAction7_12[] = [];
    let listBlank: number[] = [];
    desk.desk.forEach((v, idx) => {
      if (v == 0) {
        listBlank.push(idx);
      }
    })
    desk.desk.forEach((v, idx) => {
      if (v == desk.player) {
        listBlank.forEach(idxTo => {
          let act = new GameAction7_12();
          act.idxFrom = idx
          act.idxTo = idxTo;
          if (this.checkAction(desk, act) != -1) {
            listActionAll.push(act);
          }
        });
      }
    });

    return listActionAll
  }
}