import Example4_11 from '../../module4_11';

// test();

function test() {
  let player = 'P1';
  let test4_11 = new Example4_11();
  test4_11.checkAction({ player: 2, desk: [1, 1, 0, 0, 0, 1, 0, 1, 0, 0] }, { indexArr: [2, 4, 6] });

  let result = {
    // desk: Array.from({ length: 10 }, () => Math.round(Math.random())),
    desk: [1, 1, 1, 0, 1, 1, 0, 0, 1, 1],
    // desk: [0, 1, 1],
    // desk: [1, 0, 0],
    player: 1
  } as any;
  let flagResult = 0;
  let count = 1;
  console.info('初始化桌面', result.desk);
  while (flagResult == 0 && count <= 100) {
    let action = test4_11.getActionAuto(result);
    // console.log('getActionAuto: ', action);

    let tmp = test4_11.doAction(result, action.best);
    console.log(tmp.dataResult.desk);

    result = tmp.dataResult;
    flagResult = tmp.flagResult;
    console.info(count++, player, flagResult);
    if (flagResult == 1) {
      console.info('P1 WIN');
    }
    if (flagResult == 2) {
      console.info('P2 WIN');
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
  const randomDesk = Array.from({ length: 10 }, () => Math.round(Math.random()));
  let test10_4 = new Example4_11();

  let result = {
    desk: randomDesk,
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
    return randomDesk;
  } else {
    return null;
  }
}

function getLevelDesk() {
  const level1Desk = [];
  const level2Desk = [];
  const level3Desk = [];
  for (let i = 0; i < 300; i++) {
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

// const levelDesk = {
//   level1Desk: [
//     [0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
//     [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
//     [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
//     [1, 0, 1, 1, 1, 0, 1, 1, 0, 0],
//     [1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
//     [1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
//     [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
//     [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
//     [1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
//     [1, 0, 1, 0, 1, 0, 1, 1, 0, 0]
//   ],
//   level2Desk: [
//     [0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
//     [1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
//     [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
//     [1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
//     [0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
//     [1, 0, 0, 1, 1, 0, 1, 1, 0, 0],
//     [0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
//     [0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
//     [1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
//     [0, 0, 0, 1, 1, 1, 1, 1, 0, 1]
//   ],
//   level3Desk: [
//     [1, 1, 1, 0, 1, 1, 0, 0, 1, 1],
//     [0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
//     [1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
//     [1, 0, 1, 0, 0, 1, 0, 0, 1, 1],
//     [0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
//     [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//     [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
//     [1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
//     [0, 0, 0, 1, 1, 1, 0, 0, 1, 0],
//     [0, 0, 1, 0, 1, 1, 1, 1, 1, 1]
//   ]
// };

// const levelDeskFormatter = (desk: number[][]) =>
//   desk.map(item => ({
//     typeSet: 1,
//     desk: item,
//     player: 1
//   }));

// console.log(levelDeskFormatter(levelDesk.level1Desk));
// console.log(levelDeskFormatter(levelDesk.level2Desk));
// console.log(levelDeskFormatter(levelDesk.level3Desk));

