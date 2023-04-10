import { FileWriter } from "./FileWriter"

export class QuesWriter {
    static async writeQuesIn(mapAll: any, course: string, maxEachLev = 10) {
        for (let level = 1; level <= 3; level++) {
            let listQues = mapAll[level].slice(0, maxEachLev)
            console.log(`写入等级${level},数量：${listQues.length}`)
            await FileWriter.setFile(`./train/${course}/level${level}.json`, JSON.stringify(listQues))
        }

    }
}