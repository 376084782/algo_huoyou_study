import { module1_12 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module1_12()
function test() {
    let desk = {
        "player": 2, "desk": [
            [0, 0, 1],
            [0, 1, 2],
            [0, 0, 2]], "typeSet": 1
    }
    let act = { "score": 0, "p1": [0, 2], "p2": [0, 3] }
    // desk.options = [2, 3, 5]
    let f = ctr.getActionAuto(desk);
    console.log(f);
}

test()



