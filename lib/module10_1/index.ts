/**
 * @author jiutou
 * @updateTime 2022/12/02
 * @tip 数对游戏
 * @description 
 * 
10-1 数对游戏
一．挑战模式
1. 初始默认值：棋盘空置即可
2. 参数范围：无其它参数
3. 过程记录：根据规则给与相应红蓝两种颜
色的标记即可
二．练习模式
电脑等级实现即可
 * 
 */
import { GameStep, GameWay, GameAutoWay } from '../common/pojo';
import RandomGenerater from '../util/RandomGenerater';
import OtherUtil from '../util/OtherUtil';
import { Console } from 'console';

export class GameData10_1 {
  //参数
  desk: number[][] = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]]
  player: number = 1

  constructor(player: number, desk?: number[][]) {
  }
}

export class GameAction10_1 {
  x: number = 0
  y: number = 0
  score: number = 0
  constructor(x: number, y: number, score?: number) {
    this.x = x
    this.y = y
    if (score != undefined) {
      this.score = score
    }
  }
}

export default class example10_1 {

  //元组权重
  deskWeight: number[] = [7, 100, 1000, 800000, 70, 600, 100000, 0, 0]
  // 空 7
  // B    100
  // BB   1000
  // BBB  800000
  // W    70
  // WW   600
  // WWW  100000
  // Virtual 0
  // Polluted 0

  getRiddleByLev(level: number, config: any): GameData10_1 {
    throw new Error("Method not implemented.");
  }

  getRiddle(config: any): GameData10_1 {
    let gd = new GameData10_1(1);
    return gd
  }


  doAction(deskData: GameData10_1, dataAction: GameAction10_1): [flagResult: number, dataResult: GameData10_1] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    deskData.desk[dataAction.x][dataAction.y] = deskData.player
    deskData.player = OtherUtil.getRival(deskData.player)
    return [this.checkDesk(deskData), deskData];
  }

  checkAction(deskData: GameData10_1, dataAction: GameAction10_1): number {
    if (dataAction.x < 0 || dataAction.x > 5) {
      return -1
    }
    if (dataAction.y < 0 || dataAction.y > 5) {
      return -1
    }
    return 1;
  }

  checkDesk(deskData: GameData10_1): number {
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j < 6; j++) {
        if (deskData.desk[i][j] != 0) {
          return this.lurd(deskData, i, j) || this.ruld(deskData, i, j) || this.leftRight(deskData, i, j) || this.upDown(deskData, i, j) ? deskData.desk[i][j] : 0
        }
      }
    }
    return 0
  }

  getActionAuto(deskData: GameData10_1): GameAutoWay {
    const rg = new RandomGenerater(0)
    const x = rg.RangeInteger(1, 6)
    const y = rg.RangeInteger(1, 6)
    console.info(x + "_" + y)
    let bs = this.calculateTheWeightXy(deskData, x, y)
    let nbs = this.calculateTheWeightXy(deskData, y, x)
    // if (this.lurd(deskDataTmp, x, y) || this.ruld(deskDataTmp, x, y) || this.leftRight(deskDataTmp, x, y) || this.upDown(deskDataTmp, x, y)) {
    //   return new GameAutoWay(new GameAction10_1(x, y), new GameAction10_1(x, y))
    // } else if (deskData.desk[x][y] == deskData.player) {
    //   return new GameAutoWay(new GameAction10_1(x, y), new GameAction10_1(x, y))
    // } else {
    //   return new GameAutoWay(new GameAction10_1(y, x), new GameAction10_1(y, x))
    // }
    if (bs > nbs) {
      return new GameAutoWay(new GameAction10_1(x, y), new GameAction10_1(x, y))
    } else if (bs == nbs && deskData.desk[x][y] == OtherUtil.getRival(deskData.player)) {
      return new GameAutoWay(new GameAction10_1(x, y), new GameAction10_1(x, y))
    } else if (bs == nbs && deskData.desk[y][x] == OtherUtil.getRival(deskData.player)) {
      return new GameAutoWay(new GameAction10_1(x, y), new GameAction10_1(x, y))
    } else {
      return new GameAutoWay(new GameAction10_1(y, x), new GameAction10_1(y, x))
    }
  }

  // ==============================================================================================================================

  calculateTheWeightXy(deskData: GameData10_1, x: number, y: number): number {
    let tmp = 0
    tmp += this.lurdWeight(deskData, x - 1, y - 1)
    tmp += this.ruldWeight(deskData, x - 1, y - 1)
    tmp += this.leftRightWeight(deskData, x - 1, y - 1)
    tmp += this.upDownWeight(deskData, x - 1, y - 1)
    return tmp
  }
  //左上右下
  lurdWeight(deskData: GameData10_1, x: number, y: number): number {
    let tmp = 0
    for (let i = -3; i <= 0; i++) {
      //查询四元组
      let x1 = x + i
      let x2 = x + i + 1
      let x3 = x + i + 2
      let y1 = y + i
      let y2 = y + i + 1
      let y3 = y + i + 2
      if (this.vaildXy(x1, y1) && this.vaildXy(x2, y2) && this.vaildXy(x3, y3)) {
        const tcell1 = deskData.desk[x1][y1]
        const tcell2 = deskData.desk[x2][y2]
        const tcell3 = deskData.desk[x3][y3]
        tmp += this.getWeight(deskData.player, tcell1, tcell2, tcell3)
        // console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 得分：%s ", x, y, x1, y1, x2, y2, x3, y3, x4, y4, tmp)
        // } else {
        // console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 不合规", x, y, x1, y1, x2, y2, x3, y3, x4, y4)
      }
    }
    return tmp
  }

  ruldWeight(deskData: GameData10_1, x: number, y: number): number {
    let tmp = 0
    for (let i = -3; i <= 0; i++) {
      let x1 = x + i
      let x2 = x + i + 1
      let x3 = x + i + 2
      let y1 = y - i
      let y2 = y - i - 1
      let y3 = y - i - 2
      //查询四元组
      if (this.vaildXy(x1, y1) && this.vaildXy(x2, y2) && this.vaildXy(x3, y3)) {
        const tcell1 = deskData.desk[x1][y1]
        const tcell2 = deskData.desk[x2][y2]
        const tcell3 = deskData.desk[x3][y3]
        tmp += this.getWeight(deskData.player, tcell1, tcell2, tcell3)
        //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 得分：%s ", x, y, x1, y1, x2, y2, x3, y3, x4, y4, tmp)
        // } else {
        //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 不合规", x, y, x1, y1, x2, y2, x3, y3, x4, y4)
      }
    }
    return tmp
  }

  leftRightWeight(deskData: GameData10_1, x: number, y: number): number {
    let tmp = 0
    for (let i = -3; i <= 0; i++) {
      let y1 = y + i
      let y2 = y + 1
      let y3 = y + 2
      //查询四元组
      if (this.vaildXy(x, y1) && this.vaildXy(x, y2) && this.vaildXy(x, y3)) {
        const tcell1 = deskData.desk[x][y1]
        const tcell2 = deskData.desk[x][y2]
        const tcell3 = deskData.desk[x][y3]
        tmp += this.getWeight(deskData.player, tcell1, tcell2, tcell3)
        //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 得分：%s ", x, y, x, y1, x, y2, x, y3, x, y4, tmp)
        // } else {
        //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 不合规", x, y, x, y1, x, y2, x, y3, x, y4)
      }
    }
    return tmp
  }

  upDownWeight(deskData: GameData10_1, x: number, y: number): number {
    let tmp = 0
    for (let i = -3; i <= 0; i++) {
      //查询四元组
      let x1 = x + i
      let x2 = x + i + 1
      let x3 = x + i + 2
      if (this.vaildXy(x1, y) && this.vaildXy(x2, y) && this.vaildXy(x3, y)) {
        const tcell1 = deskData.desk[x1][y]
        const tcell2 = deskData.desk[x2][y]
        const tcell3 = deskData.desk[x3][y]
        tmp += this.getWeight(deskData.player, tcell1, tcell2, tcell3)
        //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 得分：%s ", x, y, x1, y, x2, y, x3, y, x4, y, tmp)
        // } else {
        //   console.info("点位 %s %s 校验四元组：%s_%s,%s_%s,%s_%s,%s_%s 不合规", x, y, x1, y, x2, y, x3, y, x4, y)
      }
    }
    return tmp
  }


  vaildXy(x: number, y: number): boolean {
    if (x > 5 || x < 0) {
      return false
    }
    if (y > 5 || y < 0) {
      return false
    }
    return true
  }

  lurd(deskData: GameData10_1, x: number, y: number): boolean {
    let cell = deskData.desk[x][y]
    if (cell != 0) {
      for (let i = -1; i <= 1; i++) {
        const tx1 = x + (i + 1)
        const ty1 = y + (i + 1)
        const tx2 = x + i
        const ty2 = y + i
        const tx3 = x + (i - 1)
        const ty3 = y + (i - 1)
        if (!this.vaildXy(tx1, ty1) || !this.vaildXy(tx2, ty2) || !this.vaildXy(tx3, ty3)) {
          break;
        }
        const tcell1 = deskData.desk[tx1][ty1]
        const tcell2 = deskData.desk[tx2][ty2]
        const tcell3 = deskData.desk[tx3][ty3]
        if (tcell1 == tcell2 && tcell1 == tcell3) {
          return true
        }
      }
    }
    return false
  }

  ruld(deskData: GameData10_1, x: number, y: number): boolean {
    let cell = deskData.desk[x][y]
    if (cell != 0) {
      for (let i = -1; i <= 1; i++) {
        const tx1 = x - (i + 1)
        const ty1 = y + (i + 1)
        const tx2 = x - i
        const ty2 = y + i
        const tx3 = x - (i - 1)
        const ty3 = y + (i - 1)
        if (!this.vaildXy(tx1, ty1) || !this.vaildXy(tx2, ty2) || !this.vaildXy(tx3, ty3)) {
          break;
        }
        const tcell1 = deskData.desk[tx1][ty1]
        const tcell2 = deskData.desk[tx2][ty2]
        const tcell3 = deskData.desk[tx3][ty3]
        if (tcell1 == tcell2 && tcell1 == tcell3) {
          return true
        }
      }
    }
    return false
  }
  leftRight(deskData: GameData10_1, x: number, y: number): boolean {
    let cell = deskData.desk[x][y]
    if (cell != 0) {
      for (let i = -1; i <= 1; i++) {
        const ty1 = y + (i + 1)
        const ty2 = y + i
        const ty3 = y + (i - 1)
        if (!this.vaildXy(x, ty1) || !this.vaildXy(x, ty2) || !this.vaildXy(x, ty3)) {
          break;
        }
        const tcell1 = deskData.desk[x][ty1]
        const tcell2 = deskData.desk[x][ty2]
        const tcell3 = deskData.desk[x][ty3]
        if (tcell1 == tcell2 && tcell1 == tcell3) {
          return true
        }
      }
    }
    return false
  }
  upDown(deskData: GameData10_1, x: number, y: number): boolean {
    let cell = deskData.desk[x][y]
    if (cell != 0) {
      for (let i = -1; i <= 1; i++) {
        const tx1 = x + (i + 1)
        const tx2 = x + i
        const tx3 = x + (i - 1)
        if (!this.vaildXy(tx1, y) || !this.vaildXy(tx2, y) || !this.vaildXy(tx3, y)) {
          break;
        }
        const tcell1 = deskData.desk[tx1][y]
        const tcell2 = deskData.desk[tx2][y]
        const tcell3 = deskData.desk[tx3][y]
        if (tcell1 == tcell2 && tcell1 == tcell3) {
          return true
        }
      }
    }
    return false
  }

  getWeight(player: number, cell1: number, cell2: number, cell3: number): number {
    let tmpp = 0
    let tmpb = 0
    let tmpe = 0
    if (player == cell1) {
      tmpp++
    } else if (OtherUtil.getRival(player) == cell1) {
      tmpb++
    } else if (cell1 == 0) {
      tmpe++
    }
    if (player == cell2) {
      tmpp++
    } else if (OtherUtil.getRival(player) == cell2) {
      tmpb++
    } else if (cell2 == 0) {
      tmpe++
    }
    if (player == cell3) {
      tmpp++
    } else if (OtherUtil.getRival(player) == cell3) {
      tmpb++
    } else if (cell3 == 0) {
      tmpe++
    }
    // [7, 100, 1000, 800000, 70, 599, 100000, 0, 0]
    if (tmpp == 1 && tmpe == 2) {
      return 100
    }
    if (tmpb == 1 && tmpe == 2) {
      return 70
    }
    if (tmpp == 2 && tmpe == 1) {
      return 10000
    }
    if (tmpb == 2 && tmpe == 1) {
      return 5000
    }
    if (tmpe == 3) {
      return 30
    }
    return 0
  }
}