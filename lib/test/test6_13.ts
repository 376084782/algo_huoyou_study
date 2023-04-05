import { module6_13, GameData6_13, GameAction6_13 } from "..";
import { FileWriter } from "../common/FileWriter";

async function test6_13() {
  let ctr = new module6_13();
  let desk = {
    "player": 2, "typeSet": 1, "desk": [
      [0, 1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, -2, 1, 2],
      [2, 1, 2, 1, 2, 1, -2, -2, -2, -2],
      [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, -1, 2, -1, 2, 1, 2],
      [2, 1, 2, 1, 2, -1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2, 1, 0]]
  }
  // let auto = ctr.getActionAuto(desk);
  // let list = ctr.getActionByPos(desk, 7, 9)
  let act = new GameAction6_13()
  act.listIdxs = [[7, 9], [7, 8], [7, 7], [7, 6]]
  let [f, desk2] = ctr.doAction(desk, act);
  console.log(f);
}
test6_13();

