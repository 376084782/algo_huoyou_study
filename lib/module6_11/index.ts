var _ = require('lodash');

export class GameData6_11 {
  desk: number[]
  player: number = 1;
  typeSet: number = 1;
  constructor(size: number) {
    this.desk = []
    for (let i = 1; i <= size; i++) {
      this.desk.push(i)
    }
  }
}
export class GameAction6_11 {
  moveIdx: number = -1
  toIdx: number = -1
}

export class module6_11 {
  randomRiddle(stepMax = 7) {
    let mapQuesAll: any = {};
    let listAll = [[1, 2, 3, 4, 5, 6, 7]]
    let step = 1;
    while (step < stepMax + 1) {
      let listAll2: number[][] = []
      listAll.forEach(listBack => {
        let l = this.randomRiddleEach(listBack);
        listAll2 = listAll2.concat(l);
      })
      let listNotSame: number[][] = []
      listAll2.forEach(e => {
        if (!mapQuesAll[e.join('_')]) {
          mapQuesAll[e.join('_')] = step;
          listNotSame.push(e)
        }
      })
      listAll = listNotSame;
      step++;
    }
    let arr: any = {};
    for (let ques in mapQuesAll) {
      let step = mapQuesAll[ques]
      if (!arr[step]) {
        arr[step] = []
      }
      if (arr[step].length < 100) {
        arr[step].push(ques.split('_').map(e => +e))
      }
    }
    return arr

  }
  randomRiddleEach(listBack: number[]) {
    let listAll = []
    // 随机取三张移动
    for (let moveIdx = 0; moveIdx < listBack.length - 3; moveIdx++) {
      for (let toIdx = 0; toIdx < listBack.length; toIdx++) {
        if (toIdx > moveIdx + 2 || toIdx < moveIdx - 1) {
          let desk = new GameData6_11(7);
          desk.desk = _.cloneDeep(listBack)
          let act = new GameAction6_11();
          act.toIdx = toIdx;
          act.moveIdx = moveIdx;
          let [flag, deskNew] = this.doAction(desk, act);
          listAll.push(deskNew.desk)
        }
      }
    }
    return listAll;
  }
  getRiddle(size: number) {
    if (size < 4) {
      size = 4
    }
    if (size > 10) {
      size = 10
    }
    return new GameData6_11(size);
  }
  checkRiddle(desk: GameData6_11) {
    if (desk.desk.length > 10) {
      return -1
    }
    if (desk.desk.length < 4) {
      return -1
    }
    return 0
  }
  checkAction(desk: GameData6_11, act: GameAction6_11) {
    if (act.toIdx <= act.moveIdx + 2 && act.toIdx >= act.moveIdx - 1) {
      return -1
    }
    return 0;
  }
  doAction(desk: GameData6_11, act: GameAction6_11): [flag: number, desk: GameData6_11] {
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk]
    }
    let deskNew = _.cloneDeep(desk);
    let listCard = deskNew.desk.slice(act.moveIdx, act.moveIdx + 3);
    // 插入
    deskNew.desk.splice(act.toIdx + 1, 0, ...listCard)
    // 然后删掉原先的
    if (act.toIdx < act.moveIdx) {
      // 插在前面，start+3
      deskNew.desk.splice(act.moveIdx + 3, 3)
    } else {
      // 插在后面，不影响原先的开始序号，直接删掉
      deskNew.desk.splice(act.moveIdx, 3)
    }
    return [1, deskNew]
  }
  checkDesk(desk: GameData6_11) {
    let listSorted = desk.desk.concat().sort((a, b) => a - b);
    for (let i = 0; i < desk.desk.length; i++) {
      let v = desk.desk[i];
      if (listSorted[i] != v) {
        return -1
      }
    }
    return desk.player
  }
}