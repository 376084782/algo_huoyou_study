import { FileWriter } from "../common/FileWriter";
import { module8_15 } from "../module8_15";

async function test8_15() {
    let ctr = new module8_15();
    let desk = {"player":1,"desk":[[3,3,3,3,0],[3,4,4,0,0],[3,4,3,3,0],[3,0,4,0,0],[3,0,0,0,0]],"listLine1":[[[2,2],[3,2]],[[0,0],[0,1],[0,2],[0,3],[0,4]],[[1,0],[2,0],[3,0]]],"listLine2":[[[1,1],[2,1]],[[1,2],[2,3]]],"typeSet":1}
    let act= {"list":[[3,1],[3,1]],"score":0}
    let f=ctr.checkAction(desk,act);
    console.log(f)
}

test8_15()

function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module8_15();
    let map: any = { 1: [], 2: [], 3: [] }
    let count = 10;
    for (let lev = 1; lev < 4; lev++) {
        for (let n = 0; n < count; n++) {
            let step = lev * 2;
            let desk = ctr.getRiddle(5)
            for (let i = 0; i < step; i++) {
                let flagRes = ctr.checkDesk(desk);
                if (flagRes == -1) {
                    let auto = ctr.getActionAuto(desk);
                    let [flag, deskNew] = ctr.doAction(desk, auto[1]);
                    desk = deskNew;
                    desk.player = 3 - desk.player;
                }
            }
            map[lev].push(desk);
            console.log(map[lev].length)
        }
    }
    writeQuesIn(map)
}


async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/8-15/level${level}.json`, JSON.stringify(listQues))
    }

}
// createQues()