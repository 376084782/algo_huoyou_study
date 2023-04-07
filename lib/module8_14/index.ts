
var _ = require('lodash');

import RandomGenerater from '../util/RandomGenerater';
let randomer = new RandomGenerater(0);

export class GameData8_14 {
    typeSet?: number = 1;
    player: number = 1;
    desk: string[][] = []
    chessLeft: string[] = []
    constructor() {
    }
}
export class GameAction8_14 {
    num: number[] = [];
    pos: number[] = []
    score: number = 0
}

export class module8_14 {
    getRiddle(size: number): GameData8_14 {
        let desk = new GameData8_14();
        if (size >= 3 && size <= 5) {
            for (let y = 0; y < size; y++) {
                desk.desk[y] = []
                for (let x = 0; x < size; x++) {
                    desk.desk[y][x] = '';
                    desk.chessLeft.push([x, y].join(','))
                }
            }
        }
        return desk;
    }
    getBasicList(size: number) {
        let l = [];
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                l.push([x, y].join(','))
            }
        }
        return l
    }
    sortPos(arr: number[][]) {
        return arr.sort(([x1, y1], [x2, y2]) => {
            if (x1 == x2) {
                return y1 - y2
            } else {
                return x1 - x2
            }
        })
    }
    // dir 1上下 2左下右上 3左右 4左上右下
    getSeriesByDir(desk: GameData8_14, x: number, y: number, dir: number) {
        let flagFinish = false;
        let offset = 0;
        let list = [[x, y]]
        while (!flagFinish) {
            offset++;
            let p1 = { x: x, y: y }
            let p2 = { x: x, y: y }
            if (dir == 1) {
                p1.y -= offset;
                p2.y += offset
            } else if (dir == 2) {
                p1.x -= offset;
                p1.y += offset;
                p2.x += offset
                p2.y -= offset
            } else if (dir == 3) {
                p1.x -= offset;
                p2.x += offset
            } else if (dir == 4) {
                p1.x -= offset;
                p1.y -= offset;
                p2.x += offset
                p2.y += offset
            }
            let flag1 = desk.desk[p1.y] && desk.desk[p1.y][p1.x] != undefined
            let flag2 = desk.desk[p2.y] && desk.desk[p2.y][p2.x] != undefined
            if (flag1) {
                list.push([p1.x, p1.y])
            }
            if (flag2) {
                list.push([p2.x, p2.y])
            }
            if (!flag1 && !flag2) {
                flagFinish = true;
            }
        }
        return this.sortPos(list);
    }
    checkAllDiff(desk: GameData8_14, pList: number[][]) {
        let listColor: string[] = [];
        let listValue: string[] = [];
        for (let i = 0; i < pList.length; i++) {
            let [x, y] = pList[i];
            let v = desk.desk[y][x];
            if (v != '') {
                // 非空的格子判断是否连续里没有重复
                let [color, value] = v.split(',');
                if (listColor.indexOf(color) > -1) {
                    return false
                }
                if (listValue.indexOf(value) > -1) {
                    return false
                }
                listColor.push(color)
                listValue.push(value)
            }
        }
        return true
    }
    checkAction(deskIn: GameData8_14, act: GameAction8_14): boolean {
        let desk: GameData8_14 = _.cloneDeep(deskIn)
        let [x, y] = act.pos
        // 判断这个格子为空可以填入数字
        if (!desk.desk[y] || desk.desk[y][x] != '') {
            return false
        }
        desk.desk[y][x] = act.num.join(',');
        // 判断连续格子里是否颜色和数字都不同
        for (let dir = 1; dir <= 4; dir++) {
            let l = this.getSeriesByDir(desk, x, y, dir)
            if (!this.checkAllDiff(desk, l)) {
                return false
            }
        }
        return true
    }
    doAction(deskIn: GameData8_14, act: GameAction8_14): { flag: number, desk: GameData8_14 } {
        let desk: GameData8_14 = _.cloneDeep(deskIn);
        if (!this.checkAction(desk, act)) {
            return {
                flag: -1, desk
            }
        }
        let [x, y] = act.pos;
        desk.desk[y][x] = act.num.join(',');
        desk.chessLeft = desk.chessLeft.filter(val => val != act.num.join(','))
        return {
            flag: 0,
            desk
        }
    }
    getActionAll(desk: GameData8_14) {
        let actAll: GameAction8_14[] = [];
        desk.chessLeft.forEach(chess => {
            desk.desk.forEach((row, y) => {
                row.forEach((v, x) => {
                    if (v == '') {
                        let act = new GameAction8_14()
                        act.pos = [x, y];
                        act.num = chess.split(',').map(e => +e);
                        let flag = this.checkAction(desk, act)
                        if (flag) {
                            actAll.push(act);
                        }
                    }
                })
            })

        })
        return actAll;
    }
    getActionAuto(desk: GameData8_14) {
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
    checkDesk(desk: GameData8_14) {
        let list = this.getActionAll(desk);
        if (list.length == 0) {
            return desk.player
        }
        return -1;
    }
    checkRiddle(desk: GameData8_14) {
        let flagFinish = this.checkDesk(desk);
        if (flagFinish > -1) {
            return -1
        }
        return 0
    }
}