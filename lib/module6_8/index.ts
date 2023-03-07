/**
 * @author jiutou
 * @updateTime 2022/12/02
 * @tip 6-8 移车出库
 * @description
 *
 一.挑战模式
 1.参数默认值：
 ①车库尺寸：6×5。
 ②车子位置（如图）
 ③界面：给出游戏界面的直观图
 2.参数范围：
 ①车库长固定为 6
 ②车库宽自定义[1,5]【宽的大小对应车的数量】
 ③车子位置自定义：以右图为例(2,3,1,2,4)【顺序为从上至下】
 ④界面：直观图
 【必胜策略：判断当前状态是否属于胜点集，如果是则随机操作，否则选择一种操作方式，使得操作后的状态属于胜点集。】
 以下是将游戏的所有状态按胜负点分类的过程。
 ①以 6×5 的 0，1 矩阵来刻画游戏状态，0 对应该位置没有棋子，1 对应有棋子，则游戏状态集 S 一共有 75=16807 个元素；
 ②全为 0 的矩阵是游戏的终点状态，也是游戏的最终胜点，W0；
 ③显然，只剩不多于 3 辆汽车且多处于最后一列位置时，游戏状态可直接转换为W0状态，把具有该属性的状态叫 L1；
 ④更新差集ΔS=S-L1-W0，继续对ΔS 中的每一个元素进行规则遍历，如果某个状态ai（i 有可能不唯一）实行任意一合法操作之后，所得到的状态都属于 L1，则该状态也属于必胜集，将其存入 W2；
 ⑤更新差集ΔS=ΔS-W2后，对ΔS 中的每一个元素进行规则遍历，即对ΔS 中每一个游戏状态逐一实行所有可能的操作，若某个状态 ai（i 可能不唯一）在实行规则遍历的过程中，存在某一种操作使得实行该操作后所得到的新状态 ai’属于 W2,则这个状态ai属于败点集，将这个状态存入 L3；
 ⑥重复④和⑤，直至ΔS 为空。
 *
 */
import { GameAutoWay } from '../common/pojo';
import RandomGenerater from '../util/RandomGenerater';
import OtherUtil from '../util/OtherUtil';
import { FileWriter } from '../common/FileWriter';
import exampleData6_8D1 from './datad1';
import exampleData6_8D2 from './datad2';
import exampleData6_8D3 from './datad3';
import exampleData6_8D4 from './datad4';
import exampleData6_8D5 from './datad5';

export class GameData6_8 {
  typeSet?= 1;//前端用的，存是否是自定义棋盘
  //参数
  desk: number[][] = [
    [0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0]]

  player: number = 1

  constructor(player: number, desk?: number[][]) {
    player = player
    if (desk != undefined) {
      this.desk = desk
    }
  }
}

// export class GameAction6_8 {
//   //操作的点位
//   action: number[]
//   //操作的点位拉取的数量
//   num: number
//   constructor(action: number[], num: number) {
//     this.action = action
//     this.num = num
//   }
// }

export default class example6_8 {

  // persistenceData: DeskData6_8 = new DeskData6_8()
  getRiddleByLev(level: number, config: any): GameData6_8 {
    throw new Error("Method not implemented.");
  }

  getRiddle(config: number): GameData6_8 {
    throw new Error("Method not implemented.");
  }

  checkRiddle(deskData: GameData6_8): number {
    if (deskData.desk.length >= 1 && deskData.desk.length <= 5) {
      return 1
    } else {
      return -1;
    }
  }

  checkDesk(deskData: GameData6_8): number {
    let count = 0
    for (let i = 0; i < deskData.desk.length; i++) {
      const row = deskData.desk[i]
      for (let j = 0; j < row.length; j++) {
        const parking = row[j];
        if (parking == 1) {
          count++
        }
      }
    }
    if (count == 0) {
      return deskData.player
    }
    return 0
  }

  checkAction(deskData: GameData6_8, dataAction: number[][]): number {
    if (dataAction.length > 3 || dataAction.length == 0) {
      return -1
    }
    for (let i = 0; i < dataAction.length; i++) {
      const action = dataAction[i];
      if (deskData.desk[action[0]][action[1]] == 0) {
        return -1
      }
    }
    return 1
  }

  doAction(deskData: GameData6_8, dataAction: number[][]): [flagResult: number, dataResult: GameData6_8] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    for (let i = 0; i < dataAction.length; i++) {
      const action = dataAction[i];
      deskData.desk[action[0]][action[1]] = 0
      if (action[1] != 5) {
        deskData.desk[action[0]][action[1] + 1] = 1
      }
    }
    let flagResult = this.checkDesk(deskData)
    deskData.player = OtherUtil.getRival(deskData.player)
    return [flagResult, deskData];
  }


  getActionAuto(deskData: GameData6_8): GameAutoWay {
    if (deskData.desk.length == 5) {
      return this.getActionAutoD5(deskData)
    } else if (deskData.desk.length == 4) {
      return this.getActionAutoD4(deskData)
    } else if (deskData.desk.length == 3) {
      return this.getActionAutoD3(deskData)
    } else if (deskData.desk.length == 2) {
      return this.getActionAutoD2(deskData)
    } else if (deskData.desk.length == 1) {
      return this.getActionAutoD1(deskData)
    }
    return new GameAutoWay(undefined, undefined)
  }

  getActionAutoD1(deskData: GameData6_8): GameAutoWay {
    const rg = new RandomGenerater(0)
    let deskTmp = JSON.parse(JSON.stringify(deskData.desk));
    const allAction: number[][][] = this.getAllAction(deskTmp)
    let deskStr = this.deskToStr(deskData.desk)
    const deskDatas = new exampleData6_8D1()
    let best: number[][] = []
    let nobest: number[][] = []
    if (deskDatas.d1w1.has(deskStr) ||
      deskDatas.d1w2.has(deskStr) ||
      deskDatas.d1w3.has(deskStr)) {
      best = allAction[rg.RangeInteger(0, allAction.length - 1)]
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    } else {
      for (let i = 0; i < allAction.length; i++) {
        const action = allAction[i];
        const dd = this.doAction(JSON.parse(JSON.stringify(deskData)), action);
        const dds = this.deskToStr(dd[1].desk);
        if (deskDatas.d1l1.has(dds) ||
          deskDatas.d1l2.has(dds) ||
          deskDatas.d1l3.has(dds)) {
          best = action
          break
        }
      }
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    }
    return new GameAutoWay(best, nobest)
  }

  getActionAutoD2(deskData: GameData6_8): GameAutoWay {
    const rg = new RandomGenerater(0)
    let deskTmp = JSON.parse(JSON.stringify(deskData.desk));
    const allAction: number[][][] = this.getAllAction(deskTmp)
    let deskStr = this.deskToStr(deskData.desk)
    const deskDatas = new exampleData6_8D2()
    let best: number[][] = []
    let nobest: number[][] = []
    if (deskDatas.d2w1.has(deskStr) ||
      deskDatas.d2w2.has(deskStr) ||
      deskDatas.d2w3.has(deskStr) ||
      deskDatas.d2w4.has(deskStr) ||
      deskDatas.d2w5.has(deskStr) ||
      deskDatas.d2w6.has(deskStr) ||
      deskDatas.d2w7.has(deskStr)) {
      best = allAction[rg.RangeInteger(0, allAction.length - 1)]
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    } else {
      for (let i = 0; i < allAction.length; i++) {
        const action = allAction[i];
        const dd = this.doAction(JSON.parse(JSON.stringify(deskData)), action);
        const dds = this.deskToStr(dd[1].desk);
        if (deskDatas.d2w1.has(dds) ||
          deskDatas.d2w2.has(dds) ||
          deskDatas.d2w3.has(dds) ||
          deskDatas.d2w4.has(dds) ||
          deskDatas.d2w5.has(dds) ||
          deskDatas.d2w6.has(dds) ||
          deskDatas.d2w7.has(dds)) {
          best = action
          break
        }
      }
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    }
    return new GameAutoWay(best, nobest)
  }

  getActionAutoD3(deskData: GameData6_8): GameAutoWay {
    const rg = new RandomGenerater(0)
    let deskTmp = JSON.parse(JSON.stringify(deskData.desk));
    const allAction: number[][][] = this.getAllAction(deskTmp)
    let deskStr = this.deskToStr(deskData.desk)
    const deskDatas = new exampleData6_8D3()
    let best: number[][] = []
    let nobest: number[][] = []
    if (deskDatas.d3w1.has(deskStr) ||
      deskDatas.d3w2.has(deskStr) ||
      deskDatas.d3w3.has(deskStr) ||
      deskDatas.d3w4.has(deskStr) ||
      deskDatas.d3w5.has(deskStr) ||
      deskDatas.d3w6.has(deskStr) ||
      deskDatas.d3w7.has(deskStr) ||
      deskDatas.d3w8.has(deskStr) ||
      deskDatas.d3w9.has(deskStr) ||
      deskDatas.d3w10.has(deskStr)) {
      best = allAction[rg.RangeInteger(0, allAction.length - 1)]
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    } else {
      for (let i = 0; i < allAction.length; i++) {
        const action = allAction[i];
        const dd = this.doAction(JSON.parse(JSON.stringify(deskData)), action);
        const dds = this.deskToStr(dd[1].desk);
        if (deskDatas.d3l2.has(dds) ||
          deskDatas.d3l3.has(dds) ||
          deskDatas.d3l4.has(dds) ||
          deskDatas.d3l5.has(dds) ||
          deskDatas.d3l6.has(dds) ||
          deskDatas.d3l7.has(dds) ||
          deskDatas.d3l8.has(dds) ||
          deskDatas.d3l9.has(dds) ||
          deskDatas.d3l10.has(dds)) {
          best = action
          break
        }
      }
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    }
    return new GameAutoWay(best, nobest)
  }

  getActionAutoD4(deskData: GameData6_8): GameAutoWay {
    const rg = new RandomGenerater(0)
    let deskTmp = JSON.parse(JSON.stringify(deskData.desk));
    const allAction: number[][][] = this.getAllAction(deskTmp)
    let deskStr = this.deskToStr(deskData.desk)
    const deskDatas = new exampleData6_8D4()
    let best: number[][] = []
    let nobest: number[][] = []
    if (deskDatas.d4w1.has(deskStr) ||
      deskDatas.d4w2.has(deskStr) ||
      deskDatas.d4w3.has(deskStr) ||
      deskDatas.d4w4.has(deskStr) ||
      deskDatas.d4w5.has(deskStr) ||
      deskDatas.d4w6.has(deskStr) ||
      deskDatas.d4w7.has(deskStr) ||
      deskDatas.d4w8.has(deskStr) ||
      deskDatas.d4w9.has(deskStr)) {
      best = allAction[rg.RangeInteger(0, allAction.length - 1)]
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    } else {
      for (let i = 0; i < allAction.length; i++) {
        const action = allAction[i];
        const dd = this.doAction(JSON.parse(JSON.stringify(deskData)), action);
        const dds = this.deskToStr(dd[1].desk);
        if (deskDatas.d4l1.has(dds) ||
          deskDatas.d4l2.has(dds) ||
          deskDatas.d4l3.has(dds) ||
          deskDatas.d4l4.has(dds) ||
          deskDatas.d4l5.has(dds) ||
          deskDatas.d4l6.has(dds) ||
          deskDatas.d4l7.has(dds) ||
          deskDatas.d4l8.has(dds) ||
          deskDatas.d4l9.has(dds)) {
          best = action
          break
        }
      }
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    }
    return new GameAutoWay(best, nobest)
  }

  getActionAutoD5(deskData: GameData6_8): GameAutoWay {
    const rg = new RandomGenerater(0)
    let deskTmp = JSON.parse(JSON.stringify(deskData.desk));
    const allAction: number[][][] = this.getAllAction(deskTmp)
    let deskStr = this.deskToStr(deskData.desk)
    const deskDatas = new exampleData6_8D5()
    let best: number[][] = []
    let nobest: number[][] = []
    if (deskDatas.d5w1.has(deskStr) ||
      deskDatas.d5w2.has(deskStr) ||
      deskDatas.d5w3.has(deskStr) ||
      deskDatas.d5w4.has(deskStr) ||
      deskDatas.d5w5.has(deskStr) ||
      deskDatas.d5w6.has(deskStr) ||
      deskDatas.d5w7.has(deskStr) ||
      deskDatas.d5w8.has(deskStr) ||
      deskDatas.d5w9.has(deskStr) ||
      deskDatas.d5w10.has(deskStr) ||
      deskDatas.d5w11.has(deskStr) ||
      deskDatas.d5w12.has(deskStr)) {
      best = allAction[rg.RangeInteger(0, allAction.length - 1)]
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    } else {
      for (let i = 0; i < allAction.length; i++) {
        const action = allAction[i];
        const dd = this.doAction(JSON.parse(JSON.stringify(deskData)), action);
        const dds = this.deskToStr(dd[1].desk);
        if (deskDatas.d5l1.has(dds) ||
          deskDatas.d5l2.has(dds) ||
          deskDatas.d5l3.has(dds) ||
          deskDatas.d5l4.has(dds) ||
          deskDatas.d5l5.has(dds) ||
          deskDatas.d5l6.has(dds) ||
          deskDatas.d5l7.has(dds) ||
          deskDatas.d5l8.has(dds) ||
          deskDatas.d5l9.has(dds) ||
          deskDatas.d5l10.has(dds) ||
          deskDatas.d5l11.has(dds) ||
          deskDatas.d5l12.has(dds)) {
          best = action
          break
        }
      }
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    }
    return new GameAutoWay(best, nobest)
  }

  merge(n1: Set<number[]>, n2: Set<number[]>): Set<number[]> {
    n2.forEach(v => {
      n1.add(v);
    })
    return n1;
  }

  getDesk(n: number): Set<number[][]> {
    let all: Set<number[][]> = new Set<number[][]>
    for (let i1 = -1; i1 < 6; i1++) {
      // for (let i2 = -1; i2 < 6; i2++) {
      // for (let i3 = -1; i3 < 6; i3++) {
      // for (let i4 = -1; i4 < 6; i4++) {
      // for (let i5 = -1; i5 < 6; i5++) {
      let desk: number[][] = []
      for (let i = 0; i < n; i++) {
        desk.push([0, 0, 0, 0, 0, 0])
      }
      if (i1 > -1) {
        desk[0][i1] = 1
      }
      // if (i2 > -1) {
      //   desk[1][i2] = 1
      // }
      // if (i3 > -1) {
      //   desk[2][i3] = 1
      // }
      // if (i4 > -1) {
      //   desk[3][i4] = 1
      // }
      // if (i5 > -1) {
      //   desk[4][i5] = 1
      // }
      all.add(desk)
      // }
      // }
      // }
      // }
    }
    return all;
  }
  getAllDesk(n: number): void {

    let alltmp: Set<number[][]> = this.getDesk(n);

    let allDesk: Map<string, number[][]> = new Map<string, number[][]>;
    alltmp.forEach(element => {
      console.info(1)
      allDesk.set(this.deskToStr(element), element)
    });
    const allDeskSize = allDesk.size
    // let w0: Set<string> = new Set<string>(["0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|"])
    let w0: Set<string> = new Set<string>(["0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|"])
    // let w0: Set<string> = new Set<string>(["0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|"])
    // let w0: Set<string> = new Set<string>(["0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|"])
    // let w0: Set<string> = new Set<string>(["0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|0_0_0_0_0_0_|"])
    let l1: Set<string> = new Set<string>()
    let w1: Set<string> = new Set<string>()
    let l2: Set<string> = new Set<string>()
    let w2: Set<string> = new Set<string>()
    let l3: Set<string> = new Set<string>()
    let w3: Set<string> = new Set<string>()
    let l4: Set<string> = new Set<string>()
    let w4: Set<string> = new Set<string>()
    let l5: Set<string> = new Set<string>()
    let w5: Set<string> = new Set<string>()
    let l6: Set<string> = new Set<string>()
    let w6: Set<string> = new Set<string>()
    let l7: Set<string> = new Set<string>()
    let w7: Set<string> = new Set<string>()
    let l8: Set<string> = new Set<string>()
    let w8: Set<string> = new Set<string>()
    let l9: Set<string> = new Set<string>()
    let w9: Set<string> = new Set<string>()
    let l10: Set<string> = new Set<string>()
    let w10: Set<string> = new Set<string>()
    let l11: Set<string> = new Set<string>()
    let w11: Set<string> = new Set<string>()
    let l12: Set<string> = new Set<string>()
    let w12: Set<string> = new Set<string>()
    let l13: Set<string> = new Set<string>()
    let w13: Set<string> = new Set<string>()
    let l14: Set<string> = new Set<string>()
    let w14: Set<string> = new Set<string>()

    let actionMap: Map<string, number[][][]> = new Map<string, number[][][]>

    let desks: Map<string, number[][]> = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        console.info(2)
        actionMap.set(key, this.getAllAction(value))
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str)) {
          l1.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w1.add(key)
      }
    })

    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str)
        ) {
          l2.add(key)
          break
        }
      }
    })

    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w2.add(key)
      }
    })

    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str)
        ) {
          l3.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w3.add(key)
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str)
        ) {
          l4.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w4.add(key)
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str)
        ) {
          l5.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w5.add(key)
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str)
        ) {
          l6.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w6.add(key)
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str)
        ) {
          l7.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w7.add(key)
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("l8 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str)
        ) {
          l8.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("w8 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w8.add(key)
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("l9 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str)
        ) {
          l9.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("w9 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w9.add(key)
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("l10 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str) ||
          w11.has(str) ||
          w12.has(str) ||
          w13.has(str) ||
          w14.has(str)
        ) {
          l10.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("w10 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str) ||
          l11.has(str) ||
          l12.has(str) ||
          l13.has(str) ||
          l14.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w10.add(key)
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("l11 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str) ||
          w11.has(str) ||
          w12.has(str) ||
          w13.has(str) ||
          w14.has(str)
        ) {
          l11.add(key)
          break
        }
      }
    })
    desks
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("w11 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str) ||
          l11.has(str) ||
          l12.has(str) ||
          l13.has(str) ||
          l14.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w11.add(key)
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("l12 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str) ||
          w11.has(str) ||
          w12.has(str) ||
          w13.has(str) ||
          w14.has(str)
        ) {
          l12.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("w12 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str) ||
          l11.has(str) ||
          l12.has(str) ||
          l13.has(str) ||
          l14.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w12.add(key)
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("l13 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str) ||
          w11.has(str) ||
          w12.has(str) ||
          w13.has(str) ||
          w14.has(str)
        ) {
          l13.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("w13 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str) ||
          l11.has(str) ||
          l12.has(str) ||
          l13.has(str) ||
          l14.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w13.add(key)
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("l14 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (w0.has(str) ||
          w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str) ||
          w11.has(str) ||
          w12.has(str) ||
          w13.has(str) ||
          w14.has(str)
        ) {
          l14.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("w14 desk:" + desks.size)
    desks.forEach((value, key) => {
      const allActionTmp: number[][][] = actionMap.get(key) as number[][][];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_8(1, JSON.parse(JSON.stringify(value))), action);
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str) ||
          l11.has(str) ||
          l12.has(str) ||
          l13.has(str) ||
          l14.has(str)
        ) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w14.add(key)
      }
    })

    console.info(1)
    console.info("lw all:" + (l1.size + w1.size + l2.size + w2.size + l3.size + w3.size + l4.size + w4.size + l5.size + w5.size + l6.size + w6.size + l7.size + w7.size + l8.size + w8.size + l9.size + w9.size + l10.size + w10.size + l11.size + w11.size + l12.size + w12.size + l13.size + w13.size + l14.size + w14.size))
    desks = new Map<string, number[][]>
    allDesk.forEach((value, key) => {
      if (!w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("all:" + (l1.size + w1.size + l2.size + w2.size + l3.size + w3.size + l4.size + w4.size + l5.size + w5.size + l6.size + w6.size + l7.size + w7.size + l8.size + w8.size + l9.size + w9.size + l10.size + w10.size + desks.size + l11.size + w11.size + l12.size + w12.size + l13.size + w13.size + l14.size + w14.size))

    let lwMap: Map<string, Set<string>> = new Map<string, Set<string>>
    if (w1.size != 0) {
      lwMap.set('w0', w1)
    }
    if (w1.size != 0) {
      lwMap.set('w1', w1)
    }
    if (l1.size != 0) {
      lwMap.set('l1', l1)
    }
    if (w2.size != 0) {
      lwMap.set('w2', w2)
    }
    if (l2.size != 0) {
      lwMap.set('l2', l2)
    }
    if (w3.size != 0) {
      lwMap.set('w3', w3)
    }
    if (l3.size != 0) {
      lwMap.set('l3', l3)
    }
    if (w4.size != 0) {
      lwMap.set('w4', w4)
    }
    if (l4.size != 0) {
      lwMap.set('l4', l4)
    }
    if (w5.size != 0) {
      lwMap.set('w5', w5)
    }
    if (l5.size != 0) {
      lwMap.set('l5', l5)
    }
    if (w6.size != 0) {
      lwMap.set('w6', w6)
    }
    if (l6.size != 0) {
      lwMap.set('l6', l6)
    }
    if (w7.size != 0) {
      lwMap.set('w7', w7)
    }
    if (l7.size != 0) {
      lwMap.set('l7', l7)
    }
    if (w8.size != 0) {
      lwMap.set('w8', w8)
    }
    if (l8.size != 0) {
      lwMap.set('l8', l8)
    }
    if (w9.size != 0) {
      lwMap.set('w9', w9)
    }
    if (l9.size != 0) {
      lwMap.set('l9', l9)
    }
    if (w10.size != 0) {
      lwMap.set('w10', w10)
    }
    if (l10.size != 0) {
      lwMap.set('l10', l10)
    }
    if (w11.size != 0) {
      lwMap.set('w11', w11)
    }
    if (l11.size != 0) {
      lwMap.set('l11', l11)
    }
    if (w12.size != 0) {
      lwMap.set('w12', w12)
    }
    if (l12.size != 0) {
      lwMap.set('l12', l12)
    }
    if (w13.size != 0) {
      lwMap.set('w13', w13)
    }
    if (l13.size != 0) {
      lwMap.set('l13', l13)
    }
    if (w14.size != 0) {
      lwMap.set('w14', w14)
    }
    if (l14.size != 0) {
      lwMap.set('l14', l14)
    }
    this.writer("d" + n, lwMap)
    console.info("d" + n + " DONE")
  }

  getAllAction(desk: number[][]): number[][][] {
    let allaction: number[][][] = []
    let allcar: number[][] = []
    for (let i = 0; i < desk.length; i++) {
      const row = desk[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell == 1) {
          allcar.push([i, j])
        }
      }
    }


    //移动1个
    for (let i = 0; i < allcar.length; i++) {
      allaction.push([allcar[i]])
    }
    //移动2个
    if (allcar.length >= 2) {
      for (let i = 0; i < allcar.length; i++) {
        for (let j = i; j < allcar.length; j++) {
          allaction.push([allcar[i], allcar[j]])
        }
      }
    }
    //移动3个
    if (allcar.length >= 3) {
      for (let i = 0; i < allcar.length; i++) {
        for (let j = i; j < allcar.length; j++) {
          for (let z = j; z < allcar.length; z++) {
            allaction.push([allcar[i], allcar[j], allcar[z]])
          }
        }
      }
    }
    return allaction
  }
  // ==============================================================================================================================

  deskToStr(desk: number[][]): string {
    let str: string = ""
    for (let i = 0; i < desk.length; i++) {
      const row = desk[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        str += cell + "_"
      }
      str += "|"
    }
    return str
  }

  writer(filename: string, lw: Map<string, Set<string>>): void {
    let s = 'export default class exampleData6_8D2 {\n';
    lw.forEach((value, key) => {
      s += '      ' + filename + key + ': Set<string> = new Set<string>(' + JSON.stringify(Array.from(value.values())) + ')      \n';
    });
    s += '}';

    FileWriter.setFile('./lib/module6_8/data' + filename + '.ts', s)
  }
}