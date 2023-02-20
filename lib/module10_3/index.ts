/**
 * @author jiutou
 * @updateTime 2022/11/29
 * @tip 乘法游戏
 * @description
 *
https://blog.csdn.net/u011587401/article/details/50877828
 一．挑战模式
1.参数默认值：
两颗棋子的初始位置分别位于 1 和 2 上面
【注意起始位置的乘积不做标记，等先手移动一次后方可做标记】
2.参数范围：
  a.图一和图二结构和内容均固定不变
  b.两颗棋子的初始位置可以任意设置
3.过程记录
给与红蓝两种颜色的标记，用于游戏过程中即可，无其它过程记录要求
二．练习模式
电脑等级实现
 *
 */
import { GameStep, GameWay, GameAutoWay } from '../common/pojo';
import RandomGenerater from '../util/RandomGenerater';
import OtherUtil from '../util/OtherUtil';
import { Console } from 'console';

export class GameData10_3 {
  typeSet?: number = 1;
  //参数 10-12
  desk: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  chess1: number[] = []
  chess2: number[] = []
  player: number = 1

  constructor(player?: number, chess1?: number[], chess2?: number[], desk?: number[][]) {
    if (player != undefined) {
      this.player = player
    }
    if (chess2 != undefined) {
      this.chess2 = chess2
    }
    if (chess1 != undefined) {
      this.chess1 = chess1
    }
    if (desk != undefined) {
      this.desk = desk
    }
  }
}

export class GameAction10_3 {
  //下面的deskSquare方块类型，依次0-11
  // square: number = -1
  square: number = -1
  squareArr: number[][] = []
  //起手点位。图形0，0的位置。
  action: number[] = []
  //操作方式 1 原样放置 2 水平翻转 3 垂直翻转 4旋转90°】
  // actionType: number = 2
  score?: number = 0
  constructor(square: number, action: number[], squareArr: number[][], score?: number) {
    this.square = square
    this.action = action
    this.squareArr = squareArr
    if (score != undefined) {
      this.score = score
    }
  }
}

export default class example10_3 {

  //操作方式 1 原样放置 2 水平翻转 3 垂直翻转 4左旋转90° 5右旋转90°】
  // [0, 0, 1,],
  // [0, 0, 1,],
  // [1, 1, 1,]],

  // [1, 0, 0,],
  // [1, 0, 0,],
  // [1, 1, 1,]],

  // [1, 1, 1,],
  // [0, 0, 1,],
  // [0, 0, 1,]],

  // [1, 0, 0,],
  // [1, 0, 0,],
  // [1, 1, 1,]],

  // [1, 1, 1,],
  // [1, 0, 0,],
  // [1, 0, 0,]],

  deskSquareAll: number[][][] = [[[0, 0, 1], [1, 1, 1], [1, 0, 0]], [[1, 0, 0], [1, 1, 1], [0, 0, 1]], [[1, 1, 0], [0, 1, 0], [0, 1, 1]], [[0, 1, 1], [0, 1, 0], [1, 1, 0]], [[1, 1, 1], [0, 1, 1]], [[1, 1, 1], [1, 1, 0]], [[0, 1, 1], [1, 1, 1]], [[1, 1], [1, 1], [1, 0]], [[0, 1], [1, 1], [1, 1]], [[1, 1, 0], [1, 1, 1]], [[1, 0], [1, 1], [1, 1]], [[1, 1], [1, 1], [0, 1]], [[1, 0, 0, 0], [1, 1, 1, 1]], [[0, 0, 0, 1], [1, 1, 1, 1]], [[1, 1, 1, 1], [1, 0, 0, 0]], [[0, 1], [0, 1], [0, 1], [1, 1]], [[1, 1], [1, 0], [1, 0], [1, 0]], [[1, 1, 1, 1], [0, 0, 0, 1]], [[1, 1], [0, 1], [0, 1], [0, 1]], [[1, 0], [1, 0], [1, 0], [1, 1]], [[1, 1, 1, 1, 1]], [[1], [1], [1], [1], [1]], [[0, 0, 1, 0], [1, 1, 1, 1]], [[0, 1, 0, 0], [1, 1, 1, 1]], [[1, 1, 1, 1], [0, 0, 1, 0]], [[0, 1], [1, 1], [0, 1], [0, 1]], [[1, 0], [1, 0], [1, 1], [1, 0]], [[1, 1, 1, 1], [0, 1, 0, 0]], [[0, 1], [0, 1], [1, 1], [0, 1]], [[1, 0], [1, 1], [1, 0], [1, 0]], [[1, 1], [1, 0], [1, 1]], [[1, 1], [0, 1], [1, 1]], [[1, 0, 1], [1, 1, 1]], [[1, 1, 1], [1, 0, 1]], [[0, 1, 0], [1, 1, 1], [1, 0, 0]], [[0, 1, 0], [1, 1, 1], [0, 0, 1]], [[1, 0, 0], [1, 1, 1], [0, 1, 0]], [[0, 1, 0], [1, 1, 0], [0, 1, 1]], [[1, 1, 0], [0, 1, 1], [0, 1, 0]], [[0, 0, 1], [1, 1, 1], [0, 1, 0]], [[0, 1, 1], [1, 1, 0], [0, 1, 0]], [[0, 1, 0], [0, 1, 1], [1, 1, 0]], [[0, 1, 0], [1, 1, 1], [0, 1, 0]], [[0, 1, 1], [1, 1, 0], [1, 0, 0]], [[1, 1, 0], [0, 1, 1], [0, 0, 1]], [[1, 0, 0], [1, 1, 0], [0, 1, 1]], [[0, 0, 1], [0, 1, 1], [1, 1, 0]], [[0, 1, 0], [0, 1, 0], [1, 1, 1]], [[1, 1, 1], [0, 1, 0], [0, 1, 0]], [[0, 0, 1], [1, 1, 1], [0, 0, 1]], [[1, 0, 0], [1, 1, 1], [1, 0, 0]], [[0, 0, 1], [0, 0, 1], [1, 1, 1]], [[1, 0, 0], [1, 0, 0], [1, 1, 1]], [[1, 1, 1], [0, 0, 1], [0, 0, 1]], [[1, 1, 1], [1, 0, 0], [1, 0, 0]], [[0, 1], [0, 1], [1, 1], [1, 0]], [[1, 0], [1, 0], [1, 1], [0, 1]], [[1, 0], [1, 1], [0, 1], [0, 1]], [[1, 1, 1, 0], [0, 0, 1, 1]], [[1, 1, 0, 0], [0, 1, 1, 1]], [[0, 1], [1, 1], [1, 0], [1, 0]], [[0, 0, 1, 1], [1, 1, 1, 0]], [[0, 1, 1, 1], [1, 1, 0, 0]]]
  deskSquareAll0: number[][][] = [[[0, 0, 1], [1, 1, 1], [1, 0, 0]], [[1, 0, 0], [1, 1, 1], [0, 0, 1]], [[1, 1, 0], [0, 1, 0], [0, 1, 1]], [[0, 1, 1], [0, 1, 0], [1, 1, 0]]]
  deskSquareAll1: number[][][] = [[[1, 1, 1], [0, 1, 1]], [[1, 1, 1], [1, 1, 0]], [[0, 1, 1], [1, 1, 1]], [[1, 1], [1, 1], [1, 0]], [[0, 1], [1, 1], [1, 1]], [[1, 1, 0], [1, 1, 1]], [[1, 0], [1, 1], [1, 1]], [[1, 1], [1, 1], [0, 1]]]
  deskSquareAll2: number[][][] = [[[1, 0, 0, 0], [1, 1, 1, 1]], [[0, 0, 0, 1], [1, 1, 1, 1]], [[1, 1, 1, 1], [1, 0, 0, 0]], [[0, 1], [0, 1], [0, 1], [1, 1]], [[1, 1], [1, 0], [1, 0], [1, 0]], [[1, 1, 1, 1], [0, 0, 0, 1]], [[1, 1], [0, 1], [0, 1], [0, 1]], [[1, 0], [1, 0], [1, 0], [1, 1]]]
  deskSquareAll3: number[][][] = [[[1, 1, 1, 1, 1]], [[1], [1], [1], [1], [1]]]
  deskSquareAll4: number[][][] = [[[0, 0, 1, 0], [1, 1, 1, 1]], [[0, 1, 0, 0], [1, 1, 1, 1]], [[1, 1, 1, 1], [0, 0, 1, 0]], [[0, 1], [1, 1], [0, 1], [0, 1]], [[1, 0], [1, 0], [1, 1], [1, 0]], [[1, 1, 1, 1], [0, 1, 0, 0]], [[0, 1], [0, 1], [1, 1], [0, 1]], [[1, 0], [1, 1], [1, 0], [1, 0]]]
  deskSquareAll5: number[][][] = [[[1, 1], [1, 0], [1, 1]], [[1, 1], [0, 1], [1, 1]], [[1, 0, 1], [1, 1, 1]], [[1, 1, 1], [1, 0, 1]]]
  deskSquareAll6: number[][][] = [[[0, 1, 0], [1, 1, 1], [1, 0, 0]], [[0, 1, 0], [1, 1, 1], [0, 0, 1]], [[1, 0, 0], [1, 1, 1], [0, 1, 0]], [[0, 1, 0], [1, 1, 0], [0, 1, 1]], [[1, 1, 0], [0, 1, 1], [0, 1, 0]], [[0, 0, 1], [1, 1, 1], [0, 1, 0]], [[0, 1, 1], [1, 1, 0], [0, 1, 0]], [[0, 1, 0], [0, 1, 1], [1, 1, 0]]]
  deskSquareAll7: number[][][] = [[[0, 1, 0], [1, 1, 1], [0, 1, 0]]]
  deskSquareAll8: number[][][] = [[[0, 1, 1], [1, 1, 0], [1, 0, 0]], [[1, 1, 0], [0, 1, 1], [0, 0, 1]], [[1, 0, 0], [1, 1, 0], [0, 1, 1]], [[0, 0, 1], [0, 1, 1], [1, 1, 0]]]
  deskSquareAll9: number[][][] = [[[0, 1, 0], [0, 1, 0], [1, 1, 1]], [[1, 1, 1], [0, 1, 0], [0, 1, 0]], [[0, 0, 1], [1, 1, 1], [0, 0, 1]], [[1, 0, 0], [1, 1, 1], [1, 0, 0]]]
  deskSquareAll10: number[][][] = [[[0, 0, 1], [0, 0, 1], [1, 1, 1]], [[1, 0, 0], [1, 0, 0], [1, 1, 1]], [[1, 1, 1], [0, 0, 1], [0, 0, 1]], [[1, 1, 1], [1, 0, 0], [1, 0, 0]]]
  deskSquareAll11: number[][][] = [[[0, 1], [0, 1], [1, 1], [1, 0]], [[1, 0], [1, 0], [1, 1], [0, 1]], [[1, 0], [1, 1], [0, 1], [0, 1]], [[1, 1, 1, 0], [0, 0, 1, 1]], [[1, 1, 0, 0], [0, 1, 1, 1]], [[0, 1], [1, 1], [1, 0], [1, 0]], [[0, 0, 1, 1], [1, 1, 1, 0]], [[0, 1, 1, 1], [1, 1, 0, 0]]]

  deskSquare: number[][][] = [
    [[0, 0, 1,],
    [1, 1, 1,],
    [1, 0, 0,]],

    [[1, 1, 1,],
    [0, 1, 1,]],

    [[1, 0, 0, 0],
    [1, 1, 1, 1]],

    [[1, 1, 1, 1, 1]],

    [[0, 0, 1, 0],
    [1, 1, 1, 1]],

    [[1, 1,],
    [1, 0,],
    [1, 1,]],

    [[0, 1, 0,],
    [1, 1, 1,],
    [1, 0, 0,]],

    [[0, 1, 0,],
    [1, 1, 1,],
    [0, 1, 0,]],

    [[0, 1, 1,],
    [1, 1, 0,],
    [1, 0, 0,]],

    [[0, 1, 0,],
    [0, 1, 0,],
    [1, 1, 1,]],

    [[0, 0, 1,],
    [0, 0, 1,],
    [1, 1, 1,]],

    [[0, 1,],
    [0, 1,],
    [1, 1,],
    [1, 0,]],
  ]

  getRiddleByLev(level: number, config: any): GameData10_3 {
    throw new Error("Method not implemented.");
  }

  getRiddle(): GameData10_3 {
    throw new Error("Method not implemented.");
  }

  checkRiddle(deskData: GameData10_3): number {
    return 1
  }

  doAction(deskData: GameData10_3, dataAction: GameAction10_3): [flagResult: number, dataResult: GameData10_3] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    let flagResult = 0
    //获取方块
    const square = dataAction.squareArr
    for (let i = 0; i < square.length; i++) {
      const row = square[i];
      for (let j = 0; j < row.length; j++) {
        const tmp = row[j];
        if (tmp == 1) {
          deskData.desk[dataAction.action[0] + i][dataAction.action[1] + j] = deskData.player
        }
      }
    }
    if (deskData.player == 1) {
      deskData.chess1.push(dataAction.square)
    } else {
      deskData.chess2.push(dataAction.square)
    }
    flagResult = this.checkDesk(deskData);
    deskData.player = OtherUtil.getRival(deskData.player)
    return [flagResult, deskData];
  }

  doAction1(deskData: GameData10_3, squareCode: number, square: number[][], action: number[]): [flagResult: number, dataResult: GameData10_3] {
    if (this.checkAction1(deskData, square, action) == -1) {
      return [-1, deskData];
    }
    let flagResult = 0
    //获取方块
    for (let i = 0; i < square.length; i++) {
      const row = square[i];
      for (let j = 0; j < row.length; j++) {
        const tmp = row[j];
        if (tmp == 1) {
          deskData.desk[action[0] + i][action[1] + j] = deskData.player
        }
      }
    }
    if (deskData.player == 1) {
      deskData.chess1.push(squareCode)
    } else {
      deskData.chess2.push(squareCode)
    }
    flagResult = this.checkDesk(deskData);
    deskData.player = OtherUtil.getRival(deskData.player)
    return [flagResult, deskData];
  }


  checkAction(deskData: GameData10_3, dataAction: GameAction10_3): number {
    const square = dataAction.squareArr
    return this.checkAction1(deskData, square, dataAction.action)
  }

  checkAction1(deskData: GameData10_3, square: number[][], action: number[]): number {

    for (let i = 0; i < square.length; i++) {
      const row = square[i];
      for (let j = 0; j < row.length; j++) {
        const tmp = row[j];
        const x = action[0] + i
        const y = action[1] + j
        if (this.vaildXy(x, y) == -1) {
          return -1;
        }
        if (tmp == 1 && deskData.desk[x][y] != 0) {
          return -1;
        }
      }
    }
    return 1;
  }

  checkDesk(deskData: GameData10_3): number {
    let p1s: Set<number> = new Set(deskData.chess1)
    let p2s: Set<number> = new Set(deskData.chess2)
    let actionCount1 = 0
    let actionCount2 = 0
    for (let i = 0; i < this.deskSquare.length; i++) {
      if (!p1s.has(i)) {
        let actionTmpSet: Set<string> = this.getAllAction(deskData, i)
        actionCount1 += actionTmpSet.size
      }
      if (!p2s.has(i)) {
        let actionTmpSet: Set<string> = this.getAllAction(deskData, i)
        actionCount2 += actionTmpSet.size
      }
    }
    // 轮到哪一边就检查他是否有位置可以下，没有就判负
    if (deskData.player == 1 && actionCount1 == 0) {
      console.log('结算1')
      return 2
    } else if (deskData.player == 2 && actionCount2 == 0) {
      console.log('结算2')
      return 1
    }
    return 0

    // if (actionCount1 != 0 && actionCount2 != 0) {
    //   return 0
    // } else if (actionCount1 == 0 && actionCount2 == 0) {
    //   return 3
    // } else if (actionCount1 != 0 && actionCount2 == 0) {
    //   return 1
    // } else if (actionCount1 == 0 && actionCount2 != 0) {
    //   return 2
    // }

    // return 0
  }

  getSquareAction(deskData: GameData10_3, square: number[][]): Set<string> {
    let actionSet: Set<string> = new Set
    for (let i = 0; i < deskData.desk.length; i++) {
      const row = deskData.desk[i];
      for (let j = 0; j < row.length; j++) {
        const element = row[j];
        if (element == 0 && this.checkAction1(deskData, square, [i, j]) == 1) {
          actionSet.add(i + "_" + j)
        }
      }
    }
    return actionSet
  }

  getAllAction(deskData: GameData10_3, squareCode: number): Set<string> {
    let actionSet: Set<string> = new Set

    const squares = this.getAllSquares(squareCode)
    for (let type = 0; type < squares.length; type++) {
      const squareTmp = squares[type]
      let actionTmpSet: Set<string> = this.getSquareAction(deskData, squareTmp);
      actionTmpSet.forEach(value => { actionSet.add(value + "_" + squareCode + "_" + JSON.stringify(squareTmp)) });
    }
    return actionSet
  }


  getActionAuto(deskData: GameData10_3): GameAutoWay {

    let count = 0
    let countA = 0
    for (let i = 0; i < deskData.desk.length; i++) {
      const row = deskData.desk[i];
      for (let j = 0; j < row.length; j++) {
        const element = row[j];
        countA++
        if (element == 0) {
          count++
        }
      }
    }

    let p1s: Set<number> = new Set()
    if (deskData.player == 1) {
      p1s = new Set(deskData.chess1)
    } else {
      p1s = new Set(deskData.chess2)
    }
    let actionMap: Map<string, GameAction10_3> = new Map<string, GameAction10_3>

    if (count / countA > 0.5) {
      let best = null
      let nobest = null

      for (let squareCode = 0; squareCode < this.deskSquare.length; squareCode++) {
        if (!p1s.has(squareCode)) {

          const squares = this.getAllSquares(squareCode)
          for (let type = 0; type < squares.length; type++) {
            const squaretmp = squares[type]
            //寻找方块起点xy
            let sx = 0
            let sy = 0
            for (let si = 0; si < squaretmp.length; si++) {
              const srow = deskData.desk[si];
              for (let sj = 0; sj < srow.length; sj++) {
                if (squaretmp[si][sj]) {
                  sx = si
                  sy = sj
                }
              }
            }
            for (let i = 0; i < deskData.desk.length; i++) {
              const row = deskData.desk[i];
              for (let j = 0; j < row.length; j++) {
                if (this.vaildXy(i + sx, j + sy) == 1) {
                  const element = deskData.desk[i + sx][j + sy];
                  if (element == 0) {
                    let tmp = this.checkAction1(JSON.parse(JSON.stringify(deskData)), squaretmp, [i, j])
                    if (tmp == 1) {
                      if (best == null) {
                        best = new GameAction10_3(squareCode, [i, j], squaretmp)
                      } else if (best != null && nobest == null) {
                        nobest = new GameAction10_3(squareCode, [i, j], squaretmp, 99999)
                      } else if (best != null && nobest != null) {
                        return new GameAutoWay(best, nobest)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    //过半，权重取值

    for (let squareCode = 0; squareCode < this.deskSquare.length; squareCode++) {
      if (!p1s.has(squareCode)) {

        const squares = this.getAllSquares(squareCode)
        for (let type = 0; type < squares.length; type++) {
          const squareTmp = squares[type]
          //寻找方块起点xy
          let sx = -1
          let sy = -1
          for (let si = 0; si < squareTmp.length; si++) {
            const srow = deskData.desk[si];
            if (sx != -1) {
              break
            }
            for (let sj = 0; sj < srow.length; sj++) {
              if (squareTmp[si][sj] != 0) {
                sx = si
                sy = sj
                break
              }
            }
          }
          for (let i = 0; i < deskData.desk.length; i++) {
            const row = deskData.desk[i];
            for (let j = 0; j < row.length; j++) {
              if (this.vaildXy(i + sx, j + sy) == 1) {
                const element = deskData.desk[i + sx][j + sy];
                if (element == 0) {
                  let tmp = this.doAction1(JSON.parse(JSON.stringify(deskData)), squareCode, squareTmp, [i, j])
                  const flag = tmp[0]
                  const tmpDesk = tmp[1]
                  const key = i + "_" + j + "_" + squareCode + "_" + type
                  if (flag == 0) {
                    actionMap.set(key, new GameAction10_3(squareCode, [i, j], squareTmp, -this.getScore(tmpDesk)))
                  } else if (flag == deskData.player) {
                    actionMap.set(key, new GameAction10_3(squareCode, [i, j], squareTmp, 99999))
                  } else if (flag == OtherUtil.getRival(deskData.player)) {
                    actionMap.set(key, new GameAction10_3(squareCode, [i, j], squareTmp, 99999))
                  } else if (flag == 3) {
                    actionMap.set(key, new GameAction10_3(squareCode, [i, j], squareTmp, 0))
                  }
                }
              }
            }
          }
        }
      }
    }
    let actionSMap: Map<number, GameAction10_3[]> = new Map<number, GameAction10_3[]>

    let iterator = actionMap.values();

    let r: IteratorResult<GameAction10_3>;

    while (r = iterator.next(), !r.done) {
      const tmp: GameAction10_3 = r.value
      let tmpArr: GameAction10_3[] = [r.value]
      if (!actionSMap.has(tmp.score as number)) {
        actionSMap.set(tmp.score as number, tmpArr)
      } else {
        tmpArr = actionSMap.get(tmp.score as number) as GameAction10_3[]
        tmpArr.push(r.value)
        actionSMap.set(tmp.score as number, tmpArr)
      }
    }

    let iteratorKey = actionSMap.keys();
    let rs: IteratorResult<number>;
    let scores: number[] = []
    while (rs = iteratorKey.next(), !rs.done) {
      scores.push(rs.value)
    }
    scores = scores.sort((a, b) => {
      if (a < b)
        return 1
      if (a > b)
        return -1;
      return 0;
    });
    if (actionSMap.size == 0) {
      return new GameAutoWay(undefined, undefined)
    }
    let bests: GameAction10_3[] = actionSMap.get(scores[0]) as GameAction10_3[]
    const rg = new RandomGenerater(0)
    let nobests: GameAction10_3[] = actionSMap.get(scores[rg.RangeInteger(0, scores.length)]) as GameAction10_3[]
    return new GameAutoWay(bests[0], nobests[0])
  }

  getScore(deskData: GameData10_3): number {
    let ps: Set<number> = new Set
    if (deskData.player == 1) {
      ps = new Set(deskData.chess1)
    } else {
      ps = new Set(deskData.chess2)
    }
    let score = 0
    for (let squareCode = 0; squareCode < this.deskSquare.length; squareCode++) {
      if (!ps.has(squareCode)) {
        const square: number[][] = this.deskSquare[squareCode];
        let hasAction = false
        const squares = this.getAllSquares(squareCode)
        for (let type = 0; type < squares.length; type++) {
          const squareTmp = squares[type]
          for (let i = 0; i < deskData.desk.length; i++) {
            const row = deskData.desk[i];
            for (let j = 0; j < row.length; j++) {
              const element = row[j];
              if (element == 0) {
                let tmp = this.checkAction1(JSON.parse(JSON.stringify(deskData)), squareTmp, [i, j])
                if (tmp == 1) {
                  hasAction = true
                  score++
                }
              }
              if (hasAction) {
                break
              }
            }
            if (hasAction) {
              break
            }
          }
          if (hasAction) {
            break
          }
        }
      }
    }
    return score
  }

  getAllSquares(squareCode: number): number[][][] {
    // console.info(JSON.stringify(square) + "_" + type)
    if (squareCode == 0) {
      return this.deskSquareAll0
    } else if (squareCode == 1) {
      return this.deskSquareAll1
    } else if (squareCode == 2) {
      return this.deskSquareAll2
    } else if (squareCode == 3) {
      return this.deskSquareAll3
    } else if (squareCode == 4) {
      return this.deskSquareAll4
    } else if (squareCode == 5) {
      return this.deskSquareAll5
    } else if (squareCode == 6) {
      return this.deskSquareAll6
    } else if (squareCode == 7) {
      return this.deskSquareAll7
    } else if (squareCode == 8) {
      return this.deskSquareAll8
    } else if (squareCode == 9) {
      return this.deskSquareAll9
    } else if (squareCode == 10) {
      return this.deskSquareAll10
    } else if (squareCode == 11) {
      return this.deskSquareAll11
    }
    return []
  }

  bian(square: number[][], type: number): number[][] {
    // console.info(JSON.stringify(square) + "_" + type)
    if (type == 1) {
      return square
    } else if (type == 2) {
      return this.bian2(square)
    } else if (type == 3) {
      return this.bian3(square)
    } else if (type == 4) {
      return this.bian4(square)
    } else if (type == 5) {
      return this.bian5(square)
    }
    return square
  }

  //操作方式 1 原样放置 2 水平翻转 3 垂直翻转 4左旋转90° 5右旋转90°】
  bian2(square: number[][]): number[][] {
    let result: number[][] = []
    // 水平翻转
    for (let i = 0; i < square.length; i++) {
      const row = square[i];
      let tmprow: number[] = []
      for (let j = row.length - 1; j >= 0; j--) {
        const tmp = row[j];
        tmprow.push(tmp)
      }
      result.push(tmprow)
    }
    return result
  }
  bian3(square: number[][]): number[][] {
    let result: number[][] = []
    for (let i = square.length - 1; i >= 0; i--) {
      const row = square[i];
      let tmprow: number[] = []
      for (let j = 0; j < row.length; j++) {
        const tmp = row[j];
        tmprow.push(tmp)
      }
      result.push(tmprow)
    }
    return result
  }

  // 左旋转90°
  bian4(square: number[][]): number[][] {
    let result: number[][] = []
    for (let i = 0; i < square[0].length; i++) {
      let tmprow: number[] = []
      for (let j = 0; j < square.length; j++) {
        tmprow.push(0)
      }
      result.push(tmprow)
    }

    for (let i = 0; i < square.length; i++) {
      const row = square[i];
      for (let x = 0, j = row.length - 1; j >= 0; j--, x++) {
        // for (let j = 0; j < row.length; j++) {
        const tmp = row[x];
        result[j][i] = tmp
      }
    }
    return result
  }
  // 右旋转90°
  bian5(square: number[][]): number[][] {
    let result: number[][] = []
    for (let i = 0; i < square[0].length; i++) {
      let tmprow: number[] = []
      for (let j = 0; j < square.length; j++) {
        tmprow.push(0)
      }
      result.push(tmprow)
    }

    for (let y = 0, i = square.length - 1; i >= 0; i--, y++) {
      const row = square[i];
      for (let x = 0, j = row.length - 1; j >= 0; j--, x++) {
        // for (let j = 0; j < row.length; j++) {
        const tmp = row[x];
        result[x][y] = tmp
      }
    }
    return result
  }
  vaildXy(x: number, y: number): number {
    if (x >= 10 || x < 0) {
      return -1
    }
    if (y >= 12 || y < 0) {
      return -1
    }
    return 1
  }
}