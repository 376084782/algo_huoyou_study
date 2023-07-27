var _ = require('lodash');

export class GameData1_3 {
  player: number = 1;
  size: number = 2;
  stepStartLineIdx = 0;//开始计步数的listLine序号
  mapFlagColor: any = {}
  listFlag: number[][] = []
  listLine: number[][][] = []
  listInited1: number[][][] = []
  listInited2: number[][][] = []
  typeSet: number = 1;
  gainExtraChance = false;
}
export class GameAction1_3 {
  line: number[][] = []
  score: number = 0
}
export class module1_3 {
  getRiddle() {
    let desk = new GameData1_3();
    return desk;
  }
  checkRiddle(desk: GameData1_3) {
    if (desk.size > 5 || desk.size < 2) {
      return false
    }
    return true
  }
  checkDesk(desk: GameData1_3) {
    let listCanPut = this.getActionAll(desk);
    if (listCanPut.length == 0) {
      let count1 = 0;
      let count2 = 0;
      for (let idx in desk.mapFlagColor) {
        let color = desk.mapFlagColor[idx];
        if (color == 1) {
          count1++
        } else {
          count2++
        }
      }
      if (count1 == count2) {
        return 3
      } else {
        return count1 > count2 ? 1 : 2
      }
    }
    return -1
  }
  doAction(deskIn: GameData1_3, act: GameAction1_3): [flag: number, desk: GameData1_3] {
    let desk: GameData1_3 = _.cloneDeep(deskIn)
    if (!this.checkAction(desk, act)) {
      return [-1, desk]
    }
    desk.listLine.push(act.line);
    desk.gainExtraChance = false;
    // 检查是否形成包围，如果形成了则占领一个房子
    let ls = this.getBoxLines(act.line);
    ls.forEach((lines: number[][][]) => {
      let listAll: any[] = _.cloneDeep(desk.listLine).concat(desk.listInited1, desk.listInited2);
      if (lines.every(e => listAll.find(e2 => this.checkSameLine(e2, e)))) {
        desk.mapFlagColor[desk.listFlag.length] = desk.player;
        desk.listFlag.push(lines[0][0])
        desk.gainExtraChance = true;
      }
    })
    return [0, desk]
  }
  getBoxLines(line: number[][]): number[][][][] {
    let [p1, p2] = line;
    let [px1, py1] = p1;
    let [px2, py2] = p2;

    let listP = [];
    if (px1 == px2) {
      listP.push([px1, px1 + 1, py1, py2])
      listP.push([px1, px1 - 1, py1, py2])
    } else if (py1 == py2) {
      listP.push([px1, px2, py1, py1 + 1])
      listP.push([px1, px2, py1, py1 - 1])
    }

    let listRes: number[][][][] = []
    listP.forEach(([x1, x2, y1, y2]) => {
      if (x1 > x2) {
        [x1, x2] = [x2, x1]
      }
      if (y1 > y2) {
        [y1, y2] = [y2, y1]
      }
      let l = [];
      let A = [x1, y1];
      let B = [x2, y1];
      let C = [x2, y2];
      let D = [x1, y2];
      l.push([A, B])
      l.push([B, C])
      l.push([D, C])
      l.push([A, D])
      listRes.push(l)
    })
    return listRes;
  }
  sortLine(list: number[][]) {
    return list.sort((line1, line2) => {
      return 1
    })
  }
  checkSameLine(line1: number[][], line2: number[][]) {
    line1 = this.sortLine(line1);
    line2 = this.sortLine(line2);
    let f = _.isEqual(line1, line2)
    return f
  }
  checkAction(desk: GameData1_3, act: GameAction1_3) {
    for (let i = 0; i < act.line.length; i++) {
      let [x, y] = act.line[i];
      if (x > desk.size || y > desk.size || x < 0 || y < 0) {
        // 超出棋盘范围
        // console.log('超出棋盘范围')
        return false
      }
      let listAll: any[] = _.cloneDeep(desk.listLine).concat(desk.listInited1, desk.listInited2);
      if (listAll.find(e => this.checkSameLine(e, act.line))) {
        // console.log('已经画线了')
        return false
      }
    }
    return true
  }
  getActionAuto(desk: GameData1_3): any[] {
    let actionAll = this.getActionAll(desk);

    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let [flagOppo, desk2Oppo] = this.doAction(desk, act1Self);
      let selfFlagGetCount = desk2Oppo.listFlag.length - desk.listFlag.length;
      act1Self.score += 10 * selfFlagGetCount

      let listActOppo = this.getActionAll(desk2Oppo);
      if (listActOppo.every(actOppo => {
        let [flagOppo2, desk2Oppo2] = this.doAction(desk2Oppo, actOppo);
        // 不能获得棋子
        return desk2Oppo2.listFlag.length == desk.listFlag.length;
      })) {
        act1Self.score += 100;
      }
    }



    // 根据两种策略出
    actionAll = actionAll.sort((a, b) => b.score - a.score)
    let listBetter = actionAll.filter(e => e.score > 30)
    let listNotBetter = actionAll.filter(e => listBetter.filter(e2 => e2 == e).length == 0);
    // 增加一点随机性，避免计算机很呆都是走一样的地方从左往右放

    // console.log(listBetter.map(e => e.count), 'better')
    // console.log(listNotBetter.map(e => e.count), 'listNotBetter')
    let listRes = []
    if (listBetter[0]) {
      listRes.push(listBetter[0])
      if (listNotBetter[0]) {
        listRes.push(listNotBetter[0])
      } else {
        if (listBetter[1]) {
          listRes.push(listBetter[1])
        } else {
          listRes.push(listBetter[0])
        }
      }
      return listRes
    } else {
      if (actionAll.length == 1) {
        return [actionAll[0], actionAll[0]]
      } else {
        return [actionAll[0], actionAll[1]]
      }
    }
  }
  getActionAll(desk: GameData1_3): GameAction1_3[] {
    let listActionAll: GameAction1_3[] = []
    // 从左上到右下遍历，每个向右向下取点
    for (let y = 0; y <= desk.size; y++) {
      for (let x = 0; x <= desk.size; x++) {
        let pEnd1 = [x + 1, y]
        let act1 = new GameAction1_3();
        act1.line = [[x, y], pEnd1]
        if (this.checkAction(desk, act1)) {
          listActionAll.push(act1)
        }
        let pEnd2 = [x, y + 1]
        let act2 = new GameAction1_3();
        act2.line = [[x, y], pEnd2]
        if (this.checkAction(desk, act2)) {
          listActionAll.push(act2)
        }
      }
    }
    return listActionAll
  }
}