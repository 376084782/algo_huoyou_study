import RandomGenerater from "../../util/RandomGenerater";

var _ = require('lodash');

let randomer = new RandomGenerater(0)
export class GameData5_3 {
  player: number = 1;
  desk: number[][] = [];
  typeSet: number = 1;
}
export class GameAction5_3 {
  p1: number[] = [];
  p2: number[] = []
  score: number = 0;
}
export class module5_3 {
  getRiddle(size: number, defaultPosList?: number[][]) {
    let desk = new GameData5_3();
    desk.desk = [];
    for (let y = 0; y < size; y++) {
      let row: number[] = [];
      desk.desk.push(row)
      for (let x = 0; x < size; x++) {
        row.push(0);
      }
    }
    if (!defaultPosList) {
      // 默认四个圆片放到左上角
      for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 2; x++) {
          desk.desk[y][x] = 1
        }
      }
    } else {
      defaultPosList.forEach(([x, y]) => {
        desk.desk[y][x] = 1
      })
    }
    return desk;
  }
  getStepBack(desk: GameData5_3): GameAction5_3[] {
    let listAction: GameAction5_3[] = []
    let listP: number[][] = [];
    desk.desk.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v != 0) {
          listP.push([x, y])
        }
      })
    })
    listP.forEach(([x, y], i) => {
      let vLeft = this.getGridValue(x - 1, y, desk);
      let vTop = this.getGridValue(x, y + 1, desk);

      // 向左跳
      let jumpX = vLeft == 1 ? x - 2 : x - 1
      let vLeft2 = this.getGridValue(jumpX, y, desk);
      if (vLeft2 == 0) {
        let act = new GameAction5_3();
        act.p1 = [x, y];
        act.p2 = [jumpX, y]
        listAction.push(act);
      }

      // 向上跳
      let jumpY = vTop == 1 ? y + 2 : y + 1
      let vTop2 = this.getGridValue(x, jumpY, desk);
      if (vTop2 == 0) {
        let act = new GameAction5_3();
        act.p1 = [x, y];
        act.p2 = [x, jumpY]
        listAction.push(act);
      }
    })

    return listAction
  }
  getGridValue(x: number, y: number, desk: GameData5_3) {
    if (desk.desk[y]) {
      return desk.desk[y][x]
    }
    return -1
  }
  getRiddleLev(stepMin = 8) {
    let maxX = 8;
    // 把四个圆片放在终点
    let desk = this.getRiddle(8, [[maxX - 2, 0], [maxX - 1, 0], [maxX - 2, 1], [maxX - 1, 1]]);
    for (let step = 0; step < stepMin; step++) {
      let actList = this.getStepBack(desk);
      let idx = randomer.RangeInteger(0, actList.length)
      let act = actList[idx];
      let [f, deskNew] = this.doAction(desk, act);
      desk = deskNew
    }
    return desk
  }
  getRiddleDefault() {
    let desk = this.getRiddle(8, [[3, 4], [4, 4], [3, 3], [4, 2]]);
    return desk
  }
  checkRiddle(desk: GameData5_3) {
    return 0
  }
  checkDesk(desk: GameData5_3) {
    let maxX = desk.desk[0].length;
    let maxY = desk.desk.length;
    let finalPos = [[maxX - 2, 0], [maxX - 1, 0], [maxX - 2, 1], [maxX - 1, 1]];
    // 如果目标点的每一个格子都有棋子，说明胜利
    if (finalPos.every(([x, y]) => desk.desk[y][x] == 1)) {
      return desk.player
    }
    return -1
  }

  checkAction(desk: GameData5_3, act: GameAction5_3): boolean {
    let [x1, y1] = act.p1;
    let [x2, y2] = act.p2;
    if (x1 == x2) {
      // 纵向
      let off = Math.abs(y1 - y2);
      let min = Math.min(y1, y2);
      if (off == 1) {
        return true
      } else if (off == 2 && desk.desk[min + 1][x1] == 1) {
        return true
      }
    } else if (y1 == y2) {
      // 横向
      let off = Math.abs(x1 - x2);
      let min = Math.min(x1, x2);
      if (off == 1) {
        return true
      } else if (off == 2 && desk.desk[y1][min + 1] == 1) {
        return true
      }
    }
    return false
  }
  doAction(deskIn: GameData5_3, act: GameAction5_3): [flag: number, desk: GameData5_3] {
    let desk: GameData5_3 = _.cloneDeep(deskIn)
    if (!this.checkAction(desk, act)) {
      return [-1, desk]
    }
    let [x1, y1] = act.p1;
    let [x2, y2] = act.p2;
    desk.desk[y1][x1] = 0;
    desk.desk[y2][x2] = 1;
    return [0, desk]
  }
  getActionAuto(desk: GameData5_3): any[] {
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
  getActionAll(desk: GameData5_3): GameAction5_3[] {
    let listActionAll: GameAction5_3[] = []
    return listActionAll
  }
}