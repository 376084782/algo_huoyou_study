import { module10_12 } from "../module10_12";

async function test10_12() {
    let ctr = new module10_12();
    let desk = { "player": 2, "desk": [[0, 0, 0, 0], [0, 0, 3, 0], [0, 3, 0, 4], [0, 0, 4, 0]], "listLine1": [[[1, 2], [2, 1]]], "listLine2": [[[2, 3], [3, 2]]], "typeSet": 1 }
    let act = { "list": [[2, 2], [3, 3]], "score": 0 }

    let f = ctr.checkAction(desk, act);
    console.log('fffff', f)
}

test10_12()
