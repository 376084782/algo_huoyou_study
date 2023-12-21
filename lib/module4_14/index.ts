var _ = require("lodash");

export class GameData4_14 {
  player: number = 1;
  typeSet: number = 1;
  // 一共有45个点 0-44，长度=格子-1
  length = 44;
  chess = 0;
  lastMove = 0;
}
export class GameAction4_14 {
  // 移动的格子数量
  targetIdx: number = 0;
  score: number = 0;
}
export class module4_14 {
  getRiddle() {
    return new GameData4_14();
  }
  checkRiddle(desk: GameData4_14) {
    if (desk.length > 55 || desk.length < 5) {
      return false;
    }
    if (this.checkDesk(desk) != -1) {
      return false;
    }
    return true;
  }
  checkDesk(desk: GameData4_14) {
    if (desk.chess == desk.length - 1) {
      return desk.player;
    }
    return -1;
  }
  checkAction(desk: GameData4_14, act: GameAction4_14) {
    if (desk.lastMove == 0) {
      // 第一次移动不能直接移动到终点
      if (act.targetIdx >= desk.length - 1) {
        return false;
      }
    } else {
      // 每次不能超过前一次移动格数的两倍
      let moveMax = desk.lastMove * 2;
      let moveLen = act.targetIdx - desk.chess;
      if (moveLen > moveMax) {
        return false;
      }
    }
    return true;
  }
  doAction(
    deskIn: GameData4_14,
    act: GameAction4_14
  ): { flag: number; desk: GameData4_14 } {
    let desk: GameData4_14 = _.cloneDeep(deskIn);
    if (!this.checkAction(desk, act)) {
      return {
        flag: -1,
        desk
      };
    }
    desk.lastMove = act.targetIdx - desk.chess;
    desk.chess = act.targetIdx;
    return {
      flag: 0,
      desk
    };
  }
  getActionAll(desk: GameData4_14) {
    let acts: GameAction4_14[] = [];
    let moveMax = desk.lastMove * 2;
    let maxCanMove = desk.length - 1 - desk.chess;
    if (moveMax > 0 && maxCanMove > moveMax) {
      maxCanMove = moveMax;
    }
    for (let i = 1; i <= maxCanMove; i++) {
      let act = new GameAction4_14();
      act.targetIdx = i + desk.chess;
      if (this.checkAction(desk, act)) {
        acts.push(act);
      }
    }
    return acts;
  }
  isBestMove(desk: GameData4_14) {
    let listBest = [3, 5, 8, 13, 21, 34, 55];
    let left = desk.length - desk.chess - 1;
    return listBest.indexOf(left) > -1
  }
  getAllLenFillFBNQ() {
    let listAll: number[] = []
    for (let i1 = 1; i1 < 55; i1++) {
      for (let i2 = 1; i2 < 55; i2++) {
        let nNext = i1 + i2;
        let list = [i1, i2];
        while (nNext < 55) {
          list.push(nNext);
          if (listAll.indexOf(nNext) == -1) {
            listAll.push(nNext)
          }
          nNext = list[list.length - 1] + list[list.length - 2];
        }
        console.log(list)
      }
    }
    return listAll.sort((a, b) => a - b)
  }
  getActionAuto(desk: GameData4_14) {
    let actionAll = this.getActionAll(desk);
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let { desk: desk2Oppo } = this.doAction(desk, act1Self);
      let actionAllOppo = this.getActionAll(desk2Oppo);
      // 放之后对方可行棋子为0，说明必胜,直接使用
      if (actionAllOppo.length == 0) {
        return {
          best: act1Self,
          nobest: act1Self
        };
      }
      // 如果满足斐波那契数列，分值+100
      if (this.isBestMove(desk2Oppo)) {
        console.log('满足斐波那契数列');
        act1Self.score += 100
      } else if (actionAll.length < 1000) {
        // 单次算量小，放宽限制
        // 可放的方式不多，有制胜局的可能性，多考虑一步
        for (let m = 0; m < actionAllOppo.length; m++) {
          let act1Oppo = actionAllOppo[m];
          let { desk: desk2Self } = this.doAction(desk2Oppo, act1Oppo);
          let actionAllSelf2 = this.getActionAll(desk2Self);
          if (actionAllSelf2.length == 0) {
            // 我可能面对的局面，该棋面下我无棋可走，得分-100
            act1Self.score -= 100;
          }
        }
      }
    }
    // 增加一点随机性，避免计算机很呆都是一样的走法
    actionAll = _.shuffle(actionAll);
    actionAll = actionAll.sort((a, b) => b.score - a.score);
    if (actionAll.length >= 2) {
      return {
        best: actionAll[0],
        nobest: actionAll[1]
      };
    } else {
      return {
        best: actionAll[0],
        nobest: actionAll[0]
      };
    }
  }
}
