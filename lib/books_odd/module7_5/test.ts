import { GameAction7_5, module7_5 } from ".";
import { FileWriter } from "../../common/FileWriter";
import RandomGenerater from "../../util/RandomGenerater";
let randomer = new RandomGenerater(1)

let ctr = new module7_5()
function test() {
    // let act = new GameAction7_5()
    // act.line = [[0, 1], [1, 1]]
    // let r = ctr.doAction(desk, act);
}

// test()





function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module7_5();
    let map: any = { 1: [], 2: [], 3: [] }
    let stepMap: any = { 1: 6, 2: 4, 3: 3 }
    let sizeMap: any = { 1: 3, 2: 3, 3: 3 }
    for (let lev = 1; lev < 4; lev++) {
        console.log(map[lev].length, 'start')
        while (map[lev].length < 10) {
            let step = 2 * stepMap[lev];
            let desk = ctr.getRiddle()
            desk.sizeX = sizeMap[lev];
            desk.sizeY = sizeMap[lev];
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

            let count1 = 0;
            let count2 = 0;
            for (let idx in desk.mapFlagColor) {
                let color = desk.mapFlagColor[idx];
                if (color == 1) {
                    count1++
                } else {
                    count2++
                }
            }
            if (count1 == count2) {
                console.log('pushDesk')
                map[lev].push(desk);
            } else {
                console.log('wrong')
            }
        }
    }
    writeQuesIn(map)
}


async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/7-5/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()



