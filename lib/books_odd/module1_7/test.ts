import { module1_7 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module1_7()
function test() {
    let desk = ctr.getRiddle(3);
    let act = ctr.getActionAuto(desk);
    console.log(act);
}

test()




function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module1_7();
    let map = ctr.getRiddleLev()
    writeQuesIn(map)
}
async function writeQuesIn(mapAll: any) {
    for (let level in mapAll) {
        let listQues = mapAll[level]
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/1-7/level${level}.json`, JSON.stringify(listQues))
    }

}
// createQues()
