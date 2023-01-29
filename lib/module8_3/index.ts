/**
 * @author jiutou
 * @updateTime 2022/12/02
 * @tip 8-3 先拿后放
 * @description 
 * 
一．挑战模式
1.参数默认值：①堆数：3 堆 ②每堆数量
（5，3，7）
2.参数范围：
①总数：30 ②堆数：固定为 3 ③每堆
起始数量：[0,15]
3.过程记录
二.练习模式
一级：L1、W2 
二级：L2、W3
三级：L3、W4 
四级：L4、W5 
五级：L5、W6
【必胜策略：
（a，b，c）满足约束条件 a+b+c∈[1,30]，
穷尽所有满足该条件的的一维三元坐标集，
即该游戏的状态集 S。
①遍历游戏状态集 S，找出所有满足约束条件有且只有1 个坐标非 0 的点，构成第一个胜点集，记为 W1；
②求出 S-W1的差集，对差集中的每一个状态进行游戏规则的遍历，如果某个状态存在一种操作方式进入 W1，
  则把所有具有这样属性的状态归结为第一个败点集（实际上就是存在两堆数量相等的状态即为第一个败点集），记为L1；
③接着对状态集 S 与必胜集 W1和必败集 L1的差集 S-W1-L1（为方便描述，我们把它记为：ΔS）中的状态用规则进行遍历，
  如果某个状态 ai（i 有可能不唯一）实行任意一合法操作之后，其所得到的状态都属于 L1，则该状态也属于胜点集，记为 W2。
④计算更新后的ΔS，接着对ΔS 中的状态用规则逐个进行遍历，并筛选出所有存在1 步之内到达 ai的状态，并形成 L2（L=L1+L2，L2是指存在 2 步之内到达最终必胜点的方法的点）。
⑤重复③和④，直至ΔS 为空。
 * 
 */
import { GameStep, GameWay, GameAutoWay } from '../common/pojo';
import RandomGenerater from '../util/RandomGenerater';
import OtherUtil from '../util/OtherUtil';
import DeskData from './datad30';
import DeskData8_3 from './data';
import { Console } from 'console';
import { FileWriter } from '../common/FileWriter';
//todo

export class GameData8_3 {
  //参数
  desk: number[] = [5, 3, 7]
  player: number = 1
  constructor(player: number, desk?: number[]) {
    player = player
    if (desk != undefined) {
      this.desk = desk
    }
  }
}

export class GameAction8_3 {
  //操作的点位
  action: number[]
  //操作的点位拉取的数量
  num: number
  constructor(action: number[], num: number) {
    this.action = action
    this.num = num
  }
}

export default class example8_3 {

  persistenceData: DeskData8_3 = new DeskData8_3()
  getRiddleByLev(level: number, config: any): GameData8_3 {
    throw new Error("Method not implemented.");
  }

  getRiddle(config: number): GameData8_3 {
    let count = config
    const rg = new RandomGenerater(0)
    const x = rg.RangeInteger(1, count - 1)
    count -= x
    const y = rg.RangeInteger(1, count)
    count -= y
    const z = count
    let gd = new GameData8_3(1, [x, y, z]);
    return gd
  }

  checkRiddle(deskData: GameData8_3): number {
    let zeroCount = 0

    if (deskData.desk[0] < 0 || deskData.desk[0] > 15 || deskData.desk[1] < 0 || deskData.desk[1] > 15 || deskData.desk[2] < 0 || deskData.desk[2] > 15) {
      return -1
    }

    if (deskData.desk[0] == 0) {
      zeroCount++
    }
    if (deskData.desk[1] == 0) {
      zeroCount++
    }
    if (deskData.desk[2] == 0) {
      zeroCount++
    }
    if (zeroCount >= 2) {
      return -1
    }
    return 1;
  }

  checkDesk(deskData: GameData8_3): number {
    let zeroCount = 0
    if (deskData.desk[0] == 0) {
      zeroCount++
    }
    if (deskData.desk[1] == 0) {
      zeroCount++
    }
    if (deskData.desk[2] == 0) {
      zeroCount++
    }
    if (zeroCount >= 2) {
      return OtherUtil.getRival(deskData.player)
    }
    return 0
  }

  checkAction(deskData: GameData8_3, dataAction: GameAction8_3): number {

    if (deskData.desk[dataAction.action[0]] < dataAction.num ||
      deskData.desk[dataAction.action[1]] < dataAction.num) {
      return -1
    }
    return 1
  }

  doAction(deskData: GameData8_3, dataAction: GameAction8_3): [flagResult: number, dataResult: GameData8_3] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    let s = 0
    deskData.desk[dataAction.action[0]] -= dataAction.num
    deskData.desk[dataAction.action[1]] -= dataAction.num
    if (s == 0 && (dataAction.action[0] == 0 || dataAction.action[1] == 0)) {
      s = 1
    }
    if (s == 1 && (dataAction.action[0] == 1 || dataAction.action[1] == 1)) {
      s = 2
    }
    deskData.desk[s] += dataAction.num
    let flagResult = this.checkDesk(deskData)
    deskData.player = OtherUtil.getRival(deskData.player)
    return [flagResult, deskData];
  }


  getActionAuto(deskData: GameData8_3): GameAutoWay {
    const rg = new RandomGenerater(0)
    let deskTmp = JSON.parse(JSON.stringify(deskData.desk));
    const allAction: GameAction8_3[] = this.getAllAction(deskTmp)
    let deskStr = this.deskToStr(deskData.desk)
    const deskDatas = new DeskData()
    let best = new GameAction8_3([], 0)
    let nobest = new GameAction8_3([], 0)
    if (deskDatas.d30w15.has(deskStr) ||
      deskDatas.d30w14.has(deskStr) ||
      deskDatas.d30w13.has(deskStr) ||
      deskDatas.d30w12.has(deskStr) ||
      deskDatas.d30w11.has(deskStr) ||
      deskDatas.d30w10.has(deskStr) ||
      deskDatas.d30w9.has(deskStr) ||
      deskDatas.d30w8.has(deskStr) ||
      deskDatas.d30w7.has(deskStr) ||
      deskDatas.d30w6.has(deskStr) ||
      deskDatas.d30w5.has(deskStr) ||
      deskDatas.d30w4.has(deskStr) ||
      deskDatas.d30w3.has(deskStr) ||
      deskDatas.d30w2.has(deskStr) ||
      deskDatas.d30w1.has(deskStr)) {
      best = allAction[rg.RangeInteger(0, allAction.length - 1)]
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    } else {
      for (let i = 0; i < allAction.length; i++) {
        const action = allAction[i];
        const dd = this.doAction(JSON.parse(JSON.stringify(deskData)), action);
        const dds = this.deskToStr(dd[1].desk);
        if (deskDatas.d30l15.has(deskStr) ||
          deskDatas.d30l14.has(deskStr) ||
          deskDatas.d30l13.has(deskStr) ||
          deskDatas.d30l12.has(deskStr) ||
          deskDatas.d30l11.has(deskStr) ||
          deskDatas.d30l10.has(deskStr) ||
          deskDatas.d30l9.has(deskStr) ||
          deskDatas.d30l8.has(deskStr) ||
          deskDatas.d30l7.has(deskStr) ||
          deskDatas.d30l6.has(deskStr) ||
          deskDatas.d30l5.has(deskStr) ||
          deskDatas.d30l4.has(deskStr) ||
          deskDatas.d30l3.has(deskStr) ||
          deskDatas.d30l2.has(deskStr) ||
          deskDatas.d30l1.has(deskStr)) {
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

  getDesk(n: number): Set<number[]> {

    let s: Set<number[]> = new Set<number[]>
    let s2: Set<number[]> = new Set<number[]>
    for (let i = 2; i <= n; i++) {
      s2 = this.getSplitAction(i);
      s = this.merge(s, s2);
    }
    s = this.merge(s, s2);
    s.add([1, 0, 0])
    return s;
  }
  getAllDesk(n: number): void {
    let s: Set<number[]> = this.getDesk(n);

    let allDesk: Map<string, number[]> = new Map<string, number[]>;
    s.forEach(element => {
      allDesk.set(this.deskToStr(element), element)
    });
    const allDeskSize = allDesk.size
    let w1: Set<string> = new Set<string>()
    let l1: Set<string> = new Set<string>()
    let w2: Set<string> = new Set<string>()
    let l2: Set<string> = new Set<string>()
    let w3: Set<string> = new Set<string>()
    let l3: Set<string> = new Set<string>()
    let w4: Set<string> = new Set<string>()
    let l4: Set<string> = new Set<string>()
    let w5: Set<string> = new Set<string>()
    let l5: Set<string> = new Set<string>()
    let w6: Set<string> = new Set<string>()
    let l6: Set<string> = new Set<string>()
    let w7: Set<string> = new Set<string>()
    let l7: Set<string> = new Set<string>()
    let w8: Set<string> = new Set<string>()
    let l8: Set<string> = new Set<string>()
    let w9: Set<string> = new Set<string>()
    let l9: Set<string> = new Set<string>()
    let w10: Set<string> = new Set<string>()
    let l10: Set<string> = new Set<string>()
    let w11: Set<string> = new Set<string>()
    let l11: Set<string> = new Set<string>()
    let w12: Set<string> = new Set<string>()
    let l12: Set<string> = new Set<string>()
    let w13: Set<string> = new Set<string>()
    let l13: Set<string> = new Set<string>()
    let w14: Set<string> = new Set<string>()
    let l14: Set<string> = new Set<string>()
    let w15: Set<string> = new Set<string>()
    let l15: Set<string> = new Set<string>()
    let w16: Set<string> = new Set<string>()
    let l16: Set<string> = new Set<string>()
    let actionMap: Map<string, GameAction8_3[]> = new Map<string, GameAction8_3[]>
    for (let i = 1; i <= n; i++) {
      w1.add(this.deskToStr([i, 0, 0]))
    }
    let desks: Map<string, number[]> = new Map<string, number[]>
    //console.info("过滤结果w1.size:" + w1.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        actionMap.set(key, this.getAllAction(value))
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str)) {
          l1.add(key)
          break
        }
      }
    })
    //console.info("过滤结果l1.size:" + l1.size)
    allDesk.forEach((value, key) => {
      const deskTmp = value
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w2.add(key)
      }
    })
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    //console.info("过滤结果w2.size:" + w2.size)
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str)) {
          l2.add(key)
          break
        }
      }
    })
    //console.info("过滤结果l2.size:" + l2.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w3.add(key)
      }
    })
    //console.info("过滤结果w3.size:" + w3.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str)) {
          l3.add(key)
          break
        }
      }
    })
    //console.info("过滤结果l3.size:" + l3.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w4.add(key)
      }
    })
    //console.info("过滤结果w4.size:" + w4.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str)) {
          l4.add(key)
          break
        }
      }
    })
    //console.info("过滤结果l4.size:" + l4.size)

    //
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l4.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w5.add(key)
      }
    })
    //console.info("过滤结果w5.size:" + w5.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w5.has(str)) {
          l5.add(key)
          break
        }
      }
    })
    //console.info("过滤结果l5.size:" + l5.size)    //
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l5.has(str) ||
          l4.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w6.add(key)
      }
    })
    //console.info("过滤结果w6.size:" + w6.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w6.has(str) ||
          w5.has(str)) {
          l6.add(key)
          break
        }
      }
    })
    //console.info("过滤结果l6.size:" + l6.size)    //
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l4.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w7.add(key)
      }
    })
    //console.info("过滤结果w7.size:" + w7.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w5.has(str)) {
          l7.add(key)
          break
        }
      }
    })
    //console.info("过滤结果l7.size:" + l7.size)    //
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l4.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w8.add(key)
      }
    })
    //console.info("过滤结果w8.size:" + w8.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w6.has(str) ||
          w8.has(str) ||
          w7.has(str) ||
          w5.has(str)) {
          l8.add(key)
          break
        }
      }
    })
    //console.info("过滤结果l8.size:" + l8.size)    //
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l4.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w9.add(key)
      }
    })
    //console.info("过滤结果w9.size:" + w9.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w5.has(str)) {
          l9.add(key)
          break
        }
      }
    })
    //console.info("过滤结果l9.size:" + l9.size)    //
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l4.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w10.add(key)
      }
    })
    //console.info("过滤结果w10.size:" + w10.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w10.has(str) ||
          w5.has(str)) {
          l10.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str) ||
          l4.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w11.add(key)
      }
    })
    //console.info("过滤结果w10.size:" + w10.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w11.has(str) ||
          w10.has(str) ||
          w5.has(str)) {
          l11.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str) ||
          l11.has(str) ||
          l4.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w12.add(key)
      }
    })
    //console.info("过滤结果w10.size:" + w10.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w11.has(str) ||
          w10.has(str) ||
          w12.has(str) ||
          w5.has(str)) {
          l12.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w16.has(key) && !l16.has(key) && !w15.has(key) && !l15.has(key) && !w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str) ||
          l11.has(str) ||
          l12.has(str) ||
          l4.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w13.add(key)
      }
    })
    //console.info("过滤结果w10.size:" + w10.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w16.has(key) && !l16.has(key) && !w15.has(key) && !l15.has(key) && !w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w11.has(str) ||
          w12.has(str) ||
          w13.has(str) ||
          w10.has(str) ||
          w5.has(str)) {
          l13.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w16.has(key) && !l16.has(key) && !w15.has(key) && !l15.has(key) && !w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str) ||
          l11.has(str) ||
          l12.has(str) ||
          l13.has(str) ||
          l4.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w14.add(key)
      }
    })
    //console.info("过滤结果w10.size:" + w10.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w16.has(key) && !l16.has(key) && !w15.has(key) && !l15.has(key) && !w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w11.has(str) ||
          w12.has(str) ||
          w13.has(str) ||
          w14.has(str) ||
          w10.has(str) ||
          w5.has(str)) {
          l14.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w16.has(key) && !l16.has(key) && !w15.has(key) && !l15.has(key) && !w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str) ||
          l11.has(str) ||
          l12.has(str) ||
          l13.has(str) ||
          l14.has(str) ||
          l4.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w15.add(key)
      }
    })
    //console.info("过滤结果w10.size:" + w10.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w16.has(key) && !l16.has(key) && !w15.has(key) && !l15.has(key) && !w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w11.has(str) ||
          w12.has(str) ||
          w13.has(str) ||
          w14.has(str) ||
          w15.has(str) ||
          w10.has(str) ||
          w5.has(str)) {
          l15.add(key)
          break
        }
      }
    })
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w16.has(key) && !l16.has(key) && !w15.has(key) && !l15.has(key) && !w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (l1.has(str) ||
          l2.has(str) ||
          l3.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str) ||
          l8.has(str) ||
          l9.has(str) ||
          l10.has(str) ||
          l11.has(str) ||
          l12.has(str) ||
          l13.has(str) ||
          l14.has(str) ||
          l15.has(str) ||
          l4.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w16.add(key)
      }
    })
    //console.info("过滤结果w10.size:" + w10.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w16.has(key) && !l16.has(key) && !w15.has(key) && !l15.has(key) && !w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction8_3[] = actionMap.get(key) as GameAction8_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData8_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str) ||
          w3.has(str) ||
          w4.has(str) ||
          w6.has(str) ||
          w7.has(str) ||
          w8.has(str) ||
          w9.has(str) ||
          w11.has(str) ||
          w12.has(str) ||
          w13.has(str) ||
          w14.has(str) ||
          w15.has(str) ||
          w16.has(str) ||
          w10.has(str) ||
          w5.has(str)) {
          l16.add(key)
          break
        }
      }
    })
    //console.info("过滤结果l10.size:" + l10.size)
    const lwAll = (l1.size + w1.size + l2.size + w2.size + l3.size + w3.size + l4.size + w4.size + l5.size + w5.size + l6.size + w6.size + l7.size + w7.size + l8.size + w8.size + l9.size + w9.size + l10.size + w10.size + l11.size + w11.size + l12.size + w12.size + l13.size + w13.size + l14.size + w14.size + l15.size + w15.size + l16.size + w16.size)
    // console.info("lw all:" + (l1.size + w1.size + l2.size + w2.size + l3.size + w3.size + l4.size + w4.size + l5.size + w5.size + l6.size + w6.size + l7.size + w7.size + l8.size + w8.size + l9.size + w9.size + l10.size + w10.size))
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w16.has(key) && !l16.has(key) && !w15.has(key) && !l15.has(key) && !w14.has(key) && !l14.has(key) && !w13.has(key) && !l13.has(key) && !w12.has(key) && !l12.has(key) && !w11.has(key) && !l11.has(key) && !w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("lwAll:" + lwAll + " allDeskSize:" + allDeskSize + " all:" + (l1.size + w1.size + l2.size + w2.size + l3.size + w3.size + l4.size + w4.size + l5.size + w5.size + l6.size + w6.size + l7.size + w7.size + l8.size + w8.size + l9.size + w9.size + l10.size + w10.size + l11.size + w11.size + l12.size + w12.size + l13.size + w13.size + l14.size + w14.size + l15.size + w15.size + l16.size + w16.size + desks.size))
    // const tmptmptmp = Array.from(l7.values());
    let lwMap: Map<string, Set<string>> = new Map<string, Set<string>>
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
    if (w15.size != 0) {
      lwMap.set('w15', w15)
    }
    if (l15.size != 0) {
      lwMap.set('l15', l15)
    }
    if (w16.size != 0) {
      lwMap.set('w16', w16)
    }
    if (l16.size != 0) {
      lwMap.set('l16', l16)
    }
    this.writer("d" + n, lwMap)
    console.info("D" + n + " DONE")
  }

  getAllAction(desk: number[]): GameAction8_3[] {
    let allaction: GameAction8_3[] = []
    //到0
    const min0 = Math.min(desk[1], desk[2]);
    for (let i = 1; i <= min0; i++) {
      allaction.push(new GameAction8_3([1, 2], i))
    }
    //到1
    const min1 = Math.min(desk[0], desk[2]);
    for (let i = 1; i <= min1; i++) {
      allaction.push(new GameAction8_3([0, 2], i))
    }
    //到2
    const min2 = Math.min(desk[0], desk[1]);
    for (let i = 1; i <= min2; i++) {
      allaction.push(new GameAction8_3([0, 1], i))
    }
    return allaction
  }
  // ==============================================================================================================================
  getEmptyAction(desk: number[], action: number[][]): number[] {
    let result: number[] = []
    for (let x = 0; x < desk.length; x++) {
      if (desk[x] == 0) {
        result.push(x)
      }
    }
    for (let x = 0; x < action.length; x++) {
      result.push(action[x][0])
    }

    return result;
  }
  getSplitAction(n: number): Set<number[]> {
    let r: Set<number[]> = new Set<number[]>
    if (n == 2) {
      r = this.persistenceData.d2All;
    } else if (n == 3) {
      r = this.persistenceData.d3All;
    } else if (n == 4) {
      r = this.persistenceData.d4All;
    } else if (n == 5) {
      r = this.persistenceData.d5All;
    } else if (n == 6) {
      r = this.persistenceData.d6All;
    } else if (n == 7) {
      r = this.persistenceData.d7All;
    } else if (n == 8) {
      r = this.persistenceData.d8All;
    } else if (n == 9) {
      r = this.persistenceData.d9All;
    } else if (n == 10) {
      r = this.persistenceData.d10All;
    } else if (n == 11) {
      r = this.persistenceData.d11All;
    } else if (n == 12) {
      r = this.persistenceData.d12All;
    } else if (n == 13) {
      r = this.persistenceData.d13All;
    } else if (n == 14) {
      r = this.persistenceData.d14All;
    } else if (n == 15) {
      r = this.persistenceData.d15All;
    } else if (n == 16) {
      r = this.persistenceData.d16All;
    } else if (n == 17) {
      r = this.persistenceData.d17All;
    } else if (n == 18) {
      r = this.persistenceData.d18All;
    } else if (n == 19) {
      r = this.persistenceData.d19All;
    } else if (n == 20) {
      r = this.persistenceData.d20All;
    } else if (n == 21) {
      r = this.persistenceData.d21All;
    } else if (n == 22) {
      r = this.persistenceData.d22All;
    } else if (n == 23) {
      r = this.persistenceData.d23All;
    } else if (n == 24) {
      r = this.persistenceData.d24All;
    } else if (n == 25) {
      r = this.persistenceData.d25All;
    } else if (n == 26) {
      r = this.persistenceData.d26All;
    } else if (n == 27) {
      r = this.persistenceData.d27All;
    } else if (n == 28) {
      r = this.persistenceData.d28All;
    } else if (n == 29) {
      r = this.persistenceData.d29All;
    } else if (n == 30) {
      r = this.persistenceData.d30All;
    }
    return r
  }

  desksort(desk: number[]): number[] {
    return desk.sort((a, b) => {
      if (a < b)
        return 1
      if (a > b)
        return -1;
      return 0;
    });
  }

  deskToStr(desk: number[]): string {
    desk = this.desksort(desk)
    let str: string = ""
    for (let i = 0; i < desk.length; i++) {
      const cell = desk[i];
      str += cell + "_"
    }
    return str
  }

  writer(filename: string, lw: Map<string, Set<string>>): void {
    let s = 'export default class exampleData8_3' + filename + ' {\n';
    lw.forEach((value, key) => {
      s += '      ' + filename + key + ': Set<string> = new Set<string>(' + JSON.stringify(Array.from(value.values())) + ')      \n';
    });
    s += '}';
    FileWriter.setFile('./lib/module8_3/data' + filename + '.ts', s)
  }
}