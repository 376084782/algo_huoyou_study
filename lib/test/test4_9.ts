import { module4_9 } from "../module4_9";


function test4_9() {
    let ctr = new module4_9();
    let desk = { "typeSet": 1, "desk": [[-1, 1, 0, 0, 0], [0, 0, 2, 1, 0], [0, 0, 2, 1, 0], [0, 0, 0, 0, -1]], "deskNum": [[-1, 5, 4, 3, 2], [1, 0, 1, 2, 3], [4, 5, 6, 7, 8], [9, 10, 11, 12, -1]], "player": 1 }

    // let pathAll = ctr.getAllPath(desk, 3, 0, true)
    let paths = ctr.getActionAuto(desk)
    console.log(paths, 'ppp')

    // for (let i = 0; i < 10; i++) {
    //   let res = ctr.randomNumByTarget(0)
    //   console.log(res)
    // }

}
  // test4_9()