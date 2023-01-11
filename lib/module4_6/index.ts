// 4-6 先分后取
// 一．挑战模式
// 1.初始默认值：4，6，9
// 2. 参数范围：①堆数：2~4；
// ②每堆数量：1~12
// 3.过程记录：无
// 二．练习模式
// 一级：W2 或 L1
// 二级：W3 或 L2
// 三级：W4 或 L3
// 四级：W5 或 L4
// 五级：W6 或 L5
// 【w1 是指全被取完的状态，L1 是指一步可达 W1 的状态】
import RandomGenerater from '../util/RandomGenerater';

interface GameData4_6 {
  player: 1 | 2; // 当前选手 先手1 后手2
  stack: Array<number>; // 堆数据
}

interface GameData4_6_action {
  index: number; // 取的堆序号
  num: number; // 取的数量
}

// 普通获取题目
export const getRiddle = (stackNum?: number ): GameData4_6 => {
  const rg = new RandomGenerater(0)
  // 随机生成堆
  if(stackNum && stackNum >= 2 && stackNum <= 4){
    let arr = [];
    for(let i = 0; i < stackNum; i++){
      arr.push(rg.RangeInteger(1,12));
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
  if(dataDesk.player != 1 && dataDesk.player != 2) return -1;
  if(dataDesk.stack.length < 2 || dataDesk.stack.length > 4) return -1;
  for(let i of dataDesk.stack){
    if(i < 1 || i > 12) return -1;
  }
  return 1;
}

// 执行操作
// 返回 -1不合法不可执行 0未结束 1先手获胜 2后手获胜
export const doAction = (dataDesk: GameData4_6, dataAction: GameData4_6_action): {flagResult: number, dataResult: GameData4_6} => {
  let result = checkAction(dataDesk, dataAction);
  let { stack = [], player } = dataDesk;
  let { index = 0, num = 0 } = dataAction;
  if(result === -1){
    return { flagResult: -1, dataResult: dataDesk };
  } else {
    let arr = stack;
    arr[index] = arr[index] - num;
    if(arr[index] === 0){
      arr.splice(index, 1);
    }
    if(arr.length === 0){
      // 堆取完，获胜
      return { flagResult: player, dataResult: {player, stack: []} };
    } else {
      return { flagResult: 0, dataResult: {player, stack: arr} };
    }
  }
}

// 检查操作是否合法
export const checkAction = (dataDesk: GameData4_6, dataAction: GameData4_6_action): number => {
  let { stack = [], player } = dataDesk;
  let { index = 0, num = 0 } = dataAction;
  // 合法判断：非空堆，堆序号合法，玩家角色正确
  if(
    stack.length && 
    index >= 0 && 
    index < stack.length &&
    ( player === 1 || player === 2 )
  ){
    let totalNum = stack[index];
    if(totalNum % num === 0 && num <= totalNum && num > 0){
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
  if(stack.length === 0){
    return player;
  } else {
    return -1;
  }
}

// 获取当前最佳应对策略，即机器人算法
export const getActionAuto = (dataDesk: GameData4_6): {best: GameData4_6_action, nobest: GameData4_6_action} => {
  let { stack = [] } = dataDesk;
  // 剩一堆时
  if(stack.length === 1){
    return {
      best: { index: 0, num: stack[0] },
      nobest: { index: 0, num: stack[0] },
    }
  } else {
    return {
      best: { index: 0, num: 1 },
      nobest: { index: 0, num: 1 },
    }
  }
}
