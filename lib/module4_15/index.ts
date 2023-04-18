
var _ = require('lodash');

import RandomGenerater from '../util/RandomGenerater';
let randomer = new RandomGenerater(0);

export class GameData4_15 {
    typeSet?: number = 1;
    player: number = 1;
    cards: { idx: number, value: number, used: boolean }[] = []
    listAction: number[] = [1, 2]
    score: number = 0;
    targetScore: number = 100;
    constructor() {
    }
}
export class GameAction4_15 {
    idxList: number[] = [];
    action: number = 0
    score: number = 0
}

export class module4_15 {
    getRiddle() {
        let desk = new GameData4_15();
        let id = 0;
        for (let c = 0; c < 4; c++) {
            for (let num = 0; num < 9; num++) {
                desk.cards.push({
                    idx: id,
                    used: false,
                    value: num + 1
                });
                id++
            }
        }
        desk.cards = _.shuffle(desk.cards)
        return desk;
    }
    checkRiddle(desk: GameData4_15) {
        if (desk.listAction.length > 2 || desk.listAction.length == 0) {
            return false
        }
        return true
    }
    checkAction(deskIn: GameData4_15, act: GameAction4_15) {
        let desk: GameData4_15 = _.cloneDeep(deskIn);
        if (act.idxList.length > 2 || act.idxList.length <= 0) {
            return false
        }
        for (let i = 0; i < act.idxList.length; i++) {
            let idx = act.idxList[i]
            let card = desk.cards[idx];
            if (!card || card.used) {
                return false
            }
        }
        if (!act.action) {
            return false
        }
        return true
    }
    doAction(deskIn: GameData4_15, act: GameAction4_15): [f: number, desk: GameData4_15] {
        let desk: GameData4_15 = _.cloneDeep(deskIn);
        if (!this.checkAction) {
            return [-1, desk]
        }
        act.idxList.forEach(idx => {
            let card = desk.cards.find(e => e.idx == idx);
            if (card) {
                card.used = true;
            }
        })
        if (act.idxList.length == 1) {
            // 直接取这张牌的值加到分数上
            let card = desk.cards.find(e => e.idx == act.idxList[0]) as any;
            desk.score += card.value;
        } else {
            let card1 = desk.cards.find(e => e.idx == act.idxList[0]) as any
            let card2 = desk.cards.find(e => e.idx == act.idxList[1]) as any
            let min = Math.min(card1.value, card2.value)
            let max = Math.max(card1.value, card2.value)
            let v = 0;
            if (act.action == 1) {
                // 加
                v = min + max
            } else if (act.action == 2) {
                // 减
                v = max - min
            } else if (act.action == 3) {
                // 乘
                v = max * min
            } else if (act.action == 4) {
                // 除
                v = Math.floor(max / min)
            }
            desk.score += v;
        }
        return [0, desk]
    }
    getActionAll(desk: GameData4_15) {
        let actList: GameAction4_15[] = [];
        let listCardLeft = _.cloneDeep(desk.cards.filter(e => !e.used))
        // 只选择一张牌的情况
        let listCardLeftUniq = _.uniqWith(listCardLeft, (a: any, b: any) => a.value == b.value)
        listCardLeftUniq.forEach((d: any) => {
            let act = new GameAction4_15()
            act.idxList = [d.idx]
            actList.push(act);
        });
        // 选择两张的情况
        let mapUniq: any = []
        for (let i1 = 0; i1 < listCardLeft.length; i1++) {
            let lAll = _.cloneDeep(listCardLeft);
            let card1 = lAll.splice(i1, 1)[0];
            for (let i2 = 0; i2 < lAll.length; i2++) {
                let card2 = lAll.splice(i2, 1)[0];
                let min = card1.value > card2.value ? card2.value : card1.value;
                let max = card1.value > card2.value ? card1.value : card2.value;
                if (!mapUniq[`${min}_${max}`]) {
                    // 根据value去重
                    mapUniq[`${min}_${max}`] = true
                    for (let i3 = 0; i3 < desk.listAction.length; i3++) {
                        let act = new GameAction4_15()
                        act.idxList = [card1.idx, card2.idx]
                        act.action = desk.listAction[i3]
                        actList.push(act);
                    }
                }
            }
        }
        return actList
    }

    getActionAuto(desk: GameData4_15) {
        let actionAll = this.getActionAll(desk);
        // 推算所有可能性
        for (let i = 0; i < actionAll.length; i++) {
            let act1Self = actionAll[i];
            let [f, desk2Oppo] = this.doAction(desk, act1Self);
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
                    let [f, desk2Self] = this.doAction(desk2Oppo, act1Oppo);
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
    checkDesk(desk: GameData4_15) {
        if (desk.score == desk.targetScore) {
            return desk.player
        } else if (desk.score > desk.targetScore) {
            return 3 - desk.player;
        } else {
            return -1
        }
    }


}