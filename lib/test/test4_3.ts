import { module4_3 } from "..";
import { FileWriter } from "../common/FileWriter";
import { GameData4_3 } from "../module4_3";
import RandomGenerater from "../util/RandomGenerater";
let randomer = new RandomGenerater(49);
var _ = require('lodash');

function test4_3() {
    let ctr = new module4_3();
    let desk = {"typeSet":2,"desk":[[0,0,0,0,0,0],[0,0,1,0,0,0],[0,0,0,0,0,0],[0,0,0,1,0,0],[0,0,2,1,2,0],[0,0,0,0,0,0]],"chess1":4,"chess2":12,"player":1}
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
test4_3()


