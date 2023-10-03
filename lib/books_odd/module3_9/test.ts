import { module3_9 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module3_9()
function test() {
    let desk = { "player": 2, "desk": [1, 2, 3, 4, 5, 6, 7, 8, 9], "list1": [3, 5], "list2": [7], "targetNum": 15, "typeSet": 1 }
    let act = ctr.getActionAuto(desk);
    console.log(act);
}

test()


