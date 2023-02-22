import example8_5, { GameData8_5, GameAction8_5 } from './module8_5/index';
import example8_2, { GameData8_2, GameAction8_2 } from './module8_2/index';
import example2_5, { GameData2_5, GameConfig2_5, GameAction2_5, Position2_5 } from './module2_5/index';
import { FileWriter } from './common/FileWriter';
import example10_3 from './module10_3';
import { module8_4 } from '.';
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
  console.log('dataAfterMove', dataAfterMove[1].positions)

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
  let desk: any = {"typeSet":2,"player":1,"player_one":[[6,6],[7,6],[7,7],[7,8]],"player_two":[]}
  let res = module8_4.checkRiddle(desk);
  console.log(res,'4444444444')
}
test8_4()




