import { GameAction7_2, module7_2 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module7_2()
function test() {
    let desk = ctr.getRiddle(2023)
    // let act = ctr.getActionAuto(desk);
    // console.log(act, 'ac')

    desk.startDay = [8, 31];
    let f = ctr.getActionAuto(desk);
    console.log(f)
}

test()




function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module7_2();
    let map = ctr.getRiddleLev()
    writeQuesIn(map, 999)
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/7-2/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()
