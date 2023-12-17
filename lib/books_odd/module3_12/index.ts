var _ = require('lodash');

export class GameData3_12 {
  player: number = 1;
  desk: number[][] = [[1], [1, 2, 3, 4], [1], [1, 2], [1, 2], [1, 2, 3, 4, 1]];
  deskInited: number[][] = []
  listDisabled: number[] = []
  typeSet: number = 1;
  score: number = 0;
}
export class GameAction3_12 {
  p1: number = -1;
  p2: number = -1;
  score: number = 0
}
export class module3_12 {
  getRiddleLev() {
    let map: any = {
      1: [
        [10, 4],
        [15, 5],
        [18, 6]
      ],
      2: [
        [31, 7],
        [24, 8],
        [27, 9],
      ],
      3: [
        [30, 10],
        [45, 11],
        [50, 12],
      ]
    }
    let mapAll: any = {}
    for (let lev in map) {
      let listConf = map[lev] as number[][];
      let mapStones = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
      listConf.forEach(([total, dui]) => {

        for (let count = 0; count < 10; count++) {

          let desk = new GameData3_12();
          // 先拿出每堆1颗，然后将剩余的依次随机，放到小于10颗的堆里
          let left = total - dui;
          let listDeskBase = [];
          for (let i = 0; i < dui; i++) {
            listDeskBase.push(1);
          }
          for (let i = 0; i < left; i++) {
            let idxCanPuts = listDeskBase.map((v, idx) => {
              if (v < 10) {
                return idx
              }
            })
            idxCanPuts = _.shuffle(idxCanPuts);
            let targetIdx = idxCanPuts[0] as number;
            listDeskBase[targetIdx]++;
          }
          desk.desk = []
          listDeskBase.forEach(c => {
            desk.desk.push(mapStones.slice(0, c))
          });
          desk.deskInited = _.cloneDeep(desk.desk);
          desk.listDisabled = []

          if (!mapAll[lev]) {
            mapAll[lev] = []
          }
          mapAll[lev].push(desk);
        }
      });
    }

    return mapAll
  }
  getRiddle() {
    let desk = new GameData3_12();
    return desk;
  }
  checkRiddle(desk: GameData3_12) {
    // 3~12个
    if (desk.desk.length < 3 || desk.desk.length > 12) {
      return -1
    }
    // 大小介于1~10之间的整数
    if (desk.desk.some(e => e.length < 1 || e.length > 10)) {
      return -1
    }
    return 0
  }
  checkDesk(desk: GameData3_12) {
    let listActive = desk.desk.filter((v, i) => desk.listDisabled.indexOf(i) == -1);
    if (listActive.length == 1) {
      // 合并为1堆即获胜
      return desk.player
    }
    return -1
  }

  checkAction(desk: GameData3_12, act: GameAction3_12) {
    if (!desk.desk[act.p1]) {
      return -1
    }
    if (!desk.desk[act.p2]) {
      return -1
    }
    let listIdxCanUse: number[] = []
    desk.desk.forEach((v, idx) => {
      if (desk.listDisabled.indexOf(idx) == -1) {
        listIdxCanUse.push(idx);
      }
    })
    let i1 = listIdxCanUse.indexOf(act.p1);
    let i2 = listIdxCanUse.indexOf(act.p2);
    if (i1 == -1 || i2 == -1) {
      return -1
    }
    if (Math.abs(i1 - i2) != 1) {
      return -1
    }
    return 0
  }
  doAction(deskIn: GameData3_12, act: GameAction3_12): [flag: number, desk: GameData3_12] {
    let desk: GameData3_12 = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk]
    }
    // 将1合并到2
    desk.desk[act.p2] = desk.desk[act.p2].concat(desk.desk[act.p1]);
    // 删除原来的1
    let scoreAdd = desk.desk[act.p2].length;
    desk.listDisabled.push(act.p1)
    desk.score += scoreAdd
    return [0, desk]
  }
  getActionAuto(desk: GameData3_12): any[] {
    let actionAll = this.getActionAll(desk);

    let playerSelf = desk.player as 1 | 2;
    let playerOppo = 3 - desk.player;
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let scoreWillAdd = desk.desk[act1Self.p1].length + desk.desk[act1Self.p2].length;
      act1Self.score += scoreWillAdd;

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
    if (actionAll.length >= 2) {
      return [actionAll[0], actionAll[1]]
    } else {
      return [actionAll[0], actionAll[0]]
    }
  }
  getActionAll(desk: GameData3_12): GameAction3_12[] {
    let listActionAll: GameAction3_12[] = []
    for (let i = 0; i < desk.desk.length; i++) {
      let act = new GameAction3_12()
      act.p1 = i;
      act.p2 = i + 1;
      if (this.checkAction(desk, act) != -1) {
        listActionAll.push(act);
      }
    }
    return listActionAll
  }
}