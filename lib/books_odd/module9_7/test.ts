import { module9_7 } from ".";
import { FileWriter } from "../../common/FileWriter";

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
    let map = ctr.getRiddleLev()
    writeQuesIn(map, 999)
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/1-1/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()
