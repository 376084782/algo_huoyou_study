import { module1_4 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module1_4()
function test() {
    let desk = ctr.getRiddleDefault();
    desk.desk = [
        [1, 1, 2, 2],
        [1, 1, 2, 2],
        [1, 1, 4, 5],
        [3, 3, 3, 3],
    ]
    let f = ctr.checkDesk(desk)
    console.log(f);

}

test()



