
var _ = require('lodash');
import RandomGenerater from '../util/RandomGenerater';
let randomer = new RandomGenerater(0);
export class GameData4_16 {
  desk: number[][] = [];
  colorMap: number[][] = []
  player: number = 1;
  typeSet: number = 1;
  constructor() {
  }
}
export class module4_16 {
  createBlankGameData(count: number) {
    let desk = new GameData4_16();
    // 随机颜色区域，按照四组棋盘大小写好颜色分区
    if (count == 6) {
      desk.colorMap = [
        [1, 1, 1, 2, 2, 2],
        [1, 1, 5, 5, 2, 2],
        [1, 5, 5, 5, 5, 2],
        [3, 6, 6, 6, 6, 4],
        [3, 3, 6, 6, 4, 4],
        [3, 3, 3, 4, 4, 4]
      ]
      desk.desk = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ]
    }
    return desk;
  }

  getRiddle() {
    let desk = this.createBlankGameData(6);
    desk.desk = [
      [1, 0, 0, 0, 0, 2],
      [6, 0, 5, 0, 1, 0],
      [0, 0, 2, 0, 6, 4],
      [2, 1, 4, 5, 0, 6],
      [0, 5, 0, 0, 0, 0],
      [4, 0, 1, 0, 2, 0]
    ];
    return desk;
  }
  checkByList(l: number[]) {
    let listUniq = _.uniq(l);
    if (listUniq.length != l.length) {
      return false
    }
    if (l.some(e => e == 0)) {
      return false
    }
    return true
  }
  checkDesk(desk: GameData4_16) {
    let size = desk.desk.length;
    // 每行每列的数字不能重复且不能有0
    for (let y = 0; y < size; y++) {
      let listRow = desk.desk[y];
      let listCol = desk.desk.map(e => e[y]);
      if (!this.checkByList(listRow)) {
        return false
      }
      if (!this.checkByList(listCol)) {
        return false
      }
    }
    // 每个区域的数字不能重复且不能有0
    let listColorMap: any = {};
    desk.colorMap.forEach((r, y) => {
      r.forEach((color, x) => {
        if (!listColorMap[color]) {
          listColorMap[color] = []
        }
        listColorMap[color].push(desk.desk[y][x])
      })
    })
    for (let color in listColorMap) {
      let list = listColorMap[color];
      if (!this.checkByList(list)) {
        return false
      }
    }

  }
  checkRiddle(desk: GameData4_16) {
    return true;
  }
  doAction(desk: GameData4_16, action: GameData4_16): [number, GameData4_16] {
    return [0, action]
  }
  checkAction(desk: GameData4_16, action: GameData4_16) {
    return 0
  }
  getActionAuto(desk: GameData4_16) {
    return undefined
  }

  // 随机生成完美题目
  getRiddleByLev(count: number, stepList: number[]) {


  }
}