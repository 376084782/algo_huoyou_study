/**
 * @author jiutou
 * @updateTime 2022/11/28
 * @tip 颗粒归仓
 * @description 
 * 一．挑战模式
1.参数默认值：①颗粒数量：4 ②颗粒初始
位置：（1，0，1，0，1，1，0，0，0，0）

2.参数范围：①颗粒数量:[1，10] ②颗粒位
置：自主设置 ③格子长度：固定为 10

3.过程记录：无
二．练习模式【①【对于所有练习模式的题
目都是默认玩家先手，但玩家还是可以选择改
变先后手；②为描述方便把离仓库最近的格子
的位置叫 0，最远的叫 9，每道题即可用一个
数字和一个数组来表示】

一级：1 颗棋子：2，3，4，5，6，7，8，9
二级：2 颗棋子：（3，1）、（4，2）、（5，3）、（6，4）、（7，5）、（8，6）、（3，2）、（4，3）、（5，4）、（6，5）、（7，6）、（8，7）、（9，8）
三级：（7，1）、（8，1）、（9，1）、（7，2）、（8，2）、（9，2）、（9，3）、（8，3）、（7，3）、（8，4）、（9，5）、（9，6）
四级：3 颗棋子：（9，8，1）、（8，7，1）、（7，6，1）、（9，2，1）、（8，6，5）、（9，7，5）、（8，6，3）、（7，4，3）、（8，5，3）、（9，5，4）、（9，6，2）、（9，6，5）

游戏策略：
考虑棋子颗数的奇偶性，
如果是偶数颗，则按从前（位置数越小就是前）往后 2 颗一组，每组两颗棋子之间的间隔数就是这两颗棋子所对应的一个数，
如果是奇数颗棋子，则第一个数是离仓库最近的棋子所在的格子位置是几，就对应数几，其余又从前往后按 2 颗一组，该两颗棋子之间的间隔数就是这两颗棋子所对应的一个数。
这样不管是几颗棋子，都可以按上述方式得到一个数组。

必胜策略：对数组中的每个数进行二进制转化，并将转化后的二进制数进行求和，
求和过程中，如果二进制数的每一位上的 1 的个数都是偶数，则电脑随机操作，否则选择一种操作使得每一位的数字之和都变成偶数。
 * 
 */
class GameData2_1 implements GameData {
  level: number;
  warehouse = 0;
  positions: number[] = [1, 0, 1, 0, 1, 1, 0, 0, 0, 0]
  constructor(level: number) {
    this.level = level;
  }
}

export default class example2_1 implements gamehelper {


  level2Positions: number[][] = [[3, 1], [4, 2], [5, 3], [6, 4], [7, 5], [8, 6], [3, 2], [4, 3], [5, 4], [6, 5], [7, 6], [8, 7], [9, 8]]
  level3Positions: number[][] = [[7, 1], [8, 1], [9, 1], [7, 2], [8, 2], [9, 2], [9, 3], [8, 3], [7, 3], [8, 4], [9, 5], [9, 6]]
  level4Positions: number[][] = [[9, 8, 1], [8, 7, 1], [7, 6, 1], [9, 2, 1], [8, 6, 5], [9, 7, 5], [8, 6, 3], [7, 4, 3], [8, 5, 3], [9, 5, 4], [9, 6, 2], [9, 6, 5]]

  getRiddleByLevel(level: number, config: GameConfig): GameData2_1 {
    let gd = new GameData2_1(level);
    const rg = new RandomGenerater(0)
    switch (level) {
      case 0:
        break;
      case 1:
        gd.positions[rg.RangeInteger(1, 9)] = 1;
        break;
      case 2:
      case 3:
      case 4:
        let tmp = new Array
        if (level == 2) {
          tmp = this.level2Positions[rg.RangeInteger(0, this.level2Positions.length)];
        } else if (level == 3) {
          tmp = this.level3Positions[rg.RangeInteger(0, this.level3Positions.length)];
        } else if (level == 4) {
          tmp = this.level4Positions[rg.RangeInteger(0, this.level4Positions.length)];
        }
        let i: number;
        for (i = 0; i < tmp.length; i++) {
          gd.positions[tmp[i]] = 1;
        }
      default:
        throw new Error("Method not implemented.");
    }
    return gd;
  }

  getRiddle(config: GameConfig): GameData {
    throw new Error("Method not implemented.");
  }

  checkRiddle(deskData: DeskData): FlagValid {
    throw new Error("Method not implemented.");
  }

  doAction(deskData: DeskData, dataAction: string): { flagResult: number; dataResult: JSON; } {
    throw new Error("Method not implemented.");
  }

  checkAction(deskData: DeskData, dataAction: string): FlagValid {
    throw new Error("Method not implemented.");
  }

  checkDesk(deskData: DeskData): number {
    throw new Error("Method not implemented.");
  }

  getActionAuto(deskData: DeskData, robotLevel: RobotLevel, player: Player): string {
    throw new Error("Method not implemented.");
  }
}