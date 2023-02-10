import example8_5, { GameData8_5, GameAction8_5 } from './module8_5/index';
import example2_5, { GameData2_5, GameConfig2_5, GameAction2_5, Position2_5 } from './module2_5/index';
function test8_5() {
  let desk = { "typeSet": 1, "desk": ["x", "o", "o", "o", "o", "o", "x", "o", "x", "o", "o", "o", "x", "o", "x", "o"], "player": 1, "allRes": [], "step": 0, "dangerRes": [], "greatRes": [], "betterRes": [] }
  let action = { "beginSeat": 0, "endSeat": 2, "nextFlag": "r" }
  let ctr = new example8_5();
  // let res = ctr.getActionAuto(desk,1)
  let res = ctr.checkAction(desk, action)
  console.log(res)
}
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
test2_5()