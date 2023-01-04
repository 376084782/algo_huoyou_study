/**
 * @author jiutou
 * @updateTime 2022/11/29
 * @tip 三子棋
 * @description 
4-2：三子棋
一．挑战模式
1. 参数默认值：棋盘空置
2. 参数范围：
棋盘大小和棋子数量固定
3. 过程记录：无
 * 
 */
import { REFUSED } from 'dns';
import { threadId } from 'worker_threads';
import { GameAutoWay } from '../common/pojo';
import OtherUtil from '../util/OtherUtil';
import RandomGenerater from '../util/RandomGenerater';

export class GameData4_2 {
  //棋盘 由上至下 由左至右
  desk: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  p1 = 3;
  p2 = 3;
  player = 1;
  constructor(player: number, desk?: number[][]) {
    this.player = player
    if (desk != undefined) {
      this.desk = desk
    }
  }
}

export class GameAction4_2 {
  //起子点
  move: number[] = []
  //落子点
  action: number[] = []
  score: number = 0

  constructor(action: number[], move?: number[], score?: number) {
    this.action = action
    if (score != undefined) {
      this.score = score
    }
    if (move != undefined) {
      this.move = move
    }
  }
}

export default class example4_2 {
  deskLines: number[][][] = [
    [[0, 0], [0, 1], [0, 2]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ]
  //元组权重
  deskWeight: number[] = [7, 100, 800000, 70, 100000, 0, 0]
  adjacentLineMap: Map<String, number[][][]> = new Map<String, number[][][]>([
    ["0-0", [[[0, 0], [1, 1], [2, 2]], [[0, 0], [1, 0], [2, 0]], [[0, 0], [0, 1], [0, 2]]]],
    ["1-0", [[[0, 1], [1, 1], [2, 1]], [[0, 0], [0, 1], [0, 2]]]],
    ["2-0", [[[2, 0], [1, 1], [0, 2]], [[0, 0], [0, 1], [0, 2]], [[0, 2], [1, 2], [2, 2]]]],
    ["0-1", [[[0, 0], [1, 0], [2, 0]], [[1, 0], [1, 1], [1, 2]]]],
    ["1-1", [[[0, 0], [1, 1], [2, 2]], [[2, 0], [1, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[0, 1], [1, 1], [2, 1]]]],
    ["2-1", [[[1, 0], [1, 1], [1, 2]], [[0, 2], [1, 2], [2, 2]]]],
    ["0-2", [[[0, 0], [1, 0], [2, 0]], [[2, 0], [2, 1], [2, 2]], [[2, 0], [1, 1], [0, 2]]]],
    ["1-2", [[[0, 1], [1, 1], [2, 1]], [[2, 0], [2, 1], [2, 2]]]],
    ["2-2", [[[2, 0], [2, 1], [2, 2]], [[0, 2], [1, 2], [2, 2]], [[0, 0], [1, 1], [2, 2]]]],
  ]);

  // 空 7
  // B 100
  // BB 800000
  // W 70
  // WW 100000
  // Virtual 0
  // Polluted 0

  getRiddle(config: any): GameData4_2 {
    return new GameData4_2(1)
  }

  checkRiddle(deskData: GameData4_2): number {
    // 各子有3
    let p1DeskChess = this.getDeskChess(deskData, 1)
    let p2DeskChess = this.getDeskChess(deskData, 2)

    if ((p1DeskChess.length + deskData.p1) != 3) {
      return -1
    }
    if ((p2DeskChess.length + deskData.p2) != 3) {
      return -1
    }
    if (this.checkDesk(deskData) != 0) {
      return -1
    }
    return 1
  }

  doAction(deskData: GameData4_2, dataAction: GameAction4_2): [flagResult: number, dataResult: GameData4_2] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    deskData.desk[dataAction.action[0]][dataAction.action[1]] = deskData.player
    if (dataAction.move.length == 2) {
      deskData.desk[dataAction.move[0]][dataAction.move[1]] = 0
    } else {
      if (deskData.player == 1) {
        deskData.p1 = deskData.p1 - 1
      } else {
        deskData.p2 = deskData.p2 - 1
      }
    }
    deskData.player = OtherUtil.getRival(deskData.player)
    return [this.checkDesk(deskData), deskData];
  }

  checkAction(deskData: GameData4_2, dataAction: GameAction4_2): number {

    //如果移子，保证点位有子

    if (dataAction.move.length == 2) {
      if (deskData.desk[dataAction.move[0]][dataAction.move[1]] != deskData.player) {
        return -1
      }
      if (dataAction.move[0] == dataAction.action[0]) {
        if (Math.abs(dataAction.move[1] - dataAction.action[1]) != 1) {
          return -1
        }
      } else if (dataAction.move[1] == dataAction.action[1]) {
        if (Math.abs(dataAction.move[0] - dataAction.action[0]) != 1) {
          return -1
        }
      } else {
        return -1
      }
    }

    //如果ok，保证落子点ok
    if (deskData.desk[dataAction.action[0]][dataAction.action[1]] != 0) {
      return -1
    }




    return 1
  }

  checkDesk(deskData: GameData4_2): number {
    for (let index = 0; index < this.deskLines.length; index++) {
      const link = this.deskLines[index];
      const cell1 = deskData.desk[link[0][0]][link[0][1]]
      const cell2 = deskData.desk[link[1][0]][link[1][1]]
      const cell3 = deskData.desk[link[2][0]][link[2][1]]
      if (cell1 != 0 && cell1 == cell2 && cell1 == cell3) {
        return cell1 == 1 ? 1 : 2;
      }
    }
    return 0;
  }

  getActionAuto(deskData: GameData4_2): GameAutoWay {
    //统计所有可落点位置
    // let canChessPosition: GameAction4_2[] = this.getBestAction(deskData)
    const deskDataTmp = JSON.parse(JSON.stringify(deskData));
    let canChessPosition: GameAction4_2[] = this.recursive(deskDataTmp, 3, 0)
    // let oddsMap: Map<number,GameAction4_2[]> = this.recursive(deskDataTmp, 3, 0)
    // for (let i = 0; i < canChessPosition.length; i++) {
    // const position = canChessPosition[i];
    // }
    let best = canChessPosition[0]
    let nobest = canChessPosition.length == 1 ? canChessPosition[0] : canChessPosition[1]
    if (nobest.score < 0) {
      nobest = best
    }
    return new GameAutoWay(best, nobest)
  }

  recursive(deskData: GameData4_2, count: number, currentCount: number, steps?: GameAction4_2[]): GameAction4_2[] {
    if (count <= currentCount) {
      // return this.getBestAction(JSON.parse(JSON.stringify(deskData)))
      return [];
    }
    let forehand = ++currentCount % 2 == 1
    if (steps == undefined) {
      steps = this.getBestAction(JSON.parse(JSON.stringify(deskData)))
    }
    if (!forehand) {
      const rstep = steps[0];
      let deskDataTmp = JSON.parse(JSON.stringify(deskData));
      deskDataTmp = this.doAction(deskDataTmp, rstep)[1];
      let flag = this.checkDesk(deskDataTmp)
      if (flag == 0) {
        const tcurrentCount = currentCount
        return this.recursive(deskDataTmp, count, tcurrentCount)
      } else {
        rstep.score -= 99999999
        return [rstep]
      }
    } else {
      for (let index = 0; index < steps.length; index++) {
        const step = steps[index];
        let deskDataTmp = JSON.parse(JSON.stringify(deskData));
        deskDataTmp = this.doAction(deskDataTmp, step)[1];
        let flag = this.checkDesk(deskDataTmp)
        if (flag == 0) {
          const tcurrentCount = currentCount
          let childSteps: GameAction4_2[] = this.recursive(deskDataTmp, count, tcurrentCount)
          if (childSteps.length != 0) {
            if (!forehand) {
              step.score += childSteps[0].score
            } else {
              step.score += childSteps[0].score
            }
          }
        } else {
          if (!forehand) {
            step.score += 99999999
            return [step]
          } else {
            step.score += 99999999
            return [step]
          }
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

  getBestAction(deskData: GameData4_2): GameAction4_2[] {
    let rival = 0
    if (deskData.player == 1) {
      rival = deskData.p1
    }
    if (deskData.player == 2) {
      rival = deskData.p2
    }
    //可以移动的子
    let canAction = new Map<String, GameAction4_2>
    //可以落子的点
    let canChessPosition: number[][] = this.getCanChessPosition(deskData)

    for (let index = 0; index < canChessPosition.length; index++) {
      const positions: number[] = canChessPosition[index];
      //获取可落子点相邻三元组
      let lines: number[][][] = this.getAdjacentLine(deskData, positions[0], positions[1]);
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];
        //获取三元组权重得分
        const score: number = this.getWeight(deskData, line);
        if (rival > 0) {
          let tmpa = canAction.get(positions[0] + "_" + positions[1])
          if (tmpa != undefined) {
            tmpa.score += score
          } else {
            tmpa = new GameAction4_2(positions, [], score)
          }
          canAction.set(positions[0] + "_" + positions[1], tmpa)
        } else {
          //获取可移动到该点位的子，并不在三元组
          const canMove: number[][] = this.getCanMovePosition(deskData, positions);
          canMove.forEach(mc => {
            if (line.findIndex(x => x[0] == mc[0] && x[1] == mc[1]) == -1) {
              let tmpa = canAction.get(mc[0] + "_" + mc[1] + "_" + positions[0] + "_" + positions[1])
              if (tmpa != undefined) {
                tmpa.score += score
              } else {
                tmpa = new GameAction4_2(positions, mc, score)
              }
              canAction.set(mc[0] + "_" + mc[1] + "_" + positions[0] + "_" + positions[1], tmpa)
            }
          })
        }
      }
    }
    let result: GameAction4_2[] = []

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

  getWeight(deskData: GameData4_2, line: number[][]): number {
    let tmpp = 0
    let tmpb = 0
    let tmpe = 0
    for (let index = 0; index < line.length; index++) {
      const chess = deskData.desk[line[index][0]][line[index][1]]
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

  //获取可以移动到该空白点位上的子
  getCanMovePosition(deskData: GameData4_2, empty: number[]): number[][] {
    const chess: number[][] = []
    const adjacentArr = this.getAdjacent(deskData, empty[0], empty[1])
    for (let i = 0; i < adjacentArr.length; i++) {
      const item = adjacentArr[i];
      const adjacentCell = deskData.desk[item[0]][item[1]]
      if (adjacentCell == deskData.player) {
        chess.push(item)
      }
    }
    return chess
  }

  getCanChessPosition(deskData: GameData4_2): number[][] {

    let rival = 0
    if (deskData.player == 1) {
      rival = deskData.p1
    }
    if (deskData.player == 2) {
      rival = deskData.p2
    }
    //统计所有可落点位置
    let canChessPosition: number[][] = []
    for (let i = 0; i < deskData.desk.length; i++) {
      const row = deskData.desk[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell == 0) {
          //空白点的相邻点
          const adjacentSet = this.getAdjacent(deskData, i, j)

          adjacentSet.forEach(item => {
            const adjacentCell = deskData.desk[item[0]][item[1]]
            if (rival > 0 || adjacentCell == deskData.player) {
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
  getAdjacent(deskData: GameData4_2, x: number, y: number): number[][] {
    let adjacentSet: number[][] = []
    // let x1 = x + 1
    // let y1 = y + 1
    // let x3 = x - 1
    // let y3 = y - 1
    // if (!(x1 < 0 || x1 > 2 || y1 < 0 || y1 > 2)) {
    //   adjacentSet.push([x1, y1])
    // }
    // if (!(x3 < 0 || x3 > 2 || y3 < 0 || y3 > 2)) {
    //   adjacentSet.push([x3, y3])
    // }
    // x1 = x + 1
    // y1 = y - 1
    // x3 = x - 1
    // y3 = y + 1
    // if (!(x1 < 0 || x1 > 2 || y1 < 0 || y1 > 2)) {
    //   adjacentSet.push([x1, y1])
    // }
    // if (!(x3 < 0 || x3 > 2 || y3 < 0 || y3 > 2)) {
    //   adjacentSet.push([x3, y3])
    // }
    let x1 = x
    let y1 = y - 1
    let x3 = x
    let y3 = y + 1
    if (!(x1 < 0 || x1 > 2 || y1 < 0 || y1 > 2)) {
      adjacentSet.push([x1, y1])
    }
    if (!(x3 < 0 || x3 > 2 || y3 < 0 || y3 > 2)) {
      adjacentSet.push([x3, y3])
    }
    x1 = x - 1
    y1 = y
    x3 = x + 1
    y3 = y
    if (!(x1 < 0 || x1 > 2 || y1 < 0 || y1 > 2)) {
      adjacentSet.push([x1, y1])
    }
    if (!(x3 < 0 || x3 > 2 || y3 < 0 || y3 > 2)) {
      adjacentSet.push([x3, y3])
    }
    return adjacentSet
  }

  getAdjacentLine(deskData: GameData4_2, x: number, y: number): any {
    // let adjacentSet = new Set<number[][]>
    // let x1 = x + 1
    // let y1 = y + 1
    // let x3 = x - 1
    // let y3 = y - 1
    // if (!(x1 < 0 || x1 > 2 || x3 < 0 || x3 > 2 || y1 < 0 || y1 > 2 || y3 < 0 || y3 > 2)) {
    //   adjacentSet.add([[x1, y1], [x, y], [x3, y3]])
    // }
    // x1 = x + 1
    // y1 = y - 1
    // x3 = x - 1
    // y3 = y + 1
    // if (!(x1 < 0 || x1 > 2 || x3 < 0 || x3 > 2 || y1 < 0 || y1 > 2 || y3 < 0 || y3 > 2)) {
    //   adjacentSet.add([[x1, y1], [x, y], [x3, y3]])
    // }
    // x1 = x
    // y1 = y - 1
    // x3 = x
    // y3 = y + 1
    // if (!(x1 < 0 || x1 > 2 || x3 < 0 || x3 > 2 || y1 < 0 || y1 > 2 || y3 < 0 || y3 > 2)) {
    //   adjacentSet.add([[x1, y1], [x, y], [x3, y3]])
    // }
    // x1 = x - 1
    // y1 = y
    // x3 = x + 1
    // y3 = y
    // if (!(x1 < 0 || x1 > 2 || x3 < 0 || x3 > 2 || y1 < 0 || y1 > 2 || y3 < 0 || y3 > 2)) {
    //   adjacentSet.add([[x1, y1], [x, y], [x3, y3]])
    // }
    // return adjacentSet
    return this.adjacentLineMap.get(y + "-" + x)
  }
  //下次有棋盘再写
  // getAllLines(desk: number[][]): number[][] {
  //   let result = new Map<String, number[]>

  //   for (let i = 0; i < desk.length; i++) {
  //     const x = i;
  //     const row = desk[i];
  //     for (let j = 0; j < row.length; j++) {
  //       const y = j;
  //       const lurdArr = this.getLurdLines(desk, x, y)
  //       const ruldArr = this.getRuldLines(desk, x, y)
  //       const leftRightArr = this.getLeftRightLines(desk, x, y)
  //       const upDownArr = this.getUpDownLines(desk, x, y)
  //     }
  //   }
  // }
  // getLurdLines(desk: number[][], x: number, y: number): number[][] {

  // }
  // getRuldLines(desk: number[][], x: number, y: number): number[] {

  // }
  // getLeftRightLines(desk: number[][], x: number, y: number): number[] {

  // }
  // getUpDownLines(desk: number[][], x: number, y: number): number[] {

  // }

  getDeskChess(deskData: GameData4_2, player: number): number[][] {
    let result: number[][] = []
    for (let i = 0; i < deskData.desk.length; i++) {
      const row = deskData.desk[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell == player) {
          result.push([i, j])
        }
      }
    }
    return result;
  }

}