import { module9_7 } from ".";
import { FileWriter } from "../../common/FileWriter";
import RandomGenerater from "../../util/RandomGenerater";
let randomer = new RandomGenerater(1)

let ctr = new module9_7()
function test() {
    let desk = ctr.getRiddle(4, 3);
    // desk.options = [2, 3, 5]
    let act = ctr.getActionAuto(desk);
    console.log(act);
}

// test()




function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module9_7();
    let map: any = { 1: [], 2: [], 3: [] }
    let sizeMap: any = { 1: [4, 3], 2: [4, 4], 3: [5, 4] }
    for (let lev = 1; lev < 4; lev++) {
        console.log(map[lev].length, 'start')
        while (map[lev].length < 30) {
            let step = 2 * 1;
            let sizeConf = sizeMap[lev]
            let desk = ctr.getRiddle(sizeConf[0], sizeConf[1])
            console.log(step, 'step')
            for (let i = 0; i < step; i++) {
                let flagRes = ctr.checkDesk(desk);
                if (flagRes == -1) {
                    let actionList = ctr.getActionAll(desk);
                    let idx = randomer.RangeInteger(0, actionList.length)
                    let [flag, deskNew] = ctr.doAction(desk, actionList[idx]);
                    desk = deskNew;
                    desk.player = 3 - desk.player;
                }
            }
            map[lev].push(desk);

        }
    }
    writeQuesIn(map,99)
}


async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/9-7/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()
