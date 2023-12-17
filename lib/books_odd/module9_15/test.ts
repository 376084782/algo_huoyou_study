import { GameAction9_15, GameData9_15, module9_15 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module9_15()
function test() {
    let desk = ctr.getRiddle(8, 1, []);

    let actList = ctr.getActionAuto(desk);
    console.log(actList)
    return

    desk = {
        player: 1,
        desk: [
            4, 8, 6, 7,
            1, 2, 5, 3
        ],
        maxCount: 8,
        sortType: 1,
        typeSet: 1
    }
    let act = new GameAction9_15()
    act.listChange = [4, 8]
    let [f, desknew] = ctr.doAction(desk, act);
    console.log(f, desknew)
}

test()



