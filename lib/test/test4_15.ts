import { FileWriter } from "../common/FileWriter";
import { GameData4_15, module4_15 } from "../module4_15";
var _ = require('lodash');


async function test4_15() {
    let ctr = new module4_15();
    let desk = ctr.getRiddle()


    let act = ctr.getActionAuto(desk)
    console.log(act)


}

test4_15()
