var _ = require('lodash');

export class GameData8_16 {
  player: number = 1;
  desk: number[][] = [];
  listTarget: number[][] = []
  pLast: number[] = []
  typeSet: number = 1;
}
export class GameAction8_16 {
  x: number = -1;
  y: number = -1;
  score: number = 0
}
export class module8_16 {
  getRiddle(size = 7) {
    let desk = new GameData8_16();
    desk.desk = []
    for (let y = 0; y < size; y++) {
      let l = []
      for (let x = 0; x < size; x++) {
        l[x] = 0
      }
      desk.desk.push(l)
    }
    // 左上和右上为99 表示终点目标
    let p1 = [size - 1, 0]
    let p2 = [0, size - 1]
    desk.listTarget = [p1, p2]

    // 在中间的位置放置第一颗棋子
    let center = Math.floor(size / 2);
    let initX = center;
    let initY = center;
    if (size == 7) {
      initX = 4;
      initY = 3;
    }
    desk.desk[initY][initX] = 2;
    desk.pLast = [initY, initX]

    return desk;
  }
  checkRiddle(desk: GameData8_16) {
    return true
  }
  checkDesk(desk: GameData8_16) {
    for (let i = 0; i < desk.listTarget.length; i++) {
      let [x, y] = desk.listTarget[i];
      let v = desk.desk[y][x];
      if (v > 0) {
        return v
      }
    }
    let listCanPut = this.getPosCanPut(desk);
    if (listCanPut.length == 0) {
      return desk.player
    }
    return -1;
  }

  checkAction(desk: GameData8_16, act: GameAction8_16) {
    let pList = this.getPosCanPut(desk);
    if (!!pList.find(([x, y]) => act.x == x && act.y == y)) {
      return true
    }
    return false
  }
  getPosCanPut(desk: GameData8_16) {
    let [x, y] = desk.pLast;
    let list1 = [[x - 1, y - 1], [x, y - 1], [x + 1, y - 1], [x - 1, y], [x + 1, y], [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],]
    let listCanUse = [];
    for (let i = 0; i < list1.length; i++) {
      let [x1, y1] = list1[i];
      if (desk.desk[y1] && (desk.desk[y1][x1] == 0)) {
        listCanUse.push([x1, y1])
      }
    }
    return listCanUse;
  }
  doAction(deskIn: GameData8_16, act: GameAction8_16): [f: number, desk: GameData8_16] {
    let desk: GameData8_16 = _.cloneDeep(deskIn)
    if (!this.checkAction(desk, act)) {
      return [-1, desk]
    }

    desk.desk[act.y][act.x] = desk.player;
    desk.pLast = [act.x, act.y]

    return [0, desk]
  }

  getCanPutPlaceAll(desk: GameData8_16) {
    if (this.checkDesk(desk) != -1) {
      return []
    }
    let listAll: GameAction8_16[] = [];
    let listCanPut = this.getPosCanPut(desk);
    listCanPut.forEach(e => {
      let act = new GameAction8_16();
      act.x = e[0];
      act.y = e[1];
      listAll.push(act);
    })
    return listAll;
  }
  getActionAuto(desk: GameData8_16) {
    let actionAll = this.getCanPutPlaceAll(desk);

    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let [f1, desk2Oppo] = this.doAction(desk, act1Self);
      let actionAllOppo = this.getCanPutPlaceAll(desk2Oppo);
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
          let [f2, desk2Self] = this.doAction(desk2Oppo, act1Oppo);
          let actionAllSelf2 = this.getCanPutPlaceAll(desk2Self);
          if (actionAllSelf2.length == 0) {
            // 我可能面对的局面，该棋面下我无棋可走，得分-100
            act1Self.score -= 100
          }
        }
      }
    }
    // 增加一点随机性，避免计算机很呆都是走一样的地方从左往右放
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
}