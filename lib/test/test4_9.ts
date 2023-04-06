import { FileWriter } from "../common/FileWriter";
import { GameData4_9, module4_9 } from "../module4_9";
import RandomGenerater from "../util/RandomGenerater";
let randomer = new RandomGenerater(49);
var _ = require('lodash');

function test4_9() {
    let ctr = new module4_9();
    let desk = { "typeSet": 1, "desk": [[-1,0,1,1,0],[0,0,1,2,0],[1,0,2,0,0],[0,2,0,2,-1]],"deskNum":[[-1,5,4,3,2],[1,0,1,2,3],[4,5,6,7,8],[9,10,11,12,-1]], "player": 2 }

    // // let pathAll = ctr.getAllPath(desk, 3, 0, true)
    // let paths = ctr.getActionAuto(desk)
    // console.log(paths, 'ppp')

    // for (let i = 0; i < 10; i++) {
    //     let res = ctr.randomNumByTarget(1)
    //     console.log(res)
    // }

    let flagValid = ctr.checkRiddle(desk);
    console.log(flagValid)

}
// test4_9()



function createQues() {
    let ctr = new module4_9();
    let listQues: any[] = [];
    // 生成一批题目
    // 在已下2，4，6，8个棋子中随机出已下数量，然后随机已下位置。随机100次，去重存入
    let countList = [2, 4, 6, 8]
    let randomCountMax = 100;
    for (let i = 0; i < randomCountMax; i++) {
        let desk = new GameData4_9();
        let countIdx = randomer.RangeInteger(0, 4)
        let count = countList[countIdx];
        for (let m = 0; m < count; m++) {
            // 从未下棋的位置中随机一个下棋
            let color = m % 2 + 1;
            let listIdxNotFill: number[][] = []
            desk.desk.forEach((row, y) => {
                row.forEach((v, x) => {
                    if (v == 0) {
                        listIdxNotFill.push([x, y])
                    }
                })
            })
            let idx2 = randomer.RangeInteger(0, listIdxNotFill.length)
            let p = listIdxNotFill[idx2];
            desk.desk[p[1]][p[0]] = color
        }
        let flagValid = ctr.checkRiddle(desk)
        if (flagValid == 0) {
            if (!listQues.find(e => JSON.stringify(e) == JSON.stringify(desk))) {
                listQues.push(desk);
            }
        }
    }

    // 机器人互下区分难度
    let mapAll: any = {
        1: [],
        2: [],
        3: []
    }

    listQues.forEach(e => {
        let r = getWinStep(e)
        let lev = 0;
        if (r <= 2) {
            lev = 1;
        } else if (r <= 4) {
            lev = 2;
        } else {
            lev = 3;
        }
        mapAll[lev].push(e)
    })


    // 按照难度裁剪每级10个题目，写入train文件夹
    writeQuesIn(mapAll);

}
function getWinStep(desk: GameData4_9) {
    // 测试机器人互打
    let flagRes = -1;
    let r = 0;
    let ctr = new module4_9();
    while (flagRes == -1) {
        r++;
        let auto = ctr.getActionAuto(_.cloneDeep(desk));
        let { flag, desk: deskNew } = ctr.doAction(_.cloneDeep(desk), auto.best);
        desk = deskNew;
        desk.player = 3 - desk.player;
        flagRes = ctr.checkDesk(desk);
    }
    return r;
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/4_9/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()