import { GameAction7_3, module7_3 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module7_3()
function test() {
    let desk = { "player": 1, "desk": [4, 5, 5, 5], "finishedDui": [], "typeSet": 1 }
    let act = ctr.getActionAuto(desk);
    console.log(act, 'ac')

}

test()





function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module7_3();
    let map = ctr.getRiddleLev()
    writeQuesIn(map, 999)
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/7-3/level${level}.json`, JSON.stringify(listQues))
    }

}
// createQues()
