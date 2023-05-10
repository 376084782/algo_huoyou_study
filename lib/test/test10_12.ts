import { FileWriter } from "../common/FileWriter";
import { module10_12 } from "../module10_12";

async function test10_12() {
    let ctr = new module10_12();
    let desk = { "player": 2, "desk": [[0, 4, 4, 3], [0, 0, 3, 0], [0, 3, 0, 0], [3, 0, 0, 0]], "listLine1": [[[0, 3], [3, 0]]], "listLine2": [[[1, 0], [2, 0]]], "typeSet": 1 }
    let act = { "list": [[0, 0], [3, 3]], "score": 0 }

    let f = ctr.checkAction(desk, act);
    console.log('fffff', f)
}

test10_12()


function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module10_12();
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
                    let [flag, deskNew] = ctr.doAction(desk, auto[1]);
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
        await FileWriter.setFile(`./train/10-12/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()
