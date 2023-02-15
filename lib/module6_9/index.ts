/**
 * @author jiutou
 * @updateTime 2022/12/02
 * @tip 6-8 移车出库
 * @description
 *
6-9：计算迷宫【单人游戏】
一．挑战模式
1.好友房：
①电脑出题【从训练题库中按等级选题】
②自定义出题
【界面：选择方格大小：3×3；4×4；5×5；
设置方格数据：提供数字 0~9 排成一行以及运算符号“+”、“—”和“×”、“÷”；

2.参数范围：
①方格大小：3×3、4×4、5×5；
②数字范围：0~9 ，小数点，除号
③运算方式：+、-、×、÷

3.过程记录：
①在每个经过的方格右下方显示相应的小脚印及数字信息（起始位置为 1，接下来按顺序 2、3、4.....）【给过程记录加一个开关，可以选中不显示过程】②实时更新当前总和。

二．训练模式
一级：3×3【4 步】
二级：3×3【6 步】
三级：4×4【6 步】
四级：4×4【8 步】
五级：5×5【8 步】
六级：5×5【10 步】
以下所有计算迷宫都以该
图基础。

 *
 */
import { GameAutoWay } from '../common/pojo';
import RandomGenerater from '../util/RandomGenerater';
import OtherUtil from '../util/OtherUtil';
import { FileWriter } from '../common/FileWriter';

export class GameData6_9 {
  typeSet?= 1;//前端用的，存是否是自定义棋盘
  //参数
  desk: number[][][] = []

  constructor(desk: number[][][]) {
    this.desk = desk
  }
}

export default class example6_9 {

  getRiddleByLev(size: number): GameData6_9 {
    throw new Error("Method not implemented.");
  }

  checkRiddle(deskData: GameData6_9): number {
    if (deskData.desk.length >= 1 && deskData.desk.length <= 6) {
      return -1
    }
    return 1;
  }

  checkDesk(deskData: GameData6_9): number {
    let count = 0
    for (let i = 0; i < deskData.desk.length; i++) {
      const row = deskData.desk[i]
      for (let j = 0; j < row.length; j++) {
        const parking = row[j];
        if (parking == 1) {
          count++
        }
      }
    }
    if (count == 0) {
      return deskData.player
    }
    return 0
  }

  checkAction(deskData: GameData6_9, dataAction: number[][]): number {
    if (dataAction.length > 3 || dataAction.length == 0) {
      return -1
    }
    for (let i = 0; i < dataAction.length; i++) {
      const action = dataAction[i];
      if (deskData.desk[action[0]][action[1]] == 0) {
        return -1
      }
    }
    return 1
  }

  doAction(deskData: GameData6_9, dataAction: number[][]): [flagResult: number, dataResult: GameData6_9] {
    if (this.checkAction(deskData, dataAction) == -1) {
      return [-1, deskData];
    }
    for (let i = 0; i < dataAction.length; i++) {
      const action = dataAction[i];
      deskData.desk[action[0]][action[1]] = 0
      if (action[1] != 5) {
        deskData.desk[action[0]][action[1] + 1] = 1
      }
    }
    let flagResult = this.checkDesk(deskData)
    deskData.player = OtherUtil.getRival(deskData.player)
    return [flagResult, deskData];
  }

}