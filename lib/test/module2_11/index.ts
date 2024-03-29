import Example2_11 from '../../module2_11';
// import './formatDesk';
// import './getTrainDesk';

// test();

function test(customDesk?: any) {
  let player = 'P1';
  let test2_11 = new Example2_11();
  const desk = customDesk || test2_11.generateDeskByCount(9);
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
    // console.log(tmp.dataResult.desk, 'desk');

    result = tmp.dataResult;
    flagResult = tmp.flagResult;
    // console.info(count++, player, flagResult);
    if (flagResult == 1) {
      console.info('P1 WIN', count);
    }
    if (flagResult == 2) {
      console.info('P2 WIN', count);
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

function getLevelDeskByHand(handCount: number) {
  let player = 'P1';
  let test10_4 = new Example2_11();
  const desk = test10_4.generateDeskByCount(9);

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

function getLevelDesk() {
  const level1Desk = [];
  const level2Desk = [];
  const level3Desk = [];
  for (let i = 0; i < 50; i++) {
    const desk1 = getLevelDeskByHand(2);
    desk1 && level1Desk.push(desk1);

    const desk2 = getLevelDeskByHand(4);
    desk2 && level2Desk.push(desk2);

    const desk3 = getLevelDeskByHand(6);
    desk3 && level3Desk.push(desk3);
  }
  return {
    level1Desk: level1Desk.slice(0, 10),
    level2Desk: level2Desk.slice(0, 10),
    level3Desk: level3Desk.slice(0, 10)
  };
}

// console.log(getLevelDesk());

// const levelDeskFormatter = (desk: number[][]) =>
//   desk.map(item => ({
//     typeSet: 1,
//     desk: item,
//     player: 1
//   }));

// console.log(levelDeskFormatter(levelDesk.level1Desk));
// console.log(levelDeskFormatter(levelDesk.level2Desk));
// console.log(levelDeskFormatter(levelDesk.level3Desk));

