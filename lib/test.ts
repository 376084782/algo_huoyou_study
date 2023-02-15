
import { json } from 'stream/consumers';
import { FileWriter } from './common/FileWriter';
import example2_1, { GameAction2_1, GameData2_1 } from './module2_1/index';
import { example2_2, GameData2_2 } from './module2_2/index';
import example2_5, { Position2_5, GameData2_5, GameAction2_5, GameConfig2_5 } from './module2_5/index';
import example4_1, { GameConfig4_1, GameData4_1 } from './module4_1/index';
import example4_2, { GameAction4_2, GameData4_2 } from './module4_2/index';
import example4_3, { GameAction4_3, GameConfig4_3, GameData4_3 } from './module4_3/index';
import example4_5, { GameAction4_5, GameData4_5 } from './module4_5/index';
import example6_1 from './module6_1/index';
import { example6_2, GameAction6_2, GameData6_2 } from './module6_2/index';
import example4_8, { GameAction4_8, GameData4_8 } from './module4_8/index';
import example6_3 from './module6_3/index';
import example6_8 from './module6_8/index';
import example8_1, { GameConfig8_1 } from './module8_1/index';
import example8_2, { GameData8_2, GameAction8_2 } from './module8_2/index';
import example8_3 from './module8_3/index';
import example10_1, { GameData10_1, GameAction10_1 } from './module10_1/index';
import example10_2 from './module10_2/index';
import example10_3, { GameData10_3, GameAction10_3 } from './module10_3/index';
import example10_8 from './module10_8/index';
import RandomGenerater from './util/RandomGenerater';

let player = "P1"
let i = 0
// // FileWriter.setFile('./file/a.ts', 'let a=3;')
// // 10_8
// let test10_8 = new example10_8();
// let a = test10_8.getActionAuto({
//     "n": 24,
//     "p1": 0,
//     "p2": 0,
//     "residue": 24,
//     "rounds": 0,
//     "player": 1
// })
// console.info(JSON.stringify(a))
// 10_3
let test10_3 = new example10_3();
let e = {
    "typeSet": 1,
    "desk": [
        [0, 1, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0],
        [0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0],
        [1, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 0, 2, 2, 2, 2, 2, 0, 1, 1, 1],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 2, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 0],
        [0, 1, 1, 1, 0, 1, 2, 2, 0, 2, 0, 0],
        [1, 1, 1, 1, 1, 0, 2, 0, 2, 2, 2, 0],
        [1, 1, 1, 1, 0, 0, 2, 2, 2, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
    ],
    "chess1": [11, 9, 10, 3, 7, 1, 2, 4, 6],
    "chess2": [0, 1, 2, 3, 4, 5, 6, 10],
    "player": 1
}
// let cd = test10_3.checkDesk(e)
// console.info(JSON.stringify(cd))
console.info(Date.parse(new Date().toString()))
let a = test10_3.getActionAuto(e)
// let a = test10_3.doAction1(e, 5, [[1, 1], [0, 1], [1, 1]], [6, 10])
console.info(JSON.stringify(a))
console.info(Date.parse(new Date().toString()))
// let a = test10_3.doAction(
//     {
//         "desk": [
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         ],
//         "chess1": [],
//         "chess2": [],
//         "player": 1
//     },
// {
//     "square": 0,
//     "action": [0, 0],
//     "actionType": 2
// }
// )
// console.info(JSON.stringify(a))


// // 10_2
// let test10_2 = new example10_2();
// // let action = test10_2.getAllDesk()
// let r = test10_2.getActionAuto({
//     "p1": 0,
//     "p2": 0,
//     "desk": [
//         [1, 1, 1],
//         [1, 1, 1],
//         [0, 0, 0],
//     ],
//     "player": 1
// })
// console.info(JSON.stringify(r))
// let r1 = test10_2.doAction({
//     "p1": 0,
//     "p2": 0,
//     "desk": [
//         [0, 0, 0, 0],
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//     ],
//     "player": 1
// }, r.best)
// console.info(JSON.stringify(r1))
// let r2 = test10_2.checkAction({
//     "p1": 0,
//     "p2": 0,
//     "desk": [
//         [0, 0, 0, 0],
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//     ],
//     "player": 1
// }, { "move": [[2, 0], [2, 2], [2, 1]] })
// console.info(JSON.stringify(r2))

// let a2 = test10_2.doAction({
//     "p1": 0,
//     "p2": 0,
//     "desk": [
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//     ],
//     "player": 1
// }, {
//     "move": [[0, 0], [0, 1]]
// })
// let a1 = test10_2.doAction({
//     "p1": 0,
//     "p2": 0,
//     "desk": [
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//     ],
//     "player": 1
// }, {
//     "move": [[0, 0], [1, 0]]
// })
// let a3 = test10_2.doAction({
//     "p1": 0,
//     "p2": 0,
//     "desk": [
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//         [1, 1, 1, 1],
//     ],
//     "player": 1
// }, {
//     "move": [[0, 0], [1, 0], [1, 1]]
// })
// console.info(JSON.stringify(a1))
// console.info(JSON.stringify(a2))
// console.info(JSON.stringify(a3))
// 8_3
// let test8_3 = new example8_3();
// let action11 = test8_3.checkRiddle({ "typeSet": 2, "desk": [5, 3, 3, 3], "player": 1 })
// console.log(action11, 'actionactionactionaction')
// let s1 = test8_3.doAction({ "desk": [2, 0, 10], "player": 2 }, action.best)
// let s2 = test8_3.doAction({ "desk": [2, 0, 10], "player": 2 }, action.nobest)
// console.info(JSON.stringify(action))
// console.info(JSON.stringify(s1))
// console.info(JSON.stringify(s2))

// 10_1
// let test10_1 = new example10_1();
// let res10_1 = test10_1.getActionAuto(
//     {
//         "desk": [
//             [1, 1, 1, 1, 1, 1],
//             [1, 1, 0, 1, 1, 1],
//             [1, 1, 1, 1, 1, 1],
//             [1, 1, 1, 1, 1, 1],
//             [1, 1, 1, 1, 1, 1],
//             [1, 1, 1, 1, 1, 1]
//         ],
//         "player": 1
//     }
// )
// console.info(JSON.stringify(res10_1))
// for (let index = 0; index < 20; index++) {
//     let action = test10_1.getActionAuto({
//         "desk": [
//             [0, 0, 0, 0, 0, 0],
//             [2, 0, 0, 0, 0, 0],
//             [0, 0, 1, 0, 0, 0],
//             [0, 0, 0, 2, 0, 0],
//             [0, 0, 1, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0]],
//         "player": 1
//     });
//     console.info(JSON.stringify(action))
// }
// console.info(JSON.stringify(action))
// for (i = 0; i < 1; i++) {
//     let result = {
//         "desk": [
//             [0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0],
//             [0, 0, 0, 0, 0, 0]],
//         "player": 1
//     }
//     let flagResult = 0
//     let count = 1
//     console.info("开始棋盘：" + JSON.stringify(result))
//     while (flagResult == 0) {
//         let action = test10_1.getActionAuto(result)
//         let tmp = test10_1.doAction(result, action.best)
//         result = tmp[1]
//         flagResult = tmp[0]
//         console.info("%s %s | \n操作：%s \n%s\n%s\n%s\n%s\n%s\n%s\n  结果 %s ", count++, player, JSON.stringify(action), JSON.stringify(result.desk[0]), JSON.stringify(result.desk[1]), JSON.stringify(result.desk[2]), JSON.stringify(result.desk[3]), JSON.stringify(result.desk[4]), JSON.stringify(result.desk[5]), flagResult)
//         if (flagResult == 1) {
//             console.info("P1 WIN")
//         }
//         if (flagResult == 2) {
//             console.info("P2 WIN")
//         }
//         if (player == "P1") {
//             player = "P2"
//         } else {
//             player = "P1"
//         }
//     }
// }
// 8_3
// let test8_3 = new example8_3();
// let s1 = test8_3.getActionAuto({ "desk": [2, 0, 10], "player": 2 });
// console.info(JSON.stringify(s1))
// 8_2
// let test8_2 = new example8_2();
// let result = { "typeSet": 1, "desk": [[9, 9, 2, 6, 9, 9], [9, 0, 0, 0, 4, 9], [1, 0, 3, 0, 0, 0], [9, 5, 0, 0, 0, 9], [9, 9, 0, 0, 9, 9]], "p1chesslog": [2, 3], "p2chesslog": [2, 1], "player": 1 }
// let action = test8_2.getActionAuto(result)
// let r1 = test8_2.doAction(result, action.best)
// let r1 = test8_2.doAction(result, { "move": [2, 4], "action": [3, 4], "score": 1600354 })
// let rd = test8_2.checkDesk(result)
// console.info(JSON.stringify(rd))
// console.info(JSON.stringify(r1))
// console.info(JSON.stringify(rd))
// for (i = 0; i < 1; i++) {
//     let result = new GameData8_2(1);
//     let flagResult = 0
//     let count = 1
//     console.info("开始棋盘：" + JSON.stringify(result))
//     while (flagResult == 0) {
//         let action = test8_2.getActionAuto(result)
//         let tmp = test8_2.doAction(result, action.best)
//         result = tmp[1]
//         flagResult = tmp[0]
//         console.info("%s %s | \n操作：%s \n%s\n%s\n%s\n%s\n%s\n  结果 %s ", count++, player, JSON.stringify(action), JSON.stringify(result.desk[0]), JSON.stringify(result.desk[1]), JSON.stringify(result.desk[2]), JSON.stringify(result.desk[3]), JSON.stringify(result.desk[4]), flagResult)
//         console.info(JSON.stringify(result))
//         if (flagResult == 1) {
//             console.info("P1 WIN")
//         }
//         if (flagResult == 2) {
//             console.info("P2 WIN")
//         }
//         if (player == "P1") {
//             player = "P2"
//         } else {
//             player = "P1"
//         }
//     }
// }
// 8_1
// [1,  2,  3,  4,  5,  6],
// [7,  8,  9,  10, 12, 14],
// [15, 16, 18, 20, 21, 24],
// [25, 27, 28, 30, 32, 35],
// [36, 40, 42, 45, 48, 49],
// [54, 56, 63, 64, 72, 81]]
// let test8_1 = new example8_1();
// let test = test8_1.checkRiddle({
//     desk: [[0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 1, 0, 0],
//     [0, 2, 2, 1, 0, 0],
//     [0, 2, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0]],
//     chess1: 1,
//     chess2: 2,
//     player: 1
// })
// console.info(JSON.stringify(test))
// for (i = 0; i < 11; i++) {
//     let result = test8_1.getRiddle(new GameConfig8_1(1,2));
//     let flagResult = 0
//     let count = 1
//     console.info("开始棋盘：" + JSON.stringify(result))
//     while (flagResult == 0) {
//         let action = test8_1.getActionAuto(result)
//         let tmp = test8_1.doAction(result, action)
//         result = tmp[1]
//         flagResult = tmp[0]
//         console.info("%s %s | \n操作：%s \n棋1 %s 棋2 %s \n%s\n%s\n%s\n%s\n%s\n%s\n  结果 %s ", count++, player,JSON.stringify(action),result.chess1,result.chess2,  JSON.stringify(result.desk[0]),JSON.stringify(  result.desk[1]),JSON.stringify(  result.desk[2]),JSON.stringify(  result.desk[3]),JSON.stringify(  result.desk[4]),JSON.stringify(  result.desk[5]), flagResult)
//         if (flagResult == 1) {
//             console.info("P1 WIN")
//         }
//         if (flagResult == 2) {
//             console.info("P2 WIN")
//         }
//         if (player == "P1") {
//             player = "P2"
//         } else {
//             player = "P1"
//         }
//     }
// 6_8
// let test6_8 = new example6_8();
// let s5 = test6_8.getAllDesk(5)
// let s4 = test6_8.getAllDesk(4)
// let s3 = test6_8.getAllDesk(3)
// let s2 = test6_8.getAllDesk(2)
// let s1 = test6_8.getAllDesk(1)
// let action = test6_8.getAllAction([])
// console.info(JSON.stringify(action))

// 6_3
// let test6_3 = new example6_3();
// let action2 = test6_3.getActionAuto(
//     { "typeSet": 1, "desk": [11, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "player": 1 }
// )
// console.info(JSON.stringify(action2))

// let action1 = test6_3.doAction(
//     {
//         "desk": [0, 4, 0, 3, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         "player": 1
//     }, { "action": [[1, 4], [3, 3]], "actionAfter": [[0, 7]] })
// console.info(JSON.stringify(action1))
// for (i = 0; i < 1; i++) {
//     let result = {
//         "desk": [3, 4, 4, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         "player": 1
//     }
//     let flagResult = 0
//     let count = 1
//     console.info("开始棋盘：" + JSON.stringify(result))
//     while (flagResult == 0) {
//         let action = test6_3.getActionAuto(JSON.parse(JSON.stringify(result)))
//         let tmp = test6_3.doAction(result, action.best)
//         result = tmp[1]
//         flagResult = tmp[0]
//         console.info("%s %s | 操作：%s \n%s  结果 %s ", count++, player, JSON.stringify(action.best), JSON.stringify(result.desk), flagResult)
//         if (flagResult == 1) {
//             console.info("P1 WIN")
//         }
//         if (flagResult == 2) {
//             console.info("P2 WIN")
//         }
//         if (player == "P1") {
//             player = "P2"
//         } else {
//             player = "P1"
//         }
//     }
// }

// 6_2
// let test6_2 = new example6_2();
// for (i = 0; i < 3; i++) {
//     let result = test6_2.getRiddle(new GameConfig8_1(1, 2));
//     let flagResult = 0
//     let count = 1
//     console.info("%s\n%s\n%s\n%s\n%s", JSON.stringify(result.desk[0]), JSON.stringify(result.desk[1]), JSON.stringify(result.desk[2]), JSON.stringify(result.desk[3]), JSON.stringify(result.desk[4]))
//     console.info("开始棋盘：" + JSON.stringify(result))
//     while (flagResult == 0) {
//         let action = test6_2.getActionAuto(result)
//         let tmp = test6_2.doAction(result, action.best)
//         result = tmp[1]
//         flagResult = tmp[0]
//         console.info("%s %s | 操作：%s \n%s\n%s\n%s\n%s\n%s\n  结果 %s ", count++, player, JSON.stringify(action.best), JSON.stringify(result.desk[0]), JSON.stringify(result.desk[1]), JSON.stringify(result.desk[2]), JSON.stringify(result.desk[3]), JSON.stringify(result.desk[4]), flagResult)
//         console.info("%s", JSON.stringify(result))
//         if (flagResult == 1) {
//             console.info("P1 WIN")
//         }
//         if (flagResult == 2) {
//             console.info("P2 WIN")
//         }
//         if (player == "P1") {
//             player = "P2"
//         } else {
//             player = "P1"
//         }
//     }
// }
// 6.1
// let test6_1 = new example6_1();
// // const rg = new RandomGenerater(0)
// const lenght = 10

// let result = test6_1.getRiddle(lenght);
// result.p1 = [
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
//     [1, 1, 1, 1, 1, 1, 0, 0, 1, 1,],
// ]
// let action = test6_1.getActionAuto(result, 4, 4)
// let action1 = test6_1.checkDesk(result)
// console.info(JSON.stringify(action))

// const rg = new RandomGenerater(0)
// const lenght = 12

// let result = test6_1.getRiddle(lenght);
// result.p1 = [
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
// ]
// let action = test6_1.getActionAuto(result, 4, 4)
// let tmp = test6_1.doAction(result, action.best)
// console.info(1)
// for (i = 0; i < 1; i++) {
//     let result = test6_1.getRiddle(lenght);
//     let flagResult = 0
//     let count = 1
//     console.info("开始棋盘：" + JSON.stringify(result))

//     while (flagResult == 0) {
//         const n1 = rg.RangeInteger(1, 6);
//         const n2 = rg.RangeInteger(1, 6);
//         let action = test6_1.getActionAuto(result, n1, n2)
//         let tmp = test6_1.doAction(result, action.best)
//         result = tmp[1]
//         flagResult = tmp[0]
//         console.info("%s %s |\n操作 %s 结果 %s ", count++, player, JSON.stringify(action.best), flagResult)
//         console.info("棋盘 %s %s", n1, n2)
//         let desk1: string = ''
//         let desk2: string = ''
//         for (let i = 0; i < lenght; i++) {
//             const row1 = result.p1[i];
//             const row2 = result.p2[i];
//             desk1 += JSON.stringify(row1) + ",\n"
//             desk2 += JSON.stringify(row2) + ",\n"
//         }
//         console.info(desk1 + "\n" + desk2)
//         player = player == "P1" ? "P2" : "P1"
//         if (flagResult == -1) {
//             console.info("操作异常")
//             break
//         }
//         if (flagResult != 0) {
//             console.info(player + " WIN")
//         }
//     }
// }
// 4_8
// let test4_8 = new example4_8();

// for (i = 0; i < 1; i++) {
//     let result = new GameData4_8();
//     let flagResult = 0
//     let count = 1
//     console.info("开始棋盘：" + JSON.stringify(result))
//     while (flagResult == 0) {
//         let action = test4_8.getActionAuto(result)
//         let tmp = test4_8.doAction(result, action.best)
//         result = tmp[1]
//         flagResult = tmp[0]
//         console.info("%s %s | \n操作：%s \n P1 %s P2 %s \n 棋盘 %s 结果 %s ", count++, player, JSON.stringify(action), result.p1, result.p2, JSON.stringify(result.desk), flagResult)
//         if (flagResult == 1) {
//             console.info("P1 WIN")
//         }
//         if (flagResult == 2) {
//             console.info("P2 WIN")
//         }
//         if (flagResult == 3) {
//             console.info("WINWIN")
//         }
//         if (player == "P1") {
//             player = "P2"
//         } else {
//             player = "P1"
//         }
//     }
// }
// 4_5
// let test4_5 = new example4_5();
// let result = { "typeSet": 1, "n": -9, "max": 13, "player": 2 }
// let action = test4_5.getActionAuto(result)
// console.info(JSON.stringify(action))
// let result1 = test4_5.doAction(result, action.best)
// let action = test4_5.checkSkipAction(result, { "k1": 4, "k2": 2, "o": 1 })
// let action = test4_5.getActionAuto(result)
// console.info(JSON.stringify(result1))

// for (i = 0; i < 1; i++) {
//     let result = new GameData4_5(1);
//     let flagResult = 0
//     let count = 1
//     console.info("开始棋盘：" + JSON.stringify(result))
//     while (flagResult == 0) {
//         let action = test4_5.getActionAuto(result)
//         let tmp = test4_5.doAction(result, action.best)
//         result = tmp[1]
//         flagResult = tmp[0]
//         console.info("%s %s | 操作：%s %s\n  结果 %s ", count++, player, result.n, JSON.stringify(action.best), flagResult)
//         if (flagResult == 1) {
//             console.info("P1 WIN")
//         }
//         if (flagResult == 2) {
//             console.info("P2 WIN")
//         }
//         if (player == "P1") {
//             player = "P2"
//         } else {
//             player = "P1"
//         }
//     }
// }
// 4_3
// let test4_3 = new example4_3()
// let res4_3 = test4_3.getActionAuto(
//   {
//     "typeSet": 1,
//     "desk": [[0, 0, 0, 0, 0, 0], [0, 1, 2, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]],
//     "chess1": 7, "chess2": 7, "player": 1
//   })
// console.log(res4_3)


// 4_2
// let test4_2 = new example4_2();
// let action = test4_2.getActionAuto({
//     "desk": [
//         [2, 0, 0],
//         [1, 1, 0],
//         [0, 0, 0],],
//     "p1": 1,
//     "p2": 2,
//     "player": 2
// })
// console.info(JSON.stringify(action))

// for (i = 0; i < 10; i++) {
//     let result = test4_2.getRiddle(0);
//     let flagResult = 0
//     let count = 1
//     console.info("开始棋盘：" + JSON.stringify(result))
//     while (flagResult == 0) {
//         let action = test4_2.getActionAuto(result)
//         let tmp = test4_2.doAction(result, action.best)
//         result = tmp[1]
//         flagResult = tmp[0]
//         console.info("%s %s |P1:%s P2:%s \n操作 %s 结果 %s ", count++, player, result.p1, result.p2, JSON.stringify(action.best), flagResult)
//         // console.info("棋盘\n%s\n%s\n%s ", JSON.stringify(result.desk[0]), JSON.stringify(result.desk[1]), JSON.stringify(result.desk[2]))
//         console.info("%s ", JSON.stringify(result))
//         if (flagResult == -1) {
//             console.info("操作异常")
//             break
//         }
//         if (flagResult != 0) {
//             console.info(player + " WIN")
//         }
//         player = player == "P1" ? "P2" : "P1"
//     }
// }
// // 4_1
// let test4_1 = new example4_1();
// let action = test4_1.getActionAuto({ "k": 3, "n": 7, "p": 3, "p1": 9, "p2": 5, "residue": 1, "rounds": 0, "player": 2 })
// console.info(JSON.stringify(action))

// for (i = 0; i < 11; i++) {
//   let result = test4_1.getRiddleByLev(0, null);
//   let flagResult = 0
//   let count = 1
//   console.info("开始棋盘：" + JSON.stringify(result))
//   while (flagResult == 0) {
//     let action = test4_1.getActionAuto(result)
//     let tmp = test4_1.doAction(result, action.best)
//     result = tmp[1]
//     flagResult = tmp[0]
//     console.info("%s %s |P1:%s P2:%s 剩余%s 操作 %s 结果 %s ", count++, player, result.p1, result.p2, result.residue, action, flagResult)
//     if (flagResult == 1) {
//       console.info("P1 WIN")
//     }
//     if (flagResult == 2) {
//       console.info("P2 WIN")
//     }
//     if (player == "P1") {
//       player = "P2"
//     } else {
//       player = "P1"
//     }
//   }
// }
//// 2_2
// let test2_2 = new example2_2();
// for (let i = 0; i < 10; i++) {
//     let action = test2_2.getActionAuto({ "player": 1, "positions": [1, 0, 0, 1, 0, 1, 0, 1, 0, 0], "sum": 2, "warehouse": 0 })
//     console.info(JSON.stringify(action))
// }
// for (i = 0; i < 10; i++) {
//     let result = test2_2.getRiddleByLev(0, null);
//     let flagResult = -1
//     let count = 0
//     console.info("开始棋盘：" + JSON.stringify(result))
//     while (flagResult != 1) {
//         let action = test2_2.getActionAuto(result)
//         let tmp = test2_2.doAction(result, action.best)
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
// 2_1
// let test2_1 = new example2_1();
// let desk = new GameData2_1()
// desk.p1 = 0
// desk.p2 = 0
// desk.player = 2
// desk.positions = [[2, 1], [2, 1], [2, 1], [1, 2], [2], [1, 1, 2], [], [], [], [], [], []]
// let tmp = test2_1.checkRiddle({"p1":2,"p2":2,"player":1,"positions":[[1,1,1,1],[2],[2],[2],[2],[],[],[],[],[],[],[]],"typeSet":2})
// console.info(tmp,'tmptmptmp')

// for (i = 0; i < 1; i++) {
//     let result = test2_1.getRiddle(undefined);
//     let flagResult = 0
//     let count = 0
//     console.info("开始棋盘：" + JSON.stringify(result))
//     while (flagResult == 0) {
//         let action = test2_1.getActionAuto(result)
//         let tmp = test2_1.doAction(result, action.best)
//         result = tmp[1]
//         flagResult = tmp[0]
//         console.info(count++ + " " + player + "操作:" + JSON.stringify(action))
//         console.info("P1:" + result.p1 + " P2:" + result.p2 + " " + JSON.stringify(result.positions) + " 结果：" + flagResult)
//         if (flagResult != 0) {
//             console.info(player + " WIN")
//         }
//         player = player == "P1" ? "P2" : "P1"
//     }
// }

// let test2_5 = new example2_5();
// let config2_5 = new GameConfig2_5();
// config2_5.borderSize = 2;
// let data = test2_5.getRiddle(config2_5);
// console.info(JSON.stringify(data))

// let action = new GameAction2_5(new Position2_5(0,1), 1);
// console.info(JSON.stringify(test2_5.getBodyPosition(action)), JSON.stringify(test2_5.getTailPosition(action)))

// console.info(test2_5.doAction(data, action), JSON.stringify(data))

// let action2 = new GameAction2_5(new Position2_5(1,1), 1);
// console.info(test2_5.doAction(data, action2), JSON.stringify(data))
// action = new GameAction2_5(new Position2_5(2,1), 1);
// console.info(JSON.stringify(test2_5.getBodyPosition(action)), JSON.stringify(test2_5.getTailPosition(action)))
// console.info(test2_5.doAction(data, action), JSON.stringify(data))
// action = new GameAction2_5(new Position2_5(1,4), 4);
// console.info(JSON.stringify(test2_5.getBodyPosition(action)), JSON.stringify(test2_5.getTailPosition(action)))
// console.info(test2_5.doAction(data, action), JSON.stringify(data))
// action = new GameAction2_5(new Position2_5(2,4), 4);
// console.info(JSON.stringify(test2_5.getBodyPosition(action)), JSON.stringify(test2_5.getTailPosition(action)))
// console.info(test2_5.doAction(data, action), JSON.stringify(data))


// // let data2 = test2_5.doAction(data, action)
// // console.info(JSON.stringify(data2))
// config2_5.borderSize = 3;
// data = test2_5.getRiddle(config2_5);
// for (let i = 0; i < 100; i++) {
//     let action = test2_5.getActionAuto(data)
//     console.info(action)
//     let [flag, result] = test2_5.doAction(data, action.best)
//     console.info(i,flag, result, JSON.stringify(data))
//     if (flag != 0) {
//         break
//     }
// }