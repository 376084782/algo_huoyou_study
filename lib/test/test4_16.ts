import { FileWriter } from "../common/FileWriter";
import { GameData4_16, module4_16 } from "../module4_16";
var _ = require('lodash');


async function test4_16() {
    let ctr = new module4_16();
    // let desk = ctr.getRiddle();

    // let f = ctr.checkDesk(desk)
    // console.log(f)

    let desk = ctr.getRiddleByLev(1);
    // console.log(desk.desk);

}

test4_16()




async function getQues() {
    let map: any = {
        1: [],
        2: [],
        3: []
    };
    let ctr = new module4_16();
    for (let lev = 1; lev <= 3; lev++) {
        while (map[lev].length < 10) {
            let desk = ctr.getRiddleByLev(lev)
            let strDesk = JSON.stringify(desk.desk);
            let listQues = map[lev] as any[]
            if (!listQues.find(e => JSON.stringify(e.desk) == strDesk)) {
                listQues.push(desk);
            }
        }

    }
    writeQuesIn(map)
}
async function writeQuesIn(mapAll: any, maxEachLev = 999) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev);
        console.log(`写入等级${level},数量：${listQues.length}`);
        await FileWriter.setFile(
            `./train/4-16/level${level}.json`,
            JSON.stringify(listQues)
        );
    }
}

// getQues()