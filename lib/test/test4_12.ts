import { GameData4_12, module4_12 } from "../module4_12";


async function test4_12() {
    let ctr = new module4_12();
    let desk = new GameData4_12();
    desk.listInited = [1, 2, 3, 4]
    desk.list1 = []
    desk.list2 = [4]
    desk.centerList = [2, 1]
    desk.player = 2;


    let act = ctr.getAutoAction(desk)
    console.log(act)


}

test4_12()
