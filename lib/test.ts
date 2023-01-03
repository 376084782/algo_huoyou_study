
import { FileWriter } from './common/FileWriter';
import example2_1, { GameAction2_1, GameData2_1 } from './module2_1/index';
import { example2_2, GameData2_2 } from './module2_2/index';
import example4_1, { GameConfig4_1, GameData4_1 } from './module4_1/index';
import example4_2, { GameAction4_2, GameData4_2 } from './module4_2/index';
import example6_1 from './module6_1/index';
import { example6_2 } from './module6_2/index';
import example6_3 from './module6_3/index';
import example8_1, { GameConfig8_1 } from './module8_1/index';
import example8_3 from './module8_3/index';
// import example10_2 from './module10_2/index';
import RandomGenerater from './util/RandomGenerater';

let player = "P1"
let i = 0

// FileWriter.setFile('./file/a.ts', 'let a=3;')
// 10_2
// let test10_2 = new example10_2();
// let s= test10_2.getAllDesk();
// 0_0_0_0_0_0_1_1_0_
// let s1= test10_2.getAllAction([[0,0,0],[0,0,0],[1,1,0]])
// console.info()
// 8_3
// let test8_3 = new example8_3();
// for (let i = 2; i <=30; i++) {
//     let s1 = test8_3.getAllDesk(i);
// }
// console.info()
// 8_1 
// let test8_1 = new example8_1();
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
// 6_3
// let test6_3 = new example6_3();
// for (let i = 12; i < 13; i++) {
//     let s1 = test6_3.getAllDesk(i);
// }
// console.info()

// 6_2
// let test6_2 = new example6_2();
// let res = test6_2.checkAction({
//   desk: [
//     [9, 9, 9, 0, 9, 9, 9],
//     [1, 9, 2, 9, 1, 9, 2],
//     [9, 0, 9, 9, 9, 0, 9],
//     [2, 9, 1, 9, 2, 9, 1],
//     [9, 9, 9, 0, 9, 9, 9],
//   ],
//   player: 1
// }, {
//   action: [2, 5],
//   move: [3, 6],
//   score: 0
// })
// let res2 = test6_2.checkAction({
//   desk: [
//     [9, 9, 9, 0, 9, 9, 9],
//     [1, 9, 2, 9, 1, 9, 2],
//     [9, 0, 9, 9, 9, 0, 9],
//     [2, 9, 1, 9, 2, 9, 1],
//     [9, 9, 9, 0, 9, 9, 9],
//   ],
//   player: 1
// }, {
//   action: [0, 3],
//   move: [3, 6],
//   score: 0
// })
// console.log(res, res2, 'resres')
// let test6_2 = new example6_2();
// let res = test6_2.checkAction({
//   desk: [
//     [9, 9, 9, 0, 9, 9, 9],
//     [1, 9, 2, 9, 1, 9, 2],
//     [9, 0, 9, 9, 9, 0, 9],
//     [2, 9, 1, 9, 2, 9, 1],
//     [9, 9, 9, 0, 9, 9, 9],
//   ],
//   player: 1
// }, {
//   action: [2, 5],
//   move: [3, 6],
//   score: 0
// })
// let res2 = test6_2.checkAction({
//   desk: [
//     [9, 9, 9, 0, 9, 9, 9],
//     [1, 9, 2, 9, 1, 9, 2],
//     [9, 0, 9, 9, 9, 0, 9],
//     [2, 9, 1, 9, 2, 9, 1],
//     [9, 9, 9, 0, 9, 9, 9],
//   ],
//   player: 1
// }, {
//   action: [0, 3],
//   move: [3, 6],
//   score: 0
// })
// console.log(res,res2,'resres')
// for (i = 0; i < 1; i++) {
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
// 4_2
// let test4_2 = new example4_2();
// let desk = new GameData4_2(1, [
//   [1, 0, 0],
//   [2, 1, 0],
//   [0, 2, 0]
// ])
// desk.p1 = 1;
// desk.p2 = 1;
// let flag = test4_2.checkRiddle(desk)
// console.log(flag, 'flagflagflag')
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
//         console.info("棋盘\n%s\n%s\n%s ", JSON.stringify(result.desk[0]), JSON.stringify(result.desk[1]), JSON.stringify(result.desk[2]))
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
// // 4_1
// 这个情况是他们的练习题，他们肯定也会测的，需要考虑进去。
// 当A玩家手里是偶数个，且公共区还剩4个时候的时候，B玩家是必输的，A玩家是必胜的。
// 机器人应该考虑这种情况，当下一手取完 可以给让自己手里偶数个，且留给对面4个，困难的机器人应该100 % 执行这个操作。目前我测困难人机没有这个操作。
// let test4_1 = new example4_1();
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
// for (let index = 0; index < 10; index++) {
//   let s = test2_2.getRiddle(4)
//   console.info(JSON.stringify(s))
// }
// let gd = new GameData2_2();
// gd.player = 1
// // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// gd.positions = [0, 0, 0, 0, 1, 0, 1, 0, 0, 0]
// gd.sum = 4
// gd.warehouse = 2
// let action = test2_2.getActionAuto(gd)
// console.info()
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
let test2_1 = new example2_1();

let gd = new GameData2_1();
gd.player = 1
//{"p1":0,"p2":0,"player":1,"positions":[[1,2],[1,2],[2],[],[],[1,2],[],[],[1,2],[1,2],[1],[]]}
gd.positions = [[1, 2], [1, 2], [2], [], [], [1, 2], [], [], [1, 2], [1, 2], [1], []]
// gd.positions = [[1, 2], [1, 2], [2], [], [], [1, 2], [], [], [1, 1], [2, 2], [1], []]
gd.p1 = 0;
gd.p2 = 0;
gd.player = 1;

let action = test2_1.getActionAuto(gd)

let act=undefined;
let res = test2_1.checkAction({ "p1": 6, "p2": 6, "player": 2, "positions": [[], [], [], [], [], [], [], [], [], [], [], []] }, act)
console.log('res', res)
console.info()
// for (i = 0; i < 10; i++) {
//     let result = test2_1.getRiddle(undefined);
//     let flagResult = -1
//     let count = 0
//     console.info("开始棋盘：" + JSON.stringify(result))
//     while (flagResult != 1) {
//         let action = test2_1.getActionAuto(result)
//         let tmp = test2_1.doAction(result, action.best)
//         result = tmp[1]
//         flagResult = tmp[0]
//         console.info(count++ + " " + player + "操作:" + JSON.stringify(action))
//         console.info("P1:" + result.p1 + " P2:" + result.p2 + " " + JSON.stringify(result.positions) + " 结果：" + flagResult)
//         player = player == "P1" ? "P2" : "P1"
//         if (flagResult != 0) {
//             console.info(player + " WIN")
//         }
//     }
// }