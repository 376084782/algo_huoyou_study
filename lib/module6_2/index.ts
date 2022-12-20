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
import { GameAutoWay } from '../common/pojo';
import OtherUtil from '../util/OtherUtil';
import RandomGenerater from '../util/RandomGenerater';

export class GameData6_2 {
  //棋盘 由上至下 由左至右
  desk: number[][] = [
    [9, 9, 9, 0, 9, 9, 9],
    [1, 9, 2, 9, 1, 9, 2],
    [9, 0, 9, 9, 9, 0, 9],
    [2, 9, 1, 9, 2, 9, 1],
    [9, 9, 9, 0, 9, 9, 9],
  ];
  // [9, 9, 9, 0, 9, 9, 9],
  // [1, 9, 2, 9, 1, 9, 2],
  // [9, 0, 9, 9, 9, 0, 9],
  // [2, 9, 1, 9, 2, 9, 1],
  // [9, 9, 9, 0, 9, 9, 9]];
  //当前选手 先手1 后手2
  player = 1;
  constructor(player: number, desk?: number[][]) {
    this.player = player
    if (desk != undefined) {
      this.desk = desk
    }
  }
}

export class GameAction6_2 {
  //起子点
  move: number[] = []
  //落子点
  action: number[] = []
  score: number = 0

  constructor(move: number[], action: number[], score?: number) {
    this.move = move
    this.action = action
    if (score != undefined) {
      this.score = score
    }
  }
}

export class example6_2 {
  deskCells: number[][] =
    [[1, 4],
    [2, 1], [2, 3], [2, 5], [2, 7],
    [3, 2], [3, 6],
    [4, 1], [4, 3], [4, 5], [4, 7],
    [5, 4]]
  deskLines: number[][] = [[0, 2, 5], [0, 3, 6],
  [11, 8, 5], [11, 9, 6],
  [7, 5, 2], [7, 8, 9],
  [10, 9, 8], [10, 6, 3],
  [1, 2, 3], [1, 5, 8],
  [4, 3, 2], [4, 6, 9]]
  positionMap = new Map<String, number>([["1-4", 0],
  ["2-1", 1],
  ["2-3", 2],
  ["2-5", 3],
  ["2-7", 4],
  ["3-2", 5],
  ["3-6", 6],
  ["4-1", 7],
  ["4-3", 8],
  ["4-5", 9],
  ["4-7", 10],
  ["5-4", 11]])
  adjacentMap = new Map<String, Set<number[]>>([
    ["1-4", new Set([[2, 3], [2, 5]])],
    ["2-1", new Set([[2, 3], [3, 2]])],
    ["2-3", new Set([[3, 2], [2, 5], [2, 1], [1, 4]])],
    ["2-5", new Set([[1, 4], [2, 3], [3, 6], [2, 7]])],
    ["2-7", new Set([[2, 5], [3, 6]])],
    ["3-2", new Set([[2, 1], [2, 3], [4, 1], [4, 3]])],
    ["3-6", new Set([[2, 5], [2, 7], [4, 5], [4, 7]])],
    ["4-1", new Set([[4, 3], [3, 2]])],
    ["4-3", new Set([[4, 1], [3, 2], [4, 5], [5, 4]])],
    ["4-5", new Set([[4, 3], [3, 6], [4, 7], [5, 4]])],
    ["4-7", new Set([[4, 5], [3, 6]])],
    ["5-4", new Set([[4, 3], [4, 5]])],
  ]);

  deskLineMap = new Map([
    ["1-4", new Set([[0, 2, 5], [0, 3, 6]])],
    ["2-1", new Set([[1, 2, 3], [1, 5, 8]])],
    ["2-3", new Set([[1, 2, 3], [4, 3, 2], [7, 5, 2], [0, 2, 5]])],
    ["2-5", new Set([[10, 6, 3], [1, 2, 3], [4, 3, 2], [0, 3, 6]])],
    ["2-7", new Set([[4, 3, 2], [4, 6, 9]])],
    ["3-2", new Set([[0, 2, 5], [11, 8, 5], [7, 5, 2], [1, 5, 8]])],
    ["3-6", new Set([[0, 3, 6], [11, 9, 6], [10, 6, 3], [4, 6, 9]])],
    ["4-1", new Set([[7, 5, 2], [7, 8, 9]])],
    ["4-3", new Set([[11, 8, 5], [7, 8, 9], [10, 9, 8], [1, 5, 8]])],
    ["4-5", new Set([[11, 9, 6], [7, 8, 9], [10, 9, 8], [4, 6, 9]])],
    ["4-7", new Set([[10, 9, 8], [10, 6, 3]])],
    ["5-4", new Set([[11, 8, 5], [11, 9, 6]])],
  ]);

  //元组权重
  deskWeight: number[] = [7, 100, 800000, 70, 100000, 0, 0]
  // 空 7
  // B 100
  // BB 800000
  // W 70
  // WW 100000
  // Virtual 0
  // Polluted 0
  deskWeight2: number[] = [10000, 100, 70, 0]
  // BB 10000
  // B 100
  // W 70
  // WW 1
  // Virtual 0
  // Polluted 0

  getRiddle(config: any): GameData6_2 {
    return new GameData6_2(1, undefined)
  }

  checkRiddle1(deskData: GameData6_2): number {
    // 各子有4
    let p1DeskChess = this.getDeskChess(deskData, 1)
    let p2DeskChess = this.getDeskChess(deskData, 2)

    if ((p1DeskChess.length) != 4) {
      return -1
    }
    if ((p2DeskChess.length) != 4) {
      return -1
    }
    //不存在3连
    return this.checkDesk1(deskData)
  }

  checkRiddle(deskData: GameData6_2): number {
    // 各子有4
    let p1DeskChess = this.getDeskChess(deskData, 1)
    let p2DeskChess = this.getDeskChess(deskData, 2)

    if ((p1DeskChess.length) != 4) {
      return -1
    }
    if ((p2DeskChess.length) != 4) {
      return -1
    }
    //不存在3连
    return this.checkDesk1(deskData)
  }

  doAction(deskData: GameData6_2, dataAction: GameAction6_2): [flagResult: number, dataResult: GameData6_2] {

    if (dataAction.move.length > 0) {
      let move1 = JSON.parse(JSON.stringify(dataAction.move));
      move1[0] = move1[0] + 1
      move1[1] = move1[1] + 1
      dataAction.move = move1
    }
    if (dataAction.action.length > 0) {
      let action1 = JSON.parse(JSON.stringify(dataAction.action));
      action1[0] = action1[0] + 1
      action1[1] = action1[1] + 1
      dataAction.action = action1
    }
    return this.doAction1(deskData, dataAction)
  }

  doAction1(deskData: GameData6_2, dataAction: GameAction6_2): [flagResult: number, dataResult: GameData6_2] {
    if (this.checkAction1(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    //如果移子，保证点位有子
    if (deskData.desk[dataAction.move[0] - 1][dataAction.move[1] - 1] != deskData.player) {
      return [-1, deskData];
    }
    //如果ok，保证落子点ok
    deskData.desk[dataAction.action[0] - 1][dataAction.action[1] - 1] = deskData.player
    deskData.desk[dataAction.move[0] - 1][dataAction.move[1] - 1] = 0
    deskData.player = OtherUtil.getRival(deskData.player)
    return [this.checkRiddle1(deskData), deskData];
  }

  checkAction(deskData: GameData6_2, dataAction: GameAction6_2): number {
    if (dataAction.move.length > 0) {
      let move1 = JSON.parse(JSON.stringify(dataAction.move));
      move1[0] = move1[0] + 1
      move1[1] = move1[1] + 1
      dataAction.move = move1
    }
    if (dataAction.action.length > 0) {
      let action1 = JSON.parse(JSON.stringify(dataAction.action));
      action1[0] = action1[0] + 1
      action1[1] = action1[1] + 1
      dataAction.action = action1
    }
    return this.checkAction1(deskData, dataAction)
  }

  checkAction1(deskData: GameData6_2, dataAction: GameAction6_2): number {
    //如果移子，保证点位有子
    if (deskData.player == 1 && deskData.desk[dataAction.move[0] - 1][dataAction.move[1] - 1] != 1) {
      return -1
    }
    if (deskData.player == 2 && deskData.desk[dataAction.move[0] - 1][dataAction.move[1] - 1] != 2) {
      return -1
    }

    //如果ok，保证落子点ok
    if (deskData.desk[dataAction.action[0] - 1][dataAction.action[1] - 1] != 0) {
      return -1
    }
    //保证相邻
    const adjacentSet = this.adjacentMap.get((dataAction.move[0]) + "-" + (dataAction.move[1]))

    if (!adjacentSet) {
      return -1
    } else {
      return adjacentSet.has(dataAction.action) ? -1 : 1
    }
  }

  checkDesk(deskData: GameData6_2): number {
    return this.checkDesk1(deskData)
  }

  checkDesk1(deskData: GameData6_2): number {
    for (let index = 0; index < this.deskLines.length; index++) {
      const link = this.deskLines[index];
      const cell1 = deskData.desk[this.deskCells[link[0]][0] - 1][this.deskCells[link[0]][1] - 1]
      const cell2 = deskData.desk[this.deskCells[link[1]][0] - 1][this.deskCells[link[1]][1] - 1]
      const cell3 = deskData.desk[this.deskCells[link[2]][0] - 1][this.deskCells[link[2]][1] - 1]
      if (cell1 != 0 && cell1 == cell2 && cell1 == cell3) {
        return cell1 == 1 ? 1 : 2;
      }
    }
    return 0;
  }
  getActionAuto(deskData: GameData6_2): GameAutoWay {
    let c: GameAutoWay = this.getActionAuto1(deskData);
    let move1 = JSON.parse(JSON.stringify(c.best.move));
    let action1 = JSON.parse(JSON.stringify(c.best.action));
    let move2 = JSON.parse(JSON.stringify(c.nobest.move));
    let action2 = JSON.parse(JSON.stringify(c.nobest.action));
    if (c.best.move.length > 0) {
      move1[0] = move1[0] - 1
      move1[1] = move1[1] - 1
      c.best.move = move1
    }
    if (c.best.action.length > 0) {
      action1[0] = action1[0] - 1
      action1[1] = action1[1] - 1
      c.best.action = action1
    }
    if (c.nobest.move.length > 0) {
      move2[0] = move2[0] - 1
      move2[1] = move2[1] - 1
      c.nobest.move = move2
    }
    if (c.nobest.action.length > 0) {
      action2[0] = action2[0] - 1
      action2[1] = action2[1] - 1
      c.nobest.action = action2
    }
    return c
  }

  getActionAuto1(deskData: GameData6_2): GameAutoWay {
    //统计所有可落点位置
    // let canChessPosition: GameAction6_2[] = this.getBestAction(deskData)
    const deskDataTmp = JSON.parse(JSON.stringify(deskData));
    let canChessPosition: GameAction6_2[] = this.recursive(deskDataTmp, 3, 0)
    let best = canChessPosition[0]
    let nobest = canChessPosition.length == 1 ? canChessPosition[0] : canChessPosition[1]
    return new GameAutoWay(best, nobest)
  }

  recursive(deskData: GameData6_2, count: number, currentCount: number, steps?: GameAction6_2[]): GameAction6_2[] {
    let forehand = ++currentCount % 2 == 1
    if (count == currentCount) {
      return []
    }
    if (steps == undefined) {
      steps = this.getBestAction(JSON.parse(JSON.stringify(deskData)))
    }
    for (let index = 0; index < steps.length; index++) {
      const step = steps[index];
      let deskDataTmp = JSON.parse(JSON.stringify(deskData));
      deskDataTmp = this.doAction1(deskDataTmp, step)[1];

      let flag = this.checkDesk1(deskDataTmp)
      if (flag == 0) {
        const tcurrentCount = currentCount
        let childSteps: GameAction6_2[] = this.recursive(deskDataTmp, count, tcurrentCount)
        if (childSteps.length != 0) {
          if (!forehand) {
            step.score += childSteps[childSteps.length - 1].score
          } else {
            step.score += childSteps[0].score
          }
        }
      } else {
        if (!forehand) {
          step.score += -99999999
          return [step]
        } else {
          step.score += 99999999
          return [step]
        }
      }
    }

    steps = steps.sort((a, b) => {
      if (a.score < b.score)
        return 1
      if (a.score > b.score)
        return -1;
      return 0;
    });
    return steps
  }

  getBestAction(deskData: GameData6_2): GameAction6_2[] {
    let canAction = new Map<String, GameAction6_2>
    let canChessPosition: number[][] = this.getCanChessPosition(deskData)
    for (let index = 0; index < canChessPosition.length; index++) {
      const positions: number[] = canChessPosition[index];
      let lines = this.deskLineMap.get((positions[0] + 1) + "-" + (positions[1] + 1));
      lines?.forEach(line => {
        const score = this.getWeight(deskData, line);
        for (let index = 0; index < line.length; index++) {
          let e = this.deskCells[line[index]]
          const chess = deskData.desk[e[0] - 1][e[1] - 1]
          if (chess == 0) {
            //获取这点为可动，并不在三元组
            const canMove: number[][] = this.getCanMovePosition(deskData, [e[0] - 1, e[1] - 1]);
            canMove.forEach(m => {
              const tmpn = this.positionMap.get(m[0] + "-" + m[1])
              if (line.findIndex(x => x == tmpn) == -1) {
                canAction.set(m[0] + "_" + m[1] + "_" + e[0] + "_" + e[1], new GameAction6_2(m, e, score))
              }
            })

          }
        }
      })
    }
    let result: GameAction6_2[] = []

    canAction.forEach((v, k) => {
      result.push(v)
    })
    result = result.sort((a, b) => {
      if (a.score < b.score)
        return 1
      if (a.score > b.score)
        return -1;
      return 0;
    });
    return result
  }

  getWeight(deskData: GameData6_2, line: number[]): number {
    let tmpp = 0
    let tmpb = 0
    let tmpe = 0
    for (let index = 0; index < line.length; index++) {
      const e = this.deskCells[line[index]]
      const chess = deskData.desk[e[0] - 1][e[1] - 1]
      if (chess == 0) {
        tmpb++
      } else if (chess == deskData.player) {
        tmpp++
      } else if (chess == OtherUtil.getRival(deskData.player)) {
        tmpe++
      }
    }
    if (tmpp == 2 && tmpb == 1) {
      return this.deskWeight[2]
    } else if (tmpb == 3) {
      return this.deskWeight[0]
    } else if (tmpp == 1 && tmpb == 2) {
      return this.deskWeight[1]
    } else if (tmpe == 1 && tmpb == 2) {
      return this.deskWeight[3]
    } else if (tmpe == 2 && tmpb == 1) {
      return this.deskWeight[4]
    } else if (tmpp > 0 && tmpe > 0) {
      return 0
    }
    return 0
  }


  getCanMovePosition(deskData: GameData6_2, empty: number[]): number[][] {
    const chess: number[][] = []
    const adjacentSet = this.adjacentMap.get((empty[0] + 1) + "-" + (empty[1] + 1))
    adjacentSet?.forEach(item => {
      const adjacentCell = deskData.desk[item[0] - 1][item[1] - 1]
      if (adjacentCell == deskData.player) {
        chess.push(item)
      }
    })
    return chess
  }
  getCanChessPosition(deskData: GameData6_2): number[][] {
    //统计所有可落点位置
    let canChessPosition: number[][] = []
    for (let i = 0; i < deskData.desk.length; i++) {
      const row = deskData.desk[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell == 0) {
          const adjacentSet = this.adjacentMap.get((i + 1) + "-" + (j + 1))
          adjacentSet?.forEach(item => {
            const adjacentCell = deskData.desk[item[0] - 1][item[1] - 1]
            if (adjacentCell == deskData.player) {
              if (canChessPosition.findIndex(x => x[0] == i && x[1] == j) == -1) {
                canChessPosition.push([i, j])
              }
            }
          })
        }
      }
    }
    return canChessPosition
  }

  getDeskChess(deskData: GameData6_2, player: number): number[][] {
    let result: number[][] = []
    this.deskCells.forEach(cell => {
      let tmpCell = deskData.desk[cell[0] - 1][cell[1] - 1];
      if (tmpCell == player) {
        result.push(cell)
      }
    })
    return result;
  }

}