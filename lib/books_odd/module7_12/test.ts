import { GameAction7_12, module7_12 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module7_12()
function test() {
    let desk = ctr.getRiddle(15)
    desk.desk = [0, 0, 1, 1, 2, 1, 0, 1, 2, 2, 2]
    let ll = ctr.getActionAuto(desk);
    console.log(ll);
}

test()


