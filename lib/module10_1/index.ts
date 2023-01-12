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
    if (dataAction.x < 1 || dataAction.x > 6) {
      return -1
    }
    if (dataAction.y < 1 || dataAction.y > 6) {
      return -1
    }
    return 1;
  }

  checkDesk(deskData: GameData10_1): number {
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j < 6; j++) {
        if (deskData.desk[i][j] != 0) {
          return this.lurd(deskData, i, j) || this.ruld(deskData, i, j) || this.leftRight(deskData, i, j) || this.upDown(deskData, i, j) ? 1 : 0
        }
      }
    }
    return 0
  }

  getActionAuto(deskData: GameData10_1): GameAutoWay {
    const rg = new RandomGenerater(0)
    const x = rg.RangeInteger(1, 6)
    const y = rg.RangeInteger(1, 6)

    let deskDataTmp = JSON.parse(JSON.stringify(deskData));
    deskDataTmp = this.doAction(deskDataTmp, new GameAction10_1(x, y))
    if (this.lurd(deskDataTmp, x, y) || this.ruld(deskDataTmp, x, y) || this.leftRight(deskDataTmp, x, y) || this.upDown(deskDataTmp, x, y)) {
      return new GameAutoWay(new GameAction10_1(x, y), new GameAction10_1(x, y))
    } else if (deskData.desk[x][y] == deskData.player) {
      return new GameAutoWay(new GameAction10_1(x, y), new GameAction10_1(x, y))
    } else {
      return new GameAutoWay(new GameAction10_1(y, x), new GameAction10_1(y, x))
    }
  }

  // ==============================================================================================================================

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


}