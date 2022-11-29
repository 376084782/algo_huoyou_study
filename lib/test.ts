import example from './example/index';
import example2_1 from './module2_1/index';
let player = "P1"
let test2_1 = new example2_1();

let i = 0

for (i = 0; i < 10; i++) {
    let result = test2_1.getRiddleByLev(0, null);
    let flagResult = -1
    let count = 0
    console.info("开始棋盘：" + JSON.stringify(result))
    while (flagResult != 1) {
        let action = test2_1.getActionAuto(result)
        let tmp = test2_1.doAction(result, action)
        result = tmp[1]
        flagResult = tmp[0]
        console.info(count++ + " " + player + "操作:" + JSON.stringify(action) + " " + JSON.stringify(result.positions) + "结果：" + flagResult)
        if (player == "P1") {
            player = "P2"
        } else {
            player = "P1"
        }
        if (flagResult == 1) {
            console.info(player + " WIN")
        }
    }
}