var _ = require('lodash');

export class GameData5_2 {
  player: number = 1;
  pChess: number[] = [0, 0];
  pStart: number[] = [3, 0]
  pGoal: number[] = [7, 7];
  xMax = 8;
  yMax = 8;
  typeSet: number = 1;
}
export class GameAction5_2 {
  dir: number = 0;
  step: number = 2;
  score: number = 0
}
export class module5_2 {
  getRiddle() {
    let desk = new GameData5_2();
    return desk;
  }
  getRiddleLev() {
    let map = {
      1: [],
      2: [],
      3: []
    }
    return map
  }
  checkRiddle(desk: GameData5_2) {
    // 检查长宽
    if (desk.xMax <= 12 && desk.xMax >= 4 && desk.yMax <= 12 && desk.yMax >= 4) {
      // 检查初始位置和终点不重合
      if (desk.pStart.join('-') == desk.pGoal.join('-')) {
        return -1
      }
      return 0
    }
    return -1
  }
  checkDesk(desk: GameData5_2) {
    if (desk.pChess.join('-') == desk.pGoal.join('-')) {
      // 如果棋子位置和终点重合，获胜
      return desk.player
    }
    return -1
  }

  doAction(deskIn: GameData5_2, act: GameAction5_2): [flag: number, desk: GameData5_2] {
    let desk = _.cloneDeep(deskIn)
    let f = this.checkAction(desk, act);
    if (!f) {
      return [-1, desk]
    }
    let pEnd = this.getTargetPos(act.dir, act.step, desk.pChess);
    desk.pChess = pEnd;
    return [0, desk]
  }
  checkAction(desk: GameData5_2, act: GameAction5_2) {
    if (act.dir != 1 && act.dir != 2 && act.dir != 3) {
      return false
    }
    let [x, y] = this.getTargetPos(act.dir, act.step, desk.pChess)
    if (x < 0 || y < 0 || x > desk.xMax - 1 || y > desk.yMax - 1) {
      return false
    }
    return true
  }
  getTargetPos(dir: number, step: number, posStart: number[]) {
    // dir 12345678 从上开始顺时针数
    let pEnd = [posStart[0], posStart[1]];
    switch (dir) {
      case 1: {
        // +y
        pEnd[1] += step
        break
      }
      case 2: {
        // +x+y
        pEnd[1] += step
        pEnd[0] += step
        break
      }
      case 3: {
        // +x
        pEnd[0] += step
        break
      }
      case 4: {
        // +x -y
        pEnd[0] += step
        pEnd[1] -= step
        break
      }
      case 5: {
        //  -y
        pEnd[1] -= step
        break
      }
      case 6: {
        // -x -y
        pEnd[0] -= step
        pEnd[1] -= step
        break
      }
      case 7: {
        // -x 
        pEnd[0] -= step
        break
      }
      case 8: {
        // -x+y 
        pEnd[0] -= step
        pEnd[1] += step
        break
      }
    }
    return pEnd
  }
  getActionAuto(desk: GameData5_2): any[] {
    let actionAll = this.getActionAll(desk);

    let listBetter: GameAction5_2[] = [];
    let pOff = [[0, 0], [-2, -1], [-1, -2], [-5, -3], [-3, -5], [-7, -4], [-4, -7], [-10, -6], [-6, -10]];
    let pBetter: number[][] = [];
    pOff.forEach(([x1, y1]) => {
      pBetter.push([desk.pGoal[0] + x1, desk.pGoal[1] + y1])
    })

    actionAll.forEach(act => {
      let [flagOppo, desk2Oppo] = this.doAction(desk, act);
      if (pBetter.find(e => e.join('-') == desk2Oppo.pChess.join('-'))) {
        listBetter.push(act)
      }
    })

    let listNotBetter = actionAll.filter(e => listBetter.indexOf(e) == -1);

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
  getActionAll(desk: GameData5_2): GameAction5_2[] {
    let listActionAll: GameAction5_2[] = []
    let stepMax = Math.max(desk.xMax, desk.yMax)
    for (let dir = 1; dir <= 3; dir++) {
      // console.log(dir, 'dirrr')
      // 八个方向
      for (let step = 1; step <= stepMax; step++) {
        let act = new GameAction5_2();
        act.step = step;
        act.dir = dir
        let f = this.checkAction(desk, act);
        if (f) {
          listActionAll.push(act)
        } else {
          break
        }
      }
    }
    return listActionAll
  }
}