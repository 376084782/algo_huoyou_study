import moment from "moment";

var _ = require('lodash');

interface DataMonth7_2 {
  month: number;
  startDay: number;
  list: number[]
}

export class GameData7_2 {
  player: number = 1;
  desk: DataMonth7_2[] = [];
  startDay: number[] = [7, 10];
  endDay: number[] = [12, 31]
  typeSet: number = 1;
  // 每次可选择下一日或下一月（2）每次可以选择下1~2日或下1~2月
  offsetMax: number = 1;
}
export class GameAction7_2 {
  day: number[] = []
  score: number = 0
}
export class module7_2 {
  getRiddle(year: number) {
    let desk = new GameData7_2();
    let flagEnd = false
    let day = 0;
    let dateEnd = moment(year + '1231')
    while (!flagEnd) {
      let date = moment(year + '0101').add(day, 'days');
      let m = date.month() + 1;
      let dataMonth = desk.desk.find(e => e.month == m);
      if (!dataMonth) {
        let startDay = date.day()
        dataMonth = {
          month: m,
          list: [],
          startDay
        }
        desk.desk.push(dataMonth)
      }
      dataMonth.list.push(date.date());
      day++;
      flagEnd = date.dayOfYear() >= dateEnd.dayOfYear();
    }
    return desk;
  }
  checkRiddle(desk: GameData7_2) {
    let flagEnd = this.checkDesk(desk);
    if (flagEnd == -1) {
      return 0
    }
    return -1
  }
  checkDesk(desk: GameData7_2) {
    if (desk.startDay.join('-') == desk.endDay.join('-')) {
      return desk.player
    }
    return -1
  }

  checkAction(desk: GameData7_2, act: GameAction7_2) {
    let offset = act.day[1] - desk.startDay[1]
    if (offset == 0) {
      // 同一天，查看相隔几个月
      offset = act.day[0] - desk.startDay[0]
    }
    if (offset > desk.offsetMax || offset <= 0) {
      return -1
    }
    // 检查是否有这一天
    let dataMonth = desk.desk.find(e => e.month == act.day[0])
    if (!dataMonth || !dataMonth.list.find(dataDay => dataDay == act.day[1])) {
      return -1
    }
    return 0
  }
  doAction(deskIn: GameData7_2, act: GameAction7_2): [flag: number, desk: GameData7_2] {
    let desk = _.cloneDeep(deskIn)
    if (this.checkAction(desk, act) == -1) {
      return [-1, desk];
    }
    desk.startDay = _.cloneDeep(act.day);
    return [0, desk]
  }

  getActionAuto(desk: GameData7_2): any[] {

    let actionAll = this.getActionAll(desk);
    let listBetter: GameAction7_2[] = []
    // 推算所有可能性
    for (let i = 0; i < actionAll.length; i++) {
      let act1Self = actionAll[i];
      let [flagOppo, desk2Oppo] = this.doAction(desk, act1Self);
      let res = this.checkDesk(desk2Oppo);
      // 必胜,直接使用
      if (res == desk.player) {
        return [act1Self, act1Self]
      }
      // 按照策略筛选,抢占月+日为奇数的
      if ((act1Self.day[0] + act1Self.day[1]) % 2 == 1) {
        listBetter.push(act1Self)
      }
    }

    let listNotBetter = actionAll.filter(e => listBetter.filter(e2 => e2 == e).length == 0);
    // 增加一点随机性，避免计算机很呆都是走一样的地方从左往右放

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
  getActionAll(desk: GameData7_2): GameAction7_2[] {
    let listActionAll: GameAction7_2[] = [];
    for (let i = 0; i < desk.offsetMax; i++) {
      let offset = i + 1;
      // 下一天
      let day = [desk.startDay[0], desk.startDay[1] + offset]
      let actDay = new GameAction7_2();
      actDay.day = day;
      if (this.checkAction(desk, actDay) == 0) {
        listActionAll.push(actDay)
      }
      // 下一月
      let day2 = [desk.startDay[0] + offset, desk.startDay[1]]
      let actMonth = new GameAction7_2();
      actMonth.day = day2;
      if (this.checkAction(desk, actMonth) == 0) {
        listActionAll.push(actMonth)
      }
    }
    return listActionAll
  }
}