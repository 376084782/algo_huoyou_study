interface GameData {
}
interface GameConfig {
}
interface DeskData {
}

enum FlagValid { INVALID, VALID };
enum RobotLevel { EASY, HARD };
enum Player { P1, P2 };


export class GameAutoWay {
    best: any
    nobest: any
    constructor(best: any, nobest: any) {
        this.best = best
        this.nobest = nobest
    }
}

export class GameWay {
    current: any
    node: GameStep
    constructor(current: any, node: GameStep) {
        this.current = current
        this.node = node
    }
}
export class GameStep {
    current: any
    nexts: GameStep[] = []
    // 0 继续 1 P1 2 p2 
    flag: number = 0
    stepNum: number = 1

    constructor(current: any, num: number) {
        this.current = current
        this.stepNum = num
    }

    dip(): GameStep[] {
        let childs: GameStep[] = []
        if (this.nexts.length != 0) {
            this.nexts.forEach(item => {
                let tmp = item.dip()
                childs = childs.concat(tmp)
                console.info()
            })
        } else {
            childs.push(this)
        }
        return childs
    }
}
