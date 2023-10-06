import { GameData5_10, module5_10 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module5_10()
function test() {
    let desk = ctr.getRiddle(7, 7)
    desk.desk[1][4].vy = 1

    // desk.options = [2, 3, 5]
    // let act = ctr.getListPByDir([1, 1], 2, desk);
    let acts = ctr.getCombinedLines(desk);
    console.log(acts);
}

test()



