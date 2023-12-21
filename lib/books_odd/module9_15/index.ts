var _ = require('lodash');

export class GameData9_15 {
  player: number = 1;
  desk: number[] = [];
  maxCount: number = 8;
  // sortType 0从小到大 1随机顺序 2固定顺序
  sortType = 1;
  typeSet: number = 1;
}
export class GameAction9_15 {
  score: number = 0;
  listChange: number[] = [];
}
export class module9_15 {
  getRiddle(maxCount: number, sortType: number, list: number[]) {
    let desk = new GameData9_15();
    desk.maxCount = maxCount;
    desk.sortType = sortType;
    let listDesk = this.getCardListRandom(maxCount, sortType, list);
    desk.desk = listDesk;
    return desk;
  }
  checkRiddle(desk: GameData9_15) {
    let list = desk.desk;
    let max = desk.maxCount;
    let listTarget = [];
    for (let i = 0; i < max; i++) {
      listTarget.push(i + 1)
    }
    let listSorted = this.getListSorted(list);
    let listTargetSorted = this.getListSorted(listTarget);
    if (listSorted.join(',') != listTargetSorted.join(',')) {

      return -1
    }
    if (list.length > max) {
      return -1
    }
    let flagResult = this.checkIsFinish(list);
    if (flagResult > 0) {
      return -1
    }
    return 0;
  }
  checkDesk(desk: GameData9_15) {
    let f = this.checkIsFinish(desk.desk)
    if (f != 0) {
      return f
    }
    return -1
  }

  doAction(deskIn: GameData9_15, act: GameAction9_15): [flag: number, desk: GameData9_15] {
    let desk = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk];
    }
    let listNew = this.changeCard(desk.desk, act.listChange);
    desk.desk = listNew;
    return [0, desk]
  }
  checkAction(desk: GameData9_15, act: GameAction9_15) {
    if (act.listChange.length != 2) {
      // 牌不够，无法交换
      console.log('牌不够，无法交换')
      return -1
    }
    let flagLeftSmaller = this.checkLeftSmaller(desk.desk, act.listChange);
    if (!flagLeftSmaller) {
      console.log('左边的小')
      return -1
    }
    return 0
  }

  getActionAuto(desk: GameData9_15): any[] {
    let l = this.getBestChange(desk.desk, desk.player, true);
    return l;
  }
  getActionAll(desk: GameData9_15): GameAction9_15[] {
    let listActionAll: GameAction9_15[] = []
    return listActionAll
  }

  checkListSame(list1: number[], list2: number[]) {
    return list1.join(',') == list2.join(',')
  }
  checkIsFinish(listAll: number[]) {
    let list1 = listAll.filter(e => e % 2 == 1);
    let list2 = listAll.filter(e => e % 2 == 0);

    let list1Sorted = this.getListSorted(list1);
    let list2Sorted = this.getListSorted(list2);

    let list1IsSame = this.checkListSame(list1, list1Sorted);
    let list2IsSame = this.checkListSame(list2, list2Sorted);

    if (list1IsSame) {
      return 1
    } else if (list2IsSame) {
      return 2
    } else {
      return 0
    }
  }
  checkLeftSmaller(listAll: number[], listChange: number[]) {
    let num1 = listChange[0];
    let num2 = listChange[1];
    let idx1 = listAll.indexOf(num1);
    let idx2 = listAll.indexOf(num2);
    if (idx1 < idx2) {
      return num1 < num2
    } else {
      return num1 > num2
    }
  }
  // 随机生成一组牌
  // sortType 0从小到大 1随机顺序 2固定顺序
  getCardListRandom(maxCount = 8, sortType = 1, listSort: number[] = []): number[] {
    // 固定顺序
    if (sortType == 2) {
      return listSort
    } else if (sortType == 0) {
      let ll = []
      for (let i = 0; i < maxCount; i++) {
        ll.push(i + 1)
      }
      return ll
    }

    // 先随机出奇数和偶数牌的相对位置
    let listPos = [];
    for (let i = 0; i < maxCount; i++) {
      listPos.push(i % 2)
    }
    // 打乱相对顺序
    listPos = _.shuffle(listPos);

    // 分别得到奇数和偶数的数组
    let listAll: number[] = [];
    for (let i = 0; i < maxCount; i++) {
      listAll.push(1 + i)
    }
    let list1 = listAll.filter(e => e % 2 == 1);
    let list2 = listAll.filter(e => e % 2 == 0)
    if (sortType == 1) {
      // 分别得到奇数和偶数的内部相对顺序
      list1 = this.shuffleListByChangeCount(list1, 2);
      list2 = this.shuffleListByChangeCount(list2, 2);
    } else if (sortType == 0) {
      // 从小到大
      list1 = list1.sort((a, b) => a - b)
      list2 = list2.sort((a, b) => a - b)
    }

    // 按照最开始得到的位置关系顺序插入
    listAll = [];
    for (let i = 0; i < listPos.length; i++) {
      let idx = listPos[i];
      if (idx == 0) {
        // 插入一个偶数
        listAll.push(list2.shift() as number)
      } else {
        // 插入一个奇数
        listAll.push(list1.shift() as number)
      }
    }
    return listAll;
  }

  shuffleListByChangeCount(list: number[], changeCount: number) {
    let listSorted = this.getListSorted(list);
    let changeHisList = []
    for (let i = 0; i < changeCount; i++) {
      // 随机选取两个数字互换,防止重复换
      let num1 = this.getRanomByList(listSorted);
      let listGroupChangedWithNum1: any[] = changeHisList.filter(listC => listC.indexOf(num1) > -1);
      let listRemove = _.flatten(listGroupChangedWithNum1);
      // 必须排除自己和自己换的情况
      listRemove.push(num1);
      let num2 = this.getRanomByList(listSorted.filter(e => listRemove.indexOf(e) == -1));
      listSorted = this.changeCard(listSorted, [num1, num2]);
      changeHisList.push([num1, num2]);
    }
    return listSorted
  }
  changeCard(listAll: number[], listChange: number[]) {
    let l = listAll.concat()
    let num1 = listChange[0];
    let num2 = listChange[1];
    let idx1 = l.indexOf(num1);
    let idx2 = l.indexOf(num2);
    let r = l[idx1];
    l[idx1] = num2;
    l[idx2] = r;
    return l;
  }
  getListSorted(list: number[]) {
    return list.concat().sort((a, b) => b - a)
  }
  getRanomByList(list: number[]) {
    let idx = Math.floor(Math.random() * list.length);
    return list[idx]
  }
  getNotSameCount(list: number[]) {
    let count = 0;
    let listSorted = this.getListSorted(list);
    listSorted.forEach((v, idx) => {
      if (v != list[idx]) {
        count++;
      }
    })
    return count
  }
  getChaosOffset(list1: number[], list2: number[]) {
    let c1 = this.getNotSameCount(list1);
    let c2 = this.getNotSameCount(list2);
    return c2 - c1
  }

  getActionList(list: number[], color: number) {
    let desk1 = list.concat();

    let actionBetterForMe = [];
    let actionBadForOppo = [];
    let actionOppoWillWin = []
    let actionSelfWillWin = []
    let actionAll = [];


    for (let m = 0; m < desk1.length; m++) {
      let value1 = desk1[m];
      for (let n = 0; n < desk1.length; n++) {
        if (n != m) {
          let value2 = desk1[n];
          let leftIsSmaller = n < m && value2 < value1;
          let RightIsSmaller = n > m && value2 > value1;
          if (leftIsSmaller || RightIsSmaller) {
            let desk2 = this.changeCard(desk1, [value1, value2]);
            let finishCode = this.checkIsFinish(desk2);
            let obj = {
              listChange: [value1, value2],
              idxChange: [m, n],
              listDesk: desk2,
              isFinish: finishCode == color
            }
            if (finishCode == color) {
              // 可以使我胜利,直接出牌
              actionSelfWillWin.push(obj)
            } else if (finishCode != 0) {
              // 对方会赢
              actionOppoWillWin.push(obj);
            }

            let colorNum = color == 1 ? 1 : 0
            // 使我的牌混乱度降低
            let c1 = this.getChaosOffset(desk1.filter(e => e % 2 == colorNum), desk2.filter(e => e % 2 == colorNum))
            if (c1 < 0) {
              actionBetterForMe.push(obj)
            }

            // 使对方的牌混乱度升高
            let c2 = this.getChaosOffset(desk1.filter(e => e % 2 == (1 - colorNum)), desk2.filter(e => e % 2 == (1 - colorNum)))
            if (c2 > 0) {
              actionBadForOppo.push(obj)
            }

            actionAll.push(obj)
          }
        }
      }
    }

    return {
      actionSelfWillWin,
      actionBetterForMe,
      actionBadForOppo,
      actionOppoWillWin,
      actionAll
    }
  }
  getBestChange(list: number[], color: number, flagBest = true) {
    let desk1 = list.concat();
    let listChange = [];
    let listBest = [];
    let flagCanWin = false;

    let {
      actionSelfWillWin,
      actionBetterForMe,
      actionBadForOppo,
      actionOppoWillWin,
      actionAll
    } = this.getActionList(desk1, color)


    if (actionSelfWillWin.length > 0) {
      // 能马上胜利的情况下
      flagCanWin = true;
      listBest = actionSelfWillWin;
    } else {
      let actionOppoCantWin = actionAll.filter(e => actionOppoWillWin.indexOf(e) == -1);
      let actionOppoNextWillWin: any[] = [];

      actionAll.forEach(e => {
        let desk2 = this.changeCard(desk1, e.listChange)
        let {
          actionSelfWillWin,
          actionBetterForMe,
          actionBadForOppo,
          actionOppoWillWin,
          actionAll } = this.getActionList(desk2, color);
        if (actionOppoWillWin.length > 0) {
          actionOppoNextWillWin.push(e)
        }
      })
      let actionOppoNextCantWin = actionAll.filter(e => actionOppoNextWillWin.indexOf(e) == -1);

      let actionOppoCantWinInRound2 = actionAll.filter(e => actionOppoNextWillWin.indexOf(e) == -1 && actionOppoWillWin.indexOf(e) == -1)

      if (actionOppoCantWinInRound2.length > 0) {
        // 这一回合和下一回合内对方无法胜利
        let listMe = actionOppoCantWinInRound2.filter(e => actionBetterForMe.indexOf(e) == -1)
        let listOppo = actionOppoCantWinInRound2.filter(e => actionBadForOppo.indexOf(e) == -1)
        if (listMe.length > 0) {
          listBest = listMe
          // 对方这一步和下一步不会赢而且对我有利
        } else if (listOppo.length > 0) {
          listBest = listOppo
          // 对方这一步和下一步不会马上赢而且搞乱对方的牌
        } else {
          // 对方这一步和下一步不会马上赢
          listBest = actionOppoCantWinInRound2
        }
      } else if (actionOppoCantWin.length > 0) {
        // 这一回合对方无法胜利
        let listMe = actionOppoCantWin.filter(e => actionBetterForMe.indexOf(e) == -1)
        let listOppo = actionOppoCantWin.filter(e => actionBadForOppo.indexOf(e) == -1)
        if (listMe.length > 0) {
          listBest = listMe
          // 对方这一步不会赢而且对我有利
        } else if (listOppo.length > 0) {
          listBest = listOppo
          // 对方这一步不会马上赢而且搞乱对方的牌
        } else {
          // 对方这一步不会马上赢
          listBest = actionOppoCantWin
        }
      } else {
        // 所以到这里的时候就说明,你随便走啥,对面肯定是要赢了
        // 必输,无解,理论上不会走到这里
        if (actionBetterForMe.length > 0) {
          listBest = actionBetterForMe
          // 必输了,但是对自己有利
        } else if (actionBadForOppo.length > 0) {
          listBest = actionBadForOppo
          // 必输了,但是搞乱对面
        } else {
          listBest = actionAll
          // 必输了,随便走走
        }
      }


    }
    let listChangeInListBest = listBest.map(e => e.listChange);

    let listNotBest = actionAll.filter(e => {
      let { listChange, idxChange, listDesk, isFinish } = e;
      return !listChangeInListBest.find(e2 => this.checkListSame(e2, listChange))
    });
    let listTarget = []
    if (flagBest) {
      if (listBest.length > 0) {
        listTarget = listBest
      } else {
        listTarget = listNotBest
      }
    } else {
      if (listNotBest.length > 0) {
        listTarget = listNotBest
      } else {
        listTarget = listBest
      }
    }
    let action = listTarget[0];
    let t2 = listNotBest[0];
    if (!t2) {
      t2 = action
    }
    let l2 = [action, t2];
    let acts: GameAction9_15[] = []
    l2.forEach(e => {
      let act = new GameAction9_15()
      act.listChange = e.listChange;
      acts.push(act);
    })


    return acts;
  }
}