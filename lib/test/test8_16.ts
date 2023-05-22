import { FileWriter } from "../common/FileWriter";
import { module8_16 } from "../module8_16";

async function test8_16() {
    let ctr = new module8_16();
    let desk = { "player": 1, "desk": [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 2, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]], "listTarget": [[6, 0], [0, 6]], "pLast": [2, 5], "typeSet": 2 }
    let act = ctr.getActionAuto(desk);
    console.log(act)
}

// test8_16()


function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module8_16();
    let map: any = { 1: [], 2: [], 3: [] }
    let count = 10;
    let mapSize: any = { 1: [4], 2: [5], 3: [6, 7] }
    for (let lev = 1; lev < 4; lev++) {
        let listS = mapSize[lev]
        listS.forEach((s: number) => {
            for (let n = 0; n < count; n++) {
                let step = lev * 2;
                let desk = ctr.getRiddle(s)
                for (let i = 0; i < step; i++) {
                    let flagRes = ctr.checkDesk(desk);
                    if (flagRes == -1) {
                        let auto = ctr.getActionAuto(desk);
                        let [flag, deskNew] = ctr.doAction(desk, auto.best);
                        desk = deskNew;
                        desk.player = 3 - desk.player;
                    }
                }
                map[lev].push(desk);
                console.log(map[lev].length)
            }
        });
    }
    writeQuesIn(map)
}


async function writeQuesIn(mapAll: any, maxEachLev = 100) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/8-16/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()