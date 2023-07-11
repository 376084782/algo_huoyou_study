import { GameAction1_3, module1_3 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module1_3()
function test() {
    let desk = ctr.getRiddle();
    desk.listLine = [[[0, 0], [1, 0]], [[0, 0], [0, 1]], [[1, 0], [1, 1]]]
    let auto = ctr.getActionAuto(desk);
    console.log(auto.map(e => e.line), auto)
    // let act = new GameAction1_3()
    // act.line = [[0, 1], [1, 1]]
    // let r = ctr.doAction(desk, act);
}

test()

