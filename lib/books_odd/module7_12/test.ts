import { GameAction7_12, module7_12 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module7_12()
function test() {
    let desk = ctr.getRiddle(15)
    desk.desk = [1, 1, 1, 2, 0, 1, 0, 2, 0, 2, 2]
    let act = new GameAction7_12()
    act.idxFrom = 0;
    act.idxTo = 4
    let [f, deskNew] = ctr.doAction(desk, act);
    console.log(deskNew.desk)
}

// test()





function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module7_12();
    let map = ctr.getRiddleLev()
    writeQuesIn(map, 999)
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/7-12/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()
