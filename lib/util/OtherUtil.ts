import { GameStep, GameWay } from "../common/pojo";

export default class OtherUtil {

  static getRival(person: number): number {
    return person == 1 ? 2 : 1
  }


  // static getTreeShortestWinWay(step: GameStep): GameStep {
  //   let result: GameStep =null 
  //   return result
  // }

  static getTreeWays(step: GameStep): GameWay[] {
    let result: GameWay[] = []
    step.nexts.forEach(item => {
      let childs: GameStep[] = item.dip();
      childs.forEach(child => {
        result.push(new GameWay(item.current, child))
      })
    })
    return result
  }


}