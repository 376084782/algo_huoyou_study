import { module7_4 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module7_4()
function test() {
    let desk = {"player":1,"desk":[[5,6,7,8]],"curQuesIdx":1,"score1":-1,"score2":0,"typeSet":1}
    // desk.desk = [[1, 1, 1, 8]]
    // let act = {
    //     listCalculate: ['(', '1', '+', '1', '+', '1', ')', '*', '8'],
    //     score: 0
    // }
    let f = ctr.checkDesk(desk);
    console.log(f)
}

test()

function createQues() {
    // 三个等级，等级1两个棋子
    let map = ctr.getRiddleLev()
    writeQuesIn(map, 999)
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level in mapAll) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/7-4/level${level}.json`, JSON.stringify(listQues))
    }

}
// createQues()
