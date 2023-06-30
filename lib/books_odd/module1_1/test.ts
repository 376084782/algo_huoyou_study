import { module1_1 } from ".";

let ctr = new module1_1()
function test() {
    let desk = ctr.getRiddle();
    // desk.options = [2, 3, 5]
    let act = ctr.getActionAuto(desk);
    console.log(act);
}

test()