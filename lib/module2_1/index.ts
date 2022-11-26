/**
 * @author qly
 * @updateTime 2022/11/26
 * @tip 一些说明blabla
 */

interface GameData {
  lev: number
}
export default class module2_1 {
  getRiddleByLev(lev: number, gameConfig: any): GameData {
    return {
      lev
    }
  }
}