// 4-6 先分后取
// 一．挑战模式
// 1.初始默认值：4，6，9
// 2. 参数范围：①堆数：2~4；
// ②每堆数量：1~12
// 3.过程记录：无
import RandomGenerater from '../util/RandomGenerater';

export interface GameData4_6 {
  typeSet?: number;//前端用的，存是否是自定义棋盘
  player: 1 | 2; // 当前选手 先手1 后手2
  stack: Array<number>; // 堆数据
}

export interface GameData4_6_action {
  index: number; // 取的堆序号
  num: number; // 取的数量
}

// 普通获取题目
export const getRiddle = (stackNum?: number): GameData4_6 => {
  const rg = new RandomGenerater(0)
  // 随机生成堆
  if (stackNum && stackNum >= 2 && stackNum <= 4) {
    let arr = [];
    for (let i = 0; i < stackNum; i++) {
      arr.push(rg.RangeInteger(1, 12));
    }
    return {
      player: 1,
      stack: arr
    }
  } else {
    // 返回初始默认值
    return {
      player: 1,
      stack: [4, 6, 9]
    }
  }
}

// 判断题目是否合法
export const checkRiddle = (dataDesk: GameData4_6): number => {
  if (dataDesk.player != 1 && dataDesk.player != 2) return -1;
  if (dataDesk.stack.length < 2 || dataDesk.stack.length > 4) return -1;
  for (let i of dataDesk.stack) {
    if (i < 1 || i > 12) return -1;
  }
  return 1;
}

// 执行操作
// 返回 -1不合法不可执行 0未结束 1先手获胜 2后手获胜
export const doAction = (dataDesk: GameData4_6, dataAction: GameData4_6_action): { flagResult: number, dataResult: GameData4_6 } => {
  let result = checkAction(dataDesk, dataAction);
  let { stack = [], player } = dataDesk;
  let { index = 0, num = 0 } = dataAction;
  if (result === -1) {
    return { flagResult: -1, dataResult: dataDesk };
  } else {
    let arr = stack;
    arr[index] = arr[index] - num;
    // fix by 钱：0的堆不删除
    if (arr[index] === 0) {
      // arr.splice(index, 1);
    }
    if (arr.length === 0 || arr.every(e => e == 0)) {
      // 堆取完，获胜
      return { flagResult: player, dataResult: { player, stack: [] } };
    } else {
      return { flagResult: 0, dataResult: { player, stack: arr } };
    }
  }
}

// 检查操作是否合法
export const checkAction = (dataDesk: GameData4_6, dataAction: GameData4_6_action): number => {
  let { stack = [], player } = dataDesk;
  let { index = 0, num = 0 } = dataAction;
  // 合法判断：非空堆，堆序号合法，玩家角色正确
  if (
    stack.length &&
    index >= 0 &&
    index < stack.length &&
    (player === 1 || player === 2)
  ) {
    let totalNum = stack[index];
    if (totalNum % num === 0 && num <= totalNum && num > 0) {
      return 1;
    } else {
      return -1;
    }
  } else {
    return -1;
  }
}

// 检查桌面状态
// 返回-1未结束 1先手获胜 2后手获胜
export const checkDesk = (dataDesk: GameData4_6): number => {
  let { stack = [], player } = dataDesk;
  if (stack.length === 0) {
    return player;
  } else {
    return -1;
  }
}
// 改动by qian 2023/1/25  为了使stack0的堆不被删除且不破坏现有逻辑，额外包一层转化
export const getActionAuto = (dataDesk: GameData4_6): { best: GameData4_6_action, nobest: GameData4_6_action } => {
  let idxMap: any = {};
  let idxNew = 0;
  dataDesk.stack.forEach((n, idx) => {
    idxMap[idxNew] = idx;
    if (n > 0) {
      idxNew++;
    }
  })
  dataDesk.stack = dataDesk.stack.filter(e => e > 0);
  let res = getActionAuto1(dataDesk);
  res.best.index = idxMap[res.best.index];
  res.nobest.index = idxMap[res.nobest.index];
  return res;
}

// 获取当前最佳应对策略，即机器人算法
export const getActionAuto1 = (dataDesk: GameData4_6): { best: GameData4_6_action, nobest: GameData4_6_action } => {

  let { stack = [] } = dataDesk;

  if (stack.length === 1) {
    // 剩一堆时直接拿走
    return {
      best: { index: 0, num: stack[0] },
      nobest: { index: 0, num: stack[0] },
    }
  } else {
    // 罗列100条当前玩家赢的路径，路径短最优，其次为次优
    /**
     * actionArr结果实例，数组第一项中记录了该路径下一节点的行动方式
     * getResult([[4,6,9]], [])
     * actionArr = [
        "[[4,9,{\"index\":0,\"num\":1}],[3,9],[2,9],[1,9],[1,8],[1,7],[1,6],[1,5],[1,4],[1,3]]",
        "[[4,9,{\"index\":0,\"num\":1}],[3,9],[2,9],[1,9],[1,6],[1,3]]"
        ...
     * ]
     */
    let actionArr = getResult(stack, [], []);
    if (actionArr.length === 0) {
      // 若无必胜路径
      return {
        best: { index: 0, num: 1 },
        nobest: { index: 0, num: 1 },
      }
    } else {
      let bestRoute = actionArr[0]
      let nobestRoute = actionArr[0]
      actionArr.forEach((i: any) => {
        let bastLen = JSON.parse(bestRoute).length;
        let nobestLen = JSON.parse(nobestRoute).length;
        let len = JSON.parse(i).length;
        if (len < bastLen) {
          bestRoute = i;
        }
        if (len > nobestLen) {
          nobestRoute = i;
        }
      })
      return {
        best: JSON.parse(bestRoute)[0][JSON.parse(bestRoute)[0].length - 1],
        nobest: JSON.parse(nobestRoute)[0][JSON.parse(bestRoute)[0].length - 1],
      }
    }
  }
}

// 必赢节点
const successPoint = [
  '[1,1]', '[1,3]', '[2,2]', '[3,1]', '[3,3]', '[1,1,1,1]'
]
// 必输节点
const failPoint = [
  '[1,1,1]', '[1,1,2]', '[2,1,1]', '[1,2,1]'
]

const getResult = (arr: Array<number>, appendArr: Array<any>, resArr: Array<any>) => {
  if (!appendArr.length) appendArr.push(arr);
  let len = arr.length
  let res = getStep(arr)
  let array = resArr
  res && res.forEach(ii => {
    let i = ii.node;
    let a = appendArr.concat([i])
    if (a.length === 2) {
      a[0][len] = ii.action
    }
    if (array.length < 100) {
      if (successPoint.indexOf(JSON.stringify(i)) > -1 && a.length % 2 === 0) {
        // 命中必赢节点, 直接返回
        array.push(JSON.stringify(a))
      } else if (failPoint.indexOf(JSON.stringify(i)) > -1 && a.length % 2 === 0) {
        // 命中必输节点, 跳过
      } else {
        if (i.length) {
          getResult(i, a, resArr)
        } else {
          // 选择偶数步的路径（算上当前节点）
          if (array.indexOf(JSON.stringify(a)) < 0 && a.length % 2 === 0) {
            array.push(JSON.stringify(a))
          }
        }
      }
    }

  })
  return array
}

const getStep = (stack: Array<any>) => {
  const step: any = {
    1: [1],
    2: [1, 2],
    3: [1, 3],
    4: [1, 2, 4],
    5: [1, 5],
    6: [1, 2, 3, 6],
    7: [1, 7],
    8: [1, 2, 4, 8],
    9: [1, 3, 9],
    10: [1, 2, 5, 10],
    11: [1, 11],
    12: [1, 2, 3, 4, 6, 12]
  }
  let arr = [] as any[];
  stack.forEach((item, index) => {
    let res = step[item];
    res && res.forEach((r: number) => {
      // @ts-ignore
      let _arr: any = [].concat(stack);
      _arr[index] = item - r;
      if (
        (item === r && stack.length === 1 && item === 1) ||
        (item === r && stack.length === 2 && stack[0] === 1 && stack[1] === 1) ||
        stack.length > 2 ||
        item != r
      ) {
        let action = { index: index, num: r }
        if (item === r) {
          _arr.splice(index, 1)
        }
        arr.push({ node: _arr, action: action });
      }
    })
  })
  return arr;
}


