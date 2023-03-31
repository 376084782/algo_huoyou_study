import { module10_13, GameData10_13 } from "..";
import { FileWriter } from "../common/FileWriter";

async function test10_13() {
  let ctr = new module10_13();
  let desk = { typeSet: 1, player: 2, desk: [1, 1, 1, 0] };
  // let act = new GameAction10_13();
  // act.idxGroup = 0;
  // act.count = 1;
  // let f = ctr.checkAction(desk, act);
  // console.log(f);
  let auto = ctr.getActionAuto(desk);
  console.log(auto);
}
test10_13();

async function createQues() {
  let mapAll: any = {
    1: [[3], [4], [5], [6], [7], [8], [9]],
    2: [
      [3, 5],
      [3, 6],
      [3, 7],
      [3, 8],
      [3, 9],

      [4, 6],
      [4, 7],
      [4, 8],
      [4, 9],

      [5, 7],
      [5, 8],
      [5, 9],

      [6, 8],
      [6, 9],

      [7, 9]
    ],
    3: [
      [1, 2, 3],
      [1, 2, 4],
      [1, 2, 5],
      [1, 2, 6],
      [1, 2, 7],
      [1, 2, 8],
      [1, 2, 9],

      [2, 3, 4],
      [2, 3, 5],
      [2, 3, 6],
      [2, 3, 7],
      [2, 3, 8],
      [2, 3, 9],

      [3, 4, 5],
      [3, 4, 6],
      [3, 4, 7],
      [3, 4, 8],
      [3, 4, 9],

      [4, 5, 6],
      [4, 5, 7],
      [4, 5, 8],
      [4, 5, 9],

      [5, 6, 8],
      [5, 6, 9],

      [6, 7, 9],

      [1, 2, 9]
    ]
  };

  for (let level = 1; level <= 3; level++) {
    console.log("写入等级" + level);
    let deskList: GameData10_13[] = [];
    mapAll[level].forEach((d: number[]) => {
        console.log(d,'ddddd')
        let desk = new GameData10_13();
        desk.desk = d;
        deskList.push(desk);
    });
    await FileWriter.setFile(
      `./train/10-13/level${level}.json`,
      JSON.stringify(deskList)
    );
  }
}
createQues();
