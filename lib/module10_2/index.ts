/**
 * @author jiutou
 * @updateTime 2022/12/02
 * @tip 10-2 十六子棋
 * @description 
 * 
10-2 十六子棋
一．挑战模式
1. 初始默认值：4×4 棋盘摆满棋子
2. 参数范围：
①棋盘 3×3~4×4
②棋子数量，[2，n]，n 表示满盘状态下棋子数量。
3. 过程记录：
无
二．练习模式
棋盘固定为 4×4（练习题用指定的胜点或败点集即可，具体见下面必胜策略部分）
一级：W2或 L2
二级：W3或 L3
三级：W4或 L4
四级：W5或 L5
五级：W6或 L6

【必胜策略：判断当前状态是否属于胜点集，如果是则随机操作，否则选择一种操作方式，使得操作后的状态属于胜点集。（三阶和四阶必胜策略方式一致，下面以三阶为例进行必胜策略描述）
以下是将游戏的所有状态按胜负点分类的过程。
①以 3×3 的 0，1 矩阵来刻画游戏状态，0 对应该位置没有棋子，1 对应有棋子，则游戏状态集 S 一共有 2^9=512 个元素；
②全为 0 的矩阵是游戏的终点状态，也是游戏的最终败点，因为抢占该状态者负，将这个状态记为 L1；
③显然，只有 1 个 1，其余 8 个位置均为 0 的状态为最后一个胜点，且易知这样的胜点一共有 9 个，将这 9 个元素组成的集合记为 W1；
④更新差集ΔS=S-L1-W1后，对ΔS 中的每一个元素进行规则遍历，即对ΔS 中每一个游戏状态逐一实行所有可能的操作，若某个状态 ai（i 可能不唯一）在实行规则遍历的过程中，
  存在某一种操作使得实行该操作后所得到的新状态 ai’属于 W1,则这个状态ai属于败点集，将这个状态存入 L2；
⑤更新差集ΔS=ΔS-L2后，继续对ΔS 中的每一个元素进行规则遍历，如果某个状态ai（i有可能不唯一）实行任意一合法操作之后，所得到的状态都属于 L2，则该状态也属于必胜集，将其存入 W2；
⑥重复④和⑤，直至ΔS 为空。】
 * 
 */
import { GameStep, GameWay, GameAutoWay } from '../common/pojo';
import RandomGenerater from '../util/RandomGenerater';
import OtherUtil from '../util/OtherUtil';
import DeskData from '../module10_2/data';
import { Console } from 'console';

export class GameData10_2 {
  p1: number = 0;
  p2: number = 0;
  //参数
  desk: number[][] = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ]
  player: number = 1

  constructor(player: number, desk?: number[][]) {
    player = player
    if (desk != undefined) {
      this.desk = desk
    }
  }
}

export class GameAction10_2 {
  move: number[][] = []
  // w1 1 l1 -1 nt 0
  // type: number = 0
  constructor(move?: number[][]) {
    // if (type != undefined) { , type?: number
    // this.type = type
    // }
    if (move != undefined) {
      this.move = move
    }
  }
}

export class GameConfig10_2 {
  deskSize: number = 4
  chessNum: number = 16
  desk: number[][] = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ]
  constructor(deskSize: number, chessNum: number, desk?: number[][]) {
    this.deskSize = deskSize
    this.chessNum = chessNum
    if (desk != undefined) {
      this.desk = desk
    } else {
      let deskNew: number[][] = []
      for (let y = 0; y < deskSize; y++) {
        let row: number[] = []
        deskNew.push(row);
        for (let x = 0; x < deskSize; x++) {
          row.push(1)
        }
      }
      this.desk = deskNew
    }
  }
}

export default class example10_2 {

  getRiddleByLev(level: number, config: any): GameData10_2 {
    throw new Error("Method not implemented.");
  }

  getRiddle(config: GameConfig10_2): GameData10_2 {
    let desk: number[][] = config.desk || []
    let initChessNum: number = 0
    for (let i = 0; i < config.deskSize; i++) {
      let rowTmp: number[] = []
      for (let j = 0; j < config.deskSize; j++) {
        if (initChessNum < config.deskSize) {
          rowTmp.push(1)
          initChessNum++
        } else {
          rowTmp.push(0)
        }
      }
    }
    let gd = new GameData10_2(1, desk);
    return gd
  }
  checkRiddle(deskData: GameData10_2): number {

    if (deskData.desk.length > 4 || deskData.desk.length < 3) {
      return -1;
    }
    return 1;
  }

  doAction(deskData: GameData10_2, dataAction: GameAction10_2): [flagResult: number, dataResult: GameData10_2] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    if (deskData.player == 1) {
      deskData.p1 += dataAction.move.length
    }
    if (deskData.player == 2) {
      deskData.p2 += dataAction.move.length
    }
    for (let i = 0; i < dataAction.move.length; i++) {
      const element = dataAction.move[i];
      deskData.desk[element[0]][element[1]] = 0
    }
    let flagResult = this.checkDesk(deskData)
    deskData.player = OtherUtil.getRival(deskData.player)
    return [flagResult, deskData];
  }

  checkAction(deskData: GameData10_2, dataAction: GameAction10_2): number {
    if (dataAction.move.length < 1) {
      return -1
    }
    let checked: number[][] = []

    if (dataAction.move.length > 1) {
      for (let i = 0; i < dataAction.move.length; i++) {
        const element: number[] = dataAction.move[i];
        if (deskData.desk[element[0]][element[1]] == 0) {
          return -1;
        }
        if (i == 0) {
          checked.push(element)
        } else {
          let adjacent = false
          for (let j = 0; j < dataAction.move.length; j++) {
            const item: number[] = dataAction.move[j];
            if ((item[0] == element[0] && Math.abs(item[1] - element[1]) == 1) ||
              (item[1] == element[1] && Math.abs(item[0] - element[0]) == 1)) {
              adjacent = true
              break
            }
          }
          if (!adjacent) {
            return -1;
          }
        }
      }
    } else {
      if (deskData.desk[dataAction.move[0][0]][dataAction.move[0][1]] == 0) {
        return -1;
      }
    }
    return 1;
  }

  checkDesk(deskData: GameData10_2): number {
    for (let i = 0; i < deskData.desk.length; i++) {
      const row = deskData.desk[i]
      for (let j = 0; j < row.length; j++) {
        if (row[j] == 1) {
          return 0
        }
      }
    }
    return OtherUtil.getRival(deskData.player)
  }

  getActionAuto(deskData: GameData10_2): GameAutoWay {
    return deskData.desk.length == 3 ? this.getActionAutoD3(deskData) : this.getActionAutoD4(deskData)
  }
  getActionAutoD3(deskData: GameData10_2): GameAutoWay {

    const rg = new RandomGenerater(0)
    let deskTmp = JSON.parse(JSON.stringify(deskData.desk));
    const allAction: GameAction10_2[] = this.getAllAction(deskTmp)
    let deskStr = this.deskArrTostring(deskData.desk)
    const deskDatas = new DeskData()
    let best = new GameAction10_2()
    let nobest = new GameAction10_2()
    if (deskDatas.d3w4.has(deskStr) ||
      deskDatas.d3w3.has(deskStr) ||
      deskDatas.d3w2.has(deskStr) ||
      deskDatas.d3w1.has(deskStr)) {
      best = allAction[rg.RangeInteger(0, allAction.length - 1)]
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    } else {
      for (let i = 0; i < allAction.length; i++) {
        const action = allAction[i];
        const dd = this.doAction(JSON.parse(JSON.stringify(deskData)), action);
        const dds = this.deskArrTostring(dd[1].desk);
        if (deskDatas.d3l4.has(deskStr) ||
          deskDatas.d3l3.has(deskStr) ||
          deskDatas.d3l2.has(deskStr) ||
          deskDatas.d3l1.has(deskStr)) {
          best = action
          break
        }
      }
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    }
    return new GameAutoWay(best, nobest)
  }

  getActionAutoD4(deskData: GameData10_2): GameAutoWay {
    const rg = new RandomGenerater(0)
    let deskTmp = JSON.parse(JSON.stringify(deskData.desk));
    const allAction: GameAction10_2[] = this.getAllAction(deskTmp)
    let deskStr = this.deskArrTostring(deskData.desk)
    const deskDatas = new DeskData()
    let best = new GameAction10_2()
    let nobest = new GameAction10_2()
    if (deskDatas.d4w7.has(deskStr) ||
      deskDatas.d4w6.has(deskStr) ||
      deskDatas.d4w5.has(deskStr) ||
      deskDatas.d4w4.has(deskStr) ||
      deskDatas.d4w3.has(deskStr) ||
      deskDatas.d4w2.has(deskStr) ||
      deskDatas.d4w1.has(deskStr)) {
      best = allAction[rg.RangeInteger(0, allAction.length - 1)]
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    } else {
      for (let i = 0; i < allAction.length; i++) {
        const action = allAction[i];
        const dd = this.doAction(JSON.parse(JSON.stringify(deskData)), action);
        const dds = this.deskArrTostring(dd[1].desk);
        if (deskDatas.d4l7.has(deskStr) ||
          deskDatas.d4l6.has(deskStr) ||
          deskDatas.d4l5.has(deskStr) ||
          deskDatas.d4l4.has(deskStr) ||
          deskDatas.d4l3.has(deskStr) ||
          deskDatas.d4l2.has(deskStr) ||
          deskDatas.d4l1.has(deskStr)) {
          best = action
          break
        }
      }
      nobest = allAction[rg.RangeInteger(1, allAction.length - 1)]
    }
    return new GameAutoWay(best, nobest)
  }


  getAllDesk(): Map<string, number[]> {
    let allDesk: Map<string, number[]> = new Map<string, number[]>
    let actionMap: Map<string, GameAction10_2[]> = new Map<string, GameAction10_2[]>
    for (let i1 = 0; i1 < 2; i1++) {
      for (let i2 = 0; i2 < 2; i2++) {
        for (let i3 = 0; i3 < 2; i3++) {
          for (let i4 = 0; i4 < 2; i4++) {
            for (let i5 = 0; i5 < 2; i5++) {
              for (let i6 = 0; i6 < 2; i6++) {
                for (let i7 = 0; i7 < 2; i7++) {
                  for (let i8 = 0; i8 < 2; i8++) {
                    for (let i9 = 0; i9 < 2; i9++) {
                      for (let i10 = 0; i10 < 2; i10++) {
                        for (let i11 = 0; i11 < 2; i11++) {
                          for (let i12 = 0; i12 < 2; i12++) {
                            for (let i13 = 0; i13 < 2; i13++) {
                              for (let i14 = 0; i14 < 2; i14++) {
                                for (let i15 = 0; i15 < 2; i15++) {
                                  for (let i16 = 0; i16 < 2; i16++) {
                                    let deskTmp = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14, i15, i16]
                                    allDesk.set(this.deskTostring(deskTmp), deskTmp)
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    let l1: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let w1: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let l2: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let w2: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let l3: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let w3: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let l4: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let w4: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let l5: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let w5: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let l6: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let w6: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let l7: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])
    let w7: Set<string> = new Set<string>(["0_0_0_0_0_0_0_0_0_"])

    let desks: Map<string, number[]> = new Map<string, number[]>

    allDesk.forEach((value, key) => {
      const deskTmp = value
      const deskArr = this.deskToArr(deskTmp as number[])
      const allAction: GameAction10_2[] = this.getAllAction(deskArr);
      actionMap.set(key, allAction)
      if (
        !l7.has(key) &&
        !w6.has(key) &&
        !l6.has(key) &&
        !w5.has(key) &&
        !l5.has(key) &&
        !w4.has(key) &&
        !l4.has(key) &&
        !w3.has(key) &&
        !l3.has(key) &&
        !w2.has(key) &&
        !l2.has(key) &&
        !w1.has(key) &&
        !l1.has(key)) {
        desks.set(key, value)
      }
    })
    console.info("l1.length:" + l1.size)
    console.info("w1.length:" + w1.size)
    console.info("l2.length:" + l2.size)
    console.info("w2.size:" + w2.size)
    console.info("l3.size:" + l3.size)
    console.info("w3.size:" + w3.size)
    console.info("l4.size:" + l4.size)
    console.info("w4.size:" + w4.size)
    console.info("l5.size:" + l5.size)
    console.info("w5.size:" + w5.size)
    console.info("l6.size:" + l6.size)
    console.info("w6.size:" + w6.size)
    console.info("l7.size:" + l7.size)
    console.info("w7.size:" + w7.size)
    console.info("all:" + (l1.size + w1.size + l2.size + w2.size + l3.size + w3.size + l4.size + w4.size + l5.size + w5.size + l6.size + w6.size + l7.size + w7.size))
    console.info("all:" + (l1.size + w1.size + l2.size + w2.size + l3.size + w3.size + l4.size + w4.size + l5.size + w5.size + l6.size + w6.size + l7.size + w7.size + desks.size))
    desks.forEach((value, key) => {
      const deskTmp = value
      const deskArr = this.deskToArr(deskTmp as number[])
      const allActionTmp: GameAction10_2[] = actionMap.get(key) as GameAction10_2[];

      //所有操作都将变为L的操作，则为W
      let count: number = 0;
      for (let i = 0; i < allActionTmp.length; i++) {
        const action = allActionTmp[i];
        const desknow = this.doAction(new GameData10_2(1, JSON.parse(JSON.stringify(deskArr))), action);
        if (desknow[0] == -1) {
          console.info(1)
        }
        const str = this.deskArrTostring(desknow[1].desk);
        if (l2.has(str) ||
          l3.has(str) ||
          l4.has(str) ||
          l5.has(str) ||
          l6.has(str) ||
          l7.has(str)) {
          count++
        }
      }
      if (count == allActionTmp.length) {
        w7.add(key)
      }
      //存在变更为W的操作，则为L
      // for (let i = 0; i < allActionTmp.length; i++) {
      //   const action = allActionTmp[i];
      //   const desknow = this.doAction(new GameData10_2(1, JSON.parse(JSON.stringify(deskArr))), action);
      //   if (desknow[0] == -1) {
      //     console.info(1)
      //   }
      //   const str = this.deskArrToStr(desknow[1].desk);
      //   if (w1.has(str) ||
      //     w2.has(str) ||
      //     w3.has(str) ||
      //     w4.has(str) ||
      //     w5.has(str) ||
      //     w6.has(str)) {
      //     l7.add(key)
      //     break
      //   }
      // }
      // 
    })
    // console.info(JSON.stringify(w3))
    const tmptmptmp = Array.from(l7.values());

    // ④更新差集ΔS=S-L1-W1后，对ΔS 中的每一个元素进行规则遍历，即对ΔS 中每一个游戏状态逐一实行所有可能的操作，若某个状态 ai（i 可能不唯一）在实行规则遍历的过程中，存在某一种操作使得实行该操作后所得到的新状态 ai’属于 W1,则这个状态ai属于败点集，将这个状态存入 L2；
    // ⑤更新差集ΔS=ΔS-L2后，继续对ΔS 中的每一个元素进行规则遍历，如果某个状态ai（i有可能不唯一）实行任意一合法操作之后，所得到的状态都属于 L2，则该状态也属于必胜集，将其存入 W2；
    return allDesk;
  }

  getAllAction(desk: number[][]): GameAction10_2[] {
    let allaction: GameAction10_2[] = []
    for (let i = 0; i < desk.length; i++) {
      const row = desk[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell == 1) {
          let base = new GameAction10_2([[i, j]]);
          allaction.push(new GameAction10_2([[i, j]]))
          for (let x = 1; x < row.length; x++) {
            if (i + x < 3) {
              const cellTmp = desk[i + x][j];
              if (cellTmp == 1) {
                let tmp: GameAction10_2 = JSON.parse(JSON.stringify(base));
                tmp.move.push([i + x, j])
                allaction.push(tmp)
                base = JSON.parse(JSON.stringify(tmp));
              } else {
                break
              }
            }
          }
          base = new GameAction10_2([[i, j]]);
          for (let y = 1; y < row.length; y++) {
            if (j + y < 3) {
              const cellTmp = desk[i][j + y];
              if (cellTmp == 1) {
                let tmp: GameAction10_2 = JSON.parse(JSON.stringify(base));
                tmp.move.push([i, j + y])
                allaction.push(tmp)
                base = JSON.parse(JSON.stringify(tmp));
              } else {
                break
              }
            }
          }
        }
      }
    }
    return allaction
  }
  // ==============================================================================================================================
  deskTostring(desk: number[]): string {
    let str: string = ""
    for (let i = 0; i < desk.length; i++) {
      const cell = desk[i];
      str += cell + "_"
    }
    return str
  }
  deskArrTostring(desk: number[][]): string {
    let str: string = ""
    for (let i = 0; i < desk.length; i++) {
      const row = desk[i];
      for (let j = 0; j < desk.length; j++) {
        const cell = row[j];
        str += cell + "_"
      }
    }
    return str
  }
  deskToArr(desk: number[]): number[][] {
    let deskTmp: number[][] = []

    const dl = desk.length % 3 == 0 ? 3 : 4
    let row: number[] = [];
    for (let i = 0; i < desk.length; i++) {
      if ((i + 1) % dl == 0) {
        row.push(desk[i])
        deskTmp.push(row)
        row = [];
      } else {
        row.push(desk[i])
      }
    }
    return deskTmp
  }

  isW1(desk: number[][]): number[] {
    let chess: number[] = []
    let chessnum = 0
    for (let i = 0; i < desk.length; i++) {
      const row = desk[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[i];
        if (cell == 1) {
          chess = [i, j]
          chessnum++
          if (chessnum > 1) {
            return []
          }
        }
      }
    }
    return chess
  }
  isL1(desk: number[][]): boolean {
    let chessnum = 0
    for (let i = 0; i < desk.length; i++) {
      const row = desk[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[i];
        if (cell == 1) {
          return false
        }
      }
    }
    return true
  }

}