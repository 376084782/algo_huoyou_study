import { module5_3 } from ".";
import { FileWriter } from "../../common/FileWriter";
import RandomGenerater from "../../util/RandomGenerater";
let randomer = new RandomGenerater(0)

let ctr = new module5_3()
function test() {
}

// test()




function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module5_3();

    let mapLevStep: any = {
        1: [6],
        2: [8, 9, 10],
        3: [11, 12],
        4: [13, 14, 15],
        5: [16, 17, 18, 19, 20]
    }

    let res: any = {}
    let countEach = 8;
    for (let lev in mapLevStep) {
        for (let i = 0; i < countEach; i++) {
            let stepList: number[] = mapLevStep[lev];
            let stepNeedIdx = randomer.RangeInteger(0, stepList.length);
            let stepNeed = stepList[stepNeedIdx];
            let desk = ctr.getRiddleLev(stepNeed)
            if (!res[lev]) {
                res[lev] = []
            }
            res[lev].push(desk)
        }
    }
    writeQuesIn(res, 999)
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level in mapAll) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/5-3/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()




