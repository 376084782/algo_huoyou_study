import { module7_8 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module7_8()
function test() {
    let desk = ctr.getRiddle();
    desk.desk = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
    desk.list1 = [12, 4]
    desk.list2 = [13, 8];
    desk.numCurrent = 20;
    desk.player = 1
    let act = ctr.getActionAuto(desk);
    console.log(act);
}

test()


