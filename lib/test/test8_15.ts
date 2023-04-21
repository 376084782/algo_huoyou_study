import { module8_15 } from "../module8_15";

async function test8_15() {
    let ctr = new module8_15();
    let desk = ctr.getRiddle(7);
    let act = ctr.getActionAll(desk);
    console.log(act.map(e => e.list))
}

test8_15()
