interface GameData {
}
interface GameConfig {
}
interface DeskData {
}

enum FlagValid { INVALID, VALID };
enum RobotLevel { EASY, HARD };
enum Player { P1, P2 };


export default class GameStep {
    current: any
    nexts: GameStep[] = []
    // 0 继续 1 P1 2 p2 
    flag: number = 0

    constructor(current: any) {
        this.current = current
    }
}
