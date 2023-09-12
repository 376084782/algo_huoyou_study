import { module3_9 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module3_9()
function test() {
    let desk = {
        desk: [1, 2, 3, 4, 5, 6, 7, 8, 9, 4],
        list1: [2, 7, 9],
        list2: [3, 6, 8],
        player: 2,
        typeSet: 1
    }
    let act = ctr.checkDesk(desk);
    console.log(act);
}

test()


