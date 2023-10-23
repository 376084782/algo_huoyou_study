import { module3_10 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module3_10()
function test() {
    let desk = ctr.getRiddle()
    // desk.options = [2, 3, 5]
    let act = ctr.getActionAuto(desk);
    console.log(act);
}

test()



