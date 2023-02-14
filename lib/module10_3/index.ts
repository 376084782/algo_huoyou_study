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
  typeSet: number = 1;
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
  square: number = -1
  //起手点位。图形0，0的位置。
  action: number[] = []
  //操作方式 1 原样放置 2 水平翻转 3 垂直翻转 4旋转90°】
  actionType: number = 2
  score?: number = 0
  constructor(square: number, action: number[], actionType: number, score?: number) {
    this.square = square
    this.action = action
    this.actionType = actionType
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
    const square = this.bian(this.deskSquare[dataAction.square], dataAction.actionType)
    for (let i = 0; i < square.length; i++) {
      const row = square[i];
      for (let j = 0; j < row.length; j++) {
        const tmp = row[j];
        if (tmp == 1) {
          deskData.desk[dataAction.action[0] + i][dataAction.action[1] + j] = deskData.player
        }
      }
    }
    deskData.chess1.push(dataAction.square)
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
    const square = this.bian(this.deskSquare[dataAction.square], dataAction.actionType)
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
    let actionCount = 0
    for (let i = 0; i < this.deskSquare.length; i++) {
      if (!p1s.has(i)) {
        let actionTmpSet: Set<string> = this.getAllAction(deskData, i)
        actionCount += actionTmpSet.size
      }
      if (!p2s.has(i)) {
        let actionTmpSet: Set<string> = this.getAllAction(deskData, i)
        actionCount += actionTmpSet.size
      }
    }

    if (actionCount != 0) {
      return 0
    } else {
      if (deskData.chess1.length > deskData.chess2.length) {
        return 1
      } else if (deskData.chess1.length < deskData.chess2.length) {
        return 2
      } else {
        return 3
      }
    }
    return 0
  }

  getSquareAction(deskData: GameData10_3, square: number[][], squareCode: number, type: number): Set<string> {
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
    const square: number[][] = this.deskSquare[squareCode];
    let actionSet: Set<string> = new Set
    for (let i = 1; i <= 5; i++) {
      const squaretmp = this.bian(square, i)
      let actionTmpSet: Set<string> = this.getSquareAction(deskData, squaretmp, squareCode, i);
      actionTmpSet.forEach(value => { actionSet.add(value + "_" + squareCode + "_" + i) });
    }
    return actionSet
  }


  getActionAuto(deskData: GameData10_3): GameAutoWay {

    let p1s: Set<number> = new Set(deskData.chess1)
    let actionMap: Map<string, GameAction10_3> = new Map<string, GameAction10_3>

    for (let squareCode = 0; squareCode < this.deskSquare.length; squareCode++) {
      if (!p1s.has(squareCode)) {
        const square: number[][] = this.deskSquare[squareCode];
        for (let type = 1; type <= 5; type++) {
          const squaretmp = this.bian(square, type)
          for (let i = 0; i < deskData.desk.length; i++) {
            const row = deskData.desk[i];
            for (let j = 0; j < row.length; j++) {
              const element = row[j];
              if (element == 0) {
                let tmp = this.doAction1(JSON.parse(JSON.stringify(deskData)), squareCode, square, [i, j])
                const flag = tmp[0]
                const tmpDesk = tmp[1]
                const key = i + "_" + j + "_" + squareCode + "_" + type
                if (flag == 0) {
                  actionMap.set(key, new GameAction10_3(squareCode, [i, j], type, -this.getScore(tmpDesk)))
                } else if (flag == deskData.player) {
                  actionMap.set(key, new GameAction10_3(squareCode, [i, j], type, 99999))
                } else if (flag == OtherUtil.getRival(deskData.player)) {
                  actionMap.set(key, new GameAction10_3(squareCode, [i, j], type, 99999))
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
        for (let type = 1; type <= 5; type++) {
          const squaretmp = this.bian(square, type)
          for (let i = 0; i < deskData.desk.length; i++) {
            const row = deskData.desk[i];
            for (let j = 0; j < row.length; j++) {
              const element = row[j];
              if (element == 0) {
                let tmp = this.checkAction1(JSON.parse(JSON.stringify(deskData)), square, [i, j])
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
  // getActionAuto3(deskData: GameData10_3): GameAction10_3 {
  // let tmp = this.getActionAutoRecursive(deskData)
  // return new GameAction10_3(1, 1)
  // }
  // getActionAutoRecursive(deskData: GameData10_3, lastTimeSteps: GameAction10_3[], count: number, countn: number): GameAction10_3 {
  // getActionAutoRecursive(deskData: GameData10_3): GameAction10_3 {
  //   let weight: number[][] = []
  //   let canChessPositionMap = new Map<number, GameAction10_3[]>()
  //   let canChessPosition = new Set<number>()
  //   for (let index = 1; index <= 9; index++) {
  //     if (index != deskData.chess1) {
  //       let tmp = index * deskData.chess1;
  //       if (!this.deskHas(deskData, tmp)) {
  //         canChessPosition.add(tmp)
  //         if (canChessPositionMap.has(tmp)) {
  //           canChessPositionMap.get(tmp)?.push(new GameAction10_3(2, index))
  //         } else {
  //           canChessPositionMap.set(tmp, [new GameAction10_3(2, index)])
  //         }
  //       }
  //     }
  //     if (index != deskData.chess2) {
  //       let tmp = index * deskData.chess2;
  //       if (!this.deskHas(deskData, tmp)) {
  //         canChessPosition.add(tmp)
  //         if (canChessPositionMap.has(tmp)) {
  //           canChessPositionMap.get(tmp)?.push(new GameAction10_3(1, index))
  //         } else {
  //           canChessPositionMap.set(tmp, [new GameAction10_3(1, index)])
  //         }
  //       }
  //     }
  //   }
  //   canChessPosition.forEach(key => {
  //     const xy = this.getPosition(key)
  //     weight.push([key, this.calculateTheWeightXy(deskData, xy[0], xy[1])])
  //   })
  //   let steps = weight.sort((a, b) => {
  //     if (a[1] < b[1])
  //       return 1;
  //     if (a[1] > b[1])
  //       return -1
  //     return 0;
  //   });
  //   if (steps.length == 0) {
  //     throw new Error("死局");
  //   }
  //   let best: number = steps[0][0];
  //   if (canChessPositionMap.has(best)) {
  //     const tmpArr = canChessPositionMap.get(best) as GameAction10_3[]
  //     const rg = new RandomGenerater(0)
  //     const s = tmpArr[rg.RangeInteger(0, tmpArr.length)]
  //     return s
  //   }
  //   throw new Error("Method not implemented.");
  // }


  // getActionAuto(deskData: GameData10_3): GameAutoWay {
  //   let weight: number[][] = []
  //   let canChessPositionMap = new Map<number, GameAction10_3[]>()
  //   let canChessPosition = new Set<number>()
  //   for (let index = 1; index <= 9; index++) {
  //     if (index != deskData.chess1) {
  //       let tmp = index * deskData.chess1;
  //       if (!this.deskHas(deskData, tmp)) {
  //         canChessPosition.add(tmp)
  //         if (canChessPositionMap.has(tmp)) {
  //           canChessPositionMap.get(tmp)?.push(new GameAction10_3(2, index))
  //         } else {
  //           canChessPositionMap.set(tmp, [new GameAction10_3(2, index)])
  //         }
  //       }
  //     }
  //     if (index != deskData.chess2) {
  //       let tmp = index * deskData.chess2;
  //       if (!this.deskHas(deskData, tmp)) {
  //         canChessPosition.add(tmp)
  //         if (canChessPositionMap.has(tmp)) {
  //           canChessPositionMap.get(tmp)?.push(new GameAction10_3(1, index))
  //         } else {
  //           canChessPositionMap.set(tmp, [new GameAction10_3(1, index)])
  //         }
  //       }
  //     }
  //   }
  //   canChessPosition.forEach(key => {
  //     const xy = this.getPosition(key)
  //     weight.push([key, this.calculateTheWeightXy(deskData, xy[0], xy[1])])
  //   })
  //   let steps = weight.sort((a, b) => {
  //     if (a[1] < b[1])
  //       return 1;
  //     if (a[1] > b[1])
  //       return -1
  //     return 0;
  //   });
  //   if (steps.length == 0) {
  //     throw new Error("死局");
  //   }
  //   let best: number = steps[0][0];
  //   let nobest: number = -1
  //   if (steps[0][0] > 1000) {
  //     nobest = steps[0][0];
  //   }

  //   if (canChessPositionMap.has(best)) {
  //     const tmpArr = canChessPositionMap.get(best) as GameAction10_3[]
  //     const rg = new RandomGenerater(0)
  //     const s = tmpArr[rg.RangeInteger(0, tmpArr.length)]
  //     return new GameAutoWay(s, s)
  //   }
  //   throw new Error("Method not implemented.");
  // }

  // // ==============================================================================================================================

  // calculateTheWeightXy(deskData: GameData10_3, x: number, y: number): number {
  //   let tmp = 0
  //   tmp += this.lurdWeight(deskData, x, y)
  //   tmp += this.ruldWeight(deskData, x, y)
  //   tmp += this.leftRightWeight(deskData, x, y)
  //   tmp += this.upDownWeight(deskData, x, y)
  //   return tmp
  // }

  // getWeight(player: number, cell1: number, cell2: number, cell3: number, cell4: number): number {
  //   let tmpp = 0
  //   let tmpb = 0
  //   let tmpe = 0
  //   if (player == cell1) {
  //     tmpp++
  //   } else if (OtherUtil.getRival(player) == cell1) {
  //     tmpe++
  //   } else if (cell1 == 0) {
  //     tmpb++
  //   }
  //   if (player == cell2) {
  //     tmpp++
  //   } else if (OtherUtil.getRival(player) == cell2) {
  //     tmpe++
  //   } else if (cell2 == 0) {
  //     tmpb++
  //   }
  //   if (player == cell3) {
  //     tmpp++
  //   } else if (OtherUtil.getRival(player) == cell3) {
  //     tmpe++
  //   } else if (cell3 == 0) {
  //     tmpb++
  //   }
  //   if (player == cell4) {
  //     tmpp++
  //   } else if (OtherUtil.getRival(player) == cell4) {
  //     tmpe++
  //   } else if (cell4 == 0) {
  //     tmpb++
  //   }

  //   if (tmpp == 1 && tmpb == 3) {
  //     return this.deskWeight[1]
  //   }
  //   if (tmpp == 2 && tmpb == 2) {
  //     return this.deskWeight[2]
  //   }
  //   if (tmpp == 3 && tmpb == 3) {
  //     return this.deskWeight[3]
  //   }
  //   if (tmpe == 1 && tmpb == 3) {
  //     return this.deskWeight[4]
  //   }
  //   if (tmpe == 2 && tmpb == 2) {
  //     return this.deskWeight[5]
  //   }
  //   if (tmpe == 3 && tmpb == 3) {
  //     return this.deskWeight[6]
  //   }
  //   if (tmpb == 4) {
  //     return this.deskWeight[0]
  //   }
  //   return 0
  // }

  // //左上右下
  // lurdWeight(deskData: GameData10_3, x: number, y: number): number {
  //   let tmp = 0
  //   for (let i = -3; i <= 0; i++) {
  //     //查询四元组
  //     let x1 = x + i
  //     let x2 = x + i + 1
  //     let x3 = x + i + 2
  //     let x4 = x + i + 3
  //     let y1 = y + i
  //     let y2 = y + i + 1
  //     let y3 = y + i + 2
  //     let y4 = y + i + 3
  //     if (!(this.vaildXy(x1, y1) == -1 ||
  //       this.vaildXy(x2, y2) == -1 ||
  //       this.vaildXy(x3, y3) == -1 ||
  //       this.vaildXy(x4, y4) == -1)) {

  //       const tcell1 = deskData.desk[x1][y1]
  //       const tcell2 = deskData.desk[x2][y2]
  //       const tcell3 = deskData.desk[x3][y3]
  //       const tcell4 = deskData.desk[x4][y4]
  //       tmp += this.getWeight(deskData.player, tcell1, tcell2, tcell3, tcell4)
  //       // console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 得分：%s ", x, y, x1, y1, x2, y2, x3, y3, x4, y4, tmp)
  //       // } else {
  //       // console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 不合规", x, y, x1, y1, x2, y2, x3, y3, x4, y4)
  //     }
  //   }
  //   return tmp
  // }

  // ruldWeight(deskData: GameData10_3, x: number, y: number): number {
  //   let tmp = 0
  //   for (let i = -3; i <= 0; i++) {
  //     let x1 = x + i
  //     let x2 = x + i + 1
  //     let x3 = x + i + 2
  //     let x4 = x + i + 3
  //     let y1 = y - i
  //     let y2 = y - i - 1
  //     let y3 = y - i - 2
  //     let y4 = y - i - 3
  //     //查询四元组
  //     if (!(this.vaildXy(x1, y1) == -1 ||
  //       this.vaildXy(x2, y2) == -1 ||
  //       this.vaildXy(x3, y3) == -1 ||
  //       this.vaildXy(x4, y4) == -1)) {
  //       const tcell1 = deskData.desk[x1][y1]
  //       const tcell2 = deskData.desk[x2][y2]
  //       const tcell3 = deskData.desk[x3][y3]
  //       const tcell4 = deskData.desk[x4][y4]
  //       tmp += this.getWeight(deskData.player, tcell1, tcell2, tcell3, tcell4)
  //       //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 得分：%s ", x, y, x1, y1, x2, y2, x3, y3, x4, y4, tmp)
  //       // } else {
  //       //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 不合规", x, y, x1, y1, x2, y2, x3, y3, x4, y4)
  //     }
  //   }
  //   return tmp
  // }

  // leftRightWeight(deskData: GameData10_3, x: number, y: number): number {
  //   let tmp = 0
  //   for (let i = -3; i <= 0; i++) {
  //     let y1 = y + i
  //     let y2 = y + 1
  //     let y3 = y + 2
  //     let y4 = y + 3
  //     //查询四元组
  //     if (!(this.vaildXy(x, y1) == -1 ||
  //       this.vaildXy(x, y2) == -1 ||
  //       this.vaildXy(x, y3) == -1 ||
  //       this.vaildXy(x, y4) == -1)) {

  //       const tcell1 = deskData.desk[x][y1]
  //       const tcell2 = deskData.desk[x][y2]
  //       const tcell3 = deskData.desk[x][y3]
  //       const tcell4 = deskData.desk[x][y4]
  //       tmp += this.getWeight(deskData.player, tcell1, tcell2, tcell3, tcell4)
  //       //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 得分：%s ", x, y, x, y1, x, y2, x, y3, x, y4, tmp)
  //       // } else {
  //       //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 不合规", x, y, x, y1, x, y2, x, y3, x, y4)
  //     }
  //   }
  //   return tmp
  // }

  // upDownWeight(deskData: GameData10_3, x: number, y: number): number {
  //   let tmp = 0
  //   for (let i = -3; i <= 0; i++) {
  //     //查询四元组
  //     let x1 = x + i
  //     let x2 = x + i + 1
  //     let x3 = x + i + 2
  //     let x4 = x + i + 3
  //     if (!(this.vaildXy(x1, y) == -1 ||
  //       this.vaildXy(x2, y) == -1 ||
  //       this.vaildXy(x3, y) == -1 ||
  //       this.vaildXy(x4, y) == -1)) {

  //       const tcell1 = deskData.desk[x1][y]
  //       const tcell2 = deskData.desk[x2][y]
  //       const tcell3 = deskData.desk[x3][y]
  //       const tcell4 = deskData.desk[x4][y]
  //       tmp += this.getWeight(deskData.player, tcell1, tcell2, tcell3, tcell4)
  //       //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 得分：%s ", x, y, x1, y, x2, y, x3, y, x4, y, tmp)
  //       // } else {
  //       //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 不合规", x, y, x1, y, x2, y, x3, y, x4, y)
  //     }
  //   }
  //   return tmp
  // }



  // check(deskData: GameData10_3, x: number, y: number): number {
  //   let tmp = 0
  //   tmp = this.lurd(deskData, x, y)
  //   if (tmp != 0) {
  //     return tmp
  //   }
  //   tmp = this.ruld(deskData, x, y)
  //   if (tmp != 0) {
  //     return tmp
  //   }
  //   tmp = this.leftRight(deskData, x, y)
  //   if (tmp != 0) {
  //     return tmp
  //   }
  //   tmp = this.upDown(deskData, x, y)
  //   if (tmp != 0) {
  //     return tmp
  //   }
  //   return 0
  // }

  // //左上右下
  // lurd(deskData: GameData10_3, x: number, y: number): number {
  //   let cell = deskData.desk[x][y]
  //   let link = 0
  //   if (cell != 0) {
  //     for (let index = 1; index <= 3; index++) {
  //       const tx = x + 1
  //       const ty = y + 1
  //       if (this.vaildXy(tx, ty) == -1) {
  //         break;
  //       }
  //       const tcell = deskData.desk[tx][ty]
  //       if (cell != tcell) {
  //         break;
  //       } else {
  //         link++
  //       }
  //     }
  //     if (link == 4) {
  //       return cell
  //     } else {
  //       link = 0
  //     }
  //     for (let index = 1; index <= 3; index++) {
  //       const tx = x - 1
  //       const ty = y - 1
  //       if (this.vaildXy(tx, ty) == -1) {
  //         break;
  //       }
  //       const tcell = deskData.desk[tx][ty]
  //       if (cell != tcell) {
  //         break;
  //       } else {
  //         link++
  //       }
  //     }
  //     if (link == 4) {
  //       return cell
  //     }
  //   } else {
  //     return 0
  //   }
  //   return 0
  // }
  // ruld(deskData: GameData10_3, x: number, y: number): number {
  //   let cell = deskData.desk[x][y]
  //   let link = 0
  //   if (cell != 0) {
  //     for (let index = 1; index <= 3; index++) {
  //       const tx = x + 1
  //       const ty = y - 1
  //       if (this.vaildXy(tx, ty) == -1) {
  //         break;
  //       }
  //       const tcell = deskData.desk[tx][ty]
  //       if (cell != tcell) {
  //         break;
  //       } else {
  //         link++
  //       }
  //     }
  //     if (link == 4) {
  //       return cell
  //     } else {
  //       link = 0
  //     }
  //     for (let index = 1; index <= 3; index++) {
  //       const tx = x - 1
  //       const ty = y + 1
  //       if (this.vaildXy(tx, ty) == -1) {
  //         break;
  //       }
  //       const tcell = deskData.desk[tx][ty]
  //       if (cell != tcell) {
  //         break;
  //       } else {
  //         link++
  //       }
  //     }
  //     if (link == 4) {
  //       return cell
  //     }
  //   } else {
  //     return 0
  //   }
  //   return 0
  // }
  // leftRight(deskData: GameData10_3, x: number, y: number): number {
  //   let cell = deskData.desk[x][y]
  //   let link = 0
  //   if (cell != 0) {
  //     for (let index = 1; index <= 3; index++) {
  //       const tx = x + 1
  //       const ty = y
  //       if (this.vaildXy(tx, ty) == -1) {
  //         break;
  //       }
  //       const tcell = deskData.desk[tx][ty]
  //       if (cell != tcell) {
  //         break;
  //       } else {
  //         link++
  //       }
  //     }
  //     if (link == 4) {
  //       return cell
  //     } else {
  //       link = 0
  //     }
  //     for (let index = 1; index <= 3; index++) {
  //       const tx = x - 1
  //       const ty = y
  //       if (this.vaildXy(tx, ty) == -1) {
  //         break;
  //       }
  //       const tcell = deskData.desk[tx][ty]
  //       if (cell != tcell) {
  //         break;
  //       } else {
  //         link++
  //       }
  //     }
  //     if (link == 4) {
  //       return cell
  //     }
  //   } else {
  //     return 0
  //   }
  //   return 0
  // }
  // upDown(deskData: GameData10_3, x: number, y: number): number {
  //   let cell = deskData.desk[x][y]
  //   let link = 0
  //   if (cell != 0) {
  //     for (let index = 1; index <= 3; index++) {
  //       const tx = x
  //       const ty = y + 1
  //       if (this.vaildXy(tx, ty) == -1) {
  //         break;
  //       }
  //       const tcell = deskData.desk[tx][ty]
  //       if (cell != tcell) {
  //         break;
  //       } else {
  //         link++
  //       }
  //     }
  //     if (link == 4) {
  //       return cell
  //     } else {
  //       link = 0
  //     }
  //     for (let index = 1; index <= 3; index++) {
  //       const tx = x
  //       const ty = y - 1
  //       const tcell = deskData.desk[tx][ty]
  //       if (this.vaildXy(tx, ty) == -1) {
  //         break;
  //       }
  //       if (cell != tcell) {
  //         break;
  //       } else {
  //         link++
  //       }
  //     }
  //     if (link == 4) {
  //       return cell
  //     }
  //   } else {
  //     return 0
  //   }
  //   return 0
  // }

}