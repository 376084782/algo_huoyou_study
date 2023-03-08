
var _ = require('lodash');

const deskNum = [
  [-1, 5, 4, 3, 2],
  [1, 0, 1, 2, 3],
  [4, 5, 6, 7, 8],
  [9, 10, 11, 12, -1],
];
const deskDefault = [
  [-1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, -1],
];

export class GameData4_9 {
  desk: number[][] = []
  deskNum: number[][] = []
  count1: number = 0
  count2: number = 0
  constructor() {
    this.desk = _.cloneDeep(deskDefault)
    this.deskNum = _.cloneDeep(deskNum)
  }
}
export class GameAction4_9 {
  numList: number[] = []
  pos: number[] = []
}

export class Algo4_9 {
  getRiddle() {
    return new GameData4_9();
  }



}