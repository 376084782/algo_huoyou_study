import { FileWriter } from "../common/FileWriter";
import { GameAction8_14, GameData8_14, module8_14 } from "../module8_14";
import RandomGenerater from "../util/RandomGenerater";
let randomer = new RandomGenerater(49);
var _ = require('lodash');

function test8_14() {
    let ctr = new module8_14();

    let desk = ctr.getRiddle(5);



    let flagRes = -1;
    let r = 0;
    while (flagRes == -1) {
        r++;
        let auto = ctr.getActionAuto(desk);
        console.log(auto, "autiooooo");
        let { flag, desk: deskNew } = ctr.doAction(desk, auto.best);
        desk = deskNew;
        desk.player = 3 - desk.player;
        flagRes = ctr.checkDesk(desk);
        console.log(auto.best, desk);
    }

}
test8_14()


function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module8_14();
    let map: any = { 1: [], 2: [], 3: [] }
    let count = 10;
    for (let lev = 1; lev < 4; lev++) {
        for (let n = 0; n < count; n++) {
            let step = lev * 2;
            let desk = ctr.getRiddle(5)
            for (let i = 0; i < step; i++) {
                let flagRes = ctr.checkDesk(desk);
                if (flagRes == -1) {
                    let auto = ctr.getActionAuto(desk);
                    let { flag, desk: deskNew } = ctr.doAction(desk, auto.best);
                    desk = deskNew;
                    desk.player = 3 - desk.player;
                }
            }
            map[lev].push(desk);
            console.log(map[lev].length)
        }
    }
    writeQuesIn(map)
}


async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/8-14/level${level}.json`, JSON.stringify(listQues))
    }

}
// createQues()


