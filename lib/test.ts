import example2_2 from './module2_2/index';
import example4_1 from './module4_1/index';
let player = "P1"

let i = 0
// 4_2 
let test4_1 = new example4_1();
for (i = 0; i < 11; i++) {
    let result = test4_1.getRiddleByLev(0, null);
    let flagResult = 0
    let count = 1
    console.info("开始棋盘：" + JSON.stringify(result))
    while (flagResult == 0) {
        let action = test4_1.getActionAuto(result)
        let tmp = test4_1.doAction(result, action)
        result = tmp[1]
        flagResult = tmp[0]
        console.info("%s %s |P1:%s P2:%s 剩余%s 操作 %s 结果 %s ", count++, player, result.p1, result.p2, result.residue, action, flagResult)
        if (flagResult == 1) {
            console.info("P1 WIN")
        }
        if (flagResult == 2) {
            console.info("P2 WIN")
        }
        if (player == "P1") {
            player = "P2"
        } else {
            player = "P1"
        }
    }
}
//// 2_2
// let test2_2 = new example2_2();
// for (i = 0; i < 10; i++) {
//     let result = test2_2.getRiddleByLev(0, null);
//     let flagResult = -1
//     let count = 0
//     console.info("开始棋盘：" + JSON.stringify(result))
//     while (flagResult != 1) {
//         let action = test2_2.getActionAuto(result)
//         let tmp = test2_2.doAction(result, action)
//         result = tmp[1]
//         flagResult = tmp[0]
//         console.info(count++ + " " + player + "操作:" + JSON.stringify(action) + " " + JSON.stringify(result.positions) + "结果：" + flagResult)
//         if (player == "P1") {
//             player = "P2"
//         } else {
//             player = "P1"
//         }
//         if (flagResult == 1) {
//             console.info(player + " WIN")
//         }
//     }
// }