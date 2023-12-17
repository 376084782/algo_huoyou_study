var _ = require('lodash');

export class GameData9_15 {
  player: number = 1;
  desk: number[] = [];
  maxCount: number = 8;
  sortType = 1;
  typeSet: number = 1;
}
export class GameAction9_15 {
  score: number = 0;
  idxFrom: number = 0;
  idxTo: number = 0;
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
    return 0
  }
  checkDesk(desk: GameData9_15) {
    return -1
  }

  doAction(deskIn: GameData9_15, act: GameAction9_15): [flag: number, desk: GameData9_15] {
    let desk = _.cloneDeep(deskIn)
    let listNew = this.changeCard(desk, [act.idxFrom, act.idxTo]);
    desk.desk = listNew;
    return [0, desk]
  }
  checkAction(desk: GameData9_15, act: GameAction9_15) {
    return 0
  }
  getActionAuto(desk: GameData9_15): any[] {
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
  getActionAll(desk: GameData9_15): GameAction9_15[] {
    let listActionAll: GameAction9_15[] = []
    return listActionAll
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
}