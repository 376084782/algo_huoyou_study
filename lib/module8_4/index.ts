// 8-4 三角形游戏
/**
 * @author yuhuan
 * 模型建设
 * 等边三角形棋盘
 *             [0,0]
 *       [1,0] [1,1] [1,2] 
 * [2,0] [2,1] [2,2] [2,3] [2,4]
 * 
 * 三角形[x,y]的相邻三个三角形为
 * y偶数：[x,y-1],[x,y+1],[x+1,y+1]
 * y奇数：[x,y-1], [x,y+1], [x-1,y-1]
 * x/y取值范围：x>=0, y>=0, y<=2x
 * 第n行的三角形个数为2n-1
 */

import RandomGenerater from '../util/RandomGenerater';

export interface GameData8_4 {
  typeSet?: number;//前端用的，存是否是自定义棋盘
  player: 1 | 2; // 当前选手 先手1 后手2
  sideLength: number; // 棋盘边长
  player_one: Array<Array<number>>; // 选手1占领的三角形，例如：[[1,1],[1,2]]
  player_two: Array<Array<number>>; // 选手2占领的三角形
}

export interface GameData8_4_action {
  player: 1 | 2; // 当前选手 先手1 后手2
  triangle: Array<number>; // 增加的三角形
}

// 判断玩家当前数据是否合法
const isPlayerIegal = (arr: Array<any>, sideLength: number)=>{
  if (arr.length > 25){
    return -1;
  } else if (arr.length > 0){
    for (let i of arr) {
      if(!isTriangleIegal(i, sideLength)){
        return -1;
      }
    }
  } else {
    return 1;
  }
}

// 判断三角形坐标对于棋盘是否合法
const isTriangleIegal = (triangle: Array<number>, sideLength: number)=>{
  if(triangle.length != 2) {
    return false;
  } else if(
    triangle[0] < sideLength &&
    triangle[0] >= 0 && 
    triangle[1] >= 0 && 
    triangle[1] <= 2*triangle[0]
  ){
    return true;
  } else {
    return false;
  }
}

// 获取相邻节点
const getAdjacent = (triangle: Array<number>)=>{
  let x = triangle[0], y = triangle[1];
  let arr;
  if(y % 2 === 0){
    arr = [[x, y-1], [x, y+1], [x+1, y+1]];
  } else {
    arr = [[x, y-1], [x, y+1], [x-1, y-1]];
  }
  return arr;
}

// 获取形成三角形的节点
const getTriangleOther = (triangle: Array<number>, sideLength: number)=>{
  let x = triangle[0], y = triangle[1];
  let arr;
  let res:any = [];
  if(y % 2 === 0){
    arr = [
      [[x+1, y],[x+1, y+2]], 
      [[x-1, y-2],[x, y-2]],
      [[x-1, y],[x, y+2]]
    ];
  } else {
    arr = [
      [[x-1, y-2],[x-1, y]], 
      [[x, y-2],[x+1, y]],
      [[x, y+2],[x+1, y+2]]
    ];
  }
  arr.forEach(i=>{
    if(isTriangleIegal(i[0], sideLength) && isTriangleIegal(i[1], sideLength)){
      res.push(i)
    }
  })
  return res;
}

// 获取某个三角形周边的节点
const getTriangleAround = (triangle: Array<number>, sideLength: number)=>{
  let x = triangle[0], y = triangle[1];
  let arr;
  let res:any = [];
  if(y % 2 === 0){
    arr = [[x, y-1],[x, y+1],[x+1, y+1]];
  } else {
    arr = [[x, y-1],[x, y+1],[x-1, y-1]];
  }
  arr.forEach(i=>{
    if(isTriangleIegal(i, sideLength)){
      res.push(i)
    }
  })
  return res;
}

// 判断是否形成目标三角形
const isSuccess = (allTriangle: Array<any>, playerTriangle: Array<any>)=>{
  for (let i of allTriangle) {
    let arr = getAdjacent(i);
    if(
      JSON.stringify(playerTriangle).indexOf(JSON.stringify(arr[0])) > -1 &&
      JSON.stringify(playerTriangle).indexOf(JSON.stringify(arr[1])) > -1 &&
      JSON.stringify(playerTriangle).indexOf(JSON.stringify(arr[2])) > -1
    ) {
      return 1;
    }
  }
  return -1;
}

// --------分割线--------------------------------------------
// 普通获取题目
export const getRiddle = (sideLength?: number): GameData8_4 => {
  let len;
  const rg = new RandomGenerater(0);
  const reg = /^[1-9]\d*$/;
  if(sideLength && reg.test(sideLength.toString())){
    len = sideLength;
  } else {
    // 已知棋盘是等边三角形，双方要形成一个结果，棋盘最小边长为3，可接受的最大边长为棋子数总和50
    len = rg.RangeInteger(3, 50);
  }
  return {
    player: 1,
    sideLength: len,
    player_one: [],
    player_two: []
  }
}

// 判断题目是否合法
export const checkRiddle = (dataDesk: GameData8_4): number => {
  const { player, player_one, player_two, sideLength } = dataDesk;
  if (player != 1 && player != 2) return -1;
  if (sideLength < 1) return -1;
  // 双方数据是否符合棋盘
  const player1 = isPlayerIegal(player_one, sideLength);
  const player2 = isPlayerIegal(player_two, sideLength);
  if(player1 === -1 || player2 === -1) return -1;
  // 双方是否有重复，当前所有三角形是否都有重合边
  let allTriangle = player_one.concat(player_two);
  let temp:any = [];
  for (let i of allTriangle) {
    let arr = getAdjacent(i);
    if(
      JSON.stringify(allTriangle).indexOf(JSON.stringify(arr[0])) < 0 &&
      JSON.stringify(allTriangle).indexOf(JSON.stringify(arr[1])) < 0 &&
      JSON.stringify(allTriangle).indexOf(JSON.stringify(arr[2])) < 0
    ){
      // 存在三角形无重合边
      return -1;
    }
    if(JSON.stringify(temp).indexOf(JSON.stringify(i)) > -1){
      // 存在重复三角形
      return -1;
    } else {
      temp.push(i);
    }
  }
  return 1;
}

// 执行操作
// 返回 -1不合法不可执行 0未结束 1先手获胜 2后手获胜
export const doAction = (dataDesk: GameData8_4, dataAction: GameData8_4_action): { flagResult: number, dataResult: GameData8_4 } => {
  const { player, triangle } = dataAction;
  const { player_one, player_two, typeSet, sideLength} = dataDesk;
  let result = checkAction(dataDesk, dataAction);
  const allTriangle = player_one.concat(player_two);
  if (result === -1) {
    return { flagResult: -1, dataResult: dataDesk };
  } else {
    let success = -1;
    if(player === 1){
      success = isSuccess(allTriangle.concat([triangle]), player_one.concat([triangle]));
    } else {
      success = isSuccess(allTriangle.concat([triangle]), player_two.concat([triangle]));
    }
    // 输出
    const resObj = {
      typeSet,
      player,
      sideLength,
      player_one: player === 1 ? player_one.concat([triangle]) : player_one,
      player_two: player === 2 ? player_two.concat([triangle]) : player_two,
    }
    if(success === -1){
      return { flagResult: 0, dataResult: resObj };
    } else {
      return { flagResult: player, dataResult: resObj };
    }
  }
}

// 检查操作是否合法
// 1、三角形的一条边得与桌面上某个三角形有重合边
// 2、三角形个数不可超过25个
// 3、不可以选择已被选择的三角形
export const checkAction = (dataDesk: GameData8_4, dataAction: GameData8_4_action): number => {
  const { player, triangle } = dataAction;
  const { sideLength, player_one, player_two } = dataDesk;
  const _triangle = JSON.stringify(triangle);
  const allTriangle = player_one.concat(player_two);
  if(!isTriangleIegal(triangle, sideLength)){
    return -1;
  } else if(
    (player === 1 && player_one.length >= 25) ||
    (player === 2 && player_two.length >= 25) ||
    JSON.stringify(allTriangle).indexOf(_triangle) > -1
  ){
    return -1;
  } else {
    // 判断是否有重合边
    for (let i of allTriangle) {
      let arr = getAdjacent(i);
      if (JSON.stringify(arr).indexOf(_triangle) > -1) {
        return 1;
      }
    }
  }
  return -1;
}

// 检查桌面状态
// 返回-1未结束 1先手获胜 2后手获胜
export const checkDesk = (dataDesk: GameData8_4): number => {
  const { player_one, player_two } = dataDesk;
  const allTriangle = player_one.concat(player_two);
  const success1 = isSuccess(allTriangle, player_one);
  const success2 = isSuccess(allTriangle, player_two);
  if(success1) return 1;
  if(success2) return 2;
  return -1;
}

// 获取当前最佳应对策略，即机器人算法
export const getActionAuto = (dataDesk: GameData8_4): { best: GameData8_4_action, nobest: GameData8_4_action } => {
  const { sideLength, player_one, player_two, player } = dataDesk;
  const allTriangle = player_one.concat(player_two);
  const selfArr = player === 1 ? JSON.stringify(player_one) : JSON.stringify(player_two);
  const oppositeArr = player === 1 ? JSON.stringify(player_two) : JSON.stringify(player_one);

  // 解的优先级：能够形成三角形 > 拦截对方形成三角形 > 能够组成双底座 > 靠近己方三角形
  let res1:any = [], res2:any = [], res3:any = [], res4:any = [];

  // 1、找到当前每个三角形的可用相邻节点作为选择集合
  // 2、根据解的优先级排序
  for (let i of allTriangle) {
    let arr = getAdjacent(i);
    arr.forEach(item => {
      // 现有节点的可用相邻节点
      if(
        isTriangleIegal(item, sideLength) && 
        JSON.stringify(allTriangle).indexOf(JSON.stringify(item)) < 0
      ){
        let priorityNum = handlePriority(item, sideLength, oppositeArr, selfArr);
        if(priorityNum === 1) {
          res1.push(item);
        } else if(priorityNum === 2){
          res2.push(item);
        } else if(priorityNum === 3){
          res3.push(item);
        } else {
          res4.push(item);
        }
      }
    })
  }

  const priority = res1.concat(res2).concat(res3).concat(res4);
  return {
    best: { player, triangle:priority[0] },
    nobest: { player, triangle:priority[1] },
  }
}

const handlePriority = (triangle: Array<number>, sideLength: number, oppositeStr: string, selfStr:string)=>{
  let triangleOther = getTriangleOther(triangle, sideLength);
  for(let sub of triangleOther){
    if(
      selfStr.indexOf(JSON.stringify(sub[0])) > -1 &&
      selfStr.indexOf(JSON.stringify(sub[1])) > -1
    ){
      return 1;
    } else if(
      oppositeStr.indexOf(JSON.stringify(sub[0])) > -1 &&
      oppositeStr.indexOf(JSON.stringify(sub[1])) > -1
    ){
      return 2;
    } 
  }
  // 获取这个三角形的周边节点，如果有两个在己方，则此三角形优先级为3，不可能有三个（三个为成功态）
  let triangleAround = getTriangleAround(triangle, sideLength);
  let num = 0;
  for(let around of triangleAround){
    if( selfStr.indexOf(JSON.stringify(around)) > -1){
      num++;
    }
  }
  if(num === 2) return 3;
  return -1;
}


