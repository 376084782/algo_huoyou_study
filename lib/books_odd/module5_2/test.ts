import { GameAction5_2, module5_2 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module5_2()
function test() {
    let desk = ctr.getRiddle()
    // desk.options = [2, 3, 5]
    let act = ctr.getActionAuto(desk);
    console.log(act);

    // let act = new GameAction5_2();
    // act.dir = 2;
    // act.step = 2;
    // let f = ctr.doAction(desk, act);
    // console.log(f)
}

test()




function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module5_2();
    let map = ctr.getRiddleLev()
    writeQuesIn(map, 999)
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/3-1/level${level}.json`, JSON.stringify(listQues))
    }

}
// createQues()
