import { module3_4 } from ".";
import { FileWriter } from "../../common/FileWriter";
import RandomGenerater from "../../util/RandomGenerater";
let randomer = new RandomGenerater(1)
let ctr = new module3_4()
function test() {
    let desk = { onlyAllDiff: false, "player": 1, "desk": [[3, 3, 1, 1, 1, 3, 3, 2, 1, 2], [3, 2, 1, 1, 2, 3, 1, 3, 3], [1, 3, 1, 3, 1, 2, 2, 3], [2, 2, 2, 2, 3, 2, 1], [2, 2, 2, 1, 1, 3], [2, 2, 3, 1, 2], [2, 1, 2, 3], [3, 3, 1], [3, 2], [1]], "deskInited": [[3, 3, 1, 1, 1, 3, 3, 2, 1, 2], [3, 2, 1, 1, 2, 3, 1, 3, 3], [1, 3, 1, 3, 1, 2, 2, 3], [2, 2, 2, 2, 3, 2, 1], [2, 2, 2, 1, 1, 3], [2, 2, 3, 1, 2], [2, 1, 2, 3], [3, 3, 1], [3, 0], [0]], "typeSet": 1, "isTrainMode": false }
    let act = {
        color: 3,
        score: 0,
        x: 0,
        y: 9
    }
    let r = ctr.checkDesk(desk)
    console.log(r);

}

test()


function createQues() {
    let map: any = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
    }
    let configMap: any = {
        1: {
            blankCount: [2],
            size: 10,
        },
        2: {
            blankCount: [3],
            size: 10,
        },
        3: {
            blankCount: [4, 5, 6],
            size: 10,
        },
        4: {
            blankCount: [7, 8, 9, 10],
            size: 10,
        },
        5: {
            blankCount: [11, 12, 13, 14, 15],
            size: 10,
        },
        6: {
            blankCount: [16, 17, 18, 19, 20, 21],
            size: 10,
        }
    }
    let mapLev: any = {
        1: [1],
        2: [2],
        3: [3],
        4: [4],
        5: [5],
        6: [6],
    }
    for (let lev in mapLev) {
        let levList: number[] = mapLev[lev];
        levList.forEach(l => {
            for (let m = 0; m < 10; m++) {
                let conf = configMap[l];
                let blankCountIdx = randomer.RangeInteger(0, conf.blankCount.length)
                let countBlank = conf.blankCount[blankCountIdx];
                let desk = ctr.getRiddle(conf.size, countBlank);
                desk.isTrainMode = true;
                map[lev].push(desk);
            }
        })
    }
    writeQuesIn(map, 999)
}
async function writeQuesIn(mapAll: any, maxEachLev = 10) {
    for (let level = 1; level <= 6; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/3-4/level${level}.json`, JSON.stringify(listQues))
    }
}
// createQues()
