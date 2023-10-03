var _ = require('lodash');

export class GameData9_7 {
  player: number = 1;
  desk: number[][] = [];
  typeSet: number = 1;
}
export class GameAction9_7 {
  score: number = 0
  p: number[] = []
  listAround: number[][] = []
}
export class module9_7 {
  getRiddle(sizeX: number, sizeY: number) {
    let desk = new GameData9_7();
    let listDesk = []
    for (let y = 0; y < sizeY; y++) {
      let row: number[] = [];
      listDesk.push(row);
      for (let x = 0; x < sizeX; x++) {
        row.push(1)
      }
    }
    desk.desk = listDesk;
    return desk;
  }
  getRiddleLev() {
    let map: any = {};
    for (let lev = 0; lev++; lev < 3) {
      for (let c = 0; c++; c < 30) {
        // 随机30个题目

      }
    }
    return map
  }
  checkRiddle(desk: GameData9_7) {
    let sizeX = desk.desk[0].length;
    let sizeY = desk.desk.length;
    if (sizeX < 2 || sizeX > 8 || sizeY < 2 || sizeY > 8) {
      return -1
    }
    return 0
  }
  checkDeskBlank(desk: GameData9_7) {
    for (let y = 0; y < desk.desk.length; y++) {
      let row = desk.desk[y];
      for (let x = 0; x < row.length; x++) {
        if (desk.desk[y][x] == 1) {
          return false
        }
      }
    }
    return true
  }
  checkDesk(desk: GameData9_7) {
    let isBlank = this.checkDeskBlank(desk);
    if (isBlank) {
      return desk.player
    }
    return -1
  }

  getChessAround(xIn: number, yIn: number, desk: GameData9_7) {
    // 从正上方开始顺时针转
    let listOff = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    let pList: number[][] = [];
    listOff.forEach(([offX, offY]) => {
      let x = offX + xIn;
      let y = offY + yIn
      if (desk.desk[y] && desk.desk[y][x] == 1) {
        // 存在棋子
        pList.push([x, y])
      }
    })
    return pList;
  }
  checkAction(desk: GameData9_7, act: GameAction9_7) {
    if (act.p.length == 0) {
      return -1
    }
    let [x, y] = act.p;
    if (desk.desk[y][x] == 0) {
      return -1
    }
    return 0
  }
  doAction(deskIn: GameData9_7, act: GameAction9_7): [flag: number, desk: GameData9_7] {
    let desk = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk]
    }
    let [x, y] = act.p
    let listAround = this.getChessAround(x, y, desk);
    desk.desk[y][x] = 0;
    listAround.forEach(([x2, y2]) => {
      desk.desk[y2][x2] = 0;
    });
    return [0, desk]
  }
  getActionAuto(desk: GameData9_7): any[] {
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
          desk2Oppo.player = playerOppo;
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
    console.log(actionAll.map(e => e.p))
    if (actionAll.length >= 2) {
      return [actionAll[0], actionAll[1]]
    } else {
      return [actionAll[0], actionAll[0]]
    }
  }
  getActionAll(desk: GameData9_7): GameAction9_7[] {
    let listActionAll: GameAction9_7[] = [];
    for (let y = 0; y < desk.desk.length; y++) {
      let row = desk.desk[y];
      for (let x = 0; x < row.length; x++) {
        if (desk.desk[y][x] == 1) {
          let act = new GameAction9_7();
          act.p = [x, y]
          act.listAround = this.getChessAround(act.p[0], act.p[1], desk);
          listActionAll.push(act);
        }
      }
    }
    return listActionAll
  }
}