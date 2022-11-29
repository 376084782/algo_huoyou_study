import example2_2 from './module2_2/index';
let player = "P1"

let i = 0
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