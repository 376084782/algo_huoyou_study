import { module1_9 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module1_9()
function test() {
    let desk = {
        "player": 2, "desk": [
            [0, 0, 0],
            [0, 1, 1],
            [0, 0, 2]], "typeSet": 2
    }
    let act = ctr.getActionAuto(desk);
    console.log(act);
}

test()



function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module1_9();
    let map = ctr.getRiddleLev()
    writeQuesIn(map)
}
async function writeQuesIn(mapAll: any) {
    for (let level in mapAll) {
        let listQues = mapAll[level]
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/1-9/level${level}.json`, JSON.stringify(listQues))
    }

}
// createQues()
