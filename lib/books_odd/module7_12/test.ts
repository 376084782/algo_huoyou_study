import { GameAction7_12, module7_12 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module7_12()
function test() {
    let desk = ctr.getRiddle(15)
    desk.desk = [1, 1, 1, 1, 1, 1, 2, 2, 0, 0, 0, 2, 2, 2, 2]
    let act = new GameAction7_12()
    act.idxFrom = 0
    act.idxTo = 8;
    let [f, deskNew] = ctr.doAction(desk, act);
    console.log(f, deskNew.desk);
}

test()


