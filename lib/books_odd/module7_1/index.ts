var _ = require('lodash');

export class GameData7_1 {
  player: number = 1;
  typeSet: number = 1;
  desk: number[][] = [[1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1, 1]];
  eachMax: number = 3
}
export class GameAction7_1 {
  listIdx: number[][] = []
  score: number = 0
}
export class module7_1 {
  getRiddle() {
    let desk = new GameData7_1();
    return desk;
  }
  getRiddleLev() {
    let map = { 1: [], 2: [], 3: [] }
    return map;
  }
  checkRiddle(desk: GameData7_1) {
    return 0
  }
  checkDesk(desk: GameData7_1) {
    return -1
  }

  doAction(deskIn: GameData7_1, act: GameAction7_1): [flag: number, desk: GameData7_1] {
    let desk = _.cloneDeep(deskIn)
    return [0, desk]
  }
  checkAction(desk: GameData7_1, act: GameAction7_1) {
    return 0
  }
  getActionAuto(desk: GameData7_1): any[] {
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
  getActionAll(desk: GameData7_1): GameAction7_1[] {
    let listActionAll: GameAction7_1[] = []
    return listActionAll
  }
}