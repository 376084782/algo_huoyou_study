var _ = require('lodash');

export class GameData4_12 {
  listInited: number[] = []
  list1: number[] = []
  list2: number[] = []
  centerList: number[] = []
  player: number = 1;
  score1: number = 0;
  score2: number = 0;
  typeSet: number = 1;
}
export class GameAction4_12 {
  moveNum: number = 0;
  step: number = 0;//0 选牌比较大小，1选择得分
  score: number = 0;
  countBigger: number = 0
  countBigger2: number = 0
}
export class module4_12 {
  randomList(deskIn: GameData4_12) {
    let listAll = _.shuffle(deskIn.listInited.concat());
    let countEach = Math.floor(listAll.length / 2);
    let desk = new GameData4_12();
    desk.listInited = listAll.concat()
    desk.list1 = listAll.splice(0, countEach)
    desk.list2 = listAll;
    return desk;
  }
  getRiddle(count: number) {
    let listAll = []
    for (let i = 0; i < count; i++) {
      listAll.push(i + 1);
    }
    let desk = new GameData4_12();
    desk.listInited = listAll;
    return this.randomList(desk)
  }
  checkRiddle(desk: GameData4_12) {
    if (desk.list1.length != desk.list2.length) {
      return -1
    }
    if (desk.list1.length < 2 || desk.list1.length > 10) {
      return -1
    }
    for (let i = 0; i < desk.listInited.length; i++) {
      if (desk.listInited[i] == -1) {
        return -1
      }
    }
    return 0
  }
  checkDesk(desk: GameData4_12) {
    if (desk.centerList.length > 0) {
      return -1
    }
    if (desk.list1.length == 0 || desk.list2.length == 0) {
      let score1 = desk.score1;
      let score2 = desk.score2;
      if (score1 == score2) {
        return 3
      }
      return score1 > score2 ? 1 : 2
    }
    return -1
  }
  doAfterSelect(desk: GameData4_12, act: GameAction4_12): [flag: number, desk: GameData4_12] {
    // 一张作为得分加到自己这边
    let score = act.moveNum;
    // 另一张牌给对方
    let cardLeft = desk.centerList.find(e => e != act.moveNum);
    if (cardLeft) {
      if (desk.player == 1) {
        desk.score1 += score;
        desk.list2.push(cardLeft);
      }
      if (desk.player == 2) {
        desk.score2 += score;
        desk.list1.push(cardLeft);
      }
    }
    desk.centerList = []
    return [0, desk]
  }
  doAction(desk: GameData4_12, act: GameAction4_12): [flag: number, desk: GameData4_12] {
    act.step = desk.centerList.length == 2 ? 1 : 0;
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk]
    }
    if (act.step == 1) {
      // 选择得分
      return this.doAfterSelect(desk, act)
    } else {
      // 选牌
      // 从自己的牌里拿掉对应的牌，插入center里
      let listSelf = desk.player == 1 ? desk.list1 : desk.list2;
      let idxSelf = listSelf.indexOf(act.moveNum);
      listSelf.splice(idxSelf, 1);
      desk.centerList.push(act.moveNum);
      return [0, desk]
    }
  }
  checkAction(desk: GameData4_12, act: GameAction4_12) {
    if (act.step == 1) {
      // 选得分
      if (desk.centerList.length != 2) {
        return -1
      }
      if (desk.centerList.indexOf(act.moveNum) == -1) {
        return -1
      }
    } else {
      // 选牌
      if (desk.centerList.length == 2) {
        return -1
      }
      let listTarget = desk.player == 1 ? desk.list1 : desk.list2;
      if (listTarget.indexOf(act.moveNum) == -1) {
        return -1
      }
    }
    return 0
  }
  getListSmallInRule(list: number[], num: number) {

  }
  getAutoAction(deskIn: GameData4_12) {
    let desk: GameData4_12 = _.cloneDeep(deskIn);
    let listSelf = desk.player == 1 ? desk.list1 : desk.list2;
    let listOppo = desk.player == 2 ? desk.list1 : desk.list2;
    if (desk.centerList.length == 2) {
      let best = new GameAction4_12()
      let nobest = new GameAction4_12()
      // 轮到自己拿牌选得分
      best.step = 1;
      nobest.step = 1;
      let max = Math.max(...desk.centerList);
      let min = Math.min(...desk.centerList);

      let countBiggerMax = 0;
      let countBiggerMin = 0;
      // 在两张牌中计算能压过自己的多少牌，如果小牌一张都压不过，那就选大牌给对面自己记小分，否则选大牌积分，小牌给对面
      listSelf.forEach((v2, idx2) => {
        let winSmallMax = v2 < max && max <= v2 * 2;
        let winBigMax = v2 > max && v2 > max * 2
        if (!winSmallMax && !winBigMax) {
          countBiggerMax++
        }

        let winSmallMin = v2 < min && min <= v2 * 2;
        let winBigMin = v2 > min && v2 > min * 2
        if (!winSmallMin && !winBigMin) {
          countBiggerMin++
        }
      })
      console.log(countBiggerMax, countBiggerMin, 'mmmmmm')
      if (countBiggerMax == 0) {
        // 如果大牌一张都压不住，那就选小牌积分
        best.moveNum = min;
        nobest.moveNum = max;
      } else {
        best.moveNum = max;
        nobest.moveNum = min;

      }
      return [best, nobest]
    } else {
      let listActionAll: GameAction4_12[] = [];


      listSelf.forEach((v, idx) => {
        let act = new GameAction4_12()
        act.step = 0;
        act.moveNum = v
        listActionAll.push(act);

        listOppo.forEach((v2, idx2) => {
          let winSmall = v2 < v && v <= v2 * 2;
          let winBig = v2 > v && v2 > v * 2
          if (winSmall || winBig) {
            act.countBigger++
          }
        })
      })



      listActionAll.forEach(e => {

        // 如果自己选第二张牌，优先选择可以得分的
        if (desk.centerList.length == 1) {
          let v = desk.centerList[0]
          let v2 = e.moveNum
          let winSmall = v2 < v && v <= v2 * 2;
          let winBig = v2 > v && v2 > v * 2
          if (winSmall || winBig) {
            e.score += 200
          }
        }

        if (e.countBigger >= listSelf.length * 2 / 3) {
          // 如果这个牌能压的牌超过2/3，得分+10
          e.score += 10;
        }
        if (e.countBigger == listSelf.length) {
          // 如果这个牌能压所有，直接出
          e.score += 100
        }
        // 如果这个牌能压的牌小于1/4，得分+20优先出
        if (e.countBigger <= listSelf.length / 3) {
          e.score += 20;
        }

      })
      listActionAll = listActionAll.sort((a, b) => b.score - a.score)
      if (listActionAll.length > 1) {
        let actBest = listActionAll[0];
        let listNobest = listActionAll.filter(e => e.score <= actBest.score - 20)
        if (listNobest.length >= 1) {
          return [actBest, listNobest[0]]
        } else {
          return [listActionAll[0], listActionAll[1]]
        }
      } else {
        return [listActionAll[0], listActionAll[0]]
      }
    }
  }
}