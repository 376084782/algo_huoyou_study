import { GameAction1_3, module1_3 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module1_3()
function test() {
    let desk ={"mapLineColor":{},"player":1,"size":2,"stepStartLineIdx":0,"mapFlagColor":{"0":2,"1":2},"listFlag":[[0,0],[1,0]],"listLine":[[[0,0],[1,0]],[[0,0],[0,1]],[[0,1],[1,1]],[[1,0],[1,1]],[[1,0],[2,0]],[[2,0],[2,1]],[[1,1],[2,1]],[[0,1],[0,2]],[[1,1],[1,2]]],"listInited1":[],"listInited2":[],"typeSet":2,"gainExtraChance":false} 
    // desk.listLine = [[[0, 0], [1, 0]], [[0, 0], [0, 1]], [[1, 0], [1, 1]]]
    let f = ctr.checkDesk(desk)
    console.log(f)
    // let act = new GameAction1_3()
    // act.line = [[0, 1], [1, 1]]
    // let r = ctr.doAction(desk, act);
}

test()



