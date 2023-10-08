import { module3_9 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module3_9()
function test() {
    let desk = { "player": 2, "desk": [1, 2, 3, 4, 5, 6, 7, 8, 9], "list1": [3, 5], "list2": [7], "targetNum": 15, "typeSet": 1 }
    let act = ctr.getActionAuto(desk);
    console.log(act);
}

test()



function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module3_9();
    let map = ctr.getRiddleLev()
    writeQuesIn(map)
}
async function writeQuesIn(mapAll: any) {
    for (let level in mapAll) {
        let listQues = mapAll[level]
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/3-9/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()
