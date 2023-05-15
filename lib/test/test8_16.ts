import { FileWriter } from "../common/FileWriter";
import { module8_16 } from "../module8_16";

async function test8_16() {
    let ctr = new module8_16();
    let desk = {"player":1,"desk":[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,2,0,0,0,0,0],[0,0,1,0,0,0,0],[0,0,0,0,0,0,0]],"listTarget":[[6,0],[0,6]],"pLast":[2,5],"typeSet":2}
    let act = ctr.getActionAuto(desk);
    console.log(act)
}

test8_16()

