import { module1_9 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module1_9()
function test() {
    let desk = {
        "player": 2, "desk": [
            [0, 0, 0],
            [0, 1, 1],
            [0, 0, 2]], "typeSet": 2
    }
    let act = ctr.getActionAuto(desk);
    console.log(act);
}

test()


