import { FileWriter } from "../common/FileWriter";
import example10_1, { GameAction10_1, GameData10_1 } from "../module10_1";

async function test10_1() {
  let ctr = new example10_1();
  let desk = new GameData10_1(1, [
    [0, 0, 2, 0, 0, 1],
    [0, 0, 1, 1, 0, 1],
    [0, 0, 0, 2, 1, 1],
    [0, 2, 0, 0, 0, 2],
    [2, 1, 0, 1, 0, 0],
    [2, 0, 0, 0, 0, 0],
  ]);
  desk.desk = [
    [0, 0, 2, 0, 0, 1],
    [0, 0, 1, 1, 0, 1],
    [0, 0, 0, 2, 1, 1],
    [0, 2, 0, 0, 0, 2],
    [2, 1, 0, 1, 0, 0],
    [2, 0, 0, 0, 0, 0],
  ];
//   04,14,24
  let ff = ctr.checkDesk(desk);
  console.log(ff);
}

test10_1();
