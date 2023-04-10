
var _ = require('lodash');

import RandomGenerater from '../util/RandomGenerater';
let randomer = new RandomGenerater(0);

export class GameData6_14 {
    typeSet?: number = 1;
    player: number = 1;
    desk: number[] = [];
    multi: number = 2;
    constructor() {
    }
}
export class GameAction6_14 {
    multi: number = 0
    score: number = 0
}

export class module6_14 {
    getRiddle() {
        let act = new GameData6_14();
        act.desk = [365, 47];
        act.multi = 2;
        return act;
    }
    checkRiddle(desk: GameData6_14) {
        for (let i = 0; i < desk.desk.length; i++) {
            let v = desk.desk[i];
            if (v > 999 || v < 1) {
                return -1
            }
        }
        let isFinished = this.checkDesk(desk) != -1;
        if (isFinished) {
            return -1
        }
        if (desk.multi > 5 || desk.multi < 2) {
            return -1
        }
        return 0
    }
    checkDesk(desk: GameData6_14) {
        if (desk.desk[0] == desk.desk[1]) {
            return desk.player
        }
        return -1
    }
    checkAction(desk: GameData6_14, act: GameAction6_14) {
        if (!act.multi) {
            return false
        }
        let max = Math.max(...desk.desk);
        let min = Math.min(...desk.desk);
        let v = min * act.multi;
        max = max - v;
        if (max < 0) {
            return false
        }
        return true
    }
    doAction(deskIn: GameData6_14, act: GameAction6_14): { flag: number, desk: GameData6_14 } {
        let desk: GameData6_14 = _.cloneDeep(deskIn)
        if (!this.checkAction(desk, act)) {
            return {
                flag: -1, desk: deskIn
            }
        }
        let max = Math.max(...desk.desk);
        let min = Math.min(...desk.desk);
        let v = min * act.multi;
        max = max - v;
        desk.desk = [min, max].sort((a, b) => b - a)
        return {
            flag: 0, desk: desk
        }
    }
    getActionAll(desk: GameData6_14) {
        let multiList = [1, desk.multi];
        let l: GameAction6_14[] = [];
        multiList.forEach(m => {
            let act = new GameAction6_14();
            act.multi = m;
            if (this.checkAction(desk, act)) {
                l.push(act)
            }
        })
        return l
    }
    getActionAuto(desk: GameData6_14) {
        let actionAll = this.getActionAll(desk);
        // 推算所有可能性
        for (let i = 0; i < actionAll.length; i++) {
            let act1Self = actionAll[i];
            let { desk: desk2Oppo } = this.doAction(desk, act1Self);
            let actionAllOppo = this.getActionAll(desk2Oppo);
            // 放之后对方可行棋子为0，说明必胜,直接使用
            if (actionAllOppo.length == 0) {
                return {
                    best: act1Self, nobest: act1Self
                }
            }
            if (actionAll.length < 40) {
                // 可放的方式不多，有制胜局的可能性，多考虑一步
                for (let m = 0; m < actionAllOppo.length; m++) {
                    let act1Oppo = actionAllOppo[m];
                    let { desk: desk2Self } = this.doAction(desk2Oppo, act1Oppo);
                    let actionAllSelf2 = this.getActionAll(desk2Self);
                    if (actionAllSelf2.length == 0) {
                        // 我可能面对的局面，该棋面下我无棋可走，得分-100
                        act1Self.score -= 100
                    }
                }
            }
        }
        // 增加一点随机性，避免计算机很呆都是一样的走法
        actionAll = _.shuffle(actionAll)
        actionAll = actionAll.sort((a, b) => b.score - a.score)
        console.log(actionAll,'actionAllactionAll')
        if (actionAll.length >= 2) {
            return {
                best: actionAll[0], nobest: actionAll[1]
            }
        } else {
            return {
                best: actionAll[0], nobest: actionAll[0]
            }
        }
    }

}