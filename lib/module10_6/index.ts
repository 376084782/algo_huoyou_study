
var _ = require('lodash');
import RandomGenerater from '../util/RandomGenerater';
let randomer = new RandomGenerater(0);
export interface DataAngle10_6 { idx: number, color: number, value: number, initColor: number, initValue: number }
export class GameData10_6 {
  desk: DataAngle10_6[] = [];
  colorList: number[] = []
  valueList: number[] = []
  player: number = 1;
  typeSet: number = 1;
  constructor() {
    this.colorList = [1, 2, 3, 4, 5]
    for (let i = 1; i <= 30; i++) {
      this.valueList.push(i)
    }
  }
}
export class Algo10_6 {

  colorList = [{
    name: '灰',
    id: 0,
    value: '#bcc1bf'
  }, {
    name: '红',
    id: 1,
    value: '#fe6161'
  }, {
    name: '绿',
    id: 2,
    value: '#4bde8b'
  }, {
    name: '蓝',
    id: 3,
    value: '#48c2ff'
  }, {
    name: '黄',
    id: 4,
    value: '#ffda58'
  }, {
    name: '紫',
    id: 5,
    value: '#b075fe'
  }]

  getColorHex(id: number) {
    let colorConfig = this.colorList.find(e => e.id == id)
    if (colorConfig) {
      return colorConfig.value;
    }
  }
  createBlankGameData(count: number) {
    let desk = new GameData10_6();
    desk.desk = []
    for (let i = 0; i < count; i++) {
      desk.desk.push({
        idx: i,
        color: 0,
        value: 0,
        initColor: 0,
        initValue: 0
      })
    }
    return desk;
  }

  getColorConfig(id: number) {
    let colorConfig = this.colorList.find(e => e.id == id)
    return colorConfig
  }

  getRiddle() {
    let desk = new GameData10_6();
    desk.desk = [{
      idx: 0,
      color: 2, value: 1,
      initColor: 2, initValue: 1
    }, {
      idx: 1,
      color: 2, value: 2,
      initColor: 2, initValue: 2
    }, {
      idx: 2,
      color: 3, value: 2,
      initColor: 3, initValue: 2
    }, {
      idx: 3,
      color: 0, value: 2,
      initColor: 0, initValue: 2
    }, {
      idx: 4,
      color: 3, value: 0,
      initColor: 3, initValue: 0
    }]
    return desk;
  }
  checkDesk(desk: GameData10_6) {
    for (let i = 0; i < desk.desk.length; i++) {
      let conf = desk.desk[i];
      let idxNext = i + conf.value;
      idxNext = idxNext % desk.desk.length;
      let confNext = desk.desk[idxNext];
      if (confNext.color != conf.color || conf.color == 0 || conf.value == 0) {
        return false
      }
    }
    return true
  }
  checkRiddle(desk: GameData10_6) {
    let finish = this.checkDesk(desk);
    if (finish) {
      return -1
    }
    for (let i = 0; i < desk.desk.length; i++) {
      let conf = desk.desk[i];
      if (conf.color == 0 && conf.value == 0) {
        // 每个环不能颜色和数字都未定义
        return -1
      }
    }
    return 0

  }
  doAction(desk: GameData10_6, action: GameData10_6): [number, GameData10_6] {
    return [0, action]
  }
  checkAction(desk: GameData10_6, action: GameData10_6) {
    return 0
  }
  getActionAuto(desk: GameData10_6) {
    return undefined
  }

  // 随机生成完美题目
  getRiddleByLev(count: number, stepList: number[]) {
    // 随机生成构造
    let desk = this.createBlankGameData(count);

    // 将三角随机分堆，每堆数量至少为1，最大为总数的一半
    let mapDui: DataAngle10_6[][] = []
    let sanjiaoLeft: DataAngle10_6[] = _.cloneDeep(desk.desk);
    sanjiaoLeft.forEach((conf, idx) => {
      conf.idx = idx
    });
    sanjiaoLeft = _.shuffle(sanjiaoLeft)
    let max = Math.ceil(sanjiaoLeft.length / 2)
    while (sanjiaoLeft.length > 0) {
      if (sanjiaoLeft.length < max) {
        max = sanjiaoLeft.length
      }
      let count = randomer.RangeInteger(2, max);
      // 如果剩下的一堆只剩下1个了，直接并到这一堆
      if (sanjiaoLeft.length == count + 1) {
        count++
      }
      let listWillCut = sanjiaoLeft.splice(0, count);
      mapDui.push(listWillCut.sort((a, b) => a.idx - b.idx))
    }


    // 根据堆数量随机颜色，将环颜色填满
    let colorCount = mapDui.length;
    let colorAll = _.shuffle(desk.colorList);
    let colorListUse = colorAll.slice(0, colorCount)

    let listRes: DataAngle10_6[] = []
    mapDui.forEach((listAngle, idxDui) => {
      let color = colorListUse[idxDui];
      listAngle.forEach((e, idxAngle) => {
        e.color = color;
        e.initColor = color;
        let idxNext = idxAngle + 1;
        if (idxNext > listAngle.length - 1) {
          idxNext = 0;
        }
        let dataNext = listAngle[idxNext];
        let idxOffset = dataNext.idx - e.idx;
        if (idxOffset < 0) {
          idxOffset += count
        }
        e.value = idxOffset;
        e.initValue = e.value
        listRes.push(e);
      })
    })

    // 分3组，删颜色，删数字，不删
    let step = randomer.RangeInteger(stepList[0], stepList[1] + 1)
    // 至少保留两个颜色
    let delColorCount = randomer.RangeInteger(0, listRes.length - 1)
    let listWillDelColor = listRes.splice(1, delColorCount);
    let delValueCount = step - delColorCount;
    let listWillDelValue = listRes.splice(0, delValueCount);
    // 删除部分颜色
    listWillDelColor.forEach(e => {
      e.color = 0;
      e.initColor = 0;
    })
    listWillDelValue.forEach(e => {
      e.value = 0;
      e.initValue = 0;
    })

    // 删完再合并回去
    listRes = listRes.concat(listWillDelColor, listWillDelValue);
    // 然后排个序
    listRes = listRes.sort((a, b) => a.idx - b.idx)

    desk.desk = listRes;
    return desk

  }
}