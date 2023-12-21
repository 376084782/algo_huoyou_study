import { module4_14 } from ".";

let ctr = new module4_14()
function test() {
    let d = ctr.getRiddle()
    d.length = 5;
    d.chess = 0;
    console.log(ctr.getActionAuto(d));
}

test()



