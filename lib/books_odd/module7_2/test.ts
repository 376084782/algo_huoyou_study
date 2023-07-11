import { GameAction7_2, module7_2 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module7_2()
function test() {
    let desk = ctr.getRiddle(2023)
    // let act = ctr.getActionAuto(desk);
    // console.log(act, 'ac')

    let act = new GameAction7_2();
    act.day = [7, 13]
    let f = ctr.checkAction(desk, act);
    console.log(f)
}

test()



