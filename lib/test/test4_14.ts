import { FileWriter } from "../common/FileWriter";
import { GameAction4_14, module4_14, GameData4_14 } from "../module4_14";

async function test4_14() {
  let ctr = new module4_14();
  let desk = ctr.getRiddle();
  desk.length = 7;
  // 测试机器人互打
  let flagRes = -1;
  let r = 0;
  // while (flagRes == -1) {
  //   r++;
  //   let auto = ctr.getActionAuto(desk);
  //   console.log(auto, "autiooooo");
  //   let { flag, desk: deskNew } = ctr.doAction(desk, auto.best);
  //   desk = deskNew;
  //   desk.player = 3 - desk.player;
  //   flagRes = ctr.checkDesk(desk);
  //   console.log(auto.best, desk);
  // }

  let act = new GameAction4_14();
  act.targetIdx = desk.length;
  let auto = ctr.checkAction(desk, act);
  console.log("结束", auto);
}
// test4_14();

async function getQues() {
  let map: any = {
    1: [],
    2: [],
    3: []
  };
  let l: any = {
    1: [4, 5, 6, 7, 8, 9, 10, 11, 12],
    2: [13, 14, 15, 16, 17, 18, 19, 20, 21],
    3: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
  };
  for (let k in l) {
    map[k] = [];
    let l2: number[] = l[k];
    l2.forEach(n => {
      let d = new GameData4_14();
      d.length = n;
      map[k].push(d);
    });
  }
  writeQuesIn(map)
}
async function writeQuesIn(mapAll: any, maxEachLev = 999) {
  for (let level = 1; level <= 3; level++) {
    let listQues = mapAll[level].slice(0, maxEachLev);
    console.log(`写入等级${level},数量：${listQues.length}`);
    await FileWriter.setFile(
      `./train/4_14/level${level}.json`,
      JSON.stringify(listQues)
    );
  }
}

getQues()