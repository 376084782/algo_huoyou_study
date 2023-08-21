import { module7_6 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module7_6()
function test() {
    let desk = ctr.getRiddle(6);
    // ctr.doRotate(1, desk);
    console.log(desk.desk);

}

test()




function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module7_6();
    let map = ctr.getRiddleLev()
    writeQuesIn(map)
}
async function writeQuesIn(mapAll: any) {
    for (let level in mapAll) {
        let listQues = mapAll[level]
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/7-6/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()


