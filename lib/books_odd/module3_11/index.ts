var _ = require('lodash');

export class GameData3_11 {
  player: number = 1;
  countInited: number = 20;
  desk: number[] = [];
  options: number[] = [2, 3];
  typeSet: number = 1;
}
export class GameAction3_11 {
  listIdx: number[] = [];
  score: number = 0
}
export class module3_11 {
  getRiddle() {
    let desk = new GameData3_11();
    return desk;
  }
  getRiddleLev() {
    let countMap: any = {
      1: {
        listCount: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        opt: [2, 3]
      }, 2: {
        listCount: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        opt: [1, 2, 4]
      }, 3: {
        listCount: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        opt: [1, 3, 5]
      }
    }
    let map: any = {
      1: [], 2: [], 3: []
    }
    let listLevMap: any = { 1: [1], 2: [2], 3: [3] }
    for (let lev = 1; lev < 4; lev++) {
      let listLev = listLevMap[lev];
      listLev.forEach((lev2: number) => {
        let conf = countMap[lev2]
        conf.listCount.forEach((c: number) => {
          let desk = new GameData3_11();
          desk.countInited = c;
          desk.options = conf.opt;
          map[lev].push(desk)
        });
      });

    }
    return map;
  }
  checkRiddle(desk: GameData3_11) {
    if (desk.countInited < 10 || desk.countInited > 36) {
      return -1
    }
    if (desk.options.length < 2 || desk.options.length > 4) {
      return -1
    }
    return 0
  }
  checkDesk(desk: GameData3_11) {
    let min = Math.min(...desk.options)
    if (desk.countInited == desk.desk.length) {
      return desk.player
    } else if (desk.countInited - desk.desk.length < min) {
      return desk.player
    }
    return -1
  }
  checkAction(desk: GameData3_11, act: GameAction3_11) {
    if (desk.options.indexOf(act.listIdx.length) == -1) {
      // 获取的颗数错误
      return false
    }
    for (let i = 0; i < act.listIdx.length; i++) {
      let idx = act.listIdx[i];
      if (desk.desk.indexOf(idx) > -1) {
        // 已经获取过
        return false
      }
    }
    return true
  }
  doAction(deskIn: GameData3_11, act: GameAction3_11): [flag: number, desk: GameData3_11] {
    let desk: GameData3_11 = _.cloneDeep(deskIn)
    let f = this.checkAction(desk, act);
    if (!f) {
      return [-1, desk];
    }
    desk.desk = desk.desk.concat(act.listIdx);
    return [0, desk]
  }
  getActionAuto(desk: GameData3_11): any[] {

    let actionAll = this.getActionAll(desk);
    let listBetter: GameAction3_11[] = []
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
      let r = (desk.countInited - desk.desk.length) % (n1 + n2);
      let min = Math.min(...desk.options);
      let act1 = this.getActionByCount(n1, desk);
      let act2 = this.getActionByCount(n2, desk);
      if (r >= min) {
        if (r - n1 < min && r - n1 >= 0) {
          act1 && listBetter.push(act1)
        } else if (r - n2 < min && r - n2 >= 0) {
          act2 && listBetter.push(act2)
        }
      }
    } else {
      for (let i = 0; i < actionAll.length; i++) {
        let act1Self = actionAll[i];
        let [flagOppo, desk2Oppo] = this.doAction(desk, act1Self);
        let left = desk2Oppo.countInited - desk2Oppo.desk.length;
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
    let listNotBetter = actionAll.filter(e => listBetter.indexOf(e) == -1);
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
  getActionAll(desk: GameData3_11): GameAction3_11[] {
    let listActionAll: GameAction3_11[] = []
    desk.options.forEach(c => {
      let act = this.getActionByCount(c, desk);
      if (act) {
        listActionAll.push(act);
      }
    })
    return listActionAll
  }
  getActionByCount(c: number, desk: GameData3_11) {
    let act = new GameAction3_11();
    for (let i = 0; i < desk.countInited; i++) {
      if (desk.desk.find(e => e == i) == undefined) {
        act.listIdx.push(i)
      }
      if (act.listIdx.length == c) {
        return act
      }
    }
    return false
  }
}