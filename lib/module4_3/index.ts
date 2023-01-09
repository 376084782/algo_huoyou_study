/**
 * @author jiutou
 * @updateTime 2022/11/29
 * @tip 4-3：加法游戏
 * @description 
 * 
三．挑战模式
1.参数默认值：两颗棋子的初始位置分别位于
1 和 2 上面【注意起始位置所对应的数的和不做标记，等先手移动一次后方可做标记】

2.参数范围： ①图一和图二结构和内容均固定不变
②两颗棋子的初始位置可以任意设置
③双方已经占领的数可以通过带颜色的标记任意设置

3.过程记录：给与红蓝两种颜色的标记，用于
游戏过程中即可，无其它过程记录要求
四．练习模式
电脑等级实现即可
 * 
 */
import { GameStep, GameWay, GameAutoWay } from '../common/pojo';
import RandomGenerater from '../util/RandomGenerater';
import OtherUtil from '../util/OtherUtil';
import { Console } from 'console';

export class GameData4_3 {
  //参数
  desk: number[][] = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]]
  chess1: number = 1
  chess2: number = 2
  player: number = 1

  constructor(player: number, chess1: number, chess2: number, desk?: number[][]) {
    this.player = player
    this.chess1 = chess1
    this.chess2 = chess2
    if (desk != undefined) {
      this.desk = desk
    }
  }
}
export class GameConfig4_3 {
  chess1: number = 1
  chess2: number = 2
  constructor(chess1?: number, chess2?: number) {
    if (chess1 != undefined) {
      this.chess1 = chess1
    } else {
      const rg = new RandomGenerater(0)
      this.chess1 = rg.RangeInteger(1, 12)
    }
    if (chess2 != undefined) {
      this.chess2 = chess2
    } else {
      const rg = new RandomGenerater(0)
      this.chess2 = rg.RangeInteger(1, 12)
      while (this.chess2 == this.chess1) {
        this.chess2 = rg.RangeInteger(1, 12)
      }
    }
  }
}

export class GameAction4_3 {
  //移动的子
  chessNum: number = 1
  //移动的子落得位置
  chessPosition: number = 2
  score: number = 0
  move: number[] = []
  constructor(chessNum: number, chessPosition: number, move: number[], score?: number) {
    this.chessNum = chessNum
    this.chessPosition = chessPosition
    this.move = move
    if (score != undefined) {
      this.score = score
    }
  }
}

export class GameStep4_1 {

}
export default class example4_3 {

  //元组权重
  deskWeight: number[] = [7, 100, 1000, 800000, 70, 599, 100000, 0, 0]
  // 空 7
  // B 100
  // BB 1000
  // BBBB 800000
  // W 70
  // WW 599
  // WWW 100000
  // Virtual 0
  // Polluted 0

  cdesk: number[][] = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
    [13, 14, 15, 16, 17, 18],
    [4, 19, 5, 20, 6, 21]
  ]
  deskMap = new Map<number, number[][]>([
    [1, [[0, 0]]], [2, [[0, 1]]], [3, [[0, 2]]], [4, [[0, 3], [5, 0]]], [5, [[0, 4], [5, 2]]], [6, [[0, 5], [5, 4]]],
    [7, [[1, 0]]], [8, [[1, 1]]], [9, [[1, 2]]], [10, [[1, 3]]], [11, [[1, 4]]], [12, [[1, 5]]],
    [13, [[2, 0]]], [14, [[2, 1]]], [15, [[2, 2]]], [16, [[2, 3]]], [17, [[2, 4]]], [18, [[2, 5]]],
    [19, [[3, 0]]], [20, [[3, 1]]], [21, [[3, 2]]], [22, [[3, 3]]], [23, [[3, 4]]], [24, [[3, 5]]],
  ]);

  getRiddleByLev(level: number, config: any): GameData4_3 {
    throw new Error("Method not implemented.");
  }

  getRiddle(config: GameConfig4_3): GameData4_3 {
    let gd = new GameData4_3(1, config.chess1, config.chess2, undefined);
    return gd
  }

  checkRiddle(deskData: GameData4_3): number {
    return 1
  }

  doAction(deskData: GameData4_3, dataAction: GameAction4_3): [flagResult: number, dataResult: GameData4_3] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    let flagResult = 0
    let xy: number[]
    let x = 0
    let y = 0
    let tmp: number = 0
    if (dataAction.chessNum == 1) {
      deskData.chess1 = dataAction.chessPosition
      tmp = deskData.chess2 * dataAction.chessPosition
    } else {
      deskData.chess2 = dataAction.chessPosition
      tmp = deskData.chess1 * dataAction.chessPosition
    }
    // xy = this.getPosition(tmp)
    deskData.desk[dataAction.move[0]][dataAction.move[1]] = deskData.player
    flagResult = this.checkDesk(deskData);
    deskData.player = OtherUtil.getRival(deskData.player)
    return [flagResult, deskData];
  }


  getPosition(value: number): number[][] {
    return this.deskMap.get(value) as number[][];
  }

  checkAction(deskData: GameData4_3, dataAction: GameAction4_3): number {
    if (dataAction.chessNum == 1) {
      if (deskData.chess1 == dataAction.chessPosition) {
        return -1;
      }
    }
    if (dataAction.chessNum == 2) {
      if (deskData.chess2 == dataAction.chessPosition) {
        return -1;
      }
    }
    let tmp = 0;
    if (dataAction.chessNum == 1) {
      tmp = deskData.chess2
    } else {
      tmp = deskData.chess1
    }
    if (dataAction.chessPosition + tmp != this.cdesk[dataAction.move[0]][dataAction.move[1]]) {
      // console.log('不一样的数字', this.cdesk[dataAction.move[0]][dataAction.move[1]], dataAction.chessPosition, tmp)
      return -1
    }
    if (dataAction.chessNum == 1) {
      // let tmp: number = deskData.chess2 * dataAction.chessPosition
      // let xy = this.getPosition(tmp)
      if (deskData.desk[dataAction.move[0]][dataAction.move[1]] != 0) {
        return -1;
      }
    } else if (dataAction.chessNum == 2) {
      // let tmp: number = deskData.chess1 * dataAction.chessPosition
      // let xy = this.getPosition(tmp)
      if (deskData.desk[dataAction.move[0]][dataAction.move[1]] != 0) {
        return -1;
      }
    } else {
      return -1;
    }
    return 1;
  }

  checkDesk(deskData: GameData4_3): number {
    for (let index = 0; index < deskData.desk.length; index++) {
      const row = deskData.desk[index];
      for (let j = 0; j < deskData.desk.length; j++) {
        const tmp = this.check(deskData, index, j)
        if (tmp != 0) {
          return tmp
        }
      }
    }

    let canChessPositionMap = new Map<string, GameAction4_3[]>()
    let canChessPosition = new Set<number[]>()
    for (let index = 1; index <= 9; index++) {
      if (index != deskData.chess1) {
        let tmp = this.getPosition(index + deskData.chess1)
        for (let j = 0; j < tmp.length; j++) {
          const move = tmp[j];
          if (!this.deskHas(deskData, move)) {
            canChessPosition.add(move)
            if (canChessPositionMap.has(move[0] + "_" + move[1])) {
              canChessPositionMap.get(move[0] + "_" + move[1])?.push(new GameAction4_3(2, index, move))
            } else {
              canChessPositionMap.set(move[0] + "_" + move[1], [new GameAction4_3(2, index, move)])
            }
          }
        }
      }
      if (index != deskData.chess2) {
        let tmp = this.getPosition(index + deskData.chess1)
        for (let j = 0; j < tmp.length; j++) {
          const move = tmp[j];
          if (!this.deskHas(deskData, move)) {
            canChessPosition.add(move)
            if (canChessPositionMap.has(move[0] + "_" + move[1])) {
              canChessPositionMap.get(move[0] + "_" + move[1])?.push(new GameAction4_3(1, index, move))
            } else {
              canChessPositionMap.set(move[0] + "_" + move[1], [new GameAction4_3(1, index, move)])
            }
          }
        }
      }
    }
    if (canChessPosition.size == 0) {
      return OtherUtil.getRival(deskData.player)
    }
    return 0
  }

  deskHas(deskData: GameData4_3, move: number[]): boolean {
    // let xy = this.getPosition(tmp)
    return !(deskData.desk[move[0]][move[1]] == 0)
  }

  // getActionAuto3(deskData: GameData4_3): GameAction4_3 {
  // let tmp = this.getActionAutoRecursive(deskData)
  // return new GameAction4_3(1, 1)
  // }
  // getActionAutoRecursive(deskData: GameData4_3, lastTimeSteps: GameAction4_3[], count: number, countn: number): GameAction4_3 {
  getActionAutoRecursive(deskData: GameData4_3): GameAction4_3 {
    let weight: GameAction4_3[] = []
    let canChessPositionMap = new Map<string, GameAction4_3[]>()
    let canChessPosition = new Set<number[]>()
    //遍历所有
    for (let index = 1; index <= 12; index++) {
      if (index != deskData.chess1) {
        let tmp = this.getPosition(index + deskData.chess1)
        for (let j = 0; j < tmp.length; j++) {
          const move = tmp[j];
          if (!this.deskHas(deskData, move)) {
            canChessPosition.add(move)
            if (canChessPositionMap.has(move[0] + "_" + move[1])) {
              canChessPositionMap.get(move[0] + "_" + move[1])?.push(new GameAction4_3(2, index, move))
            } else {
              canChessPositionMap.set(move[0] + "_" + move[1], [new GameAction4_3(2, index, move)])
            }
          }
        }
      }
      if (index != deskData.chess2) {
        let tmp = this.getPosition(index + deskData.chess1)
        for (let j = 0; j < tmp.length; j++) {
          const move = tmp[j];
          if (!this.deskHas(deskData, move)) {
            canChessPosition.add(move)
            if (canChessPositionMap.has(move[0] + "_" + move[1])) {
              canChessPositionMap.get(move[0] + "_" + move[1])?.push(new GameAction4_3(1, index, move))
            } else {
              canChessPositionMap.set(move[0] + "_" + move[1], [new GameAction4_3(1, index, move)])
            }
          }
        }
      }
    }
    canChessPosition.forEach(move => {
      weight.push(new GameAction4_3(move[0], move[1], move, this.calculateTheWeightXy(deskData, move[0], move[1])))
    })
    let steps = weight.sort((a, b) => {
      if (a.score < b.score)
        return 1;
      if (a.score > b.score)
        return -1
      return 0;
    });
    if (steps.length == 0) {
      throw new Error("无子可走");
    }
    let best: GameAction4_3 = steps[0];
    if (canChessPositionMap.has(best.move[0] + "_" + best.move[1])) {
      const tmpArr = canChessPositionMap.get(best.move[0] + "_" + best.move[1]) as GameAction4_3[]
      const rg = new RandomGenerater(0)
      const s = tmpArr[rg.RangeInteger(0, tmpArr.length)]
      return s
    }
    throw new Error("无子可走");
  }

  getActionAuto(deskData: GameData4_3): GameAutoWay {
    let weight: GameAction4_3[] = []
    let canChessPositionMap = new Map<string, GameAction4_3[]>()
    let canChessPosition = new Set<number[]>()
    for (let index = 1; index <= 12; index++) {
      if (index != deskData.chess1) {
        let tmp = this.getPosition(index + deskData.chess1)
        for (let j = 0; j < tmp.length; j++) {
          const move = tmp[j];
          if (!this.deskHas(deskData, move)) {
            canChessPosition.add(move)
            if (canChessPositionMap.has(move[0] + "_" + move[1])) {
              canChessPositionMap.get(move[0] + "_" + move[1])?.push(new GameAction4_3(2, index, move))
            } else {
              canChessPositionMap.set(move[0] + "_" + move[1], [new GameAction4_3(2, index, move)])
            }
          }
        }
      }
      if (index != deskData.chess2) {
        let tmp = this.getPosition(index + deskData.chess2)
        for (let j = 0; j < tmp.length; j++) {
          const move = tmp[j];
          if (!this.deskHas(deskData, move)) {
            canChessPosition.add(move)
            if (canChessPositionMap.has(move[0] + "_" + move[1])) {
              canChessPositionMap.get(move[0] + "_" + move[1])?.push(new GameAction4_3(1, index, move))
            } else {
              canChessPositionMap.set(move[0] + "_" + move[1], [new GameAction4_3(1, index, move)])
            }
          }
        }
      }
    }
    canChessPosition.forEach(move => {
      weight.push(new GameAction4_3(move[0], move[1], move, this.calculateTheWeightXy(deskData, move[0], move[1])))
    })
    let steps = weight.sort((a, b) => {
      if (a.score < b.score)
        return 1;
      if (a.score > b.score)
        return -1
      return 0;
    });
    if (steps.length == 0) {
      throw new Error("无子可走");
    }
    let best: GameAction4_3 = steps[0];
    let nobest: GameAction4_3
    if (steps[0].score > 1000) {
      nobest = best;
    }

    if (canChessPositionMap.has(best.move[0] + "_" + best.move[1])) {
      const tmpArr = canChessPositionMap.get(best.move[0] + "_" + best.move[1]) as GameAction4_3[]
      const rg = new RandomGenerater(0)
      const s = tmpArr[rg.RangeInteger(0, tmpArr.length)]
      return new GameAutoWay(s, s)
    }
    throw new Error("无子可走");
  }

  // ==============================================================================================================================

  calculateTheWeightXy(deskData: GameData4_3, x: number, y: number): number {
    let tmp = 0
    tmp += this.lurdWeight(deskData, x, y)
    tmp += this.ruldWeight(deskData, x, y)
    tmp += this.leftRightWeight(deskData, x, y)
    tmp += this.upDownWeight(deskData, x, y)
    return tmp
  }

  getWeight(player: number, cell1: number, cell2: number, cell3: number, cell4: number): number {
    let tmpp = 0
    let tmpb = 0
    let tmpe = 0
    if (player == cell1) {
      tmpp++
    } else if (OtherUtil.getRival(player) == cell1) {
      tmpe++
    } else if (cell1 == 0) {
      tmpb++
    }
    if (player == cell2) {
      tmpp++
    } else if (OtherUtil.getRival(player) == cell2) {
      tmpe++
    } else if (cell2 == 0) {
      tmpb++
    }
    if (player == cell3) {
      tmpp++
    } else if (OtherUtil.getRival(player) == cell3) {
      tmpe++
    } else if (cell3 == 0) {
      tmpb++
    }
    if (player == cell4) {
      tmpp++
    } else if (OtherUtil.getRival(player) == cell4) {
      tmpe++
    } else if (cell4 == 0) {
      tmpb++
    }

    if (tmpp == 1 && tmpb == 3) {
      return this.deskWeight[1]
    }
    if (tmpp == 2 && tmpb == 2) {
      return this.deskWeight[2]
    }
    if (tmpp == 3 && tmpb == 3) {
      return this.deskWeight[3]
    }
    if (tmpe == 1 && tmpb == 3) {
      return this.deskWeight[4]
    }
    if (tmpe == 2 && tmpb == 2) {
      return this.deskWeight[5]
    }
    if (tmpe == 3 && tmpb == 3) {
      return this.deskWeight[6]
    }
    if (tmpb == 4) {
      return this.deskWeight[0]
    }
    return 0
  }

  //左上右下
  lurdWeight(deskData: GameData4_3, x: number, y: number): number {
    let tmp = 0
    for (let i = -3; i <= 0; i++) {
      //查询四元组
      let x1 = x + i
      let x2 = x + i + 1
      let x3 = x + i + 2
      let x4 = x + i + 3
      let y1 = y + i
      let y2 = y + i + 1
      let y3 = y + i + 2
      let y4 = y + i + 3
      if (!(this.vaildXy(x1, y1) == -1 ||
        this.vaildXy(x2, y2) == -1 ||
        this.vaildXy(x3, y3) == -1 ||
        this.vaildXy(x4, y4) == -1)) {

        const tcell1 = deskData.desk[x1][y1]
        const tcell2 = deskData.desk[x2][y2]
        const tcell3 = deskData.desk[x3][y3]
        const tcell4 = deskData.desk[x4][y4]
        tmp += this.getWeight(deskData.player, tcell1, tcell2, tcell3, tcell4)
        // console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 得分：%s ", x, y, x1, y1, x2, y2, x3, y3, x4, y4, tmp)
        // } else {
        // console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 不合规", x, y, x1, y1, x2, y2, x3, y3, x4, y4)
      }
    }
    return tmp
  }

  ruldWeight(deskData: GameData4_3, x: number, y: number): number {
    let tmp = 0
    for (let i = -3; i <= 0; i++) {
      let x1 = x + i
      let x2 = x + i + 1
      let x3 = x + i + 2
      let x4 = x + i + 3
      let y1 = y - i
      let y2 = y - i - 1
      let y3 = y - i - 2
      let y4 = y - i - 3
      //查询四元组
      if (!(this.vaildXy(x1, y1) == -1 ||
        this.vaildXy(x2, y2) == -1 ||
        this.vaildXy(x3, y3) == -1 ||
        this.vaildXy(x4, y4) == -1)) {
        const tcell1 = deskData.desk[x1][y1]
        const tcell2 = deskData.desk[x2][y2]
        const tcell3 = deskData.desk[x3][y3]
        const tcell4 = deskData.desk[x4][y4]
        tmp += this.getWeight(deskData.player, tcell1, tcell2, tcell3, tcell4)
        //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 得分：%s ", x, y, x1, y1, x2, y2, x3, y3, x4, y4, tmp)
        // } else {
        //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 不合规", x, y, x1, y1, x2, y2, x3, y3, x4, y4)
      }
    }
    return tmp
  }

  leftRightWeight(deskData: GameData4_3, x: number, y: number): number {
    let tmp = 0
    for (let i = -3; i <= 0; i++) {
      let y1 = y + i
      let y2 = y + 1
      let y3 = y + 2
      let y4 = y + 3
      //查询四元组
      if (!(this.vaildXy(x, y1) == -1 ||
        this.vaildXy(x, y2) == -1 ||
        this.vaildXy(x, y3) == -1 ||
        this.vaildXy(x, y4) == -1)) {

        const tcell1 = deskData.desk[x][y1]
        const tcell2 = deskData.desk[x][y2]
        const tcell3 = deskData.desk[x][y3]
        const tcell4 = deskData.desk[x][y4]
        tmp += this.getWeight(deskData.player, tcell1, tcell2, tcell3, tcell4)
        //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 得分：%s ", x, y, x, y1, x, y2, x, y3, x, y4, tmp)
        // } else {
        //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 不合规", x, y, x, y1, x, y2, x, y3, x, y4)
      }
    }
    return tmp
  }

  upDownWeight(deskData: GameData4_3, x: number, y: number): number {
    let tmp = 0
    for (let i = -3; i <= 0; i++) {
      //查询四元组
      let x1 = x + i
      let x2 = x + i + 1
      let x3 = x + i + 2
      let x4 = x + i + 3
      if (!(this.vaildXy(x1, y) == -1 ||
        this.vaildXy(x2, y) == -1 ||
        this.vaildXy(x3, y) == -1 ||
        this.vaildXy(x4, y) == -1)) {

        const tcell1 = deskData.desk[x1][y]
        const tcell2 = deskData.desk[x2][y]
        const tcell3 = deskData.desk[x3][y]
        const tcell4 = deskData.desk[x4][y]
        tmp += this.getWeight(deskData.player, tcell1, tcell2, tcell3, tcell4)
        //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 得分：%s ", x, y, x1, y, x2, y, x3, y, x4, y, tmp)
        // } else {
        //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 不合规", x, y, x1, y, x2, y, x3, y, x4, y)
      }
    }
    return tmp
  }

  vaildXy(x: number, y: number): number {
    if (x > 5 || x < 0) {
      return -1
    }
    if (y > 5 || y < 0) {
      return -1
    }
    return 1
  }

  check(deskData: GameData4_3, x: number, y: number): number {
    let tmp = 0
    tmp = this.lurd(deskData, x, y)
    if (tmp != 0) {
      return tmp
    }
    tmp = this.ruld(deskData, x, y)
    if (tmp != 0) {
      return tmp
    }
    tmp = this.leftRight(deskData, x, y)
    if (tmp != 0) {
      return tmp
    }
    tmp = this.upDown(deskData, x, y)
    if (tmp != 0) {
      return tmp
    }
    return 0
  }

  //左上右下
  lurd(deskData: GameData4_3, x: number, y: number): number {
    let cell = deskData.desk[x][y]
    let link = 1
    if (cell != 0) {
      for (let index = 1; index <= 3; index++) {
        const tx = x + index
        const ty = y + index
        if (this.vaildXy(tx, ty) == -1) {
          break;
        }
        const tcell = deskData.desk[tx][ty]
        if (cell != tcell) {
          break;
        } else {
          link++
        }
      }
      if (link == 4) {
        return cell
      } else {
        link = 1
      }
      for (let index = 1; index <= 3; index++) {
        const tx = x - index
        const ty = y - index
        if (this.vaildXy(tx, ty) == -1) {
          break;
        }
        const tcell = deskData.desk[tx][ty]
        if (cell != tcell) {
          break;
        } else {
          link++
        }
      }
      if (link == 4) {
        return cell
      }
    } else {
      return 0
    }
    return 0
  }
  ruld(deskData: GameData4_3, x: number, y: number): number {
    let cell = deskData.desk[x][y]
    let link = 1

    if (cell != 0) {
      for (let index = 1; index <= 3; index++) {
        const tx = x + index
        const ty = y - index
        if (this.vaildXy(tx, ty) == -1) {
          break;
        }
        const tcell = deskData.desk[tx][ty]
        if (cell != tcell) {
          break;
        } else {
          link++
        }
      }
      if (link == 4) {
        return cell
      } else {
        link = 1
      }
      for (let index = 1; index <= 3; index++) {
        const tx = x - index
        const ty = y + index
        if (this.vaildXy(tx, ty) == -1) {
          break;
        }
        const tcell = deskData.desk[tx][ty]
        if (cell != tcell) {
          break;
        } else {
          link++
        }
      }
      if (link == 4) {
        return cell
      }
    } else {
      return 0
    }
    return 0
  }
  leftRight(deskData: GameData4_3, x: number, y: number): number {
    let cell = deskData.desk[x][y]
    let link = 1
    if (cell != 0) {
      for (let index = 1; index <= 3; index++) {
        const tx = x + index
        const ty = y
        if (this.vaildXy(tx, ty) == -1) {
          break;
        }
        const tcell = deskData.desk[tx][ty]
        if (cell != tcell) {
          break;
        } else {
          link++
        }
      }
      if (link == 4) {
        return cell
      } else {
        link = 1
      }
      for (let index = 1; index <= 3; index++) {
        const tx = x - index
        const ty = y
        if (this.vaildXy(tx, ty) == -1) {
          break;
        }
        const tcell = deskData.desk[tx][ty]
        if (cell != tcell) {
          break;
        } else {
          link++
        }
      }
      if (link == 4) {
        return cell
      }
    } else {
      return 0
    }
    return 0
  }
  upDown(deskData: GameData4_3, x: number, y: number): number {
    let cell = deskData.desk[x][y]
    let link = 1
    if (cell != 0) {
      for (let index = 1; index <= 3; index++) {
        const tx = x
        const ty = y + index
        if (this.vaildXy(tx, ty) == -1) {
          break;
        }
        const tcell = deskData.desk[tx][ty]
        if (cell != tcell) {
          break;
        } else {
          link++
        }
      }
      if (link == 4) {
        return cell
      } else {
        link = 1
      }
      for (let index = 1; index <= 3; index++) {
        const tx = x
        const ty = y - index
        const tcell = deskData.desk[tx][ty]
        if (this.vaildXy(tx, ty) == -1) {
          break;
        }
        if (cell != tcell) {
          break;
        } else {
          link++
        }
      }
      if (link == 4) {
        return cell
      }
    } else {
      return 0
    }
    return 0
  }

}