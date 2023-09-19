var _ = require('lodash');

export class GameData1_1 {
  player: number = 1;
  countInited: number = 10;
  countCurrent: number = 0;
  options: number[] = [1, 2];
  typeSet: number = 1;
}
export class GameAction1_1 {
  count: number = 0;
  score: number = 0
}
export class module1_1 {
  getRiddle() {
    let desk = new GameData1_1();
    return desk;
  }
  getRiddleLev() {
    let list1 = [3, 4, 5, 6, 7, 8];
    let list2 = [9, 10, 11, 12, 13, 14];
    let list3 = [15, 16, 17, 18, 19, 20]
    let countMap: any = { 1: list1, 2: list2, 3: list3 }
    let map: any = {
      1: [], 2: [], 3: []
    }
    for (let lev = 1; lev < 4; lev++) {
      countMap[lev].forEach((c: number) => {
        let desk = new GameData1_1();
        desk.countInited = c;
        desk.options = [1, 2]
        map[lev].push(desk)
      });
    }
    return map;
  }
  checkRiddle(desk: GameData1_1) {
    if (desk.countInited < 6 || desk.countInited > 20) {
      return -1
    }
    if (desk.options.length != 2 && desk.options.length != 3) {
      return -1
    }
    return 0
  }
  checkDesk(desk: GameData1_1) {
    if (desk.countCurrent == desk.countInited) {
      return desk.player
    } else if (desk.countCurrent > desk.countInited) {
      return 3 - desk.player
    }
    return -1
  }
  checkAction(desk: GameData1_1, act: GameAction1_1) {
    if (desk.options.indexOf(act.count) == -1) {
      return false
    }
    return true
  }
  doAction(deskIn: GameData1_1, act: GameAction1_1): [flag: number, desk: GameData1_1] {
    let desk: GameData1_1 = _.cloneDeep(deskIn)
    desk.countCurrent += act.count;
    return [0, desk]
  }
  getActionAuto(desk: GameData1_1): any[] {

    let actionAll = this.getActionAll(desk);
    let listBetter: GameAction1_1[] = []
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let [flagOppo, desk2Oppo] = this.doAction(desk, act1Self);
      let res = this.checkDesk(desk2Oppo);
      // 必胜,直接使用
      if (res == desk.player) {
        return [act1Self, act1Self]
      }
    }

    // 先按照策略筛选
    if (desk.options.length == 2) {
      let [n1, n2] = desk.options
      let r = (desk.countInited - desk.countCurrent) % (n1 + n2);
      let min = Math.min(...desk.options);
      let act1 = new GameAction1_1();
      act1.count = n1;
      let act2 = new GameAction1_1();
      act2.count = n2;
      if (r >= min) {
        if (r - n1 < min && r - n1 >= 0) {
          listBetter.push(act1)
        } else if (r - n2 < min && r - n2 >= 0) {
          listBetter.push(act2)
        }
      }
    } else {
      for (let i = 0; i < actionAll.length; i++) {
        let act1Self = actionAll[i];
        let [flagOppo, desk2Oppo] = this.doAction(desk, act1Self);
        let left = desk2Oppo.countInited - desk2Oppo.countCurrent;
        let mapBetter = [{
          list: [[2, 3, 5], [2, 4, 5]],
          listX: [7],
          listY: [0, 1]
        }, {
          list: [[1, 3, 4]],
          listX: [7],
          listY: [0, 2]
        }, {
          list: [[1, 4, 5]],
          listX: [8],
          listY: [0, 2]
        }, {
          list: [[1, 2, 5], [1, 2, 4]],
          listX: [3],
          listY: [0]
        }, {
          list: [[1, 3, 5]],
          listX: [4],
          listY: [0, 2]
        }, {
          list: [[1, 2, 3]],
          listX: [4],
          listY: [0]
        }, {
          list: [[2, 3, 4]],
          listX: [6],
          listY: [0, 1]
        }, {
          list: [[3, 4, 5]],
          listX: [8],
          listY: [0, 1, 2]
        }]
        // 先根据可选的的数量命中一种情况
        let optBetters = mapBetter.filter(e => {
          let optStr = desk.options.join('_');
          return e.list.filter(e2 => e2.join('_') == optStr).length > 0
        })
        let optBetter = optBetters[0]
        if (optBetter) {
          // 然后去遍历是否满足对应的局面
          optBetter.listX.forEach(x => {
            optBetter.listY.forEach(y => {
              let n = (left - y) / x;
              if (n % 1 === 0 && n >= 0) {
                listBetter.push(act1Self)
              }
            })
          })
        }
      }
    }
    let listNotBetter = actionAll.filter(e => listBetter.filter(e2 => e2.count == e.count).length == 0);
    // 增加一点随机性，避免计算机很呆都是走一样的地方从左往右放

    // console.log(listBetter.map(e => e.count), 'better')
    // console.log(listNotBetter.map(e => e.count), 'listNotBetter')
    let listRes = []
    if (listBetter[0]) {
      listRes.push(listBetter[0])
      if (listNotBetter[0]) {
        listRes.push(listNotBetter[0])
      } else {
        if (listBetter[1]) {
          listRes.push(listBetter[1])
        } else {
          listRes.push(listBetter[0])
        }
      }
      return listRes
    } else {
      if (actionAll.length == 1) {
        return [actionAll[0], actionAll[0]]
      } else {
        return [actionAll[0], actionAll[1]]
      }
    }
  }
  getActionAll(desk: GameData1_1): GameAction1_1[] {
    let listActionAll: GameAction1_1[] = []
    desk.options.forEach(c => {
      let act = new GameAction1_1();
      act.count = c;
      listActionAll.push(act);
    })
    return listActionAll
  }
}