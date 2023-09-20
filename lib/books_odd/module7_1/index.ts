var _ = require('lodash');

export class GameData7_1 {
  player: number = 1;
  typeSet: number = 1;
  desk: number[][] = [[1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1, 1]];
  eachMax: number = 3
}
export class GameAction7_1 {
  listIdx: number[][] = []
  score: number = 0
}
export class module7_1 {
  getRiddle() {
    let desk = new GameData7_1();
    return desk;
  }
  getRiddleLev() {
    let map: any = { 1: [], 2: [], 3: [] }
    for (let a = 4; a <= 10; a++) {
      let desk = this.createDesk(a, 0, 0, 3);
      map[1].push(desk);
    }
    for (let a = 2; a <= 10; a++) {
      for (let b = 2; b <= 10; b++) {
        let desk = this.createDesk(a, b, 0, 3);
        map[2].push(desk);
      }
    }
    for (let a = 3; a <= 10; a++) {
      for (let b = 3; b <= 10; b++) {
        for (let c = 3; c <= 10; c++) {
          let desk = this.createDesk(a, b, c, 3);
          map[3].push(desk);
        }
      }
    }
    return map;
  }
  createDesk(a: number, b: number, c: number, max: number) {
    let desk = new GameData7_1();
    desk.eachMax = max;
    desk.desk = [[], [0, 0, 0, 0], [0, 0, 0, 0]]
    for (let i = 0; i < a; i++) {
      desk.desk[0].push(1)
    }
    if (b) {
      desk.desk[1] = []
      for (let i = 0; i < b; i++) {
        desk.desk[1].push(1)
      }
    }
    if (c) {
      desk.desk[2] = []
      for (let i = 0; i < c; i++) {
        desk.desk[2].push(1)
      }
    }
    return desk

  }
  checkRiddle(desk: GameData7_1) {
    if (desk.eachMax > 10 || desk.eachMax < 3) {
      // 每次最多取的数量自定义：3~10。
      return -1
    }
    if (desk.desk.length < 3 || desk.desk.length > 10) {
      // 行数自定义[3,6]
      return -1
    }
    for (let y = 0; y < desk.desk.length; y++) {
      // 每行数量自定义：[1,10]
      let row = desk.desk[y];
      if (row.length < 1 || row.length > 10) {
        return -1
      }
    }
    return 0
  }
  checkDesk(desk: GameData7_1) {
    for (let y = 0; y < desk.desk.length; y++) {
      // 每行数量自定义：[1,10]
      let row = desk.desk[y];
      let allGot = row.every(e => e == 0);
      if (!allGot) {
        // 还没有全部拿完，游戏继续
        return -1
      }
    }
    return desk.player
  }

  checkAction(desk: GameData7_1, act: GameAction7_1) {
    // 数量[1,max]
    if (act.listIdx.length > desk.eachMax || act.listIdx.length < 1) {
      return false
    }
    // 每次取的必须在同一行
    let y = act.listIdx[0][1];
    for (let i = 0; i < act.listIdx.length; i++) {
      let [px, py] = act.listIdx[i];
      if (py != y) {
        return false
      }
      if (!desk.desk[py] || desk.desk[py][px] == undefined) {
        // 不存在的位置
        return false
      }
      if (desk.desk[py][px] == 0) {
        // 目标位置没有棋子了
        return false
      }
    }
    return true
  }
  doAction(deskIn: GameData7_1, act: GameAction7_1): [flag: number, desk: GameData7_1] {
    let desk = _.cloneDeep(deskIn)
    if (!this.checkAction(desk, act)) {
      return [-1, desk]
    }
    act.listIdx.forEach(([x, y]) => {
      desk.desk[y][x] = 0;
    })
    return [0, desk]
  }
  getActionAuto(desk: GameData7_1): any[] {
    let actionAll = this.getActionAll(desk);

    let playerSelf = desk.player;
    let playerOppo = 3 - desk.player;
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let [flagOppo, desk2Oppo] = this.doAction(desk, act1Self);
      let res = this.checkDesk(desk2Oppo);
      // 必胜,直接使用
      if (res == playerSelf) {
        return [act1Self, act1Self]
      }
      let actionAllOppo = this.getActionAll(desk2Oppo);
      if (actionAll.length < 40) {
        // 可放的方式不多，有制胜局的可能性，多考虑一步
        for (let m = 0; m < actionAllOppo.length; m++) {
          let act1Oppo = actionAllOppo[m];
          let [flagSelf, desk2Self] = this.doAction(desk2Oppo, act1Oppo);
          let res2 = this.checkDesk(desk2Self);
          if (res2 == playerOppo) {
            // 如果对方会获胜，得分-100
            act1Self.score -= 100
          }
        }
      }
    }
    // 增加一点随机性，避免计算机很呆都是走一样的地方从左往右放
    actionAll = _.shuffle(actionAll)
    actionAll = actionAll.sort((a, b) => b.score - a.score)
    if (actionAll.length >= 2) {
      return [actionAll[0], actionAll[1]]
    } else {
      return [actionAll[0], actionAll[0]]
    }
  }
  getActionAll(desk: GameData7_1): GameAction7_1[] {
    let listActionAll: GameAction7_1[] = [];
    let mapLeft: number[] = [];
    desk.desk.forEach((row, idx) => {
      let left = row.filter(e => e == 1).length
      mapLeft[idx] = left
    })
    mapLeft.forEach((leftMax, y) => {
      let max = Math.min(leftMax, desk.eachMax);
      if (max > 0) {
        for (let i = 1; i <= max; i++) {
          let act = new GameAction7_1();
          let row = desk.desk[y];
          let listIdxCanGet = this.getIdxsCanGet(row);
          act.listIdx = listIdxCanGet.slice(0, i).map(x => [x, y]);
          listActionAll.push(act);
        }
      }
    })
    return listActionAll
  }
  getIdxsCanGet(list: number[]) {
    let listIdx: number[] = [];
    list.forEach((e, idx) => {
      if (e == 1) {
        listIdx.push(idx);
      }
    })
    return listIdx;
  }
}