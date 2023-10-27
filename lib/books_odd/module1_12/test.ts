import { SearchPoint1_12, module1_12 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module1_12()
function test() {
    let desk = {
        "player": 1, "desk": [
            [0, 0, 1, 2],
            [0, 0, 2, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ], "typeSet": 2
    }
    let f = ctr.getActionAuto(desk);
    console.log(f);

    // desk.desk = [
    //     [0, 0, 1, 0],
    //     [2, 0, 0, 1],
    //     [0, 0, 0, 2],
    //     [0, 0, 0, 1]
    // ]
    // let path = ctr.findPath([0, 1], desk, 1)
    // console.log(path)
}

test()



function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module1_12();
    let map = ctr.getRiddleLev()
    writeQuesIn(map, 999)
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/1-12/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()




