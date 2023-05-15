import { FileWriter } from "../common/FileWriter";
import { module8_16 } from "../module8_16";

async function test8_16() {
    let ctr = new module8_16();
    let desk = ctr.getRiddle(7);
    let act = ctr.getActionAuto(desk);
    console.log(act)
}

test8_16()

