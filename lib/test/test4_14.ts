import { FileWriter } from "../common/FileWriter";
import { GameAction4_14, module4_14 } from "../module4_14";

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
test4_14();
