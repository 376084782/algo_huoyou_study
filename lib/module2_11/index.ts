/**
 * @author zengxin
 * @updateTime 2023/02/19
 * @tip 2-11 九子棋
 * @description
 * 初始默认值：①棋子 9 颗
 * 参数范围：①棋子颗数[3,12]
 */

import RandomGenerater from '../util/RandomGenerater';

const rg = new RandomGenerater(0);

interface DeskItem {
  index: number;
  line: number[][];
  isTake: boolean; // true 已经拿走了，false 还没拿
}

export interface GameData2_11 {
  player: 1 | 2;
  desk: DeskItem[];
  typeSet?: number;
}

enum TakeCount {
  ONE = 1,
  TWO = 2
}
export interface GameData2_11Action {
  takeCount: TakeCount; // 拿的数量，拿一颗或者拿相连的两颗
  indexArr: number[]; // 拿的棋子下标，如：[1],[1,3]
}

export default class Example2_11 {
  gapMap = new Map<number, number[]>([
    [3, [1, 2]],
    [4, [1, 3]],
    [5, [2, 3]],
    [6, [2, 4]],
    [7, [3, 4]],
    [8, [3, 5]],
    [9, [4, 5]],
    [10, [4, 6]],
    [11, [5, 6]],
    [12, [5, 7]]
  ]);

  /**
   * 通过棋子数量生成桌面 count: [3, 12]
   */
  generateDeskByCount(count: number) {
    const desk = [];
    const formatter = (point: number) => (point >= count ? point - count : point);
    for (let index = 0; index < count; index++) {
      const gapArr = this.gapMap.get(count)!;
      const endPoint1 = index + gapArr[0];
      const endPoint2 = index + gapArr[1];
      desk.push({
        index,
        line: [
          [index, formatter(endPoint1)],
          [index, formatter(endPoint2)]
        ],
        isTake: false
      });
    }
    return desk;
  }

  isWin(desk: DeskItem[]): boolean {
    return desk.every(item => item.isTake);
  }

  /**
   * 通过桌面和拿棋子的个数来获取所有操作 actions
   */
  getActionsByDeskAndTakeCount(desk: DeskItem[], takeCount: TakeCount): GameData2_11Action[] {
    if (takeCount === TakeCount.ONE) {
      const result = desk.reduce((acc: number[][], item) => {
        if (!item.isTake) {
          acc.push([item.index]);
        }
        return acc;
      }, []);
      return result.map(item => ({
        takeCount,
        indexArr: item
      }));
    } else if (takeCount === TakeCount.TWO) {
      const existDesk = desk.filter(item => !item.isTake);
      let lines = existDesk.reduce((acc: number[][], item) => {
        if (item.line.length) {
          acc = [...acc, ...item.line];
        }
        return acc;
      }, []);
      lines.forEach(line => {
        line.sort((a, b) => a - b);
      });

      const obj: any = {};
      lines = lines.reduce((acc: number[][], line) => {
        const arrStr = JSON.stringify(line);
        if (!obj[arrStr]) {
          acc.push(line);
        }
        obj[arrStr] = true;
        return acc;
      }, []);

      return lines.map(item => ({
        takeCount,
        indexArr: item
      }));
    } else {
      return [{ takeCount, indexArr: [] }];
    }
  }

  /**
   * 通过桌面来获取所有的操作 actions
   */
  getActionsByDesk(desk: DeskItem[]) {
    const actions1 = this.getActionsByDeskAndTakeCount(desk, TakeCount.ONE);
    const actions3 = this.getActionsByDeskAndTakeCount(desk, TakeCount.TWO);
    const actions = [...actions1, ...actions3];
    return {
      desk,
      actions
    };
  }

  /**
   * 获取 action 之后的桌面
   */
  getDeskAfterAction(originalDesk: DeskItem[], action: number[]): DeskItem[] {
    const cloneDesk: DeskItem[] = structuredClone(originalDesk);
    cloneDesk.forEach(item => {
      if (action.includes(item.index)) {
        item.isTake = true;
      }
      item.line = item.line.filter(
        pointArr => !pointArr.includes(action[0]) && !pointArr.includes(action[1])
      );
    });
    return cloneDesk;
  }

  getRiddle(chessCount: number): GameData2_11 {
    const isNumber = typeof chessCount === 'number';
    if (isNumber && chessCount && chessCount >= 3 && chessCount <= 12) {
      return {
        player: 1,
        desk: this.generateDeskByCount(chessCount)
      };
    } else {
      return {
        player: 1,
        desk: this.generateDeskByCount(9)
      };
    }
  }

  /**
   * 判断题目是否合法
   * @return 1: 合法 -1: 不合法
   */
  checkRiddle(dataDesk: GameData2_11): number {
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
   * 1: 合法
   * -1: 不合法
   */
  checkAction(dataDesk: GameData2_11, dataAction: GameData2_11Action): number {
    const player = Number(dataDesk.player);
    const desk = dataDesk.desk;
    const { indexArr, takeCount } = dataAction;
    const isValidIndex = (index: number) => index >= 0 && index <= desk.length - 1;

    if (takeCount !== indexArr.length) {
      return -1;
    }
    if (!(Array.isArray(desk) && desk.length)) {
      return -1;
    }
    if (!(player === 1 || player === 2)) {
      return -1;
    }
    if (desk.some(i => !isValidIndex(i.index))) {
      return -1;
    }

    // TODO: 还需要考虑 line 为空，但是 isTake 为 false 的情况
    if (indexArr.length === TakeCount.ONE) {
      const [first] = indexArr;
      if (desk[first].isTake) {
        console.error('操作不合法');
        return -1;
      } else {
        return 1;
      }
    }

    if (indexArr.length === TakeCount.TWO) {
      const [first, second] = indexArr;
      if (desk[first].isTake || desk[second].isTake) {
        console.error('操作不合法');
        return -1;
      }
      if (
        !desk.some(item => item.line.some(pointArr => pointArr.includes(first))) ||
        !desk.some(item => item.line.some(pointArr => pointArr.includes(second)))
      ) {
        console.error('操作不合法');
        return -1;
      }

      const allLines = desk.reduce((acc: number[][], item) => {
        if (item.line.length) {
          acc = [...acc, ...item.line];
        }
        return acc;
      }, []);
      const flagObj: any = {};
      allLines.forEach(line => (flagObj[line.toString()] = true));
      // 说明拿的两个棋子没有连线
      if (!flagObj[indexArr.toString()]) {
        return -1;
      }

      return 1;
    }
    return -1;
  }

  /**
   * 执行操作：-1不合法不可执行 0未结束 1先手获胜 2后手获胜
   */
  doAction(
    dataDesk: GameData2_11,
    dataAction: GameData2_11Action
  ): {
    flagResult: number;
    dataResult: GameData2_11;
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
  checkDesk(dataDesk: GameData2_11): number {
    const { desk, player } = dataDesk;
    if (this.isWin(desk)) {
      return player;
    } else {
      return -1;
    }
  }

  getActionAuto(dataDesk: GameData2_11): {
    best: GameData2_11Action;
    nobest: GameData2_11Action;
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
      (deskList: { desk: DeskItem[]; action: GameData2_11Action }[], action: GameData2_11Action) => {
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

    const nobestActionList: GameData2_11Action[] = [];

    // 筛选对方再走一步可以马上获胜的可能列表
    posDeskWithActions.forEach(({ desk, actions, lastAction }) => {
      const successList = actions.filter(({ indexArr }) =>
        this.isWin(this.getDeskAfterAction(desk, indexArr))
      );
      if (successList.length) {
        nobestActionList.push(lastAction);
      }
    });

    const bestActionList: GameData2_11Action[] = [];

    const obj: any = {};
    nobestActionList.forEach(({ indexArr }) => {
      obj[indexArr.toString()] = true;
    });

    curDeskWithActions.actions.forEach(action => {
      if (!obj[action.indexArr.toString()]) {
        bestActionList.push(action);
      }
    });

    // 常规可走列表
    const normalActionList = posDeskWithActions.reduce(
      (normalList: GameData2_11Action[], { desk, actions, lastAction }, index) => {
        const list = actions.filter(({ indexArr }) => !this.isWin(this.getDeskAfterAction(desk, indexArr)));
        // if (list.length) {
        //   bestActionList.push(lastAction);
        // }
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
    //   successActionList,
    //   curDeskWithActions,
    //   deskListAfterActions,
    //   posDeskWithActions,
    //   normalActionList,
    //   bestActionList,
    //   nobestActionList
    // });

    return {
      best: bestActionList[rg.RangeInteger(0, bestActionList.length)],
      nobest: nobestActionList.length
        ? nobestActionList[rg.RangeInteger(0, nobestActionList.length)]
        : bestActionList[rg.RangeInteger(0, bestActionList.length)]
    };
  }
}

