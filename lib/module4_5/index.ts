/**
 * @author jiutou
 * @updateTime 2022/11/29
 * @tip 4-5：数字拔河
 * @description 
 * 
一．挑战模式
1.参数默认值：①棋盘最大数字“13”；②棋子起始位置：0
2.参数范围：
①棋盘最大数字：10~20
②棋子起始位置：除了最大数以外的任意数之上。
3.过程记录：无
【操作方式：
①掷色子
②选择第一个数
③选择运算方式
④选择第 2 个数
⑤按确定后棋子按照结果移动或报错/同时按确定之前可以改变运算中两个数的前后关系和运算符号，但不能重新掷色子】
如果是选择减法，必须是大数在前
二．练习模式
最大数字固定为 13。
选择一些固定的残局按电脑等级实现即可
 * 
 */
import { GameStep, GameWay, GameAutoWay } from '../common/pojo';
import RandomGenerater from '../util/RandomGenerater';
import OtherUtil from '../util/OtherUtil';
import { Console } from 'console';

export class GameData4_5 {
  typeSet? = 1;//前端用的，存是否是自定义棋盘
  //参数
  n: number = 0
  max: number = 13
  player: number = 1

  constructor(player: number, n?: number, max?: number) {
    this.player = player
    if (max != undefined) {
      this.max = max
    }
    if (n != undefined) {
      this.n = n
    }
  }
}

export class GameAction4_5 {
  //随机数1 2
  k1: number = 1
  k2: number = 1
  //操作方式 1加2减3乘4除
  o: number = 1
  //移动的子落得位置
  constructor(k1: number, k2: number, o: number) {
    this.k1 = k1
    this.k2 = k2
    this.o = o
  }
}

export default class example4_5 {

  weightMap: Map<number, number> = new Map<number, number>([[0, 36],
  [1, 35],
  [2, 19],
  [3, 14],
  [4, 12],
  [5, 10],
  [6, 11],
  [7, 6],
  [8, 7],
  [9, 5],
  [10, 5],
  [11, 2],
  [12, 5],
  [15, 2],
  [16, 1],
  [18, 2],
  [20, 2],
  [24, 2],
  [25, 1],
  [30, 2],
  [36, 1],])

  getRiddleByLev(level: number, config: any): GameData4_5 {
    throw new Error("Method not implemented.");
  }

  getRiddle(n: number): GameData4_5 {
    return new GameData4_5(1, n);
  }

  checkRiddle(deskData: GameData4_5): number {
    if (this.checkDesk(deskData) != 0) {
      return -1
    }
    if (deskData.max < 10 || deskData.max > 20) {
      return -1
    }
    return 1
  }

  doAction(deskData: GameData4_5, dataAction: GameAction4_5): [flagResult: number, dataResult: GameData4_5] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    let flagResult = 0
    const n = this.getActionNumber(dataAction)
    if (deskData.player == 1 && (deskData.n + n) <= deskData.max) {
      deskData.n -= n
    } else if (deskData.player == 2 && (deskData.n - n) >= (deskData.max * -1)) {
      deskData.n += n
    } else {
      return [-1, deskData];
    }

    flagResult = this.checkDesk(deskData);
    deskData.player = OtherUtil.getRival(deskData.player)
    return [flagResult, deskData];
  }

  checkAction(deskData: GameData4_5, dataAction: GameAction4_5): number {
    if (dataAction.k1 <= 0 || dataAction.k1 > 6) {
      return -1;
    }
    if (dataAction.k2 <= 0 || dataAction.k2 > 6) {
      return -1;
    }
    if (dataAction.o == 2 && dataAction.k2 > dataAction.k1) {
      return -1;
    }
    return 1;
  }

  getActionNumber(dataAction: GameAction4_5): number {
    if (dataAction.o == 1) {
      return dataAction.k1 + dataAction.k2
    } else if (dataAction.o == 2) {
      return dataAction.k1 - dataAction.k2
    } else if (dataAction.o == 3) {
      return dataAction.k1 * dataAction.k2
    } else {
      return Math.floor(dataAction.k1 / dataAction.k2)
    }
  }

  checkDesk(deskData: GameData4_5): number {
    if (Math.abs(deskData.n) == deskData.max) {
      return deskData.player
    }
    return 0
  }


  getWeight(toEnd: number, k: number): number {
    if (toEnd == k) {
      return 100000
    }
    if (toEnd - k > 0) {
      if (this.weightMap.has(toEnd - k)) {
        return this.weightMap.get(toEnd - k) as number;
      }
    }
    return 0
  }

  getActionAuto(deskData: GameData4_5): GameAutoWay {

    let toEnd = deskData.player == 2 ? deskData.max - deskData.n : deskData.max + deskData.n;

    const rg = new RandomGenerater(0)
    const k1 = rg.RangeInteger(1, 7)
    const k2 = rg.RangeInteger(1, 7)
    let canNumber = []
    // 加
    let co1 = k1 + k2
    let weight1 = this.getWeight(toEnd, co1)
    canNumber.push([1, co1, k1, k2, weight1])
    // 减
    if (k1 > k2) {
      let co2 = k1 - k2
      let weight2 = this.getWeight(toEnd, co2);
      canNumber.push([2, co2, k1, k2, weight2])
    } else {
      let co2 = k2 - k1
      let weight2 = this.getWeight(toEnd, co2)
      canNumber.push([2, co2, k2, k1, weight2])
    }
    // 乘
    let co3 = k1 * k2
    let weight3 = this.getWeight(toEnd, co3);
    canNumber.push([3, co3, k1, k2, weight3])
    // 除
    let co41 = Math.floor(k1 / k2)
    let weight41 = this.getWeight(toEnd, co41);
    let co42 = Math.floor(k2 / k1)
    let weight42 = this.getWeight(toEnd, co42);
    canNumber.push([4, co41, k1, k2, weight41])
    canNumber.push([4, co42, k2, k1, weight42])

    canNumber = canNumber.sort((a, b) => {
      if ((a[4] as number) < (b[4] as number))
        return 1
      if ((a[4] as number) > (b[4] as number))
        return -1;
      return 0;
    });
    return new GameAutoWay(new GameAction4_5(canNumber[0][2], canNumber[0][3], canNumber[0][0]), new GameAction4_5(canNumber[1][2], canNumber[1][3], canNumber[1][0]))
  }

}