import { FileWriter } from "../common/FileWriter";
import { GameAction8_14, GameData8_14, module8_14 } from "../module8_14";
import RandomGenerater from "../util/RandomGenerater";
let randomer = new RandomGenerater(49);
var _ = require('lodash');

function test8_14() {
    let ctr = new module8_14();

    let desk = ctr.getRiddle(5);
    let act = new GameAction8_14();
    act.pos = [3, 3];
    act.num = [1, 2];
    let f = ctr.doAction(desk, act)
    console.log('f', f)

}
test8_14()


