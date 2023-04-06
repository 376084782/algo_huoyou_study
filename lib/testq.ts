import example8_5, { GameData8_5, GameAction8_5 } from './module8_5/index';
import example8_2, { GameData8_2, GameAction8_2 } from './module8_2/index';
import example2_5, { GameData2_5, GameConfig2_5, GameAction2_5, Position2_5 } from './module2_5/index';
import { FileWriter } from './common/FileWriter';
import example10_3 from './module10_3';
import { module2_1, module8_4 } from '.';
import { Algo10_6 } from './module10_6';
import { Algo2_7, GameAction2_7, GameData2_7 } from './module2_7';
import { GameData6_10, module6_10 } from './module6_10';
import { GameData6_11, module6_11 } from './module6_11';
import { GameData4_12, module4_12 } from './module4_12';
import { GameAction10_12, module10_12 } from './module10_12';
import { GameAction10_13, module10_13 } from './module10_13';
function test8_5() {
  let desk = new GameData8_5();
  let deskData = { "typeSet": 1, "desk": ["x", "o", "o", "o", "o", "o", "x", "o", "x", "o", "o", "o", "x", "o", "x", "o"], "player": 1, "allRes": [], "step": 0, "dangerRes": [], "greatRes": [], "betterRes": [] }
  Object.assign(desk, deskData)
  let action = { "beginSeat": 0, "endSeat": 2, "nextFlag": "r" }
  let ctr = new example8_5();
  // let res = ctr.getActionAuto(desk,1)
  let res = ctr.checkAction(desk, action)
  console.log(res)
}

function test10_3() {
  let desk = { "typeSet": 1, "desk": [[0, 0, 1, 0, 0, 2, 0, 1, 1, 1, 2, 2], [1, 1, 1, 2, 2, 2, 1, 0, 1, 1, 2, 0], [1, 0, 0, 2, 0, 0, 1, 1, 1, 1, 2, 2], [2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 1, 0], [0, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1], [0, 2, 0, 0, 1, 1, 1, 1, 1, 0, 2, 0], [2, 2, 2, 0, 1, 0, 1, 1, 0, 2, 2, 2], [2, 0, 2, 0, 1, 1, 0, 1, 1, 1, 2, 0], [2, 2, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2]], "chess1": [0, 1, 2, 3, 4, 5, 6, 9], "chess2": [0, 1, 2, 5, 6, 4, 7, 3], "player": 1 }
  // desk.player = 2;
  let ctr = new example10_3();
  let r = ctr.checkDesk(desk);
  console.log(r)
}
// test10_3()

function test2_5() {
  let ctr = new example2_5();
  let conf = new GameConfig2_5()
  conf.borderSize = 2
  let desk = ctr.getRiddle(conf)
  console.log(desk);
  let auto = ctr.getActionAuto(desk);
  let dataAfterMove = ctr.doAction(desk, auto.best)
  // console.log('dataAfterMove', dataAfterMove[1].positions)

  return
  // let desk = {"palyer1Fishes":[],"palyer2Fishes":[],"curPlayer":1,"positions":[[0,0],[0,0,0],[0,0,0],[0,0,0,0],[0,0,0,0],[null,0,0,0],[null,0,0,0],[null,null,0,0]],"config":{"borderSize":2,"initPalyer1Fishes":[],"initPalyer2Fishes":[]}} 
  // let act =   {"headPosition":{"x":2,"y":2},"direct":0}

  // let ctrDesk = new GameData2_5();
  // Object.assign(ctrDesk, desk)

  // // let auto = ctr.getActionAuto(ctrDesk);
  // // console.log(auto.best)
  // // return

  // let ctrAct = new GameAction2_5(new Position2_5(act.headPosition.x, act.headPosition.y), act.direct);

  // let [flag, deskNew] = ctr.doAction(ctrDesk, ctrAct)
  // console.log('flag', flag, deskNew)


}
// test2_5()


function test8_2() {
  let desk = {
    "typeSet": 1,
    "desk": [
      [9, 9, 0, 0, 9, 9],
      [9, 0, 2, 0, 0, 9],
      [1, 4, 0, 0, 0, 6],
      [9, 0, 5, 0, 3, 9],
      [9, 9, 0, 0, 9, 9]
    ], "p1chesslog": [2, 2], "p2chesslog": [2, 3], "player": 1
  }
  let ctr = new example8_2()
  let r = ctr.checkDesk(desk)
  console.log(r)
}
// test8_2()


function formatQues10_2(strList: string[], level: number) {
  let listQues: any = []
  strList.forEach(str => {
    let list = str.split('_');
    let desk: any = []
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (!desk[y]) {
          desk[y] = []
        }
        desk[y][x] = +list[y * 4 + x]
      }
    }
    listQues.push({ "typeSet": 1, "p1": 0, "p2": 0, "desk": desk, "player": 1 })
  })
  FileWriter.setFile(`./train/10-2/level${level}.json`, JSON.stringify(listQues))
  console.log(listQues.length)
}
// formatQues10_2([
//   "0_0_0_0_0_0_0_1_1_0_1_0_0_1_0_1_",
//   "0_0_0_0_0_0_0_1_1_0_1_1_1_0_0_1_",
//   "0_0_0_0_0_0_1_0_0_1_0_1_1_0_1_0_",
//   "0_0_0_0_0_0_1_0_1_0_1_1_0_1_0_1_",
//   "0_0_0_0_0_0_1_0_1_0_1_1_1_0_1_0_",
//   "0_0_0_0_0_1_0_0_1_0_1_0_0_1_0_1_",
//   "0_0_0_0_0_1_0_0_1_0_1_1_1_0_0_1_",
//   "0_0_0_0_0_1_0_0_1_0_1_1_1_0_1_0_",
//   "0_0_0_0_0_1_0_1_0_0_1_0_0_1_0_1_",
//   "0_0_0_0_0_1_0_1_0_0_1_0_1_0_0_1_",], 2)

// formatQues10_2([
//   "0_0_0_1_0_1_1_0_1_0_1_1_0_1_0_1_",
//   "0_0_0_1_1_0_1_0_0_1_0_1_1_0_1_0_",
//   "0_0_0_1_1_0_1_0_1_0_1_1_1_0_1_0_",
//   "0_0_1_0_0_1_0_1_1_0_1_0_0_1_0_1_",
//   "0_0_1_0_0_1_0_1_1_0_1_1_1_0_0_1_",
//   "0_0_1_0_0_1_1_0_1_0_1_1_0_1_0_1_",
//   "0_0_1_0_1_0_0_1_1_0_1_1_0_1_0_1_",
//   "0_0_1_0_1_0_0_1_1_0_1_1_1_0_0_1_",
//   "0_1_0_0_0_1_0_1_1_0_1_1_0_1_0_1_",
//   "0_1_0_0_1_0_0_1_1_0_1_1_0_1_0_1_",
//   "0_1_0_0_1_0_0_1_1_0_1_1_1_0_0_1_",
//   "0_1_0_0_1_0_1_0_0_1_0_1_1_0_1_0_",
//   "0_1_0_0_1_0_1_0_1_0_1_1_1_0_1_0_",
//   "0_1_0_1_0_0_1_0_0_1_0_1_1_0_1_0_",
//   "0_1_0_1_0_0_1_0_1_0_1_1_0_1_0_1_",], 3)


function test8_4() {
  let desk: any = { "typeSet": 2, "player": 1, "player_one": [[6, 6], [7, 6], [7, 7], [7, 8]], "player_two": [] }
  let res = module8_4.checkRiddle(desk);
  console.log(res, '4444444444')
}
// test8_4()

function test2_1() {
  // let move = { "move": [3, 0], "score": 0, "action": [2, 0] }
  let ctr = new module2_1()
  let desk = { "p1": 0, "p2": 1, "player": 2, "positions": [[2, 1], [1, 2, 1], [2, 1], [2], [], [], [], [], [], [1, 1, 2], [], []], "typeSet": 1 }
  let act = { "move": [3, 0], "score": 0, "action": [2, 2] }
  let res = ctr.checkAction(desk, act);
  console.log(res)
}
// test2_1()

async function createQues10_6(stepList: number[], lev: number, count: number) {
  let listQues: string[] = []
  let ctr = new Algo10_6();
  while (listQues.length < 10) {
    let data = ctr.getRiddleByLev(count, stepList)
    let quesStr = JSON.stringify(data);
    if (listQues.indexOf(quesStr) == -1) {
      listQues.push(quesStr)
    }
  }
  let listData: any[] = []
  listQues.forEach(e => {
    listData.push(JSON.parse(e))
  })
  await FileWriter.setFile(`./train/10-6/level${lev}.json`, JSON.stringify(listData))
}
async function createQuesAll10_6() {
  let map = [{
    stepList: [2, 5],
    count: 5,
    lev: 1
  }, {
    stepList: [3, 6],
    count: 6,
    lev: 2,
  }, {
    stepList: [4, 7],
    lev: 3,
    count: 7
  }, {
    stepList: [4, 8],
    lev: 4,
    count: 8
  }, {
    stepList: [5, 9],
    lev: 5,
    count: 9
  }, {
    stepList: [5, 10],
    lev: 6,
    count: 10
  }, {
    stepList: [5, 11],
    lev: 7,
    count: 11
  }, {
    stepList: [6, 12],
    lev: 8,
    count: 12
  }]

  for (let i = 0; i < map.length; i++) {
    let data = map[i];
    await createQues10_6(data.stepList, data.lev, data.count)
  }
}
// createQuesAll10_6()


function test2_7() {
  let ctr = new Algo2_7();
  let desk = {
    "typeSet": 1, "player": 2, "maxX": 8, "maxY": 8, "desk": [
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1]
    ], "compIdxsUsed": [1, 3, 4, 4, 3, 1, 2, 2, 4, 2, 4], "listIdxCompAll": [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]
  }

  let act = ctr.checkDesk(desk);
  console.log(act, 'act')
}
// test2_7()



function test6_10() {
  let ctr = new module6_10();
  let desk = { "desk": [[-1, -1, 0, 0, 7, 7, 0, 0, -1, -1], [-1, -1, 0, 7, 7, 0, 0, 0, -1, -1], [-1, -1, 0, 7, 7, 0, 0, 0, -1, -1], [-1, 0, 0, 0, 0, 0, 8, 8, 8, -1], [-1, 0, 1, 1, 0, 0, 8, 8, 0, -1], [-1, 1, 1, 3, 3, 0, 8, 0, 0, -1], [1, 1, 0, 3, 3, 3, 0, 0, 4, 4], [0, 4, 0, 3, 0, 0, 5, 5, 4, 0], [0, 4, 4, 4, 8, 8, 5, 5, 4, 0], [-1, 4, 4, 8, 8, 0, 5, 5, 4, -1], [-1, 7, 0, 8, 5, 5, 0, 0, 4, -1], [-1, 7, 7, 8, 5, 8, 8, 8, 0, -1], [-1, -1, 7, 7, 5, 8, 8, 8, -1, -1], [-1, -1, 7, 5, 5, 1, 1, 0, -1, -1], [-1, -1, 0, 0, 1, 1, 1, 1, -1, -1]], "blockInit": [], "typeSet": 1, "player": 2, "compIdxsUsed": [3, 5, 6, 19, 15, 13, 14, 11, 12, 4, 17, 1] }
  let act = ctr.getActionAuto(desk)
  console.log(act);


  // let listComp = ctr.getListCompAll();
  // listComp.forEach(e => {
  //   let comp = ctr.getCompDataById(e.id)
  //   let res = ctr.getCompDataAfterTrans(comp.data)
  //   e.listAfterTrans = res
  // })
  // console.log(JSON.stringify(listComp))
}
// test6_10()





async function test10_12() {
  let ctr = new module10_12();
  let desk = ctr.getRiddle(4)
  desk.desk = [
    [1, 1, 1, 0],
    [1, 0, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 1]]
  desk.listLine1 = []
  // let act = new GameAction10_12();
  // act.list = [[1, 0], [3, 0]]
  let f = ctr.getActionAuto(desk);
  // let getListBetween = ctr.getListBetween([[3, 3], [1, 0]])
  console.log(f)


  // let f = ctr.doAction(desk, act);
  // console.log('fffff', f)
}

// test10_12()


async function test10_13() {
  let ctr = new module10_13();
  let desk = { "typeSet": 1, "player": 2, "desk": [1, 1, 1, 0] }
  // let act = new GameAction10_13();
  // act.idxGroup = 0;
  // act.count = 1;
  // let f = ctr.checkAction(desk, act);
  // console.log(f);
  let auto = ctr.getActionAuto(desk);
  console.log(auto)
}
test10_13()