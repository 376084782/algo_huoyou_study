/**
 * @author jiutou
 * @updateTime 2022/11/29
 * @tip 三子棋
 * @description 
 一．挑战模式
1. 参数默认值：红蓝双方各 4 颗棋子，棋盘空置。
2. 参数范围：
a.棋子数量，棋盘结构固定不变 
b.双方棋子状态在符合规则的前提下可任意设置
3. 过程记录：无
二. 练习模式
用电脑等级实现
初始状态：
可手动设置
 * 
 */
import RandomGenerater from '../util/RandomGenerater';

class GameData2_2 {
  //总数量
  sum = 4;
  //终点数量
  warehouse = 0;
  //当前选手 先手1 后手2
  player = 1;
  //点位
  positions: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  constructor() {
    this.warehouse = 0;
  }
}

export default class example2_2 {

  level2Positions: number[][] = [[3, 1], [4, 2], [5, 3], [6, 4], [7, 5], [8, 6], [3, 2], [4, 3], [5, 4], [6, 5], [7, 6], [8, 7], [9, 8]]
  level3Positions: number[][] = [[7, 1], [8, 1], [9, 1], [7, 2], [8, 2], [9, 2], [9, 3], [8, 3], [7, 3], [8, 4], [9, 5], [9, 6]]
  level4Positions: number[][] = [[9, 8, 1], [8, 7, 1], [7, 6, 1], [9, 2, 1], [8, 6, 5], [9, 7, 5], [8, 6, 3], [7, 4, 3], [8, 5, 3], [9, 5, 4], [9, 6, 2], [9, 6, 5]]

  getRiddleByLev(level: number, config: any): GameData2_2 {
    let gd = new GameData2_2();
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

  getRiddle(config: any): GameData2_2 {
    //这个没有。
    throw new Error("Method not implemented.");
  }

  checkRiddle(deskData: GameData2_2): number {
    throw new Error("Method not implemented.");
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

  checkAction(deskData: GameData2_2, dataAction: number[]): number {
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
    return 1;
  }

  binArr: number[][] = [[0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0], [0, 0, 1, 1], [0, 1, 0, 0], [0, 1, 0, 1], [0, 1, 1, 0], [0, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 1]]


  getActionAuto(deskData: GameData2_2): number[] {
    let positions = deskData.positions.filter(x => x == 1);
    if (positions.length == 1) {
      return [deskData.positions.findIndex(x => x == 1), 10];
    }

    const rg = new RandomGenerater(0)
    let count = this.computeDeskBin(deskData);

    let allAction = this.randomAction(deskData)
    if (count % 2 == 0) {
      return allAction[rg.RangeInteger(0, allAction.length - 1)]
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
    if (vaildAction.length > 0) {
      return vaildAction[rg.RangeInteger(0, vaildAction.length - 1)]
    }
    return allAction[rg.RangeInteger(0, allAction.length - 1)]
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