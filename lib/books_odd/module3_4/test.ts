import { module3_4 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module3_4()
function test() {
    let desk = ctr.getRiddle(5)
    console.log(desk);

}

test()


function createQues() {
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/3-1/level${level}.json`, JSON.stringify(listQues))
    }

}
// createQues()
