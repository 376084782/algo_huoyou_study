/**
 * @author zengxin
 * @updateTime 2023/02/07
 * @tip 10-4 翻翻翻
 * @description
 * 初始默认值：①棋子 10 颗
 * 参数范围：①棋子颗数[3,15]
 */

import RandomGenerater from '../util/RandomGenerater';
const rg = new RandomGenerater(0);

export interface GameData10_4 {
  player: 1 | 2;
  desk: number[];
  typeSet?: number;
}

enum FlipCount {
  ONE = 1,
  THREE = 3
}
enum ChessDirection {
  OBVERSE = 1, // 正面
  REVERSE = 0 // 反面
}
export interface GameData10_4Action {
  flipCount: FlipCount; // 翻的数量，可以选择翻一枚和翻三枚
  flipIndexArr: number[]; // 翻的棋子下标，如：[1],[1,4,5]
}

export default class Example10_4 {
  isObverse(direction: ChessDirection) {
    return direction === ChessDirection.OBVERSE;
  }
  isReverse(direction: ChessDirection) {
    return direction === ChessDirection.REVERSE;
  }
  isWin(desk: number[]): boolean {
    return desk.every(item => this.isObverse(item));
  }

  /**
   * 通过桌面和翻棋子的个数来获取所有操作 actions
   */
  getActionsByDeskAndFlipCount(desk: number[], flipCount: FlipCount): GameData10_4Action[] {
    if (flipCount === FlipCount.ONE) {
      const result = desk.reduce((actions: number[][], direction: ChessDirection, i: number) => {
        if (this.isReverse(direction)) {
          actions.push([i]);
        }
        return actions;
      }, []);
      return result.map(item => ({
        flipCount,
        flipIndexArr: item
      }));
    } else if (flipCount === FlipCount.THREE) {
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
      return result.map(item => ({
        flipCount,
        flipIndexArr: item
      }));
    } else {
      return [{ flipCount, flipIndexArr: [] }];
    }
  }

  /**
   * 通过桌面来获取所有的操作 actions
   */
  getActionsByDesk(desk: number[]) {
    const actions1 = this.getActionsByDeskAndFlipCount(desk, FlipCount.ONE);
    const actions3 = this.getActionsByDeskAndFlipCount(desk, FlipCount.THREE);
    const actions = [...actions1, ...actions3];
    return {
      desk,
      actions
    };
  }

  getRiddle(chessCount: number): GameData10_4 {
    const isNumber = typeof chessCount === 'number';
    if (isNumber && chessCount && chessCount >= 3 && chessCount <= 15) {
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
  checkRiddle(dataDesk: GameData10_4): number {
    const player = Number(dataDesk.player);
    const desk = dataDesk.desk;
    if (player !== 1 && player !== 2) {
      return -1;
    }
    if (desk.length < 3 || desk.length > 15) {
      return -1;
    }
    return 1;
  }

  /**
   * 判断操作是否合法
   */
  checkAction(dataDesk: GameData10_4, dataAction: GameData10_4Action): number {
    const player = Number(dataDesk.player);
    const desk = dataDesk.desk;
    const { flipCount, flipIndexArr } = dataAction;
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
    if (flipCount === FlipCount.ONE && flipIndexArr.length === 1) {
      if (this.isReverse(desk[flipIndexArr[0]])) {
        return 1;
      } else {
        console.error('操作不合法：', { desk, flipIndexArr });
        return -1;
      }
    }
    if (flipCount === FlipCount.THREE && flipIndexArr.length === 3) {
      const [first, second, third] = flipIndexArr;
      if (this.isReverse(desk[first]) && second - first === third - second) {
        return 1;
      } else {
        console.error('操作不合法：', { desk, flipIndexArr });

        return -1;
      }
    }
    return -1;
  }

  /**
   * 执行操作：-1不合法不可执行 0未结束 1先手获胜 2后手获胜
   */
  doAction(
    dataDesk: GameData10_4,
    dataAction: GameData10_4Action
  ): {
    flagResult: number;
    dataResult: GameData10_4;
  } {
    const result = this.checkAction(dataDesk, dataAction);
    if (result === -1) {
      return {
        flagResult: -1,
        dataResult: dataDesk
      };
    } else {
      const { player, desk } = dataDesk;
      const { flipIndexArr } = dataAction;
      const deskAfterAction = this.getDeskAfterAction(desk, flipIndexArr);
      return {
        flagResult: this.isWin(deskAfterAction) ? player : 0,
        dataResult: { player, desk: deskAfterAction }
      };
    }
  }

  /**
   * 检查桌面状态
   */
  checkDesk(dataDesk: GameData10_4): number {
    const { desk, player } = dataDesk;
    if (this.isWin(desk)) {
      return player;
    } else {
      return -1;
    }
  }

  getActionAuto(dataDesk: GameData10_4): {
    best: GameData10_4Action;
    nobest: GameData10_4Action;
  } {
    const { desk } = dataDesk;
    const curDeskWithActions = this.getActionsByDesk(desk);

    // 必胜列表
    const successActionList = curDeskWithActions.actions.filter(({ flipIndexArr }) =>
      this.isWin(this.getDeskAfterAction(curDeskWithActions.desk, flipIndexArr))
    );

    // 可以马上获胜的列表
    if (successActionList.length) {
      const randomSuccessAction = successActionList[rg.RangeInteger(0, successActionList.length)];
      return {
        best: randomSuccessAction,
        nobest: randomSuccessAction
      };
    }

    // 根据 actions 的每一种下法，生成下完之后桌子的状态列表
    const deskListAfterActions = curDeskWithActions.actions.reduce(
      (deskList: { desk: number[]; action: GameData10_4Action }[], action: GameData10_4Action) => {
        deskList.push({
          desk: this.getDeskAfterAction(curDeskWithActions.desk, action.flipIndexArr),
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

    const nobestActionList: GameData10_4Action[] = [];

    // 筛选对方再走一步可以马上获胜的可能列表
    const badActionList = posDeskWithActions.reduce(
      (badList: GameData10_4Action[], { desk, actions, lastAction }, index) => {
        const successList = actions.filter(({ flipIndexArr }) =>
          this.isWin(this.getDeskAfterAction(desk, flipIndexArr))
        );
        if (successList.length) {
          nobestActionList.push(lastAction);
        }
        badList = [...badList, ...successList];
        return badList;
      },
      []
    );

    const bestActionList: GameData10_4Action[] = [];

    // 常规可走列表
    const normalActionList = posDeskWithActions.reduce(
      (normalList: GameData10_4Action[], { desk, actions, lastAction }, index) => {
        const list = actions.filter(
          ({ flipIndexArr }) => !this.isWin(this.getDeskAfterAction(desk, flipIndexArr))
        );
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
    //   normalActionList,
    //   badActionList
    // });

    return {
      best: bestActionList[rg.RangeInteger(0, bestActionList.length)],
      nobest: nobestActionList.length
        ? nobestActionList[rg.RangeInteger(0, nobestActionList.length)]
        : bestActionList[rg.RangeInteger(0, bestActionList.length)]
    };
  }

  /**
   * 获取 action 之后的桌面
   */
  getDeskAfterAction(originalDesk: number[], action: number[]): number[] {
    return originalDesk.map((item, index) => (action.includes(index) ? Number(!item) : item));
  }
}

