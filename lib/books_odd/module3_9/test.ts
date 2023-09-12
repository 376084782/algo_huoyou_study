import { module3_9 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module3_9()
function test() {
    let desk = ctr.getRiddle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    // desk.options = [2, 3, 5]
    desk.player = 1;
    desk.list1 = [0, 1, 2, 3, 4, 5, 6]
    let act = ctr.checkThree(desk, 1);
    console.log(act);
}

test()


