/**
 * @author jiutou
 * @updateTime 2022/11/29
 * @tip 开心 100
 * @description 
一．挑战模式
1. 参数默认值：①空置状态。②方格
尺寸：10×10
2. 参数范围：方格尺寸 10×10，11×
11，12×12（超过 100，则对手胜）
3. 过程记录：无
二. 练习模式
用电脑等级实现：（但去掉随机因素，即将玩家和电脑每个回合的骰子投掷点数设计成一致）
简单，中等，困难三个等级每个等级连
赢电脑 3 次
 * 
 */

import { REFUSED } from 'dns';
import { threadId } from 'worker_threads';
import { GameAutoWay } from '../common/pojo';
import OtherUtil from '../util/OtherUtil';
import RandomGenerater from '../util/RandomGenerater';

export class GameData6_1 {
  typeSet? = 1;//前端用的，存是否是自定义棋盘
  //棋盘 由上至下 由左至右
  p1: number[][] = [];
  p2: number[][] = []
  //当前选手 先手1 后手2
  player = 1;
  constructor(player: number, deskLength?: number) {
    this.player = player
    if (deskLength == undefined) {
      deskLength = 10
    }
    for (let i = 0; i < deskLength; i++) {
      let row1: number[] = []
      let row2: number[] = []
      for (let j = 0; j < deskLength; j++) {
        row1.push(0)
        row2.push(0)
      }
      this.p1.push(row1)
      this.p2.push(row2)
    }
  }
}

export class GameAction6_1 {
  //画图的起始点
  start: number[] = []
  //画图的结束点
  end: number[] = []
  //落子点
  constructor(start: number[], end: number[]) {
    this.start = start
    this.end = end
  }
}

export default class example6_1 {

  getRiddle(deskLenght?: number): GameData6_1 {
    return new GameData6_1(1, deskLenght)
  }

  checkRiddle(deskData: GameData6_1): number {
    return 1
  }

  doAction(deskData: GameData6_1, dataAction: GameAction6_1): [flagResult: number, dataResult: GameData6_1] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    let desk
    if (deskData.player == 1) {
      desk = deskData.p1
    } else {
      desk = deskData.p2
    }
    for (let i = dataAction.start[0]; i <= dataAction.end[0]; i++) {
      const row = desk[i]
      for (let j = dataAction.start[1]; j <= dataAction.end[1]; j++) {
        desk[i][j] = 1
      }
    }
    if (deskData.player == 1) {
      deskData.p1 = desk
    } else {
      deskData.p2 = desk
    }

    deskData.player = OtherUtil.getRival(deskData.player)
    return [0, deskData];
  }

  checkAction(deskData: GameData6_1, dataAction: GameAction6_1): number {
    if (dataAction == undefined) {
      return 1
    }
    let desk
    if (deskData.player == 1) {
      desk = deskData.p1
    } else {
      desk = deskData.p2
    }
    const lenght = desk.length
    if (dataAction.end[0] < 0 || dataAction.end[0] >= lenght || dataAction.start[0] < 0 || dataAction.start[0] >= lenght ||
      dataAction.end[1] < 0 || dataAction.end[1] >= lenght || dataAction.start[1] < 0 || dataAction.start[1] >= lenght) {
      return -1
    }

    for (let i = dataAction.start[0]; i <= dataAction.end[0]; i++) {
      const row = desk[i]
      for (let j = dataAction.start[1]; j <= dataAction.end[1]; j++) {
        const cell = desk[i][j]
        if (cell != 0) {
          return -1
        }
      }
    }
    return 1
  }

  checkDesk(deskData: GameData6_1): number {
    let p1Count = 0
    for (let i = 0; i < deskData.p1.length; i++) {
      const row = deskData.p1[i]
      for (let j = 0; j < deskData.p1.length; j++) {
        if (deskData.p1[i][j] == 1) {
          p1Count++
        }
      }
    }

    let p2Count = 0
    for (let i = 0; i < deskData.p2.length; i++) {
      const row = deskData.p2[i]
      for (let j = 0; j < deskData.p2.length; j++) {
        if (deskData.p2[i][j] == 1) {
          p2Count++
        }
      }
    }
    if (p1Count > p2Count) {
      return 1
    } else if (p1Count < p2Count) {
      return 2
    } else {
      return 0
    }
  }

  getActionAuto(deskData: GameData6_1, x: number, y: number): GameAutoWay {
    let length = y
    let width = x
    if (x < y) {
      length = x
      width = y
    }
    let desk
    if (deskData.player == 1) {
      desk = deskData.p1
    } else {
      desk = deskData.p2
    }
    let best = new GameAction6_1([], [])
    //0-0为空,直接放0-0，是否能放下
    // if (desk[0][0] == 0) {
    //   let best = new GameAction6_1([0, 0], [length - 1, width - 1])
    //   let nobest = new GameAction6_1([0, 0], [width - 1, length - 1])
    //   if (this.checkAction(deskData, best) == 1) {
    //     return new GameAutoWay(best, nobest)
    //   }
    //   if (this.checkAction(deskData, nobest) == 1) {
    //     return new GameAutoWay(nobest, best)
    //   }
    // } else {
    let start = []
    let end = []
    for (let i = 0; i < desk.length; i++) {
      for (let j = 0; j < desk.length; j++) {
        const cell = desk[i][j];
        if (cell == 0) {
          start = [i, j]
          end = [i + length - 1, j + width - 1]
          best = new GameAction6_1(start, end)
          if (this.checkAction(deskData, best) != -1) {
            return new GameAutoWay(best, best)
          } else {
            start = [i, j]
            end = [i + width - 1, j + length - 1]
            best = new GameAction6_1(start, end)
            if (this.checkAction(deskData, best) != -1) {
              return new GameAutoWay(best, best)
            }
          }
        }
      }
    }
    // }

    // }
    // //xy，是否小于0-0起手最右的边，是否能放下
    // for (let i = 0; i < desk.length; i++) {
    //   const start = desk[i][0];
    //   if (start == 0) {
    //     for (let j = 0; j < desk.length; j++) {
    //       const end = desk[i][j];
    //       if (end == 0) {
    //         if (j + 1 >= length) {
    //           let best = new GameAction6_1([i, j], [i + length, j + width])
    //           if (this.checkAction(deskData, best) == 1) {
    //             return new GameAutoWay(best, best)
    //           }
    //           let nobest = new GameAction6_1([i, j], [i + width, j + length])
    //           if (this.checkAction(deskData, nobest) == 1) {
    //             return new GameAutoWay(nobest, nobest)
    //           }
    //         } else if (j + 1 >= width) {
    //           let best = new GameAction6_1([i, j], [width, length])
    //           if (this.checkAction(deskData, best) == 1) {
    //             return new GameAutoWay(best, best)
    //           }
    //           let nobest = new GameAction6_1([i, j], [length, width])
    //           if (this.checkAction(deskData, nobest) == 1) {
    //             return new GameAutoWay(nobest, nobest)
    //           }
    //         }
    //         break
    //       }
    //     }
    //     break
    //   }
    // }
    // //xy，是否小于0-0起手最下的边，是否能放下
    // for (let i = 0; i < desk.length; i++) {
    //   const start = desk[0][i];
    //   if (start == 0) {
    //     for (let j = 0; j < desk.length; j++) {
    //       const end = desk[j][i];
    //       if (end == 0) {
    //         if (i + 1 >= length) {
    //           let best = new GameAction6_1([i + 1, j], [i + 1 + length, j + width])
    //           if (this.checkAction(deskData, best) == 1) {
    //             return new GameAutoWay(best, best)
    //           }
    //           let nobest = new GameAction6_1([i + 1, j], [i + 1 + width, j + length])
    //           if (this.checkAction(deskData, nobest) == 1) {
    //             return new GameAutoWay(nobest, nobest)
    //           }
    //         } else if (i + 1 >= width) {
    //           let best = new GameAction6_1([i + 1, j], [i + 1 + width, j + length])
    //           if (this.checkAction(deskData, best) == 1) {
    //             return new GameAutoWay(best, best)
    //           }
    //           let nobest = new GameAction6_1([i + 1, j], [i + 1 + length, j + width])
    //           if (this.checkAction(deskData, nobest) == 1) {
    //             return new GameAutoWay(nobest, nobest)
    //           }
    //         }
    //         break
    //       }
    //     }
    //     break
    //   }
    // }
    // //0-10为空,直接放0-10，是否能放下
    // if (desk[0][desk.length - 1] == 0) {
    //   let best = new GameAction6_1([0, desk.length - 1], [length, desk.length - 1 - width])
    //   if (this.checkAction(deskData, best) == 1) {
    //     return new GameAutoWay(best, best)
    //   }
    //   let nobest = new GameAction6_1([0, desk.length - 1], [width, desk.length - 1 - length])
    //   if (this.checkAction(deskData, nobest) == 1) {
    //     return new GameAutoWay(nobest, nobest)
    //   }
    // }
    // //xy，是否小于0-10起手最右的边，是否能放下
    // for (let i = 0; i < desk.length; i++) {
    //   const start = desk[i][0];
    //   if (start == 0) {
    //     for (let j = desk.length - 1; j >= 0; j++) {
    //       const end = desk[i][j];
    //       if (end == 0) {
    //         if (desk.length - 1 - j >= length) {
    //           let best = new GameAction6_1([i, desk.length - 1 - j], [i + length, (desk.length - 1 - j) - width])
    //           let nobest = new GameAction6_1([i, desk.length - 1 - j], [i + width, (desk.length - 1 - j) - length])
    //           if (this.checkAction(deskData, best) == 1) {
    //             return new GameAutoWay(best, best)
    //           }
    //           if (this.checkAction(deskData, nobest) == 1) {
    //             return new GameAutoWay(nobest, nobest)
    //           }
    //         } else if (desk.length - 1 - j >= width) {
    //           let best = new GameAction6_1([i, desk.length - 1 - j], [i + width, (desk.length - 1 - j) - length])
    //           if (this.checkAction(deskData, best) == 1) {
    //             return new GameAutoWay(best, best)
    //           }
    //           let nobest = new GameAction6_1([i, desk.length - 1 - j], [i + length, (desk.length - 1 - j) - width])
    //           if (this.checkAction(deskData, nobest) == 1) {
    //             return new GameAutoWay(nobest, nobest)
    //           }
    //         }
    //       }
    //       break
    //     }
    //     break
    //   }
    // }
    // //10-0为空,直接放10-0，是否能放下
    // if (desk[desk.length - 1][0] == 0) {
    //   let best = new GameAction6_1([desk.length - 1, 0], [desk.length - 1 - length, width])
    //   if (this.checkAction(deskData, best) == 1) {
    //     return new GameAutoWay(best, best)
    //   }
    //   let nobest = new GameAction6_1([desk.length - 1, 0], [desk.length - 1 - width, length])
    //   if (this.checkAction(deskData, nobest) == 1) {
    //     return new GameAutoWay(nobest, nobest)
    //   }
    // }
    // //xy，是否小于10-0起手最下的边，是否能放下
    // for (let i = 0; i < desk.length; i++) {
    //   const start = desk[desk.length - 1 - i][0];
    //   if (start == 0) {
    //     for (let j = 0; j >= 0; j++) {
    //       const end = desk[i][j];
    //       if (end == 0) {
    //         if (j >= length) {
    //           let best = new GameAction6_1([desk.length - 1 - i, j], [(desk.length - 1 - i) - length, j + width])
    //           if (this.checkAction(deskData, best) == 1) {
    //             return new GameAutoWay(best, best)
    //           }
    //           let nobest = new GameAction6_1([desk.length - 1 - i, j], [(desk.length - 1 - i) - width, j + length])
    //           if (this.checkAction(deskData, nobest) == 1) {
    //             return new GameAutoWay(nobest, nobest)
    //           }
    //         } else if (j >= width) {
    //           let best = new GameAction6_1([desk.length - 1 - i, j], [(desk.length - 1 - i) - width, j + length])
    //           if (this.checkAction(deskData, best) == 1) {
    //             return new GameAutoWay(best, best)
    //           }
    //           let nobest = new GameAction6_1([desk.length - 1 - i, j], [(desk.length - 1 - i) - length, j + width])
    //           if (this.checkAction(deskData, nobest) == 1) {
    //             return new GameAutoWay(nobest, nobest)
    //           }
    //         }
    //       }
    //       break
    //     }
    //     break
    //   }
    // }
    // //10-10为空,直接放10-10，是否能放下
    // if (desk[desk.length - 1][desk.length - 1] == 0) {
    //   let best = new GameAction6_1([desk.length - 1, desk.length - 1], [desk.length - 1 - length, desk.length - 1 - width])
    //   if (this.checkAction(deskData, best) == 1) {
    //     return new GameAutoWay(best, best)
    //   }
    //   let nobest = new GameAction6_1([desk.length - 1, desk.length - 1], [desk.length - 1 - width, desk.length - 1 - length])
    //   if (this.checkAction(deskData, nobest) == 1) {
    //     return new GameAutoWay(nobest, nobest)
    //   }
    // }
    // //贴边找个能放下的地方。
    // console.info(12)
    return new GameAutoWay(undefined, undefined)
  }
}
