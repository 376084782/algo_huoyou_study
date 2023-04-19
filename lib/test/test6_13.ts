import { module6_13, GameData6_13, GameAction6_13 } from "..";
import { FileWriter } from "../common/FileWriter";
import { QuesWriter } from "../common/QuesWriter";

async function test6_13() {
  let ctr = new module6_13();
  let desk = { "player": 2, "typeSet": 2, "desk": [[0, -1, -1, -1, -1, -1, -1, -1, -1, 1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, 2], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0]] }
  let auto = ctr.getActionAuto(desk);
  console.log(auto.best)
  let rr = ctr.doAction(desk, auto.best);
  console.log(rr[1].desk[3])
  return
  // let list = ctr.getActionByPos(desk, 7, 9)
  let act = new GameAction6_13()
  act.listIdxs = [[7, 9], [7, 8], [7, 7], [7, 6]]
  let [f, desk2] = ctr.doAction(desk, act);
  console.log(f);
}
// test6_13();

async function createQues() {
  let ctr = new module6_13();
  let map = {
    1: ctr.getRiddlesByLev(1),
    2: ctr.getRiddlesByLev(2),
    3: ctr.getRiddlesByLev(3),
  }
  QuesWriter.writeQuesIn(map, '6-13')
  return

}
createQues();
