/**
 * @author jiutou
 * @updateTime 2022/12/02
 * @tip 6-3 平均分与大小配对
 * @description 
 * 
5,0,0,0,0
4,1,0,0,0
3,2,0,0,0
3,1,1,0,0
2,2,1,0,0
2,1,1,1,0
1,1,1,1,1

6-3 平均分与大小配对
一.挑战模式
1.参数默认值：①堆数：4。②每堆数
量：3，4，4，9
2.参数范围：①总数：2~30 ②堆数：
1~（n-1）【n 表示总数】
3.过程记录：无
二．练习模式
一级：L1或 W2 二级：L2或 W3
三级：L3或 W4 四级：L4或 w5 五级：L5或 W6

必胜策略：判断当前状态是否属于
胜点集，如果是则随机操作，
负点集，选择一种操作方式，使得操作后的状态属于胜点集。
以下是将游戏的所有状态按胜负点分类的过程。
①生成游戏状态集 S，由于游戏参数范围是 2~30，即可以将游戏状态集看成有29个游戏状态子集组合而成，
下面描述游戏状态集生成的过程。为描述方面，每一个游戏状态都用一个一维 30 元向量表示，
（1）棋子颗数为2时，状态集元素就 2 个（a2=2）ps:a1=1,a0=0 即（2，0，....，0）、（1，1，....，0）；
（2）棋子颗数为3时，状态集元素为 3 个（a3=2+1+a0=3）【a0 即没有棋子时状态数为 0，虽然游戏过程中不会有这样状态，但不影响其取值】，分别是（3，0，....，0）、（2，1，....，0）、（1，1，1，....，0）；
（3）棋子颗数为4时，状态集元素为 5 个（a4=2+2+a1=5）【a1即只有 1 颗棋子时状态数为 1，虽然游戏过程中不会有这样状态，但不影响其取值】，分别是（4，0，....，0）、（3，1，....，0）、（2，2，....，0）、（2，1，1....，0）、（1，1，1，1....，0）；
（4）棋子颗数为5时，状态集元素为 7 个（a5=2+2+a2+a1=7），分别是（5，0，....，0）、（4，1，....，0）、（3，2，....，0）、（3，1，1....，0）、（2，2，1....，0）、（2，1，1，1....，0）、（1，1，1，1，1....，0）；
（5）棋子颗数为6时，状态集元素为11 个（a6=2+3+a3+a2+a1=11），分别是（6，0，....，0）、（5，1，....，0）、（4，2，....，0）、（3，3，0....，0）、（4，1，1....，0）、（3，2，1....，0）、（2，2，2....，0）、（3，1，1，1，0....，0）、（2，2，1，1....，0）、（2，1，1，1，1....，0）、（1，1，1，1，1，1....，0），
//7.0.0.0.0.0.0|6.1.0.0.0.0.0|5.2.0.0.0.0.0|5.1.1.0.0.0.0|4.3.0.0.0.0.0|4.2.1.0.0.0.0|4.1.1.1.0.0.0|3.3.1.0.0.0.0|3.2.2.0.0.0.0|3.2.1.1.0.0.0|3.1.1.1.1.0.0|2.1.1.1.1.1.0|2.2.1.1.1.0.0|2.2.2.1.0.0.0|1.1.1.1.1.1.1
观察上面的模式易得递归式：an=2+[n/2]+an-3+an-2+.....a2+a1（n≥3）【其中[n/2]表示向下取整，表示的意义是当棋子数量为 n 时，分成两部分的方式数量比如 n 等于 7 时，[n/2]=3，具体为（6，1）、（5，2）、（4，3）】；
an表示当棋子颗数为 n 时，游戏状态的个数，具体得到每一个状态，即得到棋子数量为 n 时的状态集的方式为：考虑递归式中每一部分的含义，
第一个2表示（n，0,0,0.....,0）和（1，1，1，....1）【共n 个1】；
第二个[n/2]表示由（n-1，1，0,0,....0）开始，坐标分量 1 逐次减 1，坐标分量 2 逐次加1，直到坐标分量1 和坐标分量 2 的差不大于 1 为止。；
第三部分 an-3，表示在前 n-3 个分量都为1 的基础上，逐次与 an-3中的状态做向量加法，比如 a6中的 a3所对应的 3 个状态集可以这么得到：（1，1，1，0，0，0）+（3，0，....，0）；（1，1，1，0，0，0）+（2，1，....，0）、（1，1，1，0，0，0）+（1，1，1，....，0）。往下 an-4，an-5.....依次类推，即可得到整个an的元素。
每一种棋子数量对应着一个参数，这样游戏状态集就可以表示为S={{S2};{S3};{S4};....{S30}}【下标表示棋子的数量，{Sn},表示棋子数量为n 时，对应的游戏状态集】

②每一种棋子数量的游戏状态集按胜败分类的方式都是一致的，下面以n=30 为例，进行说明：全为 1 的矩阵是游戏的终点状态，也是游戏的最终胜点，因为抢占该状态者胜，面临该状态者负，将这个状态存入 W1；
③显然，只要存在一种进入 W1的方式的状态都是败点，而且不难推出满足这样要求的状态满足条件：有且只有 1 个分量大于 1，比如（30，0，0，0，......0）、（26，1，1，1，1，0，0，.....0）等等，满足这样条件的点都是败点，我们将它们存入L1；
④更新差集ΔS=S-L1-W1后，继续对ΔS 中的每一个元素进行规则遍历，如果某个状态ai（i有可能不唯一）实行任意一合法操作之后，所得到的状态都属于 L1，则该状态也属于必胜集，将其存入 W2；
⑤更新差集ΔS=ΔS-W2后，对ΔS 中的每一个元素进行规则遍历，即对ΔS 中每一个游戏状态逐一实行所有可能的操作，若某个状态 ai（i 可能不唯一）在实行规则遍历的过程中，存在某一种操作使得实行该操作后所得到的新状态 ai’属于 W2,则这个状态ai属于败点集，将这个状态存入 L2；
⑥重复④和⑤，直至ΔS 为空。】

 * 
 */
import { GameStep, GameWay, GameAutoWay } from '../common/pojo';
import RandomGenerater from '../util/RandomGenerater';
import OtherUtil from '../util/OtherUtil';
import { Console } from 'console';
import exampleData10_2 from './data';
// import exampleData8_3d2 from './datad2';

import { FileWriter } from '../common/FileWriter';
//todo
export class GameData6_3 {
  typeSet = 1;//前端用的，存是否是自定义棋盘
  //参数
  desk: number[] = []
  player: number = 1
  constructor(player: number, desk?: number[]) {
    player = player
    if (desk != undefined) {
      this.desk = desk
    }
  }
}

export class GameAction6_3 {
  //拆解下标0-29
  action: number[][]
  //对数组中点位拆解之后的数据 
  actionAfter: number[][]
  // 如把desk[3]上的5个，拆分到desk[4]上2个,desk[5]上3个，这为action=[[3,5]] actionAfter=[[4,2],[5,3]]
  // 如把desk[4]上2个,desk[5]上的3个，合到desk[3]上，这为action=[[4,2],[5,3]] actionAfter=[[3,5]]
  constructor(action: number[][], actionAfter: number[][]) {
    this.action = action
    this.actionAfter = actionAfter
  }
}

export class GameConfig6_3 {
  n: number = 20
  desk: number[] = [3, 4, 4, 9]
  constructor(n: number, desk: number[]) {
    this.n = n
    if (desk != undefined) {
      this.desk = desk
    }
  }
}

export default class example6_3 {
  sMap = new Map([
    [2, [[1, 1]]],
    [3, [[1, 1, 1]]],
    [4, [[1, 1, 1, 1], [2, 2]]],
    [5, [[1, 1, 1, 1, 1]]],
    [6, [[1, 1, 1, 1, 1, 1], [2, 2, 2], [3, 3]]],
    [7, [[1, 1, 1, 1, 1, 1, 1]]],
    [8, [[1, 1, 1, 1, 1, 1, 1, 1], [2, 2, 2, 2], [4, 4]]],
    [9, [[1, 1, 1, 1, 1, 1, 1, 1, 1], [3, 3, 3]]],
    [10, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [5, 5], [2, 2, 2, 2, 2]]],
    [11, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]],
    [12, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [2, 2, 2, 2, 2, 2], [6, 6], [4, 4, 4], [3, 3, 3, 3]]],
    [13, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]],
    [14, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [7, 7]]],
    [15, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [5, 5, 5], [3, 3, 3, 3, 3]]],
    [16, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [8, 8], [4, 4, 4, 4], [2, 2, 2, 2, 2, 2, 2, 2]]],
    [17, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]],
    [18, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [9, 9], [6, 6, 6], [3, 3, 3, 3, 3, 3]]],
    [19, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]],
    [20, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [10, 10], [5, 5, 5, 5], [4, 4, 4, 4, 4]]],
    [21, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [7, 7, 7], [3, 3, 3, 3, 3, 3, 3]]],
    [22, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [11, 11], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]]],
    [23, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]],
    [24, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [12, 12], [6, 6, 6, 6], [3, 3, 3, 3, 3, 3, 3, 3], [8, 8, 8], [4, 4, 4, 4, 4, 4], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]]],
    [25, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [5, 5, 5, 5, 5],]],
    [26, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [13, 13],]],
    [27, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [9, 9, 9], [3, 3, 3, 3, 3, 3, 3, 3, 3]]],
    [28, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [14, 14], [7, 7, 7, 7], [4, 4, 4, 4, 4, 4, 4]]],
    [29, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]],
    [30, [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [15, 15], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3,], [5, 5, 5, 5, 5, 5], [10, 10, 10], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,]]],

  ]);

  persistenceData: exampleData10_2 = new exampleData10_2()
  getRiddleByLev(level: number, config: any): GameData6_3 {
    throw new Error("Method not implemented.");
  }

  getRiddle(config: GameConfig6_3): GameData6_3 {
    let desk: number[] = []
    if (config.desk.length == 0) {
      let count = config.n
      while (this.checkDesk(new GameData6_3(1, desk)) == 0) {
        desk = []
        for (let i = 0; i < config.n; i++) {
          const rg = new RandomGenerater(0)
          let chess = 0
          if (count != 0) {
            count = rg.RangeInteger(0, count)
          }
          desk.push(chess)
          count -= chess
        }
      }
    } else {
      desk = config.desk
    }
    let gd = new GameData6_3(1, desk);
    return gd
  }
  checkRiddle(deskData: GameData6_3): number {
    let count = 0
    for (let i = 0; i < deskData.desk.length; i++) {
      count += deskData.desk[i]
    }
    if (count < 2 || count > 30) {
      // 总数2-30
      return -1
    }
    if (count == deskData.desk.length) {
      // 堆数1到n-1，即不能所有堆都是1
      return -1
    }
    return 1;
  }

  checkDesk(deskData: GameData6_3): number {
    for (let i = 0; i < deskData.desk.length; i++) {
      const chess = deskData.desk[i]
      if (chess != 1) {
        return 0
      }
    }
    return OtherUtil.getRival(deskData.player)
  }

  doAction(deskData: GameData6_3, dataAction: GameAction6_3): [flagResult: number, dataResult: GameData6_3] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    if (dataAction.action.length == 1) {
      let c: Boolean = false
      for (let i = 0; i < dataAction.actionAfter.length; i++) {
        const actionItem = dataAction.actionAfter[i];
        deskData.desk[actionItem[0]] = actionItem[1]
        if (actionItem[0] == dataAction.action[0][0]) {
          c = true
        }
      }
      if (!c) {
        deskData.desk[dataAction.action[0][0]] = 0
      }
    } else {
      let sum = 0
      for (let i = 0; i < dataAction.action.length; i++) {
        const actionItem = dataAction.action[i];
        deskData.desk[actionItem[0]] = 0
        sum += actionItem[1]
      }
      deskData.desk[dataAction.actionAfter[0][0]] = sum
    }
    let flagResult = this.checkDesk(deskData)
    deskData.player = OtherUtil.getRival(deskData.player)
    return [flagResult, deskData];
  }

  checkAction(deskData: GameData6_3, dataAction: GameAction6_3): number {
    if (dataAction.action.length == 0) {
      console.info(1)
      return -1
    } else if (dataAction.action.length == 1) {
      let sum = 0
      for (let i = 0; i < dataAction.actionAfter.length; i++) {
        const actionItem = dataAction.actionAfter[i];
        sum += actionItem[1]
      }
      if (sum != dataAction.action[0][1]) {
        //console.info(2)
        return -1
      }
    } else {
      let sum = 0
      if (deskData.desk[dataAction.actionAfter[0][0]] > 0) {
        return -1
      }
      for (let i = 0; i < dataAction.action.length; i++) {
        const actionItem = dataAction.action[i];
        sum += actionItem[1]
      }
      if (sum != dataAction.actionAfter[0][1]) {
        console.info(4)
        return -1
      }
    }
    return 1
  }

  getActionAuto(deskData: GameData6_3): GameAutoWay {
    return new GameAutoWay(undefined, undefined)
  }
  // getActionAutoW1(deskData: GameData6_3): GameAutoWay {
  //   const rg = new RandomGenerater(0)
  //   let deskTmp = JSON.parse(JSON.stringify(deskData.desk));
  //   const allAction: GameAction8_3[] = this.getAllAction(deskTmp)
  //   let deskStr = this.deskToStr(deskData.desk)
  //   const deskDatas = new DeskData()
  //   let best = new GameAction8_3([], 0)
  //   let nobest = new GameAction8_3([], 0)
  //   if (deskDatas.d30w15.has(deskStr) ||
  //     deskDatas.d30w14.has(deskStr) ||
  //     deskDatas.d30w13.has(deskStr) ||
  //     deskDatas.d30w12.has(deskStr) ||
  //     deskDatas.d30w11.has(deskStr) ||
  //     deskDatas.d30w10.has(deskStr) ||
  //     deskDatas.d30w9.has(deskStr) ||
  //     deskDatas.d30w8.has(deskStr) ||
  //     deskDatas.d30w7.has(deskStr) ||
  //     deskDatas.d30w6.has(deskStr) ||
  //     deskDatas.d30w5.has(deskStr) ||
  //     deskDatas.d30w4.has(deskStr) ||
  //     deskDatas.d30w3.has(deskStr) ||
  //     deskDatas.d30w2.has(deskStr) ||
  //     deskDatas.d30w1.has(deskStr)) {
  //     best = allAction[rg.RangeInteger(0, allAction.length - 1)]
  //     nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
  //   } else {
  //     for (let i = 0; i < allAction.length; i++) {
  //       const action = allAction[i];
  //       const dd = this.doAction(JSON.parse(JSON.stringify(deskData)), action);
  //       const dds = this.deskToStr(dd[1].desk);
  //       if (deskDatas.d30l15.has(deskStr) ||
  //         deskDatas.d30l14.has(deskStr) ||
  //         deskDatas.d30l13.has(deskStr) ||
  //         deskDatas.d30l12.has(deskStr) ||
  //         deskDatas.d30l11.has(deskStr) ||
  //         deskDatas.d30l10.has(deskStr) ||
  //         deskDatas.d30l9.has(deskStr) ||
  //         deskDatas.d30l8.has(deskStr) ||
  //         deskDatas.d30l7.has(deskStr) ||
  //         deskDatas.d30l6.has(deskStr) ||
  //         deskDatas.d30l5.has(deskStr) ||
  //         deskDatas.d30l4.has(deskStr) ||
  //         deskDatas.d30l3.has(deskStr) ||
  //         deskDatas.d30l2.has(deskStr) ||
  //         deskDatas.d30w1.has(deskStr)) {
  //         best = action
  //         break
  //       }
  //     }
  //     nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
  //   }
  //   return new GameAutoWay(best, nobest)
  // }


  getAllDesk(n: number): void {
    const s = this.getSplitAction(n);
    let allDesk: Map<string, number[]> = new Map<string, number[]>;
    s.forEach(element => {
      allDesk.set(this.deskToStr(element), element)
    });
    // console.info(allDesk.size)
    let w1: Set<string> = new Set<string>()
    let l1: Set<string> = new Set<string>()
    let tmp1 = []
    for (let i = 0; i < n; i++) {
      tmp1.push(1)
    }
    w1.add(this.deskToStr(tmp1))
    //③显然，只要存在一种进入 W1的方式的状态都是败点，而且不难推出满足这样要求的状态满足条件：有且只有 1 个分量大于 1，比如（30，0，0，0，......0）、（26，1，1，1，1，0，0，.....0）等等，满足这样条件的点都是败点，我们将它们存入L1；
    // for (let i = 2; i <= n; i++) {
    //   let tmp2 = []
    //   tmp2.push(i)
    //   for (let j = i; j < n; j++) {
    //     tmp2.push(1)
    //   }
    //   l1.add(this.deskToStr(this.fillZero(tmp2, n)))
    // }

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
    let actionMap: Map<string, GameAction6_3[]> = new Map<string, GameAction6_3[]>

    let desks: Map<string, number[]> = new Map<string, number[]>
    //console.info("w1.size:" + w1.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        actionMap.set(key, this.getAllAction(value))
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str)) {
          l1.add(key)
          break
        }
      }
    })
    //console.info("l1.size:" + l1.size)
    allDesk.forEach((value, key) => {
      const deskTmp = value
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("w2.size:" + w2.size)
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
        }
        const str = this.deskToStr(desknow[1].desk);
        if (w1.has(str) ||
          w2.has(str)) {
          l2.add(key)
          break
        }
      }
    })
    //console.info("l2.size:" + l2.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("w3.size:" + w3.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("l3.size:" + l3.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("w4.size:" + w4.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("l4.size:" + l4.size)

    //
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("w5.size:" + w5.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("l5.size:" + l5.size)    //
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("w6.size:" + w6.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("l6.size:" + l6.size)    //
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("w7.size:" + w7.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("l7.size:" + l7.size)    //
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("w8.size:" + w8.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("l8.size:" + l8.size)    //
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("w9.size:" + w9.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("l9.size:" + l9.size)    //
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
        w5.add(key)
      }
    })
    //console.info("w10.size:" + w10.size)
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    desks.forEach((value, key) => {
      //存在变更为W的操作，则为L
      const allActionTmp: GameAction6_3[] = actionMap.get(key) as GameAction6_3[];
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData6_3(1, JSON.parse(JSON.stringify(value))), action);
        if (desknow[0] == -1) {
          //          console.info(1)
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
    //console.info("l10.size:" + l10.size)
    console.info("lw all:" + (l1.size + w1.size + l2.size + w2.size + l3.size + w3.size + l4.size + w4.size + l5.size + w5.size + l6.size + w6.size + l7.size + w7.size + l8.size + w8.size + l9.size + w9.size + l10.size + w10.size))
    desks = new Map<string, number[]>
    allDesk.forEach((value, key) => {
      if (!w10.has(key) && !l10.has(key) && !w9.has(key) && !l9.has(key) && !w8.has(key) && !l8.has(key) && !w7.has(key) && !l7.has(key) && !w6.has(key) && !l6.has(key) && !w5.has(key) && !l5.has(key) && !w4.has(key) && !l4.has(key) && !w3.has(key) && !l3.has(key) && !w2.has(key) && !l2.has(key) && !w1.has(key) && !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("all:" + (l1.size + w1.size + l2.size + w2.size + l3.size + w3.size + l4.size + w4.size + l5.size + w5.size + l6.size + w6.size + l7.size + w7.size + l8.size + w8.size + l9.size + w9.size + l10.size + w10.size + desks.size))
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
    this.writer("d" + n, lwMap)
    console.info("d" + n + " DONE")
  }

  getAllAction(desk: number[]): GameAction6_3[] {
    let allactionMap: Map<string, GameAction6_3> = new Map<string, GameAction6_3>
    let allaction: GameAction6_3[] = []
    for (let i = 0; i < desk.length; i++) {
      //合
      const chess1 = desk[i];
      if (chess1 != 0) {
        for (let j = i; j < desk.length; j++) {
          const chess2 = desk[j];
          if (chess2 != 0 && chess1 != chess2) {
            for (let x = 0; x < desk.length; x++) {
              const ljd = desk[x]
              if (ljd == 0) {
                const tmpa = new GameAction6_3([[i, chess1], [j, chess2]], [[x, chess1 + chess2]]);
                allactionMap.set(this.actionToStr(tmpa), tmpa)
                break
              }
            }
          }
        }
      }
      // 分
      if (chess1 > 1) {
        // 按照chess获取棋面，去除顶级状态
        const splitAction: number[][] = this.sMap.get(chess1) as number[][];
        for (let i1 = 0; i1 < splitAction.length; i1++) {
          const splitItem = splitAction[i1];
          if (chess1 != splitItem[0]) {
            let acitonTmp: GameAction6_3 = new GameAction6_3([[i, chess1]], []);
            const emptyP: number[] = this.getEmptyAction(desk, acitonTmp.action);
            for (let y = 0; y < splitItem.length; y++) {
              acitonTmp.actionAfter.push([emptyP.pop() as number, splitItem[y]])
            }
            const tmpa = acitonTmp
            allactionMap.set(this.actionToStr(tmpa), tmpa)
          }
        }
      }
    }
    return Array.from(allactionMap.values())
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

  fillZero(desk: number[], n: number): number[] {
    let deskTmp: number[] = []
    for (let i = 0; i < desk.length; i++) {
      deskTmp.push(desk[i])
    }
    for (let i = 0; i < n - desk.length; i++) {
      deskTmp.push(0)
    }
    return deskTmp
  }

  actionToStr(action: GameAction6_3): string {
    let str: string = ""
    if (action.action.length == 1) {
      str = "F_|"
    } else {
      str = "H_|"
    }
    for (let i = 0; i < action.action.length; i++) {
      const element = action.action[i];
      str = str + element[1] + "_"
    }
    str += "|"
    for (let i = 0; i < action.actionAfter.length; i++) {
      const element = action.actionAfter[i];
      str = str + element[1] + "_"
    }
    return str
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
    let s = 'export default class exampleData6_3D2 {\n';
    lw.forEach((value, key) => {
      s += '      ' + filename + key + ': Set<string> = new Set<string>(' + JSON.stringify(Array.from(value.values())) + ')      \n';
    });
    s += '}';

    FileWriter.setFile('./lib/module6_3/data' + filename + '.ts', s)
  }
}