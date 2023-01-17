/**
 * @author qly
 * @updateTime 2022/11/26
 * @tip 一些说明blabla
 */
https://docs.qq.com/sheet/DUndTUG5KWldyVEZP?tab=BB08J2
// interface GameData {
//   lev: number
// }
console.log('in example')
export default class example {
  getRiddleByLev(lev: number, gameConfig: any) {
    console.log(1)
    console.log(2)
    return {
      lev
    }
  }
}


let ctr = new example();
let desk = ctr.getRiddleByLev(2, {})