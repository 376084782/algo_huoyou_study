import { module9_6 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module9_6()
function test() {
    let desk = ctr.getRiddle();
    // desk.options = [2, 3, 5]
    // desk.desk = [[[1, 1, 1, 0], [2, 2, 2, 0]]]
    console.log(desk.desk, 'deskkkkk')
    var valid = ctr.checkRiddle(desk);
    console.log(valid, '11111111')
}

test()




function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module9_6();
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
// createQues()
