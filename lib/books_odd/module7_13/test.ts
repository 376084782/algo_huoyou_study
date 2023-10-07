import { module7_13 } from ".";
import { FileWriter } from "../../common/FileWriter";

let ctr = new module7_13()
function test() {
    let desk = ctr.getRiddle(11);
    desk.desk = [
                                        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                                     [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
                                  [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
                               [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
                            [0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
                         [0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0],
                      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                   [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 2, 2, 0, 0, 0, 0],
    ]
    // desk.options = [2, 3, 5]
    let f = ctr.checkDesk(desk);
    console.log(f);
}

test()


