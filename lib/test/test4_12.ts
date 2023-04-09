import { FileWriter } from "../common/FileWriter";
import { GameData4_12, module4_12 } from "../module4_12";
var _ = require('lodash');


async function test4_12() {
    let ctr = new module4_12();
    let desk = new GameData4_12();
    desk.listInited = [1, 2, 3, 4]
    desk.list1 = []
    desk.list2 = [4]
    desk.centerList = [2, 1]
    desk.player = 2;


    let act = ctr.getAutoAction(desk)
    console.log(act)


}

// test4_12()

function createQues() {
    // 三个等级，等级1两个棋子
    let ctr = new module4_12();
    let map: any = { 1: [], 2: [], 3: [] }
    let mapCount: any = { 1: 4, 2: 12, 3: 20 }
    let listAll = []
    for (let i = 0; i < 40; i++) {
        listAll.push(i + 1)
    }
    for (let lev = 1; lev < 4; lev++) {
        for (let i = 0; i < 10; i++) {
            let lShuffle = _.shuffle(listAll.concat())
            let desk = new GameData4_12();
            desk.listInited = lShuffle.slice(0, mapCount[lev])
            map[lev].push(ctr.randomList(desk))
        }
    }
    writeQuesIn(map)
}


async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/4-12/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()