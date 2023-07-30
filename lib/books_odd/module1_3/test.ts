import { GameAction1_3, module1_3 } from ".";
import { FileWriter } from "../../common/FileWriter";
import RandomGenerater from "../../util/RandomGenerater";
let randomer = new RandomGenerater(1)

let ctr = new module1_3()
function test() {
    let desk = { "mapLineColor": {}, "player": 1, "size": 2, "stepStartLineIdx": 0, "mapFlagColor": { "0": 2, "1": 2 }, "listFlag": [[0, 0], [1, 0]], "listLine": [[[0, 0], [1, 0]], [[0, 0], [0, 1]], [[0, 1], [1, 1]], [[1, 0], [1, 1]], [[1, 0], [2, 0]], [[2, 0], [2, 1]], [[1, 1], [2, 1]], [[0, 1], [0, 2]], [[1, 1], [1, 2]]], "listInited1": [], "listInited2": [], "typeSet": 2, "gainExtraChance": false }
    // desk.listLine = [[[0, 0], [1, 0]], [[0, 0], [0, 1]], [[1, 0], [1, 1]]]
    let f = ctr.checkDesk(desk)
    console.log(f)
    // let act = new GameAction1_3()
    // act.line = [[0, 1], [1, 1]]
    // let r = ctr.doAction(desk, act);
}

// test()





function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module1_3();
    let map: any = { 1: [], 2: [], 3: [] }
    let stepMap: any = { 1: 3, 2: 2, 3: 5 }
    let sizeMap: any = { 1: 2, 2: 2, 3: 3 }
    for (let lev = 1; lev < 4; lev++) {
        console.log(map[lev].length, 'start')
        while (map[lev].length < 10) {
            let step = 2 * stepMap[lev];
            let desk = ctr.getRiddle()
            desk.size = sizeMap[lev];
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
        await FileWriter.setFile(`./train/1-3/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()



