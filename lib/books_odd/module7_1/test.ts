import { GameAction7_1, module7_1 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module7_1()
function test() {
    let desk = ctr.getRiddle()
    // desk.options = [2, 3, 5]
    // let acts = ctr.getActionAuto(desk);
    // console.log(acts);

    let act = new GameAction7_1();
    act.listIdx = [[1, 1], [2, 1]]
    let f = ctr.doAction(desk, act);
    console.log(f)
}

test()




function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module7_1();
    let map = ctr.getRiddleLev()
    writeQuesIn(map, 99)
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/7-1/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()
