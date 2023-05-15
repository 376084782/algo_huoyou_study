
var _ = require('lodash');
import { FileWriter } from '../common/FileWriter';
import RandomGenerater from '../util/RandomGenerater';
let randomer = new RandomGenerater(0);
export class GameData4_16 {
  desk: number[][] = [];
  numInited: number[][] = []
  colorMap: number[][] = []
  player: number = 1;
  typeSet: number = 1;
  constructor() {
  }
}

export class GameTreeNode {
  isFinished: boolean = false;
  data: GameData4_16 = new GameData4_16();
  children: GameTreeNode[] = []
  id: any = ''
  parentId: any = ''
  constructor() {
  }
}
export class module4_16 {
  createBlankGameData(count: number) {
    let desk = new GameData4_16();
    // 随机颜色区域，按照四组棋盘大小写好颜色分区
    if (count == 6) {
      desk.colorMap = [
        [1, 1, 1, 2, 2, 2],
        [1, 1, 5, 5, 2, 2],
        [1, 5, 5, 5, 5, 2],
        [3, 6, 6, 6, 6, 4],
        [3, 3, 6, 6, 4, 4],
        [3, 3, 3, 4, 4, 4]
      ]
    } else if (count == 7) {
      desk.colorMap = [
        [1, 1, 1, 2, 2, 2, 2],
        [1, 1, 1, 1, 2, 2, 2],
        [3, 3, 3, 4, 5, 5, 5],
        [3, 3, 4, 4, 4, 5, 5],
        [3, 3, 4, 4, 4, 5, 5],
        [6, 6, 6, 6, 7, 7, 7],
        [6, 6, 6, 7, 7, 7, 7]
      ]
    } else if (count == 8) {
      desk.colorMap = [
        [1, 2, 2, 2, 3, 3, 3, 4],
        [1, 2, 2, 2, 3, 3, 3, 4],
        [1, 1, 1, 2, 3, 4, 4, 4],
        [1, 1, 1, 2, 3, 4, 4, 4],
        [5, 6, 6, 6, 7, 7, 7, 8],
        [5, 6, 6, 6, 7, 7, 7, 8],
        [5, 5, 5, 6, 7, 8, 8, 8],
        [5, 5, 5, 6, 7, 8, 8, 8],
      ]
    } else if (count == 9) {
      desk.colorMap = [
        [1, 1, 1, 1, 2, 3, 3, 3, 3],
        [1, 1, 1, 2, 2, 2, 3, 3, 3],
        [1, 1, 2, 2, 2, 2, 2, 3, 3],
        [4, 4, 5, 5, 5, 5, 5, 6, 6],
        [4, 4, 4, 5, 5, 5, 6, 6, 6],
        [4, 4, 4, 4, 5, 6, 6, 6, 6],
        [7, 7, 7, 7, 8, 9, 9, 9, 9],
        [7, 7, 7, 8, 8, 8, 9, 9, 9],
        [7, 7, 8, 8, 8, 8, 8, 9, 9]
      ]
    }

    desk.desk = []
    for (let y = 0; y < count; y++) {
      let row = []
      for (let x = 0; x < count; x++) {
        row.push(0)
      }
      desk.desk[y] = row;
    }
    desk.numInited = _.cloneDeep(desk.desk);
    return desk;
  }

  getRiddle() {
    let desk = this.createBlankGameData(6);
    desk.desk = [
      [1, 0, 0, 0, 0, 2],
      [6, 0, 5, 0, 1, 0],
      [0, 0, 2, 0, 6, 4],
      [2, 1, 4, 5, 0, 6],
      [0, 5, 0, 0, 0, 0],
      [4, 0, 1, 0, 2, 0]
    ];
    desk.numInited = _.cloneDeep(desk.desk);
    return desk;
  }
  checkByList(l: number[], withZero = false) {
    let lWithoutZero = l.filter(e => e != 0);
    let listUniq = _.uniq(lWithoutZero);
    if (listUniq.length != lWithoutZero.length) {
      console.log(listUniq, lWithoutZero)
      return false
    }
    if (!withZero) {
      if (l.some(e => e == 0)) {
        return false
      }
    }
    return true
  }
  checkDesk(desk: GameData4_16) {
    let size = desk.desk.length;
    // 每行每列的数字不能重复且不能有0
    for (let y = 0; y < size; y++) {
      let listRow = desk.desk[y];
      let listCol = desk.desk.map(e => e[y]);
      if (!this.checkByList(listRow)) {
        return false
      }
      if (!this.checkByList(listCol)) {
        return false
      }
    }
    // 每个区域的数字不能重复且不能有0
    let listColorMap: any = {};
    desk.colorMap.forEach((r, y) => {
      r.forEach((color, x) => {
        if (!listColorMap[color]) {
          listColorMap[color] = []
        }
        listColorMap[color].push(desk.desk[y][x])
      })
    })
    for (let color in listColorMap) {
      let list = listColorMap[color];
      if (!this.checkByList(list)) {
        return false
      }
    }

    return true
  }
  checkRiddle(desk: GameData4_16) {
    let size = desk.desk.length;
    // 每行每列的数字不能重复且不能有0
    for (let y = 0; y < size; y++) {
      let listRow = desk.desk[y];
      let listCol = desk.desk.map(e => e[y]);
      if (!this.checkByList(listRow, true)) {
        return false
      }
      if (!this.checkByList(listCol, true)) {
        return false
      }
    }
    // 每个区域的数字不能重复且不能有0
    let listColorMap: any = {};
    desk.colorMap.forEach((r, y) => {
      r.forEach((color, x) => {
        if (!listColorMap[color]) {
          listColorMap[color] = []
        }
        listColorMap[color].push(desk.desk[y][x])
      })
    })
    for (let color in listColorMap) {
      let list = listColorMap[color];
      if (!this.checkByList(list, true)) {
        return false
      }
    }
    return true
  }
  doAction(desk: GameData4_16, action: GameData4_16): [number, GameData4_16] {
    return [0, action]
  }
  checkAction(desk: GameData4_16, action: GameData4_16) {
    return 0
  }
  getActionAuto(desk: GameData4_16) {
    return [desk, desk]
  }

  // 随机生成完美题目
  getRiddleByLev(lev: number): GameData4_16 {
    // 10,16,22
    let numMap: any = { 1: 10, 2: 16, 3: 22 };
    // 随机选择一个区域，按照顺序填入5个数字，然后依次随机获取唯一位置把数字填满
    let desk = this.createBlankGameData(6);
    let step = numMap[lev];
    // 将桌面位置分区
    let size = desk.desk.length;

    let listArea1: string[][] = []
    // 按照行
    for (let x = 0; x < size; x++) {
      let r: string[] = []
      listArea1.push(r);
      for (let y = 0; y < size; y++) {
        r.push(`${x},${y}`)
      }
    }

    let listArea2: string[][] = []
    // 按照行
    for (let y = 0; y < size; y++) {
      let r: string[] = []
      listArea2.push(r);
      for (let x = 0; x < size; x++) {
        r.push(`${x},${y}`)
      }
    }

    let listArea3: string[][] = []
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let color = desk.colorMap[y][x] - 1;
        if (!listArea3[color]) {
          listArea3[color] = []
        }
        listArea3[color].push(`${x},${y}`)
      }
    }

    // 随机一行或一列填入6个数字，然后依次求解，解出整个盘
    let listAll = listArea1.concat(listArea2);
    let idx = randomer.RangeInteger(0, listAll.length);
    let l = listAll[idx]
    let lAll = [];
    for (let i = 0; i < size; i++) {
      lAll.push(i + 1)
    }
    let listShuffle = _.shuffle(lAll);

    for (let i = 0; i < size; i++) {
      let e = l[i];
      let [x, y] = e.split(',').map(e => +e);
      desk.desk[y][x] = listShuffle[i];
    }

    let listTree: GameTreeNode[] = [];
    let listTreeKai: GameTreeNode[] = []

    let needCheckCount = false;
    let checkCount = 0;
    let checkCountFinish = 1000
    let dataLast: any = new GameTreeNode();
    dataLast.id = checkCount;
    dataLast.data = _.cloneDeep(desk);
    dataLast.parentId = 'root'
    listTree.push(dataLast)
    listTreeKai.push(dataLast);
    let listDeskCanUse = []
    while ((!needCheckCount || checkCount < checkCountFinish) && !!dataLast && !dataLast.isFinished && listDeskCanUse.length <= 10) {
      // 获取树结构的最后一级，继续往下遍历
      let y = desk.desk.findIndex(e => e.indexOf(0) > -1);
      let x = desk.desk[y]?.findIndex(e => e == 0);
      if (desk.desk[y] && desk.desk[y][x] == 0) {
        let area1 = listArea1.find(e => e.indexOf(`${x},${y}`) > -1) as string[];
        let area2 = listArea2.find(e => e.indexOf(`${x},${y}`) > -1) as string[];
        let area3 = listArea3.find(e => e.indexOf(`${x},${y}`) > -1) as string[];
        let listAll = _.uniq(area1?.concat(area2, area3))
        let listNumGot: number[] = [];
        listAll.forEach((str: string) => {
          let [x, y] = str.split(',').map(e => +e);
          let n = desk.desk[y][x];
          if (n > 0) {
            listNumGot.push(n);
          }
        })
        let listNumCanPut = lAll.filter(e => listNumGot.indexOf(e) == -1);
        if (listNumCanPut.length == 0) {
          dataLast.isFinished = true;
        } else {
          for (let i = 0; i < listNumCanPut.length; i++) {
            let n = listNumCanPut[i];
            let dd = _.cloneDeep(desk);
            dd.desk[y][x] = n;
            let dataTree = new GameTreeNode();
            dataTree.id = checkCount;
            dataTree.data = dd;
            dataTree.parentId = dataLast.id;
            dataLast.children.push(dataTree)
            listTreeKai.push(dataTree)
            dataLast.isFinished = true;
          }
        }
      } else {
        dataLast.isFinished = true;
      }

      checkCount++;
      dataLast = this.getTreeLast(listTreeKai);
      if (dataLast && !dataLast.isFinished) {
        desk = dataLast.data
        console.log('正在处理的桌面' + checkCount, desk.desk,)
        let f = this.checkDesk(desk)
        if (f) {
          listDeskCanUse.push(desk)
        }
      }

    }
    this.logData(listDeskCanUse)


    return desk

  }

  async logData(data: any) {
    await FileWriter.setFile(
      `./train/4-16/log.json`,
      JSON.stringify(data)
    );
  }
  getTreeLast(list: GameTreeNode[]) {
    if (list.length == 0) {
      return undefined
    }

    let dd = list.find((e: any) => !e.isFinished) as GameTreeNode;

    return dd;
  }
}