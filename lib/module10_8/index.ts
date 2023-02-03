/**
 * @author jiutou
 * @updateTime 2023/02/01
 * @tip 10-8 趣味棒棒糖
 * @description
 *
 一．挑战模式
 1.参数默认值：①数量：23
 ②界面：呈现棋盘棋子
 2.参数范围：
 ①总数自定义[2，30]
 ②界面：根据数字生成相应数量的棋子。
 *
 */
import { GameAutoWay } from '../common/pojo';
import RandomGenerater from '../util/RandomGenerater';
import OtherUtil from '../util/OtherUtil';

export class GameData10_8 {

    typeSet?= 1;//前端用的，存是否是自定义棋盘
    //总数
    n = 23
    //玩家手持
    p1 = 0
    p2 = 0
    residue = 23
    //轮次
    rounds = 0
    //当前玩家 p1 1 p2 2
    player = 1

    constructor(n: number) {
        this.n = n
        this.residue = n
    }
}


export default class example10_8 {
    //质数
    zhishuArr: number[] = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    zhishuSet: Set<number> = new Set<number>([1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29])
    w1Set: Set<number> = new Set<number>([2, 3, 4, 6, 8, 12, 14, 18, 20, 24, 30])

    getRiddleByLev(level: number, config: any): GameData10_8 {
        throw new Error("Method not implemented.");
    }

    getRiddle(n: number): GameData10_8 {
        if (n < 2 || n > 30) {
            throw new Error("总数大小范围需在[2,30]之间");
        }
        let gd = new GameData10_8(n);
        return gd
    }

    checkRiddle(deskData: GameData10_8): number {
        if (deskData.n > 30 || deskData.n < 2) {
            return -1
        }
        if (deskData.residue == 1) {
            return -1
        }
        return 1
    }

    doAction(deskData: GameData10_8, dataAction: number): [flagResult: number, dataResult: GameData10_8] {
        if (this.checkAction(deskData, dataAction) == -1) {
            return [-1, deskData];
        }
        let flagResult = 0

        deskData.residue = deskData.residue - dataAction
        if (deskData.player == 1) {
            deskData.p1 += dataAction
        } else {
            deskData.p2 += dataAction
        }
        deskData.player = OtherUtil.getRival(deskData.player)
        return [this.checkDesk(deskData), deskData];
    }

    checkAction(deskData: GameData10_8, dataAction: number): number {
        if (deskData.residue < dataAction) {
            return -1;
        }
        if (!this.zhishuSet.has(dataAction)) {
            return -1;
        }
        if (dataAction <= 0) {
            return -1;
        }
        return 1;
    }

    checkDesk(deskData: GameData10_8): number {
        if (deskData.residue == 0) {
            return OtherUtil.getRival(deskData.player);
        } else {
            return 0;
        }
    }

    getRandomAction(residue: number): number {
        const rg = new RandomGenerater(0)
        let n = rg.RangeInteger(0, this.zhishuArr.length - 1);
        while (residue < this.zhishuArr[n]) {
            n = rg.RangeInteger(0, this.zhishuArr.length - 1);
        }
        return n
    }

    getActionAuto(deskData: GameData10_8): GameAutoWay {
        let best = undefined
        let nobest = this.getRandomAction(deskData.residue)
        if (this.zhishuSet.has(deskData.residue - 1)) {
            return new GameAutoWay(deskData.residue - 1, nobest)
        } else {
            for (let i = 0; i < this.zhishuArr.length; i++) {
                const tmp = this.zhishuArr[i];
                if (deskData.residue > tmp) {
                    if (!this.w1Set.has(deskData.residue - tmp)) {
                        best = tmp
                        break
                    }
                }
            }
        }
        return new GameAutoWay(best, nobest)
    }

}