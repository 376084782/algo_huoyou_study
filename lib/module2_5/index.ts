/**
 * @author mxy
 * @updateTime 2022/11/28
 * @tip 2-5鱼的游戏
 * @description 
一．挑战模式
1.参数默认值：棋盘大小：六边形的边长为3；棋盘空置
2.参数范围：棋盘大小：边长2-4， 棋盘已放置“鱼”
3.过程记录：双方分别用红色和蓝色三角形放置于棋盘之中
二．练习模式
一级：1 步取胜（包含先手一步和后手一步）
二级：2 步取胜（同上）
三级：3 步取胜（同上）
 * 
 */


/**
 * 思路
 * 1. 坐标系
 * 将棋牌看成大的等边三角形，裁掉三个角后得到，以最左边的三角块为（0,0） x表示第几层（稍作简化，从有效的层数开始记为0），y表示从上往下第几个三角形（顺序为奇数的三角形朝向必然为上，偶数必然朝下）
 * -1表示非法区域（被裁剪的部分），0表示空白区域，1表示先手占有，2表示后手占有
 * 2. 鱼的表示
 * 以鱼头的坐标+鱼的方向（头->尾）表示一条鱼， 根据鱼头坐标和方向，可以计算出鱼身和鱼尾的坐标。其中方向的定义为边的垂直向中心方向。从左下的边开始，顺时针方向，依次用0-5表示
 * 2.以任意一个三角形为鱼头，穷举所有合法的鱼（共有三个结果），其中y轴区分奇偶，穷举的算法略有不同。此外需要排除掉非法的坐标（不在六边形棋盘内、占用等情形）
 * 3. 判断是否为合法的鱼
 * 根据鱼头的坐标和方向，计算出鱼身和鱼尾的坐标，判断头、身、尾的坐标是否合法
 * 4. 判断对局是否已经结束
 * 遍历所有空白的三角形，将其看作鱼头，穷举出合法的鱼，存在任意一条鱼，则认为对局未结束
 * 
 * 
 * 问题记录
 *   
 */
import OtherUtil from '../util/OtherUtil';
import RandomGenerater from '../util/RandomGenerater';
import { GameStep, GameWay, GameAutoWay } from '../common/pojo';
import { off } from 'process';
import { dir } from 'console';
import test from 'node:test';
var _ = require('lodash');

export class GameData2_5 {
  palyer1Fishes: GameAction2_5[] = []
  palyer2Fishes: GameAction2_5[] = []
  //当前玩家
  curPlayer = 1
  config: GameConfig2_5
  //
  positions: number[][] = []
  constructor(config: GameConfig2_5) {
    this.config = config
    if (config.borderSize < 2 || config.borderSize > 4) {
      throw new Error("illegal border size, must between 2 and 4.");
    }
    if (config.initPalyer1Fishes.length != config.initPalyer2Fishes.length) {
      throw new Error("illegal init palyer fishes[1].");
    }

    for (let i = 0; i < 2 * config.borderSize; i++) {
      let signleLevel: number[] = []
      for (let j = 0; j < 2 * (config.borderSize + i) + 1; j++) {
        if (i < config.borderSize) {
          signleLevel.push(0)
        } else {
          if ((j < 2 * (i - config.borderSize) + 1) || (j > 4 * config.borderSize - 2)) {
            signleLevel.push(-1)
          } else {
            signleLevel.push(0)
          }
        }
      }
    }
    for (let i = 0; i < config.initPalyer1Fishes.length; i++) {
      if (this.doAction(config.initPalyer1Fishes[i]) != 0) {
        throw new Error("illegal init palyer fishes[2].");
      }
      if (this.doAction(config.initPalyer2Fishes[i]) != 0) {
        throw new Error("illegal init palyer fishes[3].");
      }
    }

  }

  copy(): GameData2_5 {
    let obj = new GameData2_5(this.config)
    for (let i = 0; i < this.palyer1Fishes.length; i++) {
      if (this.doAction(this.palyer1Fishes[i]) != 0) {
        throw new Error("illegal init palyer fishes[2].");
      }
      if (i >= this.palyer2Fishes.length) {
        continue
      }
      if (this.doAction(this.palyer2Fishes[i]) != 0) {
        throw new Error("illegal init palyer fishes[3].");
      }
    }
    return obj
  }

  checkPosition(position: Position): Boolean {
    if (position.x < 0 || position.x >= this.positions.length) {
      return false
    }
    if (position.y < 0 || position.y >= this.positions[position.x].length) {
      return false
    }
    return this.positions[position.x][position.y] == 0
  }

  checkAction(action: GameAction2_5): Boolean {
    if (this.checkPosition(action.headPosition)) {
      return false
    }
    if (this.checkPosition(action.getBodyPosition())) {
      return false
    }
    if (this.checkPosition(action.getTailPosition())) {
      return false
    }
    return true
  }

  doAction(action: GameAction2_5): number {
    if (!this.checkAction(action)) {
      return -1
    }
    this.curPlayer = OtherUtil.getRival(this.curPlayer)
    if (this.curPlayer == 1) {
      this.palyer1Fishes.push(action)
    } else {
      this.palyer2Fishes.push(action)
    }
    this.positions[action.headPosition.x][action.headPosition.x] = this.curPlayer
    let bodyPosition = action.getBodyPosition()
    let tailPosition = action.getTailPosition()
    this.positions[bodyPosition.x][bodyPosition.x] = this.curPlayer
    this.positions[tailPosition.x][tailPosition.x] = this.curPlayer
    if (this.checkOver()) {
      return this.curPlayer
    }
    return 0
  }

  checkOver(): Boolean {
    for (let i = 0; i < this.positions.length; i++) {
      for (let j = 0; j < this.positions[i].length; j++) {
        if (this.positions[i][j] == 0) {
          let position = new Position(i, j)
          let actions = position.generateAllAction()
          for (let idx in actions) {
            if (this.checkAction(actions[idx])) {
              return false
            }
          }
        }
      }
    }
    return true
  }

  getAllBlankPosition(): Position[]{
    let positions: Position[] = []
    for (let i = 0; i < this.positions.length; i++) {
      for (let j = 0; j < this.positions[i].length; j++) {
        if (this.positions[i][j] == 0) {
          let position = new Position(i, j)
          positions.push(position)
        }
      }
    }
    return positions
  }


  getAllLegalAction(): GameAction2_5[] {
    let positions  = this.getAllBlankPosition()
    let result: GameAction2_5[] = []
    for (let i = 0; i < positions.length; i++) {
      let actions = positions[i].generateAllAction()
      for (let j in actions) {
        if (this.checkAction(actions[j])) {
          result.push(actions[j])
        }
      }
    }
    return result
  }
}

export class Position {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  generateAllAction(): GameAction2_5[] {
    let actions: GameAction2_5[] = []
    let startDirect = 0
    if (this.y % 2 == 1) {
      startDirect = 1
    }
    for (let i = 0; i < 3; i++) {
      actions.push(new GameAction2_5(this, startDirect + i * 2))
    }
    return actions
  }
}

export class GameConfig2_5 {
  borderSize = 3
  initPalyer1Fishes: GameAction2_5[] = []
  initPalyer2Fishes: GameAction2_5[] = []
}

export class GameAction2_5 {
  // 通过鱼头的坐标和方向，确定一条鱼的位置
  headPosition: Position
  direct: number

  constructor(position: Position, direct: number) {
    this.headPosition = position
    this.direct = direct
  }

  getBodyPosition(): Position {
    if (this.headPosition.y % 2 == 0) {
      switch (this.direct) {
        case 0:
          return new Position(this.headPosition.x + 1, this.headPosition.y + 1)
        case 2:
          return new Position(this.headPosition.x, this.headPosition.y + 1)
        case 4:
          return new Position(this.headPosition.x, this.headPosition.y - 1)
        default:
          throw new Error("illegal direct")
      }
    } else {
      switch (this.direct) {
        case 1:
          return new Position(this.headPosition.x, this.headPosition.y + 1)
        case 3:
          return new Position(this.headPosition.x - 1, this.headPosition.y - 1)
        case 5:
          return new Position(this.headPosition.x, this.headPosition.y - 1)
        default:
          throw new Error("illegal direct")
      }
    }
  }

  getTailPosition(): Position {
    if (this.headPosition.y % 2 == 0) {
      switch (this.direct) {
        case 0:
          return new Position(this.headPosition.x + 2, this.headPosition.y + 2)
        case 2:
          return new Position(this.headPosition.x - 1, this.headPosition.y + 1)
        case 4:
          return new Position(this.headPosition.x - 1, this.headPosition.y - 4)
        default:
          throw new Error("illegal direct")
      }
    } else {
      switch (this.direct) {
        case 1:
          return new Position(this.headPosition.x + 1, this.headPosition.y + 4)
        case 3:
          return new Position(this.headPosition.x - 2, this.headPosition.y - 2)
        case 5:
          return new Position(this.headPosition.x + 1, this.headPosition.y - 2)
        default:
          throw new Error("illegal direct")
      }
    }
  }
}

class PossibleAction {
  action: GameAction2_5
  after: GameData2_5
  result: number
  rivalPossibleAction: PossibleAction[]
  constructor(action: GameAction2_5, after: GameData2_5, result: number, rivalPossibleAction: PossibleAction[]) {
    this.action = action
    this.after = after
    this.result = result
    this.rivalPossibleAction = rivalPossibleAction
  }

  isBest(): Boolean {
    return (this.result == 1)
  }

  isWorst(): Boolean {
    for(let i = 0; i < this.rivalPossibleAction.length; i++) {
      return (this.rivalPossibleAction[i].isBest())
    }
    return false
  }
}

export default class example2_5 {

  getRiddleByLev(level: number, config: any): GameData2_5 {
    //需要再说
    throw new Error("Method not implemented.");
  }

  getRiddle(config: GameConfig2_5): GameData2_5 {
    return new GameData2_5(config)
  }

  checkRiddle(deskData: GameData2_5): number {
    // 初始化GameData使已经校验过了
    try {
      let data = new GameData2_5(deskData.config)
    } catch (e) {
      return -1
    }
    return 0
  }

  doAction(deskData: GameData2_5, dataAction: GameAction2_5): [flagResult: number, dataResult: GameData2_5] {
    return [deskData.doAction(dataAction), deskData]
  }

  checkAction(deskData: GameData2_5, dataAction: GameAction2_5): number {
    return deskData.checkAction(dataAction) ? 1 : -1
  }

  checkDesk(deskData: GameData2_5): number {
    return deskData.checkOver() ? deskData.curPlayer : -1

  }


  getActionAuto(deskData: GameData2_5): GameAutoWay {
    let actions = this.getAllPossibleAction(deskData, 4)
    if (actions.length == 0) {
      return new GameAutoWay(undefined, undefined)
    }
    let bestActions: GameAction2_5[] = []
    let worstActions: GameAction2_5[] = []
    let normaActions: GameAction2_5[] = []

    for (let i = 0; i < actions.length; i++) {
      let action = actions[i]
      if (action.isBest()) {
        bestActions.push(action.action)
      } else if (action.isWorst()) {
        worstActions.push(action.action)
      } else {
        normaActions.push(action.action)
      }
    }


    const rg = new RandomGenerater(0)

    if (bestActions.length > 0) {
      let result = bestActions[rg.RangeInteger(1, bestActions.length) - 1]
      return new GameAutoWay(result, result)
    }
    if (normaActions.length == 0) {
      return new GameAutoWay(worstActions[rg.RangeInteger(1, bestActions.length) - 1], worstActions[rg.RangeInteger(1, bestActions.length) - 1])
    }
    let betterActions: GameAction2_5[] = []
    let worseActions: GameAction2_5[] = []
    for (let i = 0; i < normaActions.length; i++) {
      let action = actions[i]
      for (let j = 0; j < action.rivalPossibleAction.length; j++) {
        let rivalAction =  action.rivalPossibleAction[j]
        if (rivalAction.isWorst()) {
          betterActions.push(action.action)
        } else {
          worseActions.push(action.action)
        }
      }
    }
    if(betterActions.length == 0) {
      return new GameAutoWay(worseActions[rg.RangeInteger(1, bestActions.length) - 1], worseActions[rg.RangeInteger(1, bestActions.length) - 1])
    }
    if(worseActions.length == 0) {
      return new GameAutoWay(betterActions[rg.RangeInteger(1, bestActions.length) - 1], betterActions[rg.RangeInteger(1, bestActions.length) - 1])
    }
    return new GameAutoWay(betterActions[rg.RangeInteger(1, bestActions.length) - 1], worseActions[rg.RangeInteger(1, bestActions.length) - 1])
  }


  getAllPossibleAction(deskData: GameData2_5, level: number): PossibleAction[] {
    let result: PossibleAction[] = []
    if (level < 0) {
      return result
    }
    let actions = deskData.getAllLegalAction()
    for (let i = 0; i < actions.length; i++) {
      let rivalPossibleActions: PossibleAction[] = []
      let newGameData = deskData.copy()
      if (newGameData.doAction(actions[i]) == newGameData.curPlayer) {
        result.push(new PossibleAction(actions[i], newGameData, 1, rivalPossibleActions))
      } else {
        rivalPossibleActions = this.getAllPossibleAction(newGameData, level - 1)
        result.push(new PossibleAction(actions[i], newGameData, 0, rivalPossibleActions))
      }
    }
    
    return result
  }
}