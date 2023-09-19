import { QuesList } from "./quesList";

var _ = require('lodash');

export class GameData1_7 {
  player: number = 1;
  desk: number[][] = [];
  typeSet: number = 1;
}
export class GameAction1_7 {
  listP: number[][] = []
  score: number = 0
}
export class module1_7 {
  getRiddle(count: number) {
    let desk = new GameData1_7();
    let deskList: number[][] = []
    for (let y = 0; y < count; y++) {
      let row: number[] = []
      deskList.push(row)
      for (let x = 0; x < count; x++) {
        row.push(0)
      }
    }
    desk.desk = deskList
    return desk;
  }
  getRiddleLev() {
    let mapQues: any = {
      1: [1, 3],
      2: [4, 6],
      3: [7, 10],
      4: [11, 13],
      5: [14, 16],
      6: [17, 20],
      7: [21, 23],
      8: [24, 28]
    }
    let map: any = []
    for (let lev in mapQues) {
      let listId = mapQues[lev];
      let [min, max] = listId;
      let listQues = QuesList.slice(min - 1, max);
      listQues.forEach(listDesk => {
        let desk = this.getRiddle(3);
        desk.desk = listDesk;
        if (!map[lev]) {
          map[lev] = []
        }
        map[lev].push(desk)
      })
    }
    return map
  }
  checkRiddle(desk: GameData1_7) {
    let countBlank = this.getBlankCount(desk)
    if (countBlank < 1) {
      return -1
    }
    return 0
  }
  getBlankCount(desk: GameData1_7) {
    let count = 0
    let size = desk.desk.length;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let v = desk.desk[y][x]
        if (v == 0) {
          count++
        }
      }
    }
    return count
  }
  checkDesk(desk: GameData1_7) {
    let size = desk.desk.length;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let v = desk.desk[y][x]
        if (v == 0) {
          return -1
        }
      }
    }
    return desk.player
  }

  checkAction(desk: GameData1_7, act: GameAction1_7) {
    if (act.listP.length < 1) {
      // 不能不放
      return -1
    }
    // 不能放已经放过的位置
    for (let i = 0; i < act.listP.length; i++) {
      let p = act.listP[i];
      let [x, y] = p;
      if (desk.desk[y][x] != 0) {
        return -1
      }
    }

    //  如果放的格子数量大于等于2 检查必须都放在同一行或者同一列
    if (act.listP.length >= 2) {
      let pStart = act.listP[0];
      let [xStart, yStart] = pStart;
      let p2 = act.listP[1];
      let [x2, y2] = p2;
      let sameX = x2 == xStart;
      let sameY = y2 == yStart;
      if (!sameX && !sameY) {
        return -1
      }
      for (let i = 2; i < act.listP.length; i++) {
        let p = act.listP[i];
        let [x, y] = p;
        if (sameX) {
          if (x != xStart) {
            return -1
          }
        }
        if (sameY) {
          if (y != yStart) {
            return -1
          }
        }
      }

    }

    return 0
  }
  doAction(deskIn: GameData1_7, act: GameAction1_7): [flag: number, desk: GameData1_7] {
    let desk = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk]
    }
    act.listP.forEach(([x, y]) => {
      desk.desk[y][x] = 1
    })
    return [0, desk]
  }
  getActionAuto(desk: GameData1_7): any[] {
    let actionAll = this.getActionAll(desk);

    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let [flagOppo, desk2Oppo] = this.doAction(desk, act1Self);
      // 放之后对方可行棋子为0，说明必胜,直接使用
      let res = this.checkDesk(desk2Oppo);
      // 必胜,直接使用
      if (res == desk.player) {
        return [act1Self, act1Self]
      }
      let actionAllOppo = this.getActionAll(desk2Oppo);
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
    // 增加一点随机性，避免计算机很呆都是走一样的地方从左往右放
    actionAll = _.shuffle(actionAll)
    actionAll = actionAll.sort((a, b) => b.score - a.score)
    if (actionAll.length >= 2) {
      return [actionAll[0], actionAll[1]]
    } else {
      return [actionAll[0], actionAll[0]]
    }
  }
  getPosBlankAll(desk: GameData1_7) {
    let listP = []
    let size = desk.desk.length;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (desk.desk[y][x] == 0) {
          listP.push([x, y])
        }
      }
    }
    return listP
  }
  getAllActionWay(source: any[], count: number, isPermutation = false) {
    //如果只取一位，返回数组中的所有项，例如 [ [1], [2], [3] ]
    let currentList = source.map((item) => [item]);
    if (count === 1) {
      return currentList;
    }
    let result: any[] = [];
    //取出第一项后，再取出后面count - 1 项的排列组合，并把第一项的所有可能（currentList）和 后面count-1项所有可能交叉组合
    for (let i = 0; i < currentList.length; i++) {
      let current = currentList[i];
      //如果是排列的方式，在取count-1时，源数组中排除当前项
      let children = [];
      if (isPermutation) {
        children = this.getAllActionWay(source.filter(item => item !== current[0]), count - 1, isPermutation);
      }
      //如果是组合的方法，在取count-1时，源数组只使用当前项之后的
      else {
        children = this.getAllActionWay(source.slice(i + 1), count - 1, isPermutation);
      }
      for (let child of children) {
        result.push([...current, ...child]);
      }
    }
    return result;
  }
  getActionAll(desk: GameData1_7): GameAction1_7[] {
    let listActionAll: GameAction1_7[] = []
    // 从横竖size*2个方向各自遍历不同的拿取方式
    let size = desk.desk.length;
    let pAll = this.getPosBlankAll(desk);
    for (let yTarget = 0; yTarget < size; yTarget++) {
      let pAllY = pAll.filter(([x, y]) => y == yTarget);
      // 获取所有的拿取方式
      if (pAllY.length >= 1) {

        for (let count = 1; count <= pAllY.length; count++) {
          let listWays = this.getAllActionWay(pAllY, count);
          listWays.forEach((way) => {
            let act = new GameAction1_7();
            act.listP = way;
            listActionAll.push(act)
          })
        }
      }
    }
    for (let xTarget = 0; xTarget < size; xTarget++) {
      let pAllX = pAll.filter(([x, y]) => x == xTarget);
      // 获取所有的拿取方式
      if (pAllX.length >= 1) {
        for (let count = 1; count <= pAllX.length; count++) {
          let listWays = this.getAllActionWay(pAllX, count);
          listWays.forEach((way) => {
            let act = new GameAction1_7();
            act.listP = way;
            listActionAll.push(act)
          })
        }
      }

    }
    return listActionAll;
  }
}