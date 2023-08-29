import RandomGenerater from "../../util/RandomGenerater";
let randomer = new RandomGenerater(1)
var _ = require('lodash');

export class GameData3_4 {
  player: number = 1;
  desk: number[][] = [];
  deskInited: number[][] = []
  typeSet: number = 1;
  isTrainMode: boolean = false;
  onlyAllDiff: boolean = false;
}
export class GameAction3_4 {
  color: number = 0;
  x: number = -1;
  y: number = -1;
  score: number = 0
}

export class module3_4 {
  getRiddle(count: number, blankCount = 1) {
    let desk = new GameData3_4();
    desk.desk = [];
    let idx = 0;
    // 等差数列求和：(首项+末项)*项数/2
    let total = (1 + count) * count / 2;

    for (let y = 0; y < count; y++) {
      let row: number[] = []
      for (let x = 0; x < count - y; x++) {
        idx++;
        if (idx <= total - blankCount) {
          if (y == 0) {
            // 如果是第一行随机
            row.push(randomer.RangeInteger(1, 4));
          } else {
            // 否则填上正确的颜色
            let ball1 = desk.desk[y - 1][x];
            let ball2 = desk.desk[y - 1][x + 1];
            console.log(ball1, ball2, x, desk.desk[y - 1])
            let r = -1;
            let fAllSame = ball1 == ball2;
            if (fAllSame) {
              r = ball1
            } else {
              let listColor = [1, 2, 3];
              listColor = listColor.filter(c => c != ball1 && c != ball2);
              r = listColor[0]
            }
            row.push(r);
          }
        } else {
          row.push(0)
        }
      }
      desk.desk.push(row);
    }
    desk.deskInited = _.cloneDeep(desk.desk);
    return desk;
  }
  checkRiddle(desk: GameData3_4) {
    if (desk.desk[desk.desk.length - 1][0] != 0) {
      return -1
    }
    return 0
  }
  getAnswer(deskIn: GameData3_4) {
    let desk: GameData3_4 = _.cloneDeep(deskIn);
    for (let y = 1; y < desk.desk.length; y++) {
      let row = desk.desk[y];
      for (let x = 0; x < row.length; x++) {
        let v = row[x];
        if (v <= 0) {
          // 获取这个球的上一行的两个球，判断是否符合规则
          let ball1 = desk.desk[y - 1][x];
          let ball2 = desk.desk[y - 1][x + 1];
          let r = -1;
          let fAllSame = ball1 == ball2;
          if (fAllSame) {
            r = ball1
          } else {
            let listColor = [1, 2, 3];
            listColor = listColor.filter(c => c != ball1 && c != ball2);
            r = listColor[0]
          }
          desk.desk[y][x] = r;
        }
      }
    }
    return desk;
  }
  getCountWrong(deskIn: GameData3_4) {
    let desk: GameData3_4 = _.cloneDeep(deskIn);
    let ques = this.getAnswer(desk);
    let countWrong = 0;
    // 检查所有球
    for (let y = 1; y < desk.desk.length; y++) {
      let row = desk.desk[y];
      for (let x = 0; x < row.length; x++) {
        let v = row[x];
        // let vInited = desk.deskInited[y][x];
        if (ques.desk[y][x] != v) {
          // 与最终答案不符合的算作错误
          countWrong++
        }
      }
    }
    return countWrong
  }
  getFinishedCount(deskIn: GameData3_4) {
    let desk: GameData3_4 = _.cloneDeep(deskIn);
    // 检查所有球
    let c = 0;
    for (let y = 1; y < desk.desk.length; y++) {
      let row = desk.desk[y];
      for (let x = 0; x < row.length; x++) {
        let v = row[x];
        if (v > 0) {
          // 还没有填色
          c++
        }
      }
    }
    return c
  }
  checkFinished(deskIn: GameData3_4) {
    let desk: GameData3_4 = _.cloneDeep(deskIn);
    // 检查所有球
    for (let y = 1; y < desk.desk.length; y++) {
      let row = desk.desk[y];
      for (let x = 0; x < row.length; x++) {
        let v = row[x];
        if (v == 0) {
          // 还没有填色
          return -1
        }
      }
    }
    return desk.player
  }
  checkDesk(deskIn: GameData3_4) {
    let desk: GameData3_4 = _.cloneDeep(deskIn);
    if (desk.isTrainMode) {
      // 如果是训练赛模式，只需要填最后的一个球
      let deskLastColor = desk.desk[desk.desk.length - 1][0];
      if (deskLastColor <= 0) {
        return -1
      } else {
        let deskCheck: GameData3_4 = _.cloneDeep(deskIn);
        deskCheck.desk[deskCheck.desk.length - 1][0] = 0;
        // 检查答案是否正确
        let ques = this.getAnswer(deskCheck);
        let colorTruth = ques.desk[ques.desk.length - 1][0];
        let isWin = colorTruth == deskLastColor
        console.log('isWin', isWin, colorTruth, deskLastColor)
        return isWin ? desk.player : 3 - desk.player
      }
    } else {
      // 检查所有球
      for (let y = 1; y < desk.desk.length; y++) {
        let row = desk.desk[y];
        for (let x = 0; x < row.length; x++) {
          let v = row[x];
          if (v == 0) {
            // 还没有填色
            return -1
          }
          // 获取这个球的上一行的两个球，判断是否符合规则
          let ball1 = desk.desk[y - 1][x];
          let ball2 = desk.desk[y - 1][x + 1];
          let fAllSame = ball1 == ball2 && v == ball1;
          let fAllDiff = ball1 != ball2 && ball1 != v && ball2 != v;
          if (!fAllSame && !fAllDiff) {
            return -1
          }
        }
      }
      return desk.player
    }
  }
  doAction(deskIn: GameData3_4, act: GameAction3_4): [flag: number, desk: GameData3_4] {
    let desk: GameData3_4 = _.cloneDeep(deskIn)
    let f = this.checkAction(desk, act);
    if (f == -1) {
      return [-1, desk]
    } else {
      desk.desk[act.y][act.x] = act.color;
      return [0, desk]
    }
  }
  checkAction(desk: GameData3_4, act: GameAction3_4) {
    if (act.color < 0 || act.color > 3) {
      return -1
    }
    if (desk.isTrainMode) {
      let isLastBall = (act.x == 0 && act.y == desk.desk.length - 1)
      if (!isLastBall) {
        return -1
      }
      return 0
    }
    if (desk.onlyAllDiff) {
      let { x, y } = act;
      if (act.y > 0) {
        let ball1 = desk.desk[y - 1][x];
        let ball2 = desk.desk[y - 1][x + 1];
        let allDiff = (act.color != ball1 && act.color != ball2 && ball1 != ball2)
        if (!allDiff) {
          return -1
        }
      }

      let ball1 = desk.desk[y][x - 1];
      let ball2 = desk.desk[y][x + 1];
      if (ball1 && ball1 == act.color) {
        return -1
      }
      if (ball2 && ball2 == act.color) {
        return -1
      }
    }
    
    return 0
  }
  getActionAuto(desk: GameData3_4): any[] {
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
  getActionAll(desk: GameData3_4): GameAction3_4[] {
    let listActionAll: GameAction3_4[] = []
    return listActionAll
  }
}