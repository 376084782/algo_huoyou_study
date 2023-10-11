import { GameData5_10, module5_10 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module5_10()
function test() {
    let desk = {
        "player": 2, "desk": [
            [{ "x": 0, "y": 0, "vx": 0, "vy": 1 }, { "x": 1, "y": 0, "vx": 0, "vy": 0 }, { "x": 2, "y": 0, "vx": 0, "vy": 0 }],
            [{ "x": 0, "y": 1, "vx": 0, "vy": 1 }, { "x": 1, "y": 1, "vx": 0, "vy": 0 }, { "x": 2, "y": 1, "vx": 0, "vy": 0 }],
            [{ "x": 0, "y": 2, "vx": 0, "vy": 1 }, { "x": 1, "y": 2, "vx": 0, "vy": 0 }, { "x": 2, "y": 2, "vx": 0, "vy": 0 }],
            [{ "x": 0, "y": 3, "vx": 0, "vy": 1 }, { "x": 1, "y": 3, "vx": 0, "vy": 0 }, { "x": 2, "y": 3, "vx": 0, "vy": 0 }]
        ], "typeSet": 1, "player1Dir": 1
    }

    // desk.options = [2, 3, 5]
    // let act = ctr.getListPByDir([1, 1], 2, desk);
    let lines = ctr.getListPByDir([2, 0], 1, desk);
    console.log(lines);
}

test()


function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module5_10();
    let map = ctr.getRiddleLev()
    writeQuesIn(map, 999)
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/5-10/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()


