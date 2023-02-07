import { Example10_4 } from '../../module10_4';

function test() {
  let player = 'P1';
  let test10_4 = new Example10_4();

  let result = {
    // desk: Array.from({ length: 10 }, () => Math.round(Math.random())),
    desk: [1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    // desk: [0, 1, 1],
    // desk: [1, 0, 0],
    player: 1
  } as any;
  let flagResult = 0;
  let count = 1;
  console.info('初始化桌面', result.desk);
  while (flagResult == 0 && count <= 100) {
    let action = test10_4.getActionAuto(result);
    // console.log('getActionAuto: ', action);

    let tmp = test10_4.doAction(result, action.best);
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

// test();

function getLevelDesk(handCount: number) {
  let player = 'P1';
  const deskList = [];
  const randomDesk = Array.from({ length: 10 }, () => Math.round(Math.random()));
  let test10_4 = new Example10_4();

  let result = {
    desk: randomDesk,
    player: 1
  } as any;
  let flagResult = 0;
  let count = 1;
  console.info('初始化桌面', result.desk);
  while (flagResult === 0 || (count <= 1000 && deskList.length <= 10)) {
    count++;
    console.log('length', deskList.length, 'flagResult', flagResult);

    let action = test10_4.getActionAuto(result);
    if (action.best && action.nobest) {
      let tmp = test10_4.doAction(result, action.best);
      result = tmp.dataResult;
      flagResult = tmp.flagResult;

      // console.info(count++, player, flagResult);
      if (flagResult == 1 && count === handCount) {
        console.info('P1 WIN');
        deskList.push(randomDesk);
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

  return deskList;
}

const level1Desk = getLevelDesk(2);
console.log(level1Desk);

// const level2Desk = getLevelDesk(4);
// const level3Desk = getLevelDesk(6);

