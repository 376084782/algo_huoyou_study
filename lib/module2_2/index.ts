/**
 * @author jiutou
 * @updateTime 2022/11/28
 * @tip 颗粒归仓
 * @description 
 * 一．挑战模式
1.参数默认值：①颗粒数量：4 ②颗粒初始
位置：（1，0，1，0，1，1，0，0，0，0）

2.参数范围：①颗粒数量:[1，10] ②颗粒位
置：自主设置 ③格子长度：固定为 10

3.过程记录：无
二．练习模式【①【对于所有练习模式的题
目都是默认玩家先手，但玩家还是可以选择改
变先后手；②为描述方便把离仓库最近的格子
的位置叫 0，最远的叫 9，每道题即可用一个
数字和一个数组来表示】

一级：1 颗棋子：2，3，4，5，6，7，8，9
二级：2 颗棋子：（3，1）、（4，2）、（5，3）、（6，4）、（7，5）、（8，6）、（3，2）、（4，3）、（5，4）、（6，5）、（7，6）、（8，7）、（9，8）
三级：（7，1）、（8，1）、（9，1）、（7，2）、（8，2）、（9，2）、（9，3）、（8，3）、（7，3）、（8，4）、（9，5）、（9，6）
四级：3 颗棋子：（9，8，1）、（8，7，1）、（7，6，1）、（9，2，1）、（8，6，5）、（9，7，5）、（8，6，3）、（7，4，3）、（8，5，3）、（9，5，4）、（9，6，2）、（9，6，5）

游戏策略：
考虑棋子颗数的奇偶性，
如果是偶数颗，则按从前（位置数越小就是前）往后 2 颗一组，每组两颗棋子之间的间隔数就是这两颗棋子所对应的一个数，
如果是奇数颗棋子，则第一个数是离仓库最近的棋子所在的格子位置是几，就对应数几，其余又从前往后按 2 颗一组，该两颗棋子之间的间隔数就是这两颗棋子所对应的一个数。
这样不管是几颗棋子，都可以按上述方式得到一个数组。

必胜策略：对数组中的每个数进行二进制转化，并将转化后的二进制数进行求和，
求和过程中，如果二进制数的每一位上的 1 的个数都是偶数，则电脑随机操作，否则选择一种操作使得每一位的数字之和都变成偶数。
 * 
 */
import RandomGenerater from '../util/RandomGenerater';
import { GameAutoWay } from '../common/pojo';

export class GameData2_2 {
  //总数量
  sum = 4;
  //终点数量
  warehouse = 0;
  //当前选手 先手1 后手2
  player = 1;
  //点位
  positions: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  constructor(data?: {
    sum?: number,
    warehouse?: number,
    player?: number,
    positions?: number[],
  }) {
    this.warehouse = 0;
  }
}

export class GameConfig2_2 {
  positions: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  constructor(positions: number[]) {
    this.positions = positions;
  }
}

export class example2_2 {

  level2Positions: number[][] = [[3, 1], [4, 2], [5, 3], [6, 4], [7, 5], [8, 6], [3, 2], [4, 3], [5, 4], [6, 5], [7, 6], [8, 7], [9, 8]]
  level3Positions: number[][] = [[7, 1], [8, 1], [9, 1], [7, 2], [8, 2], [9, 2], [9, 3], [8, 3], [7, 3], [8, 4], [9, 5], [9, 6]]
  level4Positions: number[][] = [[9, 8, 1], [8, 7, 1], [7, 6, 1], [9, 2, 1], [8, 6, 5], [9, 7, 5], [8, 6, 3], [7, 4, 3], [8, 5, 3], [9, 5, 4], [9, 6, 2], [9, 6, 5]]

  getRiddleByLev(level: number, config: any): GameData2_2 {
    let gd = new GameData2_2({});
    const rg = new RandomGenerater(0)
    switch (level) {
      case 0:
        gd.positions[0] = 1;
        gd.positions[2] = 1;
        gd.positions[4] = 1;
        gd.positions[5] = 1;
        break;
      case 1:
        gd.positions[rg.RangeInteger(1, 9)] = 1;
        gd.warehouse = 3
        break;
      case 2:
      case 3:
        gd.warehouse = 2
      case 4:
        gd.warehouse = 1
        let tmp = new Array
        if (level == 2) {
          tmp = this.level2Positions[rg.RangeInteger(0, this.level2Positions.length)];
        } else if (level == 3) {
          tmp = this.level3Positions[rg.RangeInteger(0, this.level3Positions.length)];
        } else if (level == 4) {
          tmp = this.level4Positions[rg.RangeInteger(0, this.level4Positions.length)];
        }
        let i: number;
        for (i = 0; i < tmp.length; i++) {
          gd.positions[tmp[i]] = 1;
        }
        break;
      default:
        throw new Error("Method not implemented.");
    }
    return gd;
  }

  getRiddle(sum?: number, positions?: number[]): GameData2_2 {
    let gd = new GameData2_2({});
    if (positions != undefined) {
      gd.positions = positions
      gd.sum = positions.filter(x => x == 1).length
    } else if (sum != undefined) {
      if (sum > 4) {
        throw new Error("sum too long.");
      }
      gd.positions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      gd.sum = sum
      let count = sum
      while (count > 0) {
        const rg = new RandomGenerater(0)
        const p = rg.RangeInteger(0, 9)
        if (gd.positions[p] == 0) {
          gd.positions[p] = 1
          count--
        }
      }
    } else if (sum == undefined) {
      gd.sum = 4
      gd.positions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      let count = gd.sum
      while (count > 0) {
        const rg = new RandomGenerater(0)
        const p = rg.RangeInteger(0, 9)
        if (gd.positions[p] == 0) {
          gd.positions[p] = 1
          count--
        }
      }
    }
    return gd;
  }

  checkRiddle(deskData: GameData2_2): number {
    if (deskData.positions.filter(x => x == 1).length < 1) {
      return -1
    }
    return 1
  }

  doAction(deskData: GameData2_2, dataAction: number[]): [flagResult: number, dataResult: GameData2_2] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    let flagResult
    deskData.positions[dataAction[0]] = 0
    if (dataAction[1] > 9) {
      deskData.warehouse++
    } else {
      deskData.positions[dataAction[1]] = 1
    }

    if (deskData.positions.filter(x => x == 1).length == 0) {
      return [1, deskData];
    } else {
      return [0, deskData];
    }
  }

  checkAction(deskData: { positions: number[] }, dataAction: number[]): number {
    let positionStart = dataAction[0];
    let positionEnd = dataAction[1];

    if (positionStart < 0 || positionStart > 9 ||
      positionStart > positionEnd || deskData.positions[positionStart] != 1) {
      //开启不合法 or 结束不合法 or 不可倒退 or 开启点无子 
      return -1;
    }

    let i: number;
    let end: number;
    end = positionEnd > 9 ? 9 : positionEnd
    for (i = positionStart + 1; i <= end; i++) {
      if (deskData.positions[i] == 1) {
        //前端阻塞
        return -1;
      }
    }
    return 1;
  }

  checkDesk(deskData: GameData2_2): number {
    let i: number;
    for (i = 0; i < deskData.positions.length; i++) {
      if (deskData.positions[i] == 1) {
        return 0;
      }
    }
    return deskData.player;
  }

  binArr: number[][] = [[0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0], [0, 0, 1, 1], [0, 1, 0, 0], [0, 1, 0, 1], [0, 1, 1, 0], [0, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 1]]


  getActionAuto(deskData: GameData2_2): GameAutoWay {

    let positions = deskData.positions.filter(x => x == 1);
    if (positions.length == 1) {
      return new GameAutoWay([deskData.positions.findIndex(x => x == 1), 10], [deskData.positions.findIndex(x => x == 1), 10]);
    }
    const rg = new RandomGenerater(0)
    let count = this.computeDeskBin(deskData);
    if (count == 2) {
      let f = 0
      let s = 0
      for (let i = deskData.positions.length - 1; i >= 0; i--) {
        const cell = deskData.positions[i];
        if (cell == 1) {
          if (f == 0) {
            f = i
          } else {
            s = i
            break
          }
        }
      }
      if (s + 1 != f) {
        return new GameAutoWay([s, f - 1], [s, f - 1]);
      }
    }

    let allAction = this.randomAction(deskData)
    if (count % 2 == 0 && count > 2) {
      let tmp = 0
      for (let i = deskData.positions.length - 1; i >= 0; i--) {
        const element = deskData.positions[i];
        if (element == 1) {
          tmp = i
          break
        }
      }
      return new GameAutoWay([tmp, 10], [tmp, 10]);
    }
    let vaildAction: number[][] = new Array;
    let i: number;
    for (i = 0; i < allAction.length; i++) {
      let tmp = allAction[i]
      let tmpDeskData = JSON.parse(JSON.stringify(deskData));
      tmpDeskData.positions[tmp[0]] = 0
      tmpDeskData.positions[tmp[1]] = 1
      count = this.computeDeskBin(deskData);
      if (count % 2 == 0) {
        vaildAction.push(allAction[i])
      }
    }
    let best
    if (vaildAction.length > 0) {
      best = vaildAction[rg.RangeInteger(0, vaildAction.length - 1)]
    }
    best = allAction[rg.RangeInteger(0, allAction.length - 1)]

    return new GameAutoWay(best, best)
  }

  computeDeskBin(deskData: GameData2_2): number {
    let tmp: number[][] = []
    let tmpPoint1 = -1
    let tmpPoint2 = -1
    let distance = 0
    let i: number;
    for (i = 0; i < deskData.positions.length; i++) {
      if (deskData.positions[i] == 1) {
        if (tmpPoint1 == -1) {
          tmpPoint1 = i;
        } else if (tmpPoint2 == -1) {
          tmpPoint2 = i;
          distance = tmpPoint2 - tmpPoint1 - 1
          tmpPoint1 = -1
          tmpPoint2 = -1
          tmp.push(this.binArr[distance])
          distance = 0
        }
      }
    }
    if (tmpPoint1 != -1) {
      tmp.push(this.binArr[tmpPoint1])
    }
    let bin: number[] = []

    if (tmp.length == 1) {
      bin = tmp[0]
    } else {
      bin = this.binAdd(tmp[0], tmp[1])
    }

    let count = 0
    for (i = 0; i < bin.length; i++) {
      if (bin[i] == 1) {
        count = count + 1
      }
    }

    return count
  }

  randomAction(deskData: GameData2_2): number[][] {
    let allAction: number[][] = [];
    let start: number = 0;
    let end: number = 0;
    let i: number;
    let j: number;
    for (i = 0; i < deskData.positions.length; i++) {
      if (deskData.positions[i] == 1 && i == 9) {
        allAction.push([9, 10]);
      } else if (deskData.positions[i] == 1) {
        start = i;
        for (j = i + 1; i < deskData.positions.length; j++) {
          if (deskData.positions[j] == 0) {
            end = j;
            allAction.push([start, end]);
          } else {
            break
          }
        }
      }
    }
    return allAction;
  }

  binAdd(binArr1: number[], binArr2: number[]): number[] {
    let bin: number[] = [0, 0, 0, 0, 0, 0, 0]
    let i: number;
    binArr1 = binArr1.reverse()
    binArr2 = binArr2.reverse()
    for (i = 0; i < 4; i++) {
      bin[i] = bin[i] + binArr1[i] + binArr2[i]
    }

    for (i = 0; i < 4; i++) {
      if (bin[i] > 1) {
        bin[i + 1] = bin[i + 1] + bin[i] - 1
        bin[i] = 1
      }
    }
    return bin
  }
}