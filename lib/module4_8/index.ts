/**
 * @author jiutou
 * @updateTime 2022/11/29
 * @tip 四点一线
 * @description 
4-8：四点一线

游戏双方轮流在如下图所示的点阵中圈点、连线 (一方执红，一方执蓝)每次圈一个点。
当一方所圈的点中包含4个连续的点时，将这4个连续的点连成一条直线(横、竖或斜)，并得1分，
同时这4个点不再使用。当所有点都圈完后游戏结束。谁的分数高，谁就获胜。

一．挑战模式
1.参数默认值：
①点阵：10×10
②起始状态：空白
③界面：显示“10×10”点阵。
2.参数范围： 
①点阵大小：固定 10×10 
②起始状态：自定义③界面：给出点阵图
3.过程记录：
4. 操作方式：

方式（1）点击：
①点击 1 个点【该点突起表示选中，然后复原并呈现相应颜色】
②点击另一个点【若点击该点后，只有 1 种4 点成线的情况，则直接计 1 分，否则则滚动闪烁所有 4 点成线的线段（闪烁的线段用同一种颜色），
并依次显示线段的序号 1，2，3...，同时游戏界面上生成相应序号按钮构成一个圆环【若只有 2 条线，则上下两个月形构成 1 个环，如果3 条线段，则3 个月牙构成 1 个圆环...】，圆环中心显示圆形，里面的文案为“选择。”】

 * 
 */
import { REFUSED } from 'dns';
import { threadId } from 'worker_threads';
import { GameAutoWay } from '../common/pojo';
import OtherUtil from '../util/OtherUtil';
import RandomGenerater from '../util/RandomGenerater';
export class GameData4_8 {
  typeSet?= 1;//前端用的，存是否是自定义棋盘
  //棋盘 由上至下 由左至右
  desk: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  p1 = 0;
  p2 = 0;
  player = 1;
  lines1: number[][][] = []
  lines2: number[][][] = []
  constructor(player?: number, desk?: number[][]) {
    if (player != undefined) {
      this.player = player
    }
    if (desk != undefined) {
      this.desk = desk
    }
  }
}

export class GameAction4_8 {
  action: number[] = []
  line: number[][] = []
  score: number = 0

  constructor(action: number[], score?: number) {
    this.action = action
    if (score != undefined) {
      this.score = score
    }
  }
}

export default class example4_8 {
  deskWeight: number[] = [7, 100, 800000, 70, 100000, 0, 0]


  // 空 7
  // B 100
  // BB 800000
  // W 70
  // WW 100000
  // Virtual 0
  // Polluted 0

  getRiddle(config: any): GameData4_8 {
    return new GameData4_8(1)
  }

  checkRiddle(deskData: GameData4_8): number {
    return 1
  }

  doAction(deskData: GameData4_8, dataAction: GameAction4_8): [flagResult: number, dataResult: GameData4_8] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }

    deskData.desk[dataAction.action[0]][dataAction.action[1]] = deskData.player
    if (dataAction.line != undefined && dataAction.line.length == 4) {
      if (deskData.player == 1) {
        deskData.p1 += 1
        deskData.desk[dataAction.line[0][0]][dataAction.line[0][1]] = 3
        deskData.desk[dataAction.line[1][0]][dataAction.line[1][1]] = 3
        deskData.desk[dataAction.line[2][0]][dataAction.line[2][1]] = 3
        deskData.desk[dataAction.line[3][0]][dataAction.line[3][1]] = 3
        deskData.lines1.push(dataAction.line)
      } else {
        deskData.p2 += 1
        deskData.desk[dataAction.line[0][0]][dataAction.line[0][1]] = 4
        deskData.desk[dataAction.line[1][0]][dataAction.line[1][1]] = 4
        deskData.desk[dataAction.line[2][0]][dataAction.line[2][1]] = 4
        deskData.desk[dataAction.line[3][0]][dataAction.line[3][1]] = 4
        deskData.lines2.push(dataAction.line)
      }
    }
    // let lines: number[][][] = this.getAdjacentLine(deskData, dataAction.action[0], dataAction.action[1]);
    // for (let i = 0; i < lines.length; i++) {
    //   const line = lines[i];
    //   if (deskData.desk[line[0][0]][line[0][1]] != 0 &&
    //     deskData.desk[line[0][0]][line[0][1]] == deskData.desk[line[1][0]][line[1][1]] &&
    //     deskData.desk[line[0][0]][line[0][1]] == deskData.desk[line[2][0]][line[2][1]] &&
    //     deskData.desk[line[0][0]][line[0][1]] == deskData.desk[line[3][0]][line[3][1]]) {
    //     if (deskData.player == 1) {
    //       deskData.p1 += 1
    //       deskData.desk[line[0][0]][line[0][1]] = 3
    //       deskData.desk[line[1][0]][line[1][1]] = 3
    //       deskData.desk[line[2][0]][line[2][1]] = 3
    //       deskData.desk[line[3][0]][line[3][1]] = 3
    //       break
    //     } else {
    //       deskData.p2 += 1
    //       deskData.desk[line[0][0]][line[0][1]] = 4
    //       deskData.desk[line[1][0]][line[1][1]] = 4
    //       deskData.desk[line[2][0]][line[2][1]] = 4
    //       deskData.desk[line[3][0]][line[3][1]] = 4
    //       break
    //     }
    //   }
    // }
    let flag = this.checkDesk(deskData);
    deskData.player = OtherUtil.getRival(deskData.player)
    return [flag, deskData];
  }

  checkAction(deskData: GameData4_8, dataAction: GameAction4_8): number {
    //如果移子，保证点位有子
    if (dataAction.action.length == 2 && deskData.desk[dataAction.action[0]][dataAction.action[1]] != 0) {
      return -1
    }
    return 1
  }

  checkDesk(deskData: GameData4_8): number {

    let hasLine = false;
    let canChessPosition: number[][] = []
    for (let i = 0; i < deskData.desk.length; i++) {
      const row = deskData.desk[i];
      for (let j = 0; j < row.length; j++) {
        const chess = row[j];
        if (chess == 0) {
          canChessPosition.push([i, j])
        }
      }
    }
    for (let i = 0; i < canChessPosition.length; i++) {
      const tmp = canChessPosition[i];
      let lines: number[][][] = this.getAdjacentLine(deskData, tmp[0], tmp[1]);
      for (let x = 0; x < lines.length; x++) {
        const line = lines[x];
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
          if ((tmpp == 3 && tmpb == 1 && canChessPosition.length > 1) ||
            (tmpe == 3 && tmpb == 1 && canChessPosition.length > 1) ||
            (tmpp == 2 && tmpb == 2 && canChessPosition.length > 3) ||
            (tmpe == 2 && tmpb == 2 && canChessPosition.length > 3) ||
            (tmpp == 1 && tmpb == 3 && canChessPosition.length > 5) ||
            (tmpe == 1 && tmpb == 3 && canChessPosition.length > 5) ||
            (tmpb == 4 && canChessPosition.length > 7)) {
            hasLine = true
            break
          }
        }
      }
      if (hasLine) {
        break
      }
    }


    if (hasLine) {
      return 0;
    } else {
      if (deskData.p1 > deskData.p2) {
        return 1;
      } else if (deskData.p1 < deskData.p2) {
        return 2;
      } else if (deskData.p1 == deskData.p2) {
        return 3;
      }
    }
    return 0;
  }

  getActionAuto(deskData: GameData4_8): GameAutoWay {
    //统计所有可落点位置
    const deskDataTmp = JSON.parse(JSON.stringify(deskData));
    let canChessPosition: GameAction4_8[] = this.recursive(deskDataTmp, 3, 0)
    let best = canChessPosition[0]
    let nobest = canChessPosition.length == 1 ? canChessPosition[0] : canChessPosition[1]
    if (canChessPosition.length > 1) {
      nobest = canChessPosition[1]
    } else {
      nobest = best
    }
    let deskDataTmp1 = JSON.parse(JSON.stringify(deskData));
    deskDataTmp1.desk[best.action[0]][best.action[1]] = deskData.player
    let lines: number[][][] = this.getAdjacentLine(deskDataTmp1, best.action[0], best.action[1]);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (deskDataTmp1.desk[line[0][0]][line[0][1]] != 0 &&
        deskDataTmp1.desk[line[0][0]][line[0][1]] == deskDataTmp1.desk[line[1][0]][line[1][1]] &&
        deskDataTmp1.desk[line[0][0]][line[0][1]] == deskDataTmp1.desk[line[2][0]][line[2][1]] &&
        deskDataTmp1.desk[line[0][0]][line[0][1]] == deskDataTmp1.desk[line[3][0]][line[3][1]]) {
        best.line = line
      }
    }
    let deskDataTmp2 = JSON.parse(JSON.stringify(deskData));
    deskDataTmp2.desk[nobest.action[0]][nobest.action[1]] = deskData.player
    let lines2: number[][][] = this.getAdjacentLine(deskDataTmp2, nobest.action[0], nobest.action[1]);
    for (let i = 0; i < lines2.length; i++) {
      const line = lines2[i];
      if (deskDataTmp2.desk[line[0][0]][line[0][1]] != 0 &&
        deskDataTmp2.desk[line[0][0]][line[0][1]] == deskDataTmp2.desk[line[1][0]][line[1][1]] &&
        deskDataTmp2.desk[line[0][0]][line[0][1]] == deskDataTmp2.desk[line[2][0]][line[2][1]] &&
        deskDataTmp2.desk[line[0][0]][line[0][1]] == deskDataTmp2.desk[line[3][0]][line[3][1]]) {
        best.line = line
      }
    }
    return new GameAutoWay(best, nobest)
  }

  recursive(deskData: GameData4_8, count: number, currentCount: number, steps?: GameAction4_8[]): GameAction4_8[] {
    if (count <= currentCount) {
      return [];
    }
    let forehand = ++currentCount % 2 == 1
    if (steps == undefined) {
      steps = this.getBestAction(JSON.parse(JSON.stringify(deskData)))
    }
    if (steps.length == 0) {
      return [];
    }
    if (!forehand) {
      const rstep = steps[0];
      let deskDataTmp = JSON.parse(JSON.stringify(deskData));
      deskDataTmp = this.doAction(deskDataTmp, rstep)[1];
      const tcurrentCount = currentCount
      return this.recursive(deskDataTmp, count, tcurrentCount)
    } else {
      for (let index = 0; index < steps.length; index++) {
        const step = steps[index];
        let deskDataTmp = JSON.parse(JSON.stringify(deskData));
        deskDataTmp = this.doAction(deskDataTmp, step)[1];
        const tcurrentCount = currentCount
        let childSteps: GameAction4_8[] = this.recursive(deskDataTmp, count, tcurrentCount)
        if (childSteps.length != 0) {
          step.score += childSteps[0].score
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

  getBestAction(deskData: GameData4_8): GameAction4_8[] {
    let rival = deskData.player
    //可以落子的点 todo
    let canChessPosition: number[][] = this.getCanChessPosition(deskData)
    let canAction = new Map<String, GameAction4_8>

    for (let index = 0; index < canChessPosition.length; index++) {
      //落子点
      const positions: number[] = canChessPosition[index];

      let action: GameAction4_8 = new GameAction4_8(positions, 0)
      //获取可落子点相邻四元组
      let lines: number[][][] = this.getAdjacentLine(deskData, positions[0], positions[1]);

      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];
        //获取四元组权重得分
        const score: number = this.getWeight(deskData, line);
        action.score += score
      }
      canAction.set(action.action[0] + "_" + action.action[1], action)
    }
    let result: GameAction4_8[] = []

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

  getWeight(deskData: GameData4_8, line: number[][]): number {
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
    if (tmpp == 3 && tmpb == 1) {
      return 800
    } else if (tmpp == 2 && tmpb == 2) {
      return 100
    } else if (tmpp == 1 && tmpb == 3) {
      return 20
    } else if (tmpb == 4) {
      return 10
    } else if (tmpe == 3 && tmpb == 1) {
      return 400
    } else if (tmpe == 2 && tmpb == 2) {
      return 70
    } else if (tmpe == 1 && tmpb == 3) {
      return 15
    }
    return 0
  }

  //获取可以移动到该空白点位上的子
  getCanMovePosition(deskData: GameData4_8, empty: number[]): number[][] {
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

  getCanChessPosition(deskData: GameData4_8): number[][] {

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
          canChessPosition.push([i, j])
        }
      }
    }
    return canChessPosition
  }
  getAdjacent(deskData: GameData4_8, x: number, y: number): number[][] {
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



  getAdjacentLine(deskData: GameData4_8, x: number, y: number): number[][][] {
    let lines: number[][][] = []
    for (let index = 0; index < 4; index++) {
      const tx1 = x + index - 3
      const ty1 = y + index - 3
      const tx2 = x + index - 2
      const ty2 = y + index - 2
      const tx3 = x + index - 1
      const ty3 = y + index - 1
      const tx4 = x + index
      const ty4 = y + index
      if (this.vaildXy(deskData.desk, tx1, ty1) && this.vaildXy(deskData.desk, tx2, ty2) && this.vaildXy(deskData.desk, tx3, ty3) && this.vaildXy(deskData.desk, tx4, ty4)) {
        lines.push([[tx1, ty1], [tx2, ty2], [tx3, ty3], [tx4, ty4]])
      }
    }
    for (let index = 0; index < 4; index++) {
      const tx1 = x - index + 3
      const ty1 = y + index - 3
      const tx2 = x - index + 2
      const ty2 = y + index - 2
      const tx3 = x - index + 1
      const ty3 = y + index - 1
      const tx4 = x - index
      const ty4 = y + index
      if (this.vaildXy(deskData.desk, tx1, ty1) && this.vaildXy(deskData.desk, tx2, ty2) && this.vaildXy(deskData.desk, tx3, ty3) && this.vaildXy(deskData.desk, tx4, ty4)) {
        lines.push([[tx1, ty1], [tx2, ty2], [tx3, ty3], [tx4, ty4]])
      }
    }
    for (let index = 0; index < 4; index++) {
      const tx1 = x
      const ty1 = y + index - 3
      const tx2 = x
      const ty2 = y + index - 2
      const tx3 = x
      const ty3 = y + index - 1
      const tx4 = x
      const ty4 = y + index
      if (this.vaildXy(deskData.desk, tx1, ty1) && this.vaildXy(deskData.desk, tx2, ty2) && this.vaildXy(deskData.desk, tx3, ty3) && this.vaildXy(deskData.desk, tx4, ty4)) {
        lines.push([[tx1, ty1], [tx2, ty2], [tx3, ty3], [tx4, ty4]])
      }
    }
    for (let index = 0; index < 4; index++) {
      const tx1 = x + index - 3
      const ty1 = y
      const tx2 = x + index - 2
      const ty2 = y
      const tx3 = x + index - 1
      const ty3 = y
      const tx4 = x + index
      const ty4 = y
      if (this.vaildXy(deskData.desk, tx1, ty1) && this.vaildXy(deskData.desk, tx2, ty2) && this.vaildXy(deskData.desk, tx3, ty3) && this.vaildXy(deskData.desk, tx4, ty4)) {
        lines.push([[tx1, ty1], [tx2, ty2], [tx3, ty3], [tx4, ty4]])
      }
    }
    return lines
  }
  vaildXy(desk: number[][], x: number, y: number): boolean {
    if (x > 9 || x < 0) {
      return false
    }
    if (y > 9 || y < 0) {
      return false
    }
    return true
  }


  getDeskChess(deskData: GameData4_8, player: number): number[][] {
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