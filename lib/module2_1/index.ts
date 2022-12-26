/**
 * @author jiutou
 * @updateTime 2022/11/28
 * @tip 堆高游戏
 * @description 
一．挑战模式
1.参数默认值：双方各执 6 颗棋子
2.参数范围：红，蓝色棋子数量固定为 6
3.过程记录：无
二．练习模式
一级：1 步取胜（包含先手一步和后手一步）
二级：2 步取胜（同上）
三级：3 步取胜（同上）
 * 
 */


/**
 * 问题记录
 * 1. checkDesk 棋子全部被另一方压住不能走的时候也要判负
 * 2. checkRiddle要有，格式有些游戏可以不检验因为玩家不能自定义这么彻底，前端按照固定格式传就行，  但是有自定义局面的游戏都要判断是否一开始的棋局就某方直接获胜，这种也算非法
 * 
 */
import OtherUtil from '../util/OtherUtil';
import RandomGenerater from '../util/RandomGenerater';
import { GameStep, GameWay, GameAutoWay } from '../common/pojo';
import { off } from 'process';

export class GameData2_1 {
  //总数量
  //当前选手 先手6 后手6
  p1 = 6;
  p2 = 6;
  player = 1;
  //点位 二维数组 一共十二个点位，第二层数组 0-2为底至顶123
  positions: number[][] = [[], [], [], [], [], [], [], [], [], [], [], []]
  constructor() { }
}

export class GameAction2_1 {
  move: number[] = []
  action: number[]
  score: number = 0
  constructor(action: number[], move?: number[], score?: number) {
    this.action = action
    if (move != undefined) {
      this.move = move
    }
    if (score != undefined) {
      this.score = score
    }
  }
}

export default class example2_1 {

  level1Positions: number[] = []
  level2Positions: number[] = []
  level3Positions: number[] = []

  getRiddleByLev(level: number, config: any): GameData2_1 {
    //需要再说
    throw new Error("Method not implemented.");
  }

  getRiddle(config: any): GameData2_1 {
    //这个没有。
    return new GameData2_1()
  }

  checkRiddle(deskData: GameData2_1): number {
    // todo: 这个需要有，检测是否一开局就三子连续胜利了就行
    return 0
  }

  doAction(deskData: GameData2_1, dataAction: GameAction2_1): [flagResult: number, dataResult: GameData2_1] {
    if (dataAction == undefined) {
      deskData.player = OtherUtil.getRival(deskData.player)
      return [this.checkDesk(deskData), deskData];
    }
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }

    if (dataAction.move.length == 0) {
      if (deskData.player == 1) {
        deskData.p1--
      }
      if (deskData.player == 2) {
        deskData.p2--
      }
    } else {
      deskData.positions[dataAction.move[0]].pop()
    }


    deskData.positions[dataAction.action[0]].push(deskData.player)

    deskData.player = OtherUtil.getRival(deskData.player)
    return [this.checkDesk(deskData), deskData];
  }

  checkAction(deskData: GameData2_1, dataAction: GameAction2_1): number {
    let p1 = deskData.p1
    let p2 = deskData.p2

    if (dataAction.move.length == 0) {
      if (deskData.player == 1 && p1 <= 0) {
        return -1
      }
      if (deskData.player == 2 && p2 <= 0) {
        return -1
      }
    } else {
      if (deskData.positions[dataAction.move[0]][dataAction.move[1]] != deskData.player) {
        return -1
      }
      if (deskData.positions[dataAction.action[0]].length > 2) {
        return -1
      }
    }
    return 1;
  }

  checkDesk(deskData: GameData2_1): number {

    let tmp = 0;
    let count = 0;
    let cell = 0;

    for (let i = 0; i < deskData.positions.length; i++) {
      const row = deskData.positions[i];
      cell = 0;
      count = 0;
      for (let j = 0; j < row.length; j++) {
        if (j == 0 && row[0] != 0) {
          cell = row[0]
          count++
        }
        tmp = row[j]

        if (j != 0 && cell != 0) {
          if (tmp == cell) {
            count++
          } else {
            break
          }
        }
      }
      if (count == 3) {
        return tmp
      }
    }
    return 0;
  }


  getActionAuto(deskData: GameData2_1): GameAutoWay {


    let rival = 0
    if (deskData.player == 1) {
      rival = deskData.p1
    }
    if (deskData.player == 2) {
      rival = deskData.p2
    }

    // //获取必胜，必败
    // let tmp = 0;
    // let count = 0;
    // for (let i = 0; i < deskData.positions.length; i++) {
    //   const row = deskData.positions[i];
    //   for (let j = 0; j < row.length; j++) {
    //     const cell = row[i];
    //     if (cell != 0) {
    //       if (j == 0) {
    //         tmp = cell
    //       }
    //       if (tmp == cell) {
    //         count++
    //       } else {
    //         break
    //       }
    //     }
    //   }
    //   if (count == 2) {
    //     //获取最优移动 优先手持，最差为堵塞对方的第三颗
    //     return new GameAutoWay(new GameAction2_1([i, 2], this.getBestMove(deskData, i)), new GameAction2_1([i, 2], this.getBestMove(deskData, i)))
    //   }
    // }

    let canMove = rival
    for (let i = 0; i < deskData.positions.length; i++) {
      const row = deskData.positions[i];
      const topCell = row[row.length - 1];
      if (topCell == deskData.player) {
        canMove++
      }
    }
    if (canMove == 0) {
      return new GameAutoWay(undefined, undefined)
    }

    const rg = new RandomGenerater(0)
    //枚举下法
    let oneP: number[] = []
    let towP: number[] = []
    let randomP: number[] = []
    let emptyP: number[] = []
    let winP: number[][] = []
    let failureP: number[][] = []
    //优先堵塞对方2连，
    for (let i = 0; i < deskData.positions.length; i++) {
      const row = deskData.positions[i];
      if (row.length == 2) {
        const cell = row[row.length - 1];
        if (row.length == 2 && row[0] == OtherUtil.getRival(deskData.player) && row[1] == OtherUtil.getRival(deskData.player)) {
          failureP.push([i, 2])
        }
        if (row.length == 2 && row[0] == deskData.player && row[1] == deskData.player) {
          winP.push([i, 2])
        }
      } else if (row.length == 0) {
        emptyP.push(i);
      } else if (row.length == 1 && row[0] == deskData.player) {
        oneP.push(i);
      } else if (row.length == 2 && row[0] == deskData.player) {
        towP.push(i);
      }
      if (row[row.length - 1] != deskData.player || row.length == 0) {
        randomP.push(i);
      }
    }
    if (winP.length != 0) {
      let best = this.getBestMove(deskData, winP[0][0]);
      if (best.length != 3) {
        let win = new GameAction2_1(winP[0], best);
        return new GameAutoWay(win, win)
      }
    }
    if (failureP.length != 0) {
      let best = this.getBestMove(deskData, failureP[0][0]);
      if (best.length != 3) {
        let failure = new GameAction2_1(failureP[0], best);
        return new GameAutoWay(failure, failure)
      }
    }
    let result = new GameAutoWay(undefined, undefined)
    //当对手有手持，平铺自己棋子，（为保证棋子后期不被锁定，不主动建立二连）
    if (emptyP.length != 0 && rival != 0) {
      let tmpRow = emptyP[rg.RangeInteger(0, emptyP.length - 1)]
      let tmpRow1 = emptyP[rg.RangeInteger(0, emptyP.length - 1)]
      let best = this.getBestMove(deskData, tmpRow);
      let best1 = this.getBestMove(deskData, tmpRow1);

      let tmpAction = new GameAction2_1([tmpRow, deskData.positions[tmpRow].length], best);
      let tmpAction1 = new GameAction2_1([tmpRow1, deskData.positions[tmpRow1].length], best1);
      if (best1.length == 3) {
        best1 = best
      }
      if (best.length != 3) {
        result = new GameAutoWay(tmpAction, tmpAction1)
      }
    } else if (towP.length != 0 && rival != 0) {
      let tmpRow = towP[rg.RangeInteger(0, towP.length - 1)]
      let tmpRow1 = towP[rg.RangeInteger(0, towP.length - 1)]
      let best = this.getBestMove(deskData, tmpRow);
      let best1 = this.getBestMove(deskData, tmpRow1);
      let tmpAction = new GameAction2_1([tmpRow, deskData.positions[tmpRow].length], best);
      let tmpAction1 = new GameAction2_1([tmpRow1, deskData.positions[tmpRow1].length], best1);
      if (best1.length == 3) {
        best1 = best
      }
      if (best.length != 3) {
        result = new GameAutoWay(tmpAction, tmpAction1)
      }
    } else {
      //当对手无手持，存在两个平铺时，组建立自己二连，
      if (oneP.length != 0) {
        let tmpRow = oneP[rg.RangeInteger(0, oneP.length - 1)]
        let tmpRow1 = oneP[rg.RangeInteger(0, oneP.length - 1)]
        let best = this.getBestMove(deskData, tmpRow);
        let best1 = this.getBestMove(deskData, tmpRow1);
        let tmpAction = new GameAction2_1([tmpRow, deskData.positions[tmpRow].length], best);
        let tmpAction1 = new GameAction2_1([tmpRow1, deskData.positions[tmpRow1].length], best1);
        if (best1.length == 3) {
          best1 = best
        }
        if (best.length != 3) {
          result = new GameAutoWay(tmpAction, tmpAction1)
        }
      } else {
        let tmpRow = randomP[rg.RangeInteger(0, randomP.length - 1)]
        let tmpRow1 = randomP[rg.RangeInteger(0, randomP.length - 1)]
        let best = this.getBestMove(deskData, tmpRow);
        let best1 = this.getBestMove(deskData, tmpRow1);
        let tmpAction = new GameAction2_1([tmpRow, deskData.positions[tmpRow].length], best);
        let tmpAction1 = new GameAction2_1([tmpRow1, deskData.positions[tmpRow1].length], best1);
        if (best1.length == 3) {
          best1 = best
        }
        if (best.length != 3) {
          result = new GameAutoWay(tmpAction, tmpAction1)
        }
      }
      //当对手无手持，不存在可二连，随机下一个
    }
    return result;
  }

  getBestMove(deskData: GameData2_1, rowNum: number): number[] {
    if (deskData.player == 1 && deskData.p1 > 0) {
      return []
    }
    if (deskData.player == 2 && deskData.p2 > 0) {
      return []
    }
    let canMove: number[][] = []
    let winMove: number[][] = []
    let failureMove: number[][] = []

    for (let i = 0; i < deskData.positions.length; i++) {
      const row = deskData.positions[i];
      const cell = row[row.length - 1];
      if (rowNum != i) {
        if (cell == deskData.player) {
          if (row.length == 3 && row[0] == OtherUtil.getRival(deskData.player) && row[1] == OtherUtil.getRival(deskData.player)) {
            failureMove.push([i, row.length - 1])
          } else if (row.length == 2 && row[0] == deskData.player && row[1] == deskData.player) {
            winMove.push([i, row.length - 1])
          } else {
            canMove.push([i, row.length - 1])
          }
        }
      }
    }
    const rg = new RandomGenerater(0)
    if (canMove.length != 0) {
      return canMove[rg.RangeInteger(1, canMove.length) - 1]
    } else if (winMove.length != 0) {
      return winMove[rg.RangeInteger(1, winMove.length) - 1]
    } else if (failureMove.length != 0) {
      return failureMove[rg.RangeInteger(1, failureMove.length) - 1]
    } else {
      return [0, 0, 0]
    }
  }
}