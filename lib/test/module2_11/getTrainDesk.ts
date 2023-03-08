import Example2_11 from '../../module2_11';

test1();

const levelDeskObj: any = {
  level1Desk: [],
  level2Desk: [],
  level3Desk: [],
  level4Desk: [],
  level5Desk: []
};

function test1() {
  let player = 'P1';
  let test2_11 = new Example2_11();
  const desk = test2_11.generateDeskByCount(9);
  // console.log('actions', test2_11.getActionsByDeskAndTakeCount(desk, 2));
  // console.log('getDeskAfterAction', test2_11.getDeskAfterAction(desk, [0, 5]));

  // test2_11.checkAction({ player: 2, desk }, { indexArr: [2, 4, 6] });

  let result = {
    desk,
    player: 1
  } as any;
  let flagResult = 0;
  let count = 1;
  console.info('初始化桌面', result.desk);

  while (flagResult == 0 && count <= 50) {
    let action = test2_11.getActionAuto(result);
    // console.log('getActionAuto: ', action.best);

    let tmp = test2_11.doAction(result, action.best);
    const deskList = (action as any).deskListAfterActions;
    if (deskList) {
      deskList.forEach((deskItem: any) => {
        getLevelDesk1(deskItem.desk);
      });
    }

    result = tmp.dataResult;
    flagResult = tmp.flagResult;
    // console.info(count++, player, flagResult);
    if (flagResult == 1) {
      // console.info('P1 WIN', count);
    }
    if (flagResult == 2) {
      // console.info('P2 WIN', count);
    }
    if (player == 'P1') {
      player = 'P2';
      result.player = 2;
    } else {
      player = 'P1';
      result.player = 1;
    }
  }
}

console.log(
  {
    level1Desk: levelDeskObj.level1Desk.slice(0, 10),
    level2Desk: levelDeskObj.level2Desk.slice(0, 10),
    level3Desk: levelDeskObj.level3Desk.slice(0, 10),
    level4Desk: levelDeskObj.level4Desk.slice(0, 10),
    level5Desk: levelDeskObj.level5Desk.slice(0, 10)
  },
  'levelDeskObj'
);

function getLevelDesk1(desk: any) {
  getLevelDeskByHand1(desk, 2) && levelDeskObj.level1Desk.push(desk);
  getLevelDeskByHand1(desk, 3) && levelDeskObj.level2Desk.push(desk);
  getLevelDeskByHand1(desk, 4) && levelDeskObj.level3Desk.push(desk);
  getLevelDeskByHand1(desk, 5) && levelDeskObj.level4Desk.push(desk);
  getLevelDeskByHand1(desk, 6) && levelDeskObj.level5Desk.push(desk);
}

function getLevelDeskByHand1(desk: any, handCount: number) {
  let player = 'P1';
  let test10_4 = new Example2_11();

  let result = {
    desk,
    player: 1
  } as any;
  let flagResult = 0;
  let count = 1;
  // console.info('初始化桌面', result.desk);
  while (flagResult === 0 && count <= handCount) {
    count++;
    let action = test10_4.getActionAuto(result);
    if (action.best && action.nobest) {
      let tmp = test10_4.doAction(result, action.best);
      result = tmp.dataResult;
      flagResult = tmp.flagResult;

      // console.info(count++, player, flagResult);
      if (flagResult == 1 && count === handCount) {
        // console.info('P1 WIN');
        // console.log(randomDesk, 'randomDesk');
      }
      if (flagResult == 2) {
        // console.info('P2 WIN');
      }
      if (player == 'P1') {
        player = 'P2';
        result.player = 2;
      } else {
        player = 'P1';
        result.player = 1;
      }
    }
  }
  if (flagResult == 1) {
    return desk;
  } else {
    return null;
  }
}

