import { GameAction7_8, GameData7_8, module7_8 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module7_8()
function test() {
    let desk = ctr.getRiddle();
    desk.desk = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
    desk.list1 = [12, 4]
    desk.list2 = [13, 8];
    desk.numCurrent = 20;
    desk.player = 1
    let act = ctr.getActionAuto(desk);
    console.log(act);
}

// test()


const quesMap = [
    {
        ques: '（11，44，17）、（21，31，43，17）、（12，31，43，17）、（11，22，43，17）、（13，21，43，17）、（33，42，17）、（11，21，32，42，17）、（13，32，42，17）、（23，31，42，17）、（12，22，31，42，17）、（14，21，31，42，17）、（11，24，42，17）、（13，23，42，17）',
        lev: 1,
        sub: 1
    }, {
        ques: '（44，16）、（11，31，43，16）、（22，43，16）、（12，21，43，16）、（14，43，16）、（21，32，42，16）、（12，32，42，16）、（11，22，31，42，16）、（13，21，31，42，16）、（24，42，16）、（12，23，42，16）、（14，22，42，16）、（34，41，16）、（11，21，33，41，16）、（13，33，41，16）、（23，32，41，16）、（12，22，32，41，16）、（14，21，32，41，16）、（11，24，31，41，16）、（13，23，31，41，16）、（14，24，41，16）、（22，34，16）、（14，34，16）、（12，21，34，16）、（11，23，33，16）、（13，22，33，16）、（12，24，32，16）、（14，23，32，16）',
        lev: 1,
        sub: 2
    }, {
        ques: '（11，21，43，15）、（13，43，15）、（11，32，42，15）、（22，31，42，15）、（12，21，31，42，15）、（14，31，42，15）、（11，23，42，15）、（13，22，42，15）、（13，24，41，15）',
        lev: 1,
        sub: 3
    }, {
        ques: '（21，43，14）、（12，43，14）、（32，42，14）、（11，21，31，42，14）、（13，31，42，14）、（23，42，14）、（12，22，42，14）、（14，21，42，14）、（11，33，41，14）、（22，32，41，14）、（12，21，32，41，14）、（14，32，41，14）、（11，23，31，41，14）、（13，22，31，41，14）、（12，24，41，14）',
        lev: 2,
        sub: 1
    }, {
        ques: '（11，43，13）、（21，31，42，13）、（12，31，42，13）、（11，22，42，13）、（13，21，42，13）、（33，41，13）、（11，21，32，41，13）、（13，32，41，13）、（23，31，41，13）、（12，22，31，41，13）、（14，21，31，41，13）、（11，24，41，13）、（13，23，41，13）、（11，34，13）、（22，33，13）、（12，21，33，13）、（14，33，13）、（11，23，32，13）、（13，22，32，13）、（12，24，31，13）、（14，23，31，13）',
        lev: 2,
        sub: 2
    }, {
        ques: '（43，12）、（11，31，42，12）、（22，42，12）、（12，21，42，12）、（14，42，12）、（21，32，41，12）、（12，32，41，12）、（11，22，31，41，12）、（13，21，31，41，12）、（24，41，12）、（12，23，41，12）、（14，22，41，12）、（34，12）、（11，21，33，12）、（13，33，12）、（23，32，12）、（12，22，32，12）、（14，21，32，12）、（11，24，31，12）、（13，23，31，12）、（14，24，12）',
        lev: 2,
        sub: 3
    }, {
        ques: '（31，42，11）、（11，21，42，11）、（13，42，11）、（11，32，41，11）、（22，31，41，11）、（12，21，31，41，11）、（14，31，41，11）、（11，23，41，11）、（13，22，41，11）、（21，33，11）、（12，33，11）、（11，22，32，11）、（13，21，32，11）、（24，31，11）、（12，23，31，11）、（14，22，31，11）、（14，24，11）',
        lev: 3,
        sub: 1
    }, {
        ques: '（21，42，10）、（12，42，10）、（32，41，10）、（11，21，31，41，10）、（13，31，41，10）、（23，41，10）、（12，22，41，10）、（14，21，41，10）、（11，33，10）、（22，32，10）、（12，21，32，10）、（14，32，10）、（11，23，31，10）、（13，22，31，10）、（12，24，10）、（14，23，10）',
        lev: 3,
        sub: 2
    }, {
        ques: '（11，42，9）、（21，31，41，9）、（12，31，41，9）、（11，22，41，9）、（13，21，41，9）、（33，9）、（11，21，32，9）、（13，32，9）、（23，31，9）、（12，22，31，9）、（14，21，31，9）、（11，24，9）、（13，23，9）',
        lev: 3,
        sub: 3
    }, {
        ques: '（42，8）、（11，31，41，8）、（22，41，8）、（12，21，41，8）、（14，41，8）、（21，32，8）、（12，32，8）、（11，22，31，8）、（13，21，31，8）、（24，8）、（12，23，8）、（14，22，8）',
        lev: 3,
        sub: 4
    }, {
        ques: '（31，41，7）、（11，21，41，7）、（13，41，7）、（11，32，7）、（22，31，7）、（12，21，31，7）、（14，31，7）、（11，23，7）、（13，22，7）',
        lev: 3,
        sub: 5
    }, {
        ques: '（21，41，6）、（12，41，6）、（32，6）、（11，21，31，6）、（13，31，6）、（23，6）、（12，22，6）、（14，21，6）',
        lev: 3,
        sub: 6
    }
]

function formatQues(str: string) {
    let list = str.split('）、（')
    let l1: number[][] = []
    list.forEach(s2 => {
        let s3 = s2.replace(/（|）/g, '')
        l1.push(s3.split('，').map(e => +e))
    })

    let quesList: GameData7_8[] = []

    l1.forEach((l1Sub) => {
        let desk = ctr.getRiddle()
        let countGot = 0
        l1Sub.forEach((num, idx) => {
            if (idx != l1Sub.length - 1) {
                // 不是最后一个数字，解析，前一个代表数字，后一个是数量
                let [n, count] = ('' + num).split('').map(e => +e)
                for (let c = 0; c < count; c++) {
                    countGot++;
                    let act = new GameAction7_8();
                    let listUsed = ([] as number[]).concat(desk.list1, desk.list2);
                    act.idx = desk.desk.findIndex((e, idx) => listUsed.indexOf(idx) == -1 && e == n);
                    desk.player = countGot % 2 == 1 ? 1 : 2
                    let [f1, deskNew] = ctr.doAction(desk, act)
                    desk = deskNew;
                }
            } else {
                // 最后一个数字是当前分
                desk.numCurrent = num
            }
        })
        quesList.push(desk);
    })
    return quesList
}
formatQues(quesMap[0].ques)




function createQues() {
    // 三个等级，等级1两个棋子
    let map: any = {
        1: [],
        2: [],
        3: []
    }
    quesMap.forEach(conf => {
        let listQues = formatQues(conf.ques) as any;
        let lev = conf.lev;
        map[lev] = map[lev].concat(listQues)
    })
    writeQuesIn(map, 999)
}
async function writeQuesIn(mapAll: any, maxEachLev = 9999) {
    for (let level = 1; level <= 3; level++) {
        let listQues = mapAll[level].slice(0, maxEachLev)
        console.log(`写入等级${level},数量：${listQues.length}`)
        await FileWriter.setFile(`./train/7-8/level${level}.json`, JSON.stringify(listQues))
    }

}
createQues()
