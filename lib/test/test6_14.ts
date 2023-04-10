import { module6_14, GameData6_14, GameAction6_14 } from "..";
import { FileWriter } from "../common/FileWriter";
import { QuesWriter } from "../common/QuesWriter";

async function test6_14() {
  let ctr = new module6_14();
  let desk = ctr.getRiddle()
  desk.desk = [998, 1]
  desk.multi = 5;
  let act = ctr.getActionAuto(desk);
  // let list = ctr.getActionByPos(desk, 7, 9)
  let res = ctr.doAction(desk, act.best);
  console.log(res, act.best);
}
// test6_14();

async function createQues() {
  let ctr = new module6_14();
  let map: any = { 1: [], 2: [], 3: [] }
  let list1 = [[5, 1], [17, 1], [25, 1], [12, 2], [32, 2], [28, 2], [21, 3], [33, 3], [45, 3], [91, 7]];
  let list2 = [[19, 2], [21, 2], [23, 2], [34, 3], [37, 3], [40, 3], [92, 7], [127, 7], [148, 7], [122, 11]]
  let list3 = [[44, 3], [56, 3], [95, 7], [165, 7], [288, 23], [380, 23], [361, 37], [398, 37], [310, 46], [356, 46]]
  list1.forEach(e => {
    let act = ctr.getRiddle();
    act.desk = e;
    map[1].push(act)
  })

  list2.forEach(e => {
    let act = ctr.getRiddle();
    act.desk = e;
    map[2].push(act)
  })

  list3.forEach(e => {
    let act = ctr.getRiddle();
    act.desk = e;
    map[3].push(act)
  })
  QuesWriter.writeQuesIn(map, '6-14')
  return

}
createQues();

