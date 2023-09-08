import { module1_9 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module1_9()
function test() {
    let desk = ctr.getRiddle();
    desk.desk = [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 0]
    ]
    let act = ctr.checkDesk(desk);
    console.log(act);
}

test()


