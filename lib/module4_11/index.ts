/**
 * @author zengxin
 * @updateTime 2023/02/19
 * @tip 4-11 等距翻转
 * @description
 * 初始默认值：①棋子 10 颗
 * 参数范围：①棋子颗数[3,12]
 */

import RandomGenerater from '../util/RandomGenerater';

const rg = new RandomGenerater(0);

export interface GameData4_11 {
  player: 1 | 2;
  desk: number[];
  typeSet?: number;
}

enum ChessDirection {
  OBVERSE = 1, // 正面
  REVERSE = 0 // 反面
}
export interface GameData4_11Action {
  indexArr: number[]; // 翻的棋子下标，如：[1],[1,4,5]
}

export default class Example4_11 {
  isObverse(direction: ChessDirection) {
    return direction === ChessDirection.OBVERSE;
  }
  isReverse(direction: ChessDirection) {
    return direction === ChessDirection.REVERSE;
  }
  isWin(desk: number[]): boolean {
    const actions = this.getActionsByDesk(desk).actions;
    return actions.length ? false : true;
  }

  /**
   * 通过桌面来获取所有的操作 actions
   */
  getActionsByDesk(desk: number[]): { desk: number[]; actions: GameData4_11Action[] } {
    const result = [];
    for (let firstIndex = 0; firstIndex < desk.length; firstIndex++) {
      if (desk[firstIndex] !== 0) {
        continue;
      }

      for (let gap = 0; gap < desk.length - firstIndex; gap++) {
        const thirdIndex = firstIndex + gap * 2;
        if (thirdIndex > desk.length - 1) {
          continue;
        }
        if (firstIndex !== firstIndex + gap && firstIndex !== thirdIndex) {
          result.push([firstIndex, firstIndex + gap, thirdIndex]);
        }
      }
    }
    const actions = result.map(item => ({
      indexArr: item
    }));

    return {
      desk,
      actions
    };
  }

  /**
   * 获取 action 之后的桌面
   */
  getDeskAfterAction(originalDesk: number[], action: number[]): number[] {
    return originalDesk.map((item, index) => (action.includes(index) ? Number(!item) : item));
  }

  getRiddle(chessCount: number): GameData4_11 {
    const isNumber = typeof chessCount === 'number';
    if (isNumber && chessCount && chessCount >= 3 && chessCount <= 12) {
      return {
        player: 1,
        desk: Array.from({ length: chessCount }, () => Math.round(Math.random()))
      };
    } else {
      return {
        player: 1,
        desk: Array.from({ length: 10 }, () => Math.round(Math.random()))
      };
    }
  }

  /**
   * 判断题目是否合法
   * @return 1: 合法 -1: 不合法
   */
  checkRiddle(dataDesk: GameData4_11): number {
    const player = Number(dataDesk.player);
    const desk = dataDesk.desk;
    if (player !== 1 && player !== 2) {
      return -1;
    }
    if (desk.length < 3 || desk.length > 12) {
      return -1;
    }
    return 1;
  }

  /**
   * 判断操作是否合法
   */
  checkAction(dataDesk: GameData4_11, dataAction: GameData4_11Action): number {
    const player = Number(dataDesk.player);
    const desk = dataDesk.desk;
    const { indexArr } = dataAction;
    const isValidIndex = (index: number) => index >= 0 && index <= desk.length - 1;

    if (!(Array.isArray(desk) && desk.length)) {
      return -1;
    }
    if (!(player === 1 || player === 2)) {
      return -1;
    }
    if (desk.some(i => !isValidIndex(i))) {
      return -1;
    }

    if (indexArr.length === 3) {
      const [first, second, third] = indexArr;
      if (this.isReverse(desk[first]) && second - first === third - second) {
        return 1;
      } else {
        console.error('操作不合法：', { desk, indexArr });
        return -1;
      }
    }
    return -1;
  }

  /**
   * 执行操作：-1不合法不可执行 0未结束 1先手获胜 2后手获胜
   */
  doAction(
    dataDesk: GameData4_11,
    dataAction: GameData4_11Action
  ): {
    flagResult: number;
    dataResult: GameData4_11;
  } {
    const result = this.checkAction(dataDesk, dataAction);
    if (result === -1) {
      return {
        flagResult: -1,
        dataResult: dataDesk
      };
    } else {
      const { player, desk } = dataDesk;
      const { indexArr } = dataAction;
      const deskAfterAction = this.getDeskAfterAction(desk, indexArr);
      return {
        flagResult: this.isWin(deskAfterAction) ? player : 0,
        dataResult: { player, desk: deskAfterAction }
      };
    }
  }

  /**
   * 检查桌面状态
   */
  checkDesk(dataDesk: GameData4_11): number {
    const { desk, player } = dataDesk;
    if (this.isWin(desk)) {
      return player;
    } else {
      return -1;
    }
  }

  getActionAuto(dataDesk: GameData4_11): {
    best: GameData4_11Action;
    nobest: GameData4_11Action;
  } {
    const { desk } = dataDesk;
    // 当前桌面的所有 actions
    const curDeskWithActions = this.getActionsByDesk(desk);

    // 必胜列表
    const successActionList = curDeskWithActions.actions.filter(({ indexArr }) =>
      this.isWin(this.getDeskAfterAction(curDeskWithActions.desk, indexArr))
    );

    // 可以马上获胜的列表
    if (successActionList.length) {
      const randomSuccessAction = successActionList[rg.RangeInteger(0, successActionList.length)];
      return {
        best: randomSuccessAction,
        nobest: randomSuccessAction
      };
    }

    // 根据当前桌面的所有 actions ，生成下完之后桌子 list
    const deskListAfterActions = curDeskWithActions.actions.reduce(
      (deskList: { desk: number[]; action: GameData4_11Action }[], action: GameData4_11Action) => {
        deskList.push({
          desk: this.getDeskAfterAction(curDeskWithActions.desk, action.indexArr),
          action
        });
        return deskList;
      },
      []
    );

    // 根据上面的桌面列表，递归每一种桌面对方可能走的所有可能
    const posDeskWithActions = deskListAfterActions.map(({ desk, action }) => ({
      ...this.getActionsByDesk(desk),
      lastAction: action
    }));

    const nobestActionList: GameData4_11Action[] = [];

    // 筛选对方再走一步可以马上获胜的可能列表
    posDeskWithActions.forEach(({ desk, actions, lastAction }) => {
      const successList = actions.filter(({ indexArr }) =>
        this.isWin(this.getDeskAfterAction(desk, indexArr))
      );
      if (successList.length) {
        nobestActionList.push(lastAction);
      }
    });

    const bestActionList: GameData4_11Action[] = [];

    // 常规可走列表
    const normalActionList = posDeskWithActions.reduce(
      (normalList: GameData4_11Action[], { desk, actions, lastAction }, index) => {
        const list = actions.filter(({ indexArr }) => !this.isWin(this.getDeskAfterAction(desk, indexArr)));
        if (list.length) {
          bestActionList.push(lastAction);
        }
        normalList = [...normalList, ...list];
        return normalList;
      },
      []
    );

    if (!normalActionList.length) {
      return {
        best: nobestActionList[rg.RangeInteger(0, nobestActionList.length)],
        nobest: nobestActionList[rg.RangeInteger(0, nobestActionList.length)]
      };
    }

    // console.log({
    //   curDeskWithActions,
    //   deskListAfterActions,
    //   posDeskWithActions,
    //   normalActionList
    // });

    return {
      best: bestActionList[rg.RangeInteger(0, bestActionList.length)],
      nobest: nobestActionList.length
        ? nobestActionList[rg.RangeInteger(0, nobestActionList.length)]
        : bestActionList[rg.RangeInteger(0, bestActionList.length)]
    };
  }
}

