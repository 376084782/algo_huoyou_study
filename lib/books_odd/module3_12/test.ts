import { module3_12 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module3_12()
function test() {
    let desk = { "player": 2, "desk": [[1, 2, 3, 4, 1], [1], [1, 2], [1, 2], [1, 2, 3, 4, 1]], "typeSet": 1, "score1": 5, "score2": 0 }
    let act = ctr.getActionAuto(desk);
    console.log(act);
}

test()




function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module3_12();
    // let map = ctr.getRiddleLev()
    // writeQuesIn(map, 999)
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/1-1/level${level}.json`, JSON.stringify(listQues))
    }

}
// createQues()
