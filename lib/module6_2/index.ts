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
import { REFUSED } from 'dns';
import { threadId } from 'worker_threads';
import RandomGenerater from '../util/RandomGenerater';

class GameData6_2 {
  //棋盘 由上至下 由左至右
  desk: number[][] =
    [[-1, -1, -1, 0, -1, -1, -1],
    [0, -1, 0, -1, 0, -1, 0],
    [-1, 0, -1, -1, -1, 0, -1],
    [0, -1, 0, -1, 0, -1, 0],
    [-1, -1, -1, 0, -1, -1, -1]];
  //选手 手持
  p1 = 4;
  p2 = 4;
  //当前选手 先手1 后手2
  player = 1;
  constructor(p1: number, p2: number, player: number, desk?: number[][]) {
    this.p1 = p1
    this.p2 = p2
    this.player = player
    if (desk != undefined) {
      this.desk = desk
    }
  }
}

class GameAction4_1 {
  //起子点
  move: number[] = []
  //落子点
  action: number[] = []

  constructor(move: number[], action: number[]) {
    this.move = move
    this.action = action
  }
}
export default class example2_2 {
  deskCells: number[][] =
    [[1, 4],
    [2, 1], [2, 3], [2, 5], [2, 7],
    [3, 2], [3, 6],
    [4, 1], [4, 3], [4, 5], [4, 7],
    [5, 4]]
  deskLines: number[][] = [[0, 2, 5], [0, 3, 6], [11, 8, 5], [11, 9, 6], [7, 5, 2], [7, 8, 9], [10, 9, 8], [10, 6, 3], [1, 2, 3], [1, 5, 8], [4, 3, 2], [4, 6, 9]]
  adjacentMap = new Map([
    [[1, 4], new Set([[2, 3], [2, 5]])],
    [[2, 1], new Set([[2, 3], [3, 2]])],
    [[2, 3], new Set([[3, 2], [2, 5], [2, 1], [1, 4]])],
    [[2, 5], new Set([[1, 4], [2, 3], [3, 6], [2, 7]])],
    [[2, 7], new Set([[2, 5], [3, 6]])],
    [[3, 2], new Set([[2, 1], [2, 3], [4, 1], [4, 3]])],
    [[3, 6], new Set([[2, 5], [2, 7], [4, 5], [4, 7]])],
    [[4, 1], new Set([[4, 3], [3, 2]])],
    [[4, 3], new Set([[4, 1], [3, 2], [4, 5], [5, 4]])],
    [[4, 5], new Set([[4, 3], [3, 6], [4, 7], [5, 4]])],
    [[4, 7], new Set([[4, 5], [3, 6]])],
    [[5, 4], new Set([[4, 3], [4, 5]])],
  ]);
  getRiddle(config: any): GameData6_2 {
    return new GameData6_2(4, 4, 1, undefined)
  }

  checkRiddle(deskData: GameData6_2): number {
    // 各子有4
    let p1DeskChess = this.getDeskChess(deskData, 1)
    let p2DeskChess = this.getDeskChess(deskData, 2)

    if ((p1DeskChess.length + deskData.p1) != 4) {
      return -1
    }
    if ((p2DeskChess.length + deskData.p2) != 4) {
      return -1
    }
    //不存在3连
    if (this.checkDesk(deskData) == 0) {
      return -1
    }
    return 1
  }

  doAction(deskData: GameData6_2, dataAction: GameAction4_1): [flagResult: number, dataResult: GameData6_2] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    if (dataAction.move.length == 0) {
      //如果落子，保证手中有子
      if (deskData.player == 1) {
        deskData.p1 -= 1
      }
      if (deskData.player == 2) {
        deskData.p2 -= 1
      }
    } else {
      //如果移子，保证点位有子
      deskData.desk[dataAction.move[0]][dataAction.move[1]] = 0
    }
    //如果ok，保证落子点ok
    deskData.desk[dataAction.action[0]][dataAction.action[1]] = deskData.player
    return [this.checkRiddle(deskData), deskData];
  }

  checkAction(deskData: GameData6_2, dataAction: GameAction4_1): number {
    if (dataAction.move.length == 0) {
      //如果落子，保证手中有子
      if (deskData.player == 1 && deskData.p1 == 0) {
        return -1
      }
      if (deskData.player == 2 && deskData.p2 == 0) {
        return -1
      }
    } else {
      //如果移子，保证点位有子
      if (deskData.player == 1 && deskData.desk[dataAction.move[0]][dataAction.move[1]] != 1) {
        return -1
      }
      if (deskData.player == 2 && deskData.desk[dataAction.move[0]][dataAction.move[1]] != 2) {
        return -1
      }
      if (!this.adjacentMap.get(dataAction.move)?.has(dataAction.action)) {
        return -1
      }
    }
    //如果ok，保证落子点ok
    if (deskData.desk[dataAction.action[0]][dataAction.action[1]] != 0) {
      return -1
    }
    return 1
  }

  checkDesk(deskData: GameData6_2): number {
    this.deskLines.forEach(link => {
      if (deskData.desk[this.deskCells[link[0]][0]][this.deskCells[link[0]][1]] != 0 &&
        deskData.desk[this.deskCells[link[0]][0]][this.deskCells[link[0]][1]] == deskData.desk[this.deskCells[link[1]][0]][this.deskCells[link[1]][1]] &&
        deskData.desk[this.deskCells[link[0]][0]][this.deskCells[link[0]][1]] == deskData.desk[this.deskCells[link[2]][0]][this.deskCells[link[2]][1]])
        return deskData.desk[this.deskCells[link[0]][0]][this.deskCells[link[0]][1]] == 1 ? 1 : 2;
    })
    return 0;
  }

  getActionAuto(deskData: GameData6_2): number[] {
    //盘面无子，随机落子
    //盘面子<2,相邻落子
    //盘面子>2,校验是否存在我方2连，他方2连
    //手中无知，校验可走点位，胜点位，败点位统计。




    throw new Error("Method not implemented.");
  }

  getDeskChess(deskData: GameData6_2, player: number): number[][] {
    let result: number[][] = []
    this.deskCells.forEach(cell => {
      let tmpCell = deskData.desk[cell[0]][cell[1]];
      if (tmpCell == player) {
        result.push(cell)
      }
    })
    return result;
  }

}