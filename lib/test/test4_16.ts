import { FileWriter } from "../common/FileWriter";
import { GameData4_16, module4_16 } from "../module4_16";
var _ = require('lodash');


async function test4_16() {
    let ctr = new module4_16();
    let desk = ctr.getRiddle();

    let f = ctr.checkDesk(desk)
    console.log(f)



}

test4_16()
