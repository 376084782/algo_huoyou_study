import { FileWriter } from "../common/FileWriter";
import { GameData6_11, module6_11 } from "../module6_11";

async function test6_11() {
    let ctr = new module6_11();
    let mapAll = ctr.randomRiddle();

    for (let level = 1; level <= 6; level++) {
        console.log('写入等级' + level)
        let deskList: GameData6_11[] = [];
        mapAll[level].forEach((listNum: number[]) => {
            let desk = new GameData6_11(7);
            desk.desk = listNum;
            deskList.push(desk);
        });
        await FileWriter.setFile(`./train/6-11/level${level}.json`, JSON.stringify(deskList))
    }

}
  // test6_11()