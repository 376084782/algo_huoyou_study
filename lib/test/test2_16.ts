import { FileWriter } from "../common/FileWriter";
import { GameAction2_16, GameData2_16, module2_16 } from "../module2_16";

async function test2_16() {
    let ctr = new module2_16();
    let desk = ctr.getRiddleDefault();
    // let deskOut = ctr.getActionAll(desk);
    let act = new GameAction2_16()
    act.x = 4;
    act.y = 0;
    act.num = 1
    let ff = ctr.checkAction(desk, act);
    console.log(ff,desk.desk)
}

test2_16()






function createQues() {
    let ctr = new module2_16();
    let mapAll: any = {}

    let mapSize: any = {
        1: 4, 2: 5, 3: 6
    }
    for (let i = 1; i <= 3; i++) {
        let ll: GameData2_16[] = []
        for (let c = 0; c < 10; c++) {
            let desk = ctr.getRiddle(mapSize[i])
            desk = ctr.randomDesk(desk);
            ll.push(desk);
        }
        mapAll[i] = ll;
    }
    // 按照难度裁剪每级10个题目，写入train文件夹
    writeQuesIn(mapAll);

}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/2-16/level${level}.json`, JSON.stringify(listQues))
    }

}
// createQues()