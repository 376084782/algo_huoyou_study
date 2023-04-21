import { module10_12 } from "../module10_12";

async function test10_12() {
    let ctr = new module10_12();
    let desk = { "player": 2, "desk": [[0, 4, 4, 3], [0, 0, 3, 0], [0, 3, 0, 0], [3, 0, 0, 0]], "listLine1": [[[0, 3], [3, 0]]], "listLine2": [[[1, 0], [2, 0]]], "typeSet": 1 }
    let act = { "list": [[0, 0], [3, 3]], "score": 0 }

    let f = ctr.checkAction(desk, act);
    console.log('fffff', f)
}

test10_12()
