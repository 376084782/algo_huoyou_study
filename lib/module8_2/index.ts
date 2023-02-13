/**
 * @author jiutou
 * @updateTime 2022/11/29
 * @tip 8-2 红蓝列队

 * @description 
一．挑战模式 1.参数默认值：如图所示的位置摆法。 
2.参数范围：棋子数量，棋盘结构固定不变；棋子位置自主设置 
3.过程记录用阴影的形式在相应方格内表示对方上一步的位置。

二．练习模式
一级：
1 步取胜（包含先手一步和后手一步）
二级：2 步取胜（同上）
三级：3 步取胜（同上）
 * 
 */
import { REFUSED } from 'dns';
import { threadId } from 'worker_threads';
import { GameAutoWay } from '../common/pojo';
import OtherUtil from '../util/OtherUtil';
import RandomGenerater from '../util/RandomGenerater';

export class GameData8_2 {
  typeSet?= 1;//前端用的，存是否是自定义棋盘
  //棋盘 x由左0至右4 y由上0至下4  
  desk: number[][] = [
    [9, 9, 0, 0, 9, 9],
    [9, 0, 0, 0, 0, 9],
    [1, 4, 2, 5, 3, 6],
    [9, 0, 0, 0, 0, 9],
    [9, 9, 0, 0, 9, 9],
  ];
  //用来记录往回跳的，不用管，重新传回来给我就行
  p1chesslog: number[] = []
  p2chesslog: number[] = []
  player = 1;
  constructor(player: number, desk?: number[][]) {
    this.player = player
    if (desk != undefined) {
      this.desk = desk
    }
  }
}

export class GameAction8_2 {
  //起子点
  move: number[] = []
  //落子点
  action: number[] = []
  score: number = 0

  constructor(action: number[], move: number[], score?: number) {
    this.action = action
    this.move = move
    if (score != undefined) {
      this.score = score
    }
  }
}

export default class example8_2 {
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

  getRiddle(config: any): GameData8_2 {
    return new GameData8_2(1)
  }

  checkRiddle(deskData: GameData8_2): number {
    // 各子有3
    let p1DeskChess = this.getDeskChess(deskData, 1)
    let p2DeskChess = this.getDeskChess(deskData, 2)

    if (p1DeskChess != 3) {
      return -1
    }
    if (p2DeskChess != 3) {
      return -1
    }
    if (this.checkDesk(deskData) != 0) {
      return -1
    }
    return 1
  }

  doAction(deskData: GameData8_2, dataAction: GameAction8_2): [flagResult: number, dataResult: GameData8_2] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    const moveChess = deskData.desk[dataAction.move[0]][dataAction.move[1]]
    deskData.desk[dataAction.action[0]][dataAction.action[1]] = moveChess
    deskData.desk[dataAction.move[0]][dataAction.move[1]] = 0
    if (deskData.player == 1) {
      deskData.p1chesslog = dataAction.move
    } else if (deskData.player == 2) {
      deskData.p2chesslog = dataAction.move
    }
    const flag = this.checkDesk(deskData)
    deskData.player = OtherUtil.getRival(deskData.player)
    return [flag, deskData];
  }

  checkAction(deskData: GameData8_2, dataAction: GameAction8_2): number {
    //移子，保证点位有子
    const moveChess = deskData.desk[dataAction.move[0]][dataAction.move[1]]
    if (moveChess == 0 || moveChess == 9) {
      return -1
    }
    if (deskData.player == 1 && moveChess >= 4) {
      return -1
    }
    if (deskData.player == 2 && moveChess < 4) {
      return -1
    }
    const actionChess = deskData.desk[dataAction.action[0]][dataAction.action[1]]
    //保证落子点ok
    if (actionChess != 0) {
      return -1
    }
    //保证不回走
    if (deskData.player == 1 &&
      deskData.p2chesslog[0] == dataAction.action[0] &&
      deskData.p2chesslog[1] == dataAction.action[1]) {
      return -1
    }
    if (deskData.player == 2 &&
      deskData.p1chesslog[0] == dataAction.action[0] &&
      deskData.p1chesslog[1] == dataAction.action[1]) {
      return -1
    }
    //保证相邻
    if (Math.abs(dataAction.move[0] - dataAction.action[0]) > 1 ||
      Math.abs(dataAction.move[1] - dataAction.action[1]) > 1) {
      return -1
    }
    return 1
  }

  checkDesk(deskData: GameData8_2): number {
    let f = 0
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 6; j++) {
        if (deskData.desk[i][j] != 0 && deskData.desk[i][j] != 9) {
          f = this.lurd(deskData, i, j) || this.ruld(deskData, i, j) || this.leftRight(deskData, i, j) || this.upDown(deskData, i, j) ? deskData.desk[i][j] : 0
          if (f == 1 || f == 2 || f == 3) {
            return 1
          } else if (f == 4 || f == 5 || f == 6) {
            return 2
          }
        }
      }
    }
    return 0
  }

  getActionAuto(deskData: GameData8_2): GameAutoWay {
    //统计所有可落点位置
    const deskDataTmp = JSON.parse(JSON.stringify(deskData));
    let canChessPosition: GameAction8_2[] = this.recursive(deskDataTmp, 3, 0)
    let best = canChessPosition[0]
    let nobest = canChessPosition.length == 1 ? canChessPosition[0] : canChessPosition[1]
    if (canChessPosition.length > 1) {
      nobest = canChessPosition[1]
    } else {
      nobest = best
    }
    return new GameAutoWay(best, nobest)
  }

  recursive(deskData: GameData8_2, count: number, currentCount: number, steps?: GameAction8_2[]): GameAction8_2[] {
    if (count <= currentCount) {
      return [];
    }
    let forehand = ++currentCount % 2 == 1
    if (steps == undefined) {
      let deskDataTmp: GameData8_2 = JSON.parse(JSON.stringify(deskData))
      steps = this.getBestAction(deskDataTmp)
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
          let childSteps: GameAction8_2[] = this.recursive(deskDataTmp, count, tcurrentCount)
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

  getBestAction(deskData: GameData8_2): GameAction8_2[] {
    //可以移动的子
    let canAction = new Map<String, GameAction8_2>
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
        //获取可移动到该点位的子，并不在三元组
        const canMove: number[][] = this.getCanMovePosition(deskData, positions);
        canMove.forEach(mc => {
          if (line.findIndex(x => x[0] == mc[0] && x[1] == mc[1]) == -1) {
            let tmpa = canAction.get(mc[0] + "_" + mc[1] + "_" + positions[0] + "_" + positions[1])
            if (tmpa != undefined) {
              tmpa.score += score
            } else {
              tmpa = new GameAction8_2(positions, mc, score)
            }
            canAction.set(mc[0] + "_" + mc[1] + "_" + positions[0] + "_" + positions[1], tmpa)
          }
        })
      }
    }
    let result: GameAction8_2[] = []

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

  getWeight(deskData: GameData8_2, line: number[][]): number {
    let tmpp = 0
    let tmpb = 0
    let tmpe = 0
    for (let index = 0; index < line.length; index++) {
      const chess = deskData.desk[line[index][0]][line[index][1]]
      if (chess == 0) {
        tmpb++
      } else if (deskData.player == 1) {
        if (chess < 4) {
          tmpp++
        } else {
          tmpe++
        }
      } else if (deskData.player == 2) {
        if (chess >= 4) {
          tmpp++
        } else {
          tmpe++
        }
      }
    }
    //  [7, 100, 800000, 70, 100000, 0, 0]
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
  getCanMovePosition(deskData: GameData8_2, empty: number[]): number[][] {
    const chess: number[][] = []
    const adjacentArr = this.getAdjacents(deskData, empty[0], empty[1])
    for (let i = 0; i < adjacentArr.length; i++) {
      const item = adjacentArr[i];
      const adjacentCell = deskData.desk[item[0]][item[1]]
      if ((deskData.player == 1 && adjacentCell > 0 && adjacentCell < 4) ||
        (deskData.player == 2 && adjacentCell < 9 && adjacentCell >= 4)) {
        chess.push(item)
      }
    }
    return chess
  }

  getCanChessPosition(deskData: GameData8_2): number[][] {
    //统计所有可落点位置
    let canChessPositionMap: Map<string, number[]> = new Map<string, number[]>()
    let canChessPosition: number[][] = []
    for (let i = 0; i < deskData.desk.length; i++) {
      const row = deskData.desk[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell == 0) {
          //空白点的相邻点
          const adjacents = this.getAdjacents(deskData, i, j)
          for (let x = 0; x < adjacents.length; x++) {
            let move = deskData.desk[adjacents[x][0]][adjacents[x][1]]
            if (deskData.player == 1 && move < 4 && move > 0) {
              if (!(deskData.p2chesslog[0] == i && deskData.p2chesslog[1] == j)) {
                // canChessPositionMap.set(adjacents[x][0] + "_" + adjacents[x][1], adjacents[x])
                canChessPositionMap.set(i + "_" + j, [i, j])
              }
            } else if (deskData.player == 2 && move >= 4) {
              if (!(deskData.p1chesslog[0] == i && deskData.p1chesslog[1] == j)) {
                canChessPositionMap.set(i + "_" + j, [i, j])
              }
            }
          }
        }
      }
    }
    canChessPositionMap.forEach((v, k) => {
      canChessPosition.push(v)
    })

    return canChessPosition
  }
  getAdjacents(deskData: GameData8_2, x: number, y: number): number[][] {
    let adjacents: number[][] = []
    // for (let i = -1; i <= 1; i++) {
    //   for (let j = -1; j <= 1; j++) {
    //     let x1 = x + i
    //     let y1 = y + j
    //     if (!(x1 == x && y1 == y) && this.vaildXy(deskData.desk, x1, y1)) {
    //       adjacents.push([x + i, y + j])
    //     }
    //   }
    // }
    let x1 = x + 1
    let y1 = y
    if (this.vaildXy(deskData.desk, x1, y1)) {
      adjacents.push([x1, y1])
    }
    x1 = x - 1
    y1 = y
    if (this.vaildXy(deskData.desk, x1, y1)) {
      adjacents.push([x1, y1])
    }
    x1 = x
    y1 = y + 1
    if (this.vaildXy(deskData.desk, x1, y1)) {
      adjacents.push([x1, y1])
    }
    x1 = x
    y1 = y - 1
    if (this.vaildXy(deskData.desk, x1, y1)) {
      adjacents.push([x1, y1])
    }

    return adjacents
  }

  getAdjacentLine(deskData: GameData8_2, x: number, y: number): number[][][] {
    let lines: number[][][] = []
    for (let index = 0; index < 3; index++) {
      const tx1 = x + index - 2
      const ty1 = y + index - 2
      const tx2 = x + index - 1
      const ty2 = y + index - 1
      const tx3 = x + index
      const ty3 = y + index
      if (this.vaildXy(deskData.desk, tx1, ty1) && this.vaildXy(deskData.desk, tx2, ty2) && this.vaildXy(deskData.desk, tx3, ty3)) {
        lines.push([[tx1, ty1], [tx2, ty2], [tx3, ty3]])
      }
    }
    for (let index = 0; index < 2; index++) {
      const tx1 = x - index + 2
      const ty1 = y + index - 2
      const tx2 = x - index + 1
      const ty2 = y + index - 1
      const tx3 = x - index
      const ty3 = y + index
      if (this.vaildXy(deskData.desk, tx1, ty1) && this.vaildXy(deskData.desk, tx2, ty2) && this.vaildXy(deskData.desk, tx3, ty3)) {
        lines.push([[tx1, ty1], [tx2, ty2], [tx3, ty3]])
      }
    }
    for (let index = 0; index < 3; index++) {
      const tx1 = x
      const ty1 = y + index - 2
      const tx2 = x
      const ty2 = y + index - 1
      const tx3 = x
      const ty3 = y + index
      if (this.vaildXy(deskData.desk, tx1, ty1) && this.vaildXy(deskData.desk, tx2, ty2) && this.vaildXy(deskData.desk, tx3, ty3)) {
        lines.push([[tx1, ty1], [tx2, ty2], [tx3, ty3]])
      }
    }
    for (let index = 0; index < 3; index++) {
      const tx1 = x + index - 2
      const ty1 = y
      const tx2 = x + index - 1
      const ty2 = y
      const tx3 = x + index
      const ty3 = y
      if (this.vaildXy(deskData.desk, tx1, ty1) && this.vaildXy(deskData.desk, tx2, ty2) && this.vaildXy(deskData.desk, tx3, ty3)) {
        lines.push([[tx1, ty1], [tx2, ty2], [tx3, ty3]])
      }
    }
    return lines
  }

  //左上右下
  lurd(deskData: GameData8_2, x: number, y: number): number {
    let cell = deskData.desk[x][y]
    if (cell == 0) {
      return 0
    }
    for (let index = 0; index < 3; index++) {
      const tx1 = x + index - 2
      const ty1 = y + index - 2
      const tx2 = x + index - 1
      const ty2 = y + index - 1
      const tx3 = x + index
      const ty3 = y + index
      if (this.vaildXy(deskData.desk, tx1, ty1) && this.vaildXy(deskData.desk, tx2, ty2) && this.vaildXy(deskData.desk, tx3, ty3)) {
        const tcell1 = deskData.desk[tx1][ty1]
        const tcell2 = deskData.desk[tx2][ty2]
        const tcell3 = deskData.desk[tx3][ty3]
        if (tcell1 > 0 && tcell2 > 0 && tcell3 > 0 && tcell1 < 4 && tcell2 < 4 && tcell3 < 4) {
          return 1
        } else if (tcell1 >= 4 && tcell2 >= 4 && tcell3 >= 4 && tcell3 < 7 && tcell3 < 7 && tcell3 < 7) {
          return 2
        }
      }
    }
    return 0
  }
  ruld(deskData: GameData8_2, x: number, y: number): number {
    let cell = deskData.desk[x][y]
    if (cell == 0) {
      return 0
    }
    for (let index = 0; index < 3; index++) {
      const tx1 = x - index + 2
      const ty1 = y + index - 2
      const tx2 = x - index + 1
      const ty2 = y + index - 1
      const tx3 = x - index
      const ty3 = y + index
      if (this.vaildXy(deskData.desk, tx1, ty1) && this.vaildXy(deskData.desk, tx2, ty2) && this.vaildXy(deskData.desk, tx3, ty3)) {
        const tcell1 = deskData.desk[tx1][ty1]
        const tcell2 = deskData.desk[tx2][ty2]
        const tcell3 = deskData.desk[tx3][ty3]
        if (tcell1 > 0 && tcell2 > 0 && tcell3 > 0 && tcell1 < 4 && tcell2 < 4 && tcell3 < 4) {
          return 1
        } else if (tcell1 >= 4 && tcell2 >= 4 && tcell3 >= 4 && tcell3 < 7 && tcell3 < 7 && tcell3 < 7) {
          return 2
        }
      }
    }
    return 0
  }
  leftRight(deskData: GameData8_2, x: number, y: number): number {
    let cell = deskData.desk[x][y]
    if (cell == 0) {
      return 0
    }
    for (let index = 0; index < 3; index++) {
      const tx1 = x
      const ty1 = y + index - 2
      const tx2 = x
      const ty2 = y + index - 1
      const tx3 = x
      const ty3 = y + index
      if (this.vaildXy(deskData.desk, tx1, ty1) && this.vaildXy(deskData.desk, tx2, ty2) && this.vaildXy(deskData.desk, tx3, ty3)) {
        const tcell1 = deskData.desk[tx1][ty1]
        const tcell2 = deskData.desk[tx2][ty2]
        const tcell3 = deskData.desk[tx3][ty3]
        if (tcell1 > 0 && tcell2 > 0 && tcell3 > 0 && tcell1 < 4 && tcell2 < 4 && tcell3 < 4) {
          return 1
        } else if (tcell1 >= 4 && tcell2 >= 4 && tcell3 >= 4 && tcell1 < 7 && tcell2 < 7 && tcell3 < 7) {
          return 2
        }
      }
    }
    return 0
  }
  upDown(deskData: GameData8_2, x: number, y: number): number {
    let cell = deskData.desk[x][y]
    if (cell == 0) {
      return 0
    }
    for (let index = 0; index < 3; index++) {
      const tx1 = x + index - 2
      const ty1 = y
      const tx2 = x + index - 1
      const ty2 = y
      const tx3 = x + index
      const ty3 = y
      if (this.vaildXy(deskData.desk, tx1, ty1) && this.vaildXy(deskData.desk, tx2, ty2) && this.vaildXy(deskData.desk, tx3, ty3)) {
        const tcell1 = deskData.desk[tx1][ty1]
        const tcell2 = deskData.desk[tx2][ty2]
        const tcell3 = deskData.desk[tx3][ty3]
        if (tcell1 > 0 && tcell2 > 0 && tcell3 > 0 && tcell1 < 4 && tcell2 < 4 && tcell3 < 4) {
          return 1
        } else if (tcell1 >= 4 && tcell2 >= 4 && tcell3 >= 4 && tcell1 < 7 && tcell2 < 7 && tcell3 < 7) {
          return 2
        }
      }
    }
    return 0
  }

  vaildXy(desk: number[][], x: number, y: number): boolean {
    if (x > 4 || x < 0) {
      return false
    }
    if (y > 5 || y < 0) {
      return false
    }
    if (desk[x][y] == 9) {
      return false
    }
    return true
  }


  getDeskChess(deskData: GameData8_2, player: number): number {
    let result: number = 0
    for (let i = 0; i < deskData.desk.length; i++) {
      const row = deskData.desk[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell != 9 && cell != 0) {
          let color = cell >= 4 ? 2 : 1
          if (color == player) {
            result++
          }
        }
      }
    }
    return result;
  }

}