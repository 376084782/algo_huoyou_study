import RandomGenerater from "../../util/RandomGenerater";

var _ = require('lodash');
let randomer = new RandomGenerater(1)
export class Pos7_6 {
  x: number = -1;
  y: number = -1;
  z: number = -1;
}
export class GameData7_6 {
  player: number = 1;
  curNum: number = 0;
  targetNum: number = 31;
  randomStart: boolean = false;
  // 三维坐标描述每一个数字
  rotateList: number[] = [];
  desk: any = {
    // 前
    1: { x: 0, y: 1, z: 0 },
    // 上
    5: { x: 0, y: 0, z: 1 },
    // 右
    3: { x: 1, y: 0, z: 0 },
    // 左
    4: { x: -1, y: 0, z: 0 },
    // 下
    2: { x: 0, y: 0, z: -1 },
    // 后
    6: { x: 0, y: -1, z: 0 }
  }

  typeSet: number = 1;
}
export class GameAction7_6 {
  // 上下左右 1234
  dir: number = 0
  score: number = 0
}
export class module7_6 {
  getRiddle(count: number) {
    let desk = new GameData7_6();
    desk.randomStart = count < 1;
    if (count < 1) {
      // 随机一个开始数
      count = randomer.RangeInteger(1, 7);
    }

    if (count == 2) {
      // 往上翻两下
      this.doRotate(1, desk);
      this.doRotate(1, desk);
    } else if (count == 1) {
      // 往上翻
      this.doRotate(1, desk);
    } else if (count == 3) {
      // 往左翻
      this.doRotate(3, desk);
    } else if (count == 4) {
      // 往右翻
      this.doRotate(4, desk);
    } else if (count == 5) {
    } else if (count == 6) {
      // 往下翻
      this.doRotate(2, desk);
    }
    return desk;
  }
  doRotate(dir: number, desk: GameData7_6) {
    desk.rotateList.push(dir);
    for (let num in desk.desk) {
      let p = desk.desk[num] as Pos7_6;
      let pOld = _.cloneDeep(p);
      switch (dir) {
        case 1: {
          // 上 : z->-y  x不变 y->z
          p.y = -pOld.z;
          p.z = pOld.y
          break
        }
        case 2: {
          // 下 : z>y  y>-z x不变
          p.y = pOld.z;
          p.z = -pOld.y
          break
        }
        case 3: {
          // 左 : z>-x x>z y不变
          p.x = -pOld.z;
          p.z = pOld.x
          break
        }
        case 4: {
          // 右 : z>x x>-z y不变
          p.x = pOld.z;
          p.z = -pOld.x
          break
        }
      }
    }
  }
  checkRiddle(desk: GameData7_6) {
    return 0
  }
  checkDesk(desk: GameData7_6) {
    if (desk.curNum > desk.targetNum) {
      return 3 - desk.player;
    } else if (desk.curNum == desk.targetNum) {
      return desk.player
    }
    return -1
  }
  checkAction(desk: GameData7_6, act: GameAction7_6) {
    if (act.dir < 1 || act.dir > 4) {
      return -1
    }
    return 0
  }
  doAction(deskIn: GameData7_6, act: GameAction7_6): [flag: number, desk: GameData7_6] {
    let desk: GameData7_6 = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk];
    }
    // 旋转更新数字坐标
    this.doRotate(act.dir, desk);
    // 获取最顶上的数字，累加
    let numUp = this.getNumUp(desk);
    desk.curNum += numUp;
    return [0, desk]
  }
  getNumUp(desk: GameData7_6) {
    for (let num in desk.desk) {
      let p = desk.desk[num];
      if (p.x == 0 && p.y == 0 && p.z == 1) {
        return +num
      }
    }
    return 0
  }
  getActionAuto(desk: GameData7_6): any[] {
    let actionAll = this.getActionAll(desk);
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let [flagOppo, desk2Oppo] = this.doAction(desk, act1Self);
      let actionAllOppo = this.getActionAll(desk2Oppo);
      // 放之后对方可行棋子为0，说明必胜,直接使用
      if (actionAllOppo.length == 0) {
        return [act1Self, act1Self]
      }
      if (actionAll.length < 40) {
        // 可放的方式不多，有制胜局的可能性，多考虑一步
        for (let m = 0; m < actionAllOppo.length; m++) {
          let act1Oppo = actionAllOppo[m];
          let [flagSelf, desk2Self] = this.doAction(desk2Oppo, act1Oppo);
          let actionAllSelf2 = this.getActionAll(desk2Self);
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
      return [actionAll[0], actionAll[1]]
    } else {
      return [actionAll[0], actionAll[0]]
    }
  }
  getActionAll(desk: GameData7_6): GameAction7_6[] {
    let listActionAll: GameAction7_6[] = [];
    for (let dir = 1; dir < 5; dir++) {
      let act = new GameAction7_6()
      act.dir = dir;
      listActionAll.push(act);
    }
    return listActionAll
  }
}