import { module8_3 } from "..";
import { FileWriter } from "../common/FileWriter";
import { GameData8_3 } from "../module8_3";
import RandomGenerater from "../util/RandomGenerater";
let randomer = new RandomGenerater(49);
var _ = require('lodash');

function test8_3() {
    let ctr = new module8_3();
    let desk = {"typeSet":2,"desk":[4,0,6],"player":2}
    // // let pathAll = ctr.getAllPath(desk, 3, 0, true)
    // let paths = ctr.getActionAuto(desk)
    // console.log(paths, 'ppp')

    // for (let i = 0; i < 10; i++) {
    //     let res = ctr.randomNumByTarget(1)
    //     console.log(res)
    // }

    let moves = ctr.getActionAuto(desk);
    console.log(moves)

}
test8_3()


