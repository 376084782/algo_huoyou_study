/**
 * @author jiutou
 * @updateTime 2022/11/29
 * @tip 抢单数
 * @description 
 * 
 一．挑战模式
1. 参数默认值：
  a.棋子颗数：15 
  b.每次可抢颗数：1，2，3 
  c.玩家 1 已抢：0 颗，玩家 2 已抢：0 颗
2. 参数范围：
  a.棋子颗数：n=2k+1，k 为整数，且满足[0,15] 
  b.每次可抢颗数：1，2 或 1，2，3 
  c.剩余颗数 r∈[1,n-1]
  d.玩家 1 和玩家 2 已抢分别为 t1、t2（满足①t1+t2≤n-1；②t1 或 t2 中大的不能超过小的的 2 倍【如果规则是抢 1 或 2】或 3 倍【如果规则是抢 1、2、3】）
3. 过程记录【①所有游戏统一最大显示行数：6，往后自动滚动但可以手动滑动查看②所有
游戏总是先手在过程记录表格左边，先手操作数据总是用红色字显示，后手总是用蓝色显示】

二．练习模式
1.固定每次可抢数为：1，2，3。
2.固定棋子总数为 15。每个题以残局的形式表现，为描述方便用一个向量表示一个残局局面（玩家已抢，剩余）。
注：练习界面上要完整显示玩家已抢，电脑已抢，剩余。
一级：（6，2）、（7，2）、（8，2）、（5，2）、（6，3）、（5，3）、（6，4）、（4，4）
二级：（7，5）、（4，6）、（5，6）、（6，6）、（5，7）、（4，7）、（2，7）、（3，8）
三级：（2，9）、（3，9）、（3，10）、（2，10）
四级：（2，11）、（1，11）（2，12）、（1，12）
...
 * 
 */
import { GameStep, GameWay, GameAutoWay } from '../common/pojo';
import RandomGenerater from '../util/RandomGenerater';
import OtherUtil from '../util/OtherUtil';
import { Console } from 'console';

export class GameData4_1 {
  //参数
  k = 7;
  //总数
  n = 2 * this.k + 1;
  //限制获取上限
  p = 3;
  //玩家手持
  p1 = 0
  p2 = 0
  //剩余
  residue = 2 * this.k + 1;
  //轮次
  rounds = 0
  //当前玩家 p1 1 p2 2
  player = 1

  constructor(k: number, p: number) {
    this.k = k
    this.p = p
    this.n = 2 * this.k + 1;
    this.residue = 2 * this.k + 1;
  }

}
export class GameConfig4_1 {
  p = 3
  p1 = 0
  p2 = 0
  n = 15
}

export class GameStep4_1 {
  p = 3;
  p1 = 0
  p2 = 0
  action = 0
  residue = 0
  player = 1

  constructor(p: number, p1: number, p2: number, residue: number, player: number, action: number) {
    this.p = p
    this.p1 = p1
    this.p2 = p2
    this.residue = residue
    this.player = player
    this.action = action
  }
}
export default class example4_1 {

  level1Positions: number[][] = [[6, 2], [7, 2], [8, 2], [5, 2], [6, 3], [5, 3], [6, 4], [4, 4]]
  level2Positions: number[][] = [[7, 5], [4, 6], [5, 6], [6, 6], [5, 7], [4, 7], [2, 7], [3, 8]]
  level3Positions: number[][] = [[2, 9], [3, 9], [3, 10], [2, 10]]
  level4Positions: number[][] = [[2, 11], [1, 11], [2, 12], [1, 12]]

  getRiddleByLev(level: number, config: any): GameData4_1 {
    let gd = new GameData4_1(7, 3);
    const rg = new RandomGenerater(0)

    let tmp = new Array
    if (level == 1) {
      tmp = this.level1Positions[rg.RangeInteger(0, this.level1Positions.length)];
      gd.p1 = tmp[0]
      gd.p2 = tmp[1]
    } else if (level == 2) {
      tmp = this.level2Positions[rg.RangeInteger(0, this.level2Positions.length)];
    } else if (level == 3) {
      tmp = this.level3Positions[rg.RangeInteger(0, this.level3Positions.length)];
    } else if (level == 4) {
      tmp = this.level4Positions[rg.RangeInteger(0, this.level4Positions.length)];
    } else {
      tmp = [0, 0]
    }
    gd.p1 = tmp[0]
    gd.p2 = tmp[1]
    gd.residue = gd.residue - tmp[0] - tmp[1]

    return gd;
  }

  getRiddle(config: GameConfig4_1): GameData4_1 {
    const rg = new RandomGenerater(0)
    let k = 7
    if (config.n % 2 == 1) {
      k = Math.floor(config.n / 2)
    } else {
      throw new Error("总数不可为偶数");
    }
    if (config.p2 + config.p1 >= config.n) {
      throw new Error("双方数量总和大于或等于总数");
    }
    let gd = new GameData4_1(k, config.p);
    gd.p1 = config.p1
    gd.p2 = config.p2
    return gd
  }

  checkRiddle(deskData: GameData4_1): number {
    if (deskData.k > 7 || deskData.k < 0 ||
      (deskData.p != 2 && deskData.p != 3) ||
      (deskData.n != 2 * deskData.k + 1) ||
      ((deskData.p1 + deskData.p2) > deskData.n)) {
      return -1
    }
    let ps: number[] = [deskData.p1, deskData.p2]
    ps = ps.sort()
    if (!(deskData.n >= 5 && deskData.n <= 15 && deskData.n % 2 != 0)) {
      return -1
    }



    if (deskData.p == 3) {
      if (ps[0] * 3 < ps[1]) {
        return -1
      }
    } else {
      if (ps[0] * 2 < ps[1]) {
        return -1
      }
    }
    if (deskData.p2 + deskData.p1 >= deskData.n) {
      // throw new Error("双方数量总和大于或等于总数");
      return -1
    }

    return 1
  }

  doAction(deskData: GameData4_1, dataAction: number): [flagResult: number, dataResult: GameData4_1] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    let flagResult = 0

    deskData.residue = deskData.residue - dataAction
    if (deskData.player == 1) {
      deskData.p1 += dataAction
    } else {
      deskData.p2 += dataAction
    }
    deskData.player = OtherUtil.getRival(deskData.player)
    return [this.checkDesk(deskData), deskData];
  }

  checkAction(deskData: GameData4_1, dataAction: number): number {
    if (deskData.residue < dataAction) {
      return -1;
    }
    if (dataAction > deskData.p) {
      return -1;
    }
    if (dataAction <= 0) {
      return -1;
    }
    return 1;
  }

  checkDesk(deskData: GameData4_1): number {
    if (deskData.residue == 0) {
      if (deskData.p1 % 2 == 0) {
        return 2;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }


  getActionAuto(deskData: GameData4_1): GameAutoWay {
    const rg = new RandomGenerater(0)
    if (deskData.residue > (deskData.p * 2) - 1) {
      return new GameAutoWay(rg.RangeInteger(1, deskData.p), rg.RangeInteger(1, deskData.p));
    }
    return this.getAllAction(deskData.residue, deskData.p, deskData.p1, deskData.p2, deskData.player);
  }

  getAllAction(residue: number, p: number, p1: number, p2: number, player: number): GameAutoWay {
    let step = new GameStep(new GameStep4_1(p, p1, p2, residue, OtherUtil.getRival(player), 0), 0)
    step.nexts = this.getNextAction(step)
    let allWay: GameWay[] = OtherUtil.getTreeWays(step);
    let winStep = allWay.filter(x => { return x.node.flag == player }).sort((a, b) => { return `${a.node.stepNum}`.localeCompare(`${b.node.stepNum}`) });
    let loseStep = allWay.filter(x => { return x.node.flag != player }).sort((a, b) => { return `${b.node.stepNum}`.localeCompare(`${a.node.stepNum}`) });

    let best = -1
    let nobest = -1
    if (winStep.length == 0 && loseStep.length != 0) {
      best = loseStep[loseStep.length - 1].current.action
      nobest = loseStep[loseStep.length - 1].current.action
    } else if (winStep.length != 0) {
      best = winStep[0].current.action
      if (winStep[0].node.stepNum == 1) {
        nobest = winStep[0].current.action
      } else {
        if (winStep.length > 1) {
          nobest = winStep[1].current.action
        } else {
          nobest = best
        }
      }

    }
    return new GameAutoWay(best, nobest)
  }

  getNextAction(step: GameStep): GameStep[] {

    let max = step.current.residue > step.current.p ? step.current.p : step.current.residue;

    let result: GameStep[] = []

    let i: number = 1
    for (i = 1; i <= max; i++) {
      let p = step.current.p
      let p1 = step.current.p1
      let p2 = step.current.p2
      let residue = step.current.residue
      let player = OtherUtil.getRival(step.current.player)
      residue -= i
      if (player == 1) {
        p1 += i
      } else {
        p2 += i
      }
      let tmp = new GameStep(new GameStep4_1(p, p1, p2, residue, player, i), step.stepNum + 1)
      if (tmp.current.residue == 0) {
        //如果这步下完输了，并有其他的下法，则过滤
        tmp.flag = p1 % 2 == 0 ? 2 : 1
      } else {
        tmp.flag = 0
        tmp.nexts = this.getNextAction(tmp);
      }
      if (!((player == 1 && p1 % 2 == 0 && max != 1) ||
        (player == 2 && p2 % 2 == 0 && max != 1))) {
        result.push(tmp)
      }
    }
    return result;
  }

}