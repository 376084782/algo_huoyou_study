
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
    checkAction(desk: GameData8_14, act: GameAction8_14): boolean {
        let [x, y] = act.pos
        // 判断这个格子为空可以填入数字
        if (!desk.desk[y] || desk.desk[y][x] != '') {
            return false
        }
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

    getActionAuto(deskIn: GameData8_14, act: GameAction8_14) {

    }
    checkDesk(desk: GameData8_14) {

    }
    checkRiddle(desk: GameData8_14) {

    }
}