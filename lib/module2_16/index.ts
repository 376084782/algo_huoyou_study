/**
 * 2-16 数字回收
 * @author 钱丽云
 */

var _ = require('lodash');
export class GameData2_16 {
  player: number = 1;
  desk: number[][] = [];
  typeSet: number = 1;
  score1: number = 0;
  score2: number = 0;
}
export class GameAction2_16 {
  x: number = -1;
  y: number = -1;
  num: number = -1;
  score: number = 0
}
export class module2_16 {
  getRiddleDefault() {
    let desk = new GameData2_16();
    desk.desk = [
      [3, 2, 2, 0, 2, 0],
      [2, 3, 2, 3, 2, 0],
      [0, 1, 3, 1, 2, 2],
      [1, 1, 0, 0, 0, 1],
      [2, 2, 1, 3, 3, 1],
      [3, 2, 1, 1, 2, 2]
    ]
    return desk;
  }
  getRiddle(size: number) {
    let desk = new GameData2_16();
    for (let y = 0; y < size; y++) {
      let l: number[] = []
      desk.desk.push(l)
      for (let x = 0; x < size; x++) {
        l.push(0)
      }
    }
    return desk;
  }
  checkRiddle(desk: GameData2_16) {
    let size = desk.desk.length
    if (size < 4 || size > 6) {
      return false
    }
    // todo: 如果开局就无解，不可用
    return true
  }
  checkSeriesMax(xIn: number, yIn: number, desk: GameData2_16, onlyBlank = true) {
    // 上下左右四个方向四个列表
    let size = desk.desk.length;
    // 上右下左四个列表
    let list1: number[] = [];
    let list2: number[] = [];
    let list3: number[] = [];
    let list4: number[] = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let v = desk.desk[y][x]
        let targetList;
        if (x == xIn) {
          if (y < yIn) {
            targetList = list1
          } else if (y > yIn) {
            targetList = list3
          }
        }
        if (y == yIn) {
          if (x < xIn) {
            targetList = list2
          } else if (x > xIn) {
            targetList = list4
          }
        }
        if (targetList != undefined) {
          if (!onlyBlank || v <= 0) {
            targetList.push(v);
          }
        }
      }
    }
    let listNums = [list1.length, list2.length, list3.length, list4.length];
    return Math.max(...listNums);
  }
  checkAction(deskIn: GameData2_16, act: GameAction2_16) {
    let desk = _.cloneDeep(deskIn);
    if (!desk.desk[act.y] || desk.desk[act.y][act.x] == undefined) {
      return -1
    }
    let v = desk.desk[act.y][act.x];
    if (v <= 0) {
      return -1
    }
    let maxSeries = this.checkSeriesMax(act.x, act.y, desk);
    if (maxSeries < v) {
      return -1
    }
    return 0
  }
  doAction(deskIn: GameData2_16, act: GameAction2_16): [f: number, d: GameData2_16] {
    let desk: GameData2_16 = _.cloneDeep(deskIn);
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk];
    }
    let v = desk.desk[act.y][act.x]
    desk.desk[act.y][act.x] = 0;
    if (desk.player == 1) {
      desk.score1 += v;
    } else {
      desk.score2 += v;
    }
    return [0, desk];
  }
  checkDesk(deskIn: GameData2_16) {
    let listCanDo = this.getActionAll(deskIn);
    if (listCanDo.length == 0) {
      return deskIn.player
    }
    return -1;
  }
  getActionAll(deskIn: GameData2_16) {
    let actionAll: GameAction2_16[] = [];
    deskIn.desk.forEach((row, y) => {
      row.forEach((v, x) => {
        let act = new GameAction2_16();
        act.x = x;
        act.y = y;
        act.num = v;
        if (this.checkAction(deskIn, act) != -1) {
          actionAll.push(act);
        }
      })
    });
    return actionAll
  }

  getActionAuto(desk: GameData2_16): any[] {
    let actionAll = this.getActionAll(desk);
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let [flagOppo, desk2Oppo] = this.doAction(desk, act1Self);
      let actionAllOppo = this.getActionAll(desk2Oppo);
      // 放之后对方可行棋子为0，说明必胜,直接使用
      if (actionAllOppo.length == 0) {
        return [act1Self, act1Self]
      }
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

}