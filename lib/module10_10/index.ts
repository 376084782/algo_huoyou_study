

var _ = require('lodash');
export class DataBlock10_10 {
    id: number = 1;
    points: number[] = [];
    color: number = 0;
    colorEnd: number[] = [];
    // 相邻的块
    blockNeighbour: number[] = []
    order: number = 0
    blockOrder1: number[] = []
    blockOrder2: number[] = []
}
export class GameData10_10 {
    desk: DataBlock10_10[] = [{
        id: 1,
        points: [1, 2, 18, 17, 28, 16],
        blockNeighbour: [2, 9, 12, 8],
        blockOrder1: [2, 9, 12, 8],
        blockOrder2: [8, 12, 9, 2],
        color: 0,
        order: 1,
        colorEnd: [1, 2],
    }, {
        id: 2,
        points: [2, 3, 4, 18, 19],
        blockNeighbour: [3, 9, 1],
        blockOrder1: [3, 9, 1],
        blockOrder2: [9, 1, 3],
        color: 0,
        order: 1,
        colorEnd: [2],
    }, {
        id: 3,
        points: [4, 5, 6, 19, 20, 21],
        blockNeighbour: [2, 9, 10, 4],
        blockOrder1: [4, 10, 9, 2],
        blockOrder2: [4, 10, 9, 2],
        color: 0,
        order: 1,
        colorEnd: [3, 2]
    }, {
        id: 4,
        points: [6, 7, 8, 21, 22],
        blockNeighbour: [3, 10, 5],
        blockOrder1: [3, 10, 5],
        blockOrder2: [5, 10, 3],
        color: 0,
        order: 1,
        colorEnd: [3]
    }, {
        id: 5,
        points: [8, 9, 10, 22, 23, 24],
        blockNeighbour: [4, 10, 11, 6],
        blockOrder1: [4, 10, 11, 6],
        blockOrder2: [4, 10, 11, 6],
        color: 0,
        order: 1,
        colorEnd: [3, 4]
    }, {
        id: 6,
        points: [10, 11, 12, 24, 25],
        blockNeighbour: [11, 5, 7],
        blockOrder1: [5, 11, 7],
        blockOrder2: [11, 5, 7],
        color: 0,
        order: 1,
        colorEnd: [4]
    }, {
        id: 7,
        points: [12, 13, 14, 25, 26, 27],
        blockNeighbour: [6, 11, 12, 8],
        blockOrder1: [6, 11, 12, 8],
        blockOrder2: [6, 11, 12, 8],
        color: 0,
        order: 1,
        colorEnd: [1, 4]
    }, {
        id: 8,
        points: [14, 15, 16, 27, 28],
        blockNeighbour: [1, 12, 7],
        blockOrder1: [12, 7, 1],
        blockOrder2: [7, 12, 1],
        color: 0,
        order: 1,
        colorEnd: [1]
    }, {
        id: 9,
        points: [17, 18, 19, 20, 29, 30, 31],
        blockNeighbour: [1, 2, 10, 14, 13, 12, 3],
        blockOrder1: [3, 10, 14, 2, 13, 1, 12],
        blockOrder2: [13, 14, 12, 10, 1, 3, 2],
        color: 0,
        order: 2,
        colorEnd: []
    }, {
        id: 10,
        points: [20, 21, 22, 23, 31, 32, 33],
        blockNeighbour: [9, 3, 4, 5, 11, 15, 14],
        blockOrder1: [4, 3, 5, 9, 11, 14, 15],
        blockOrder2: [5, 11, 15, 4, 14, 9, 3],
        color: 0,
        order: 2,
        colorEnd: []
    }, {
        id: 11,
        points: [23, 24, 25, 26, 33, 34, 35],
        blockNeighbour: [16, 15, 10, 5, 6, 7, 12],
        blockOrder1: [5, 10, 6, 15, 16, 7, 12],
        blockOrder2: [6, 5, 7, 12, 10, 16, 15],
        color: 0,
        order: 2,
        colorEnd: []
    }, {
        id: 12,
        points: [26, 27, 28, 17, 29, 35, 36],
        blockNeighbour: [9, 13, 16, 11, 7, 8, 1],
        blockOrder1: [13, 16, 9, 11, 1, 7, 8],
        blockOrder2: [7, 11, 8, 16, 13, 9, 1],
        color: 0,
        order: 2,
        colorEnd: []
    }, {
        id: 13,
        points: [37, 40, 30, 29, 36],
        blockNeighbour: [9, 14, 17, 16, 12],
        blockOrder1: [14, 17, 9, 16, 12],
        blockOrder2: [16, 12, 17, 14, 9],
        color: 0,
        order: 3,
        colorEnd: []
    }, {
        id: 14,
        points: [30, 31, 32, 37, 38],
        blockNeighbour: [9, 10, 15, 17, 13],
        blockOrder1: [10, 9, 15, 17, 13],
        blockOrder2: [15, 10, 17, 13, 9],
        color: 0,
        order: 3,
        colorEnd: []
    }, {
        id: 15,
        points: [38, 39, 32, 33, 34],
        blockNeighbour: [17, 14, 10, 11, 16],
        blockOrder1: [10, 11, 14, 16, 17],
        blockOrder2: [11, 10, 16, 17, 14],
        color: 0,
        order: 3,
        colorEnd: []
    }, {
        id: 16,
        points: [39, 40, 34, 35, 36],
        blockNeighbour: [17, 15, 11, 12, 13],
        blockOrder1: [15, 11, 17, 13, 12],
        blockOrder2: [11, 12, 15, 17, 13],
        color: 0,
        order: 3,
        colorEnd: []
    }, {
        id: 17,
        points: [37, 38, 39, 40, 41],
        blockNeighbour: [13, 14, 15, 16],
        blockOrder1: [14, 15, 13, 16],
        blockOrder2: [15, 16, 13, 14],
        color: 0,
        order: 4,
        colorEnd: []
    }];
    points1 = [];
    points2 = [];
    typeSet: number = 1
    player: number = 1;
}

export class module10_10 {
    getRiddle() {
        return new GameData10_10()
    }
    checkRiddle(desk: GameData10_10) {
        if (desk.points1.length != desk.points2.length) {
            return -1
        }
        //验证不能直接获胜
        let flagWin = this.checkDesk(desk);
        if (flagWin > -1) {
            return -1
        }
    }
    checkDesk(desk: GameData10_10) {
        let win1 = this.checkColorWin(1, desk);
        if (win1) {
            return 1
        }
        let win2 = this.checkColorWin(2, desk);
        if (win2) {
            return 2
        }
        return -1
    }
    checkColorWin(color: number, desk: GameData10_10) {
        let winPath = this.getWinPath(color, desk);
        return !!winPath;
    }
    checkAction(desk: GameData10_10, action: number) {
        let pointsAll: number[] = [].concat(desk.points1, desk.points2)
        if (pointsAll.indexOf(action) > -1) {
            return -1
        }
        return 0
    }
    doAction(desk: GameData10_10, action: number): { flag: number, desk: GameData10_10 } {
        if (this.checkAction(desk, action) == -1) {
            return {
                flag: -1, desk: desk
            }
        }
        let deskNew = _.cloneDeep(desk);
        if (deskNew.player == 1) {
            deskNew.points1.push(action);
        } else {
            deskNew.points2.push(action);
        }
        this.updateDeskBlockStatus(deskNew);
        return {
            flag: 0,
            desk: deskNew
        }
    }

    getActionAuto(desk: GameData10_10) {
        // 遍历得出所有可以放的位置
        let listActions: { action: number, score: number }[] = [];
        let listAllP: number[] = [].concat(desk.points1, desk.points2)
        let playerOppo = desk.player == 1 ? 2 : 1
        let listPathBestBefore: number[][] = this.getWinPath(desk.player, desk, true, true) || [];
        let listPathOppoBestBefore: number[][] = this.getWinPath(playerOppo, desk, true, true) || [];
        for (let i = 0; i < 41; i++) {
            let idPoint = i + 1;
            if (listAllP.indexOf(idPoint) == -1) {
                let actionSet = {
                    action: idPoint,
                    score: 0
                }
                listActions.push(actionSet);
                // 如果这个点走了之后对方马上会赢，先抢了
                let deskOppo = _.cloneDeep(desk);
                deskOppo.player = 3 - desk.player;
                let { flag: flagOppo, desk: deskAfterOppo } = this.doAction(deskOppo, actionSet.action);
                let isWinOppo = this.checkColorWin(deskOppo.player, deskAfterOppo);
                if (isWinOppo) {
                    return {
                        best: actionSet.action,
                        nobest: actionSet.action
                    }
                }

                // 如果走了之后自己可以获胜,直接返回这个走法
                let { flag, desk: deskAfter } = this.doAction(desk, actionSet.action);
                let isWin = this.checkColorWin(desk.player, deskAfter);
                if (isWin) {
                    return {
                        best: actionSet.action,
                        nobest: actionSet.action
                    }
                }
                // 不能马上获胜,尝试计分排一下所有走法,用得分最高的
                // 如果走了之后对方获胜了,减100分
                let isOppoWin = this.checkColorWin(desk.player == 1 ? 2 : 1, desk);
                if (isOppoWin) {
                    actionSet.score -= 100;
                }

                listPathBestBefore.forEach(pathBestBefore => {
                    // 对于自己
                    // 这个点在我需要的最短路径上
                    let listBlockMostNeed = desk.desk.filter(e => pathBestBefore.indexOf(e.id) > -1 && e.color == 0);
                    listBlockMostNeed.forEach(e => {
                        if (e.points.indexOf(actionSet.action) > -1) {
                            let list1 = desk.points1.filter(p1 => e.points.indexOf(p1) > -1)
                            let list2 = desk.points2.filter(p2 => e.points.indexOf(p2) > -1)
                            let countSelf = desk.player == 1 ? list1.length : list2.length
                            let countOppo = desk.player == 1 ? list2.length : list1.length
                            if (desk.player == 1 && countSelf >= countOppo) {
                                // 先手优先放
                                actionSet.score += 1;
                            }
                            if (listBlockMostNeed.length <= 2) {
                                // 没有被占领的+10
                                actionSet.score += 5;
                                if (countSelf == countOppo && countSelf > 0) {
                                    // 相同占领数量的块额外+10
                                    actionSet.score += 10;
                                }
                            }
                        }
                    })
                });


                listPathOppoBestBefore.forEach(pathOppoBestBefore => {
                    // 这个点在对方需要的最短路径上
                    let listBlockOppoMostNeed = desk.desk.filter(e => pathOppoBestBefore.indexOf(e.id) > -1 && e.color == 0);
                    listBlockOppoMostNeed.forEach(e => {

                        if (e.points.indexOf(actionSet.action) > -1) {
                            let list1 = desk.points1.filter(p1 => e.points.indexOf(p1) > -1)
                            let list2 = desk.points2.filter(p2 => e.points.indexOf(p2) > -1)
                            let countSelf = desk.player == 1 ? list1.length : list2.length
                            let countOppo = desk.player == 1 ? list2.length : list1.length
                            if (desk.player == 2 && countOppo != 0) {
                                // 后手优先拦截
                                actionSet.score += 1;
                            }
                            if (listBlockOppoMostNeed.length <= 2) {
                                // 如果对面还有小于等于2个块就获胜了，优先抢占其中一个 优先度5
                                actionSet.score += 5;
                                if (countSelf == countOppo && countSelf > 0) {
                                    // 相同占领情况焦灼的块额外+10优先拦截
                                    actionSet.score += 10;
                                }
                            }
                        }
                    })
                });



                // 这个点同时归在多个未占领块上,多一个块+1
                let countInNoUserBlock = desk.desk.filter(e => e.points.indexOf(actionSet.action) > -1 && e.color == 0).length;
                actionSet.score += countInNoUserBlock * 1;

                // 如果这个块对方马上要占领了

            }

        }
        listActions = listActions.sort((a, b) => b.score - a.score)
        let actionBest = listActions[0]
        if (!actionBest) {
            // 如果没有解，直接返回undefined
            return {
                best: undefined,
                nobest: undefined
            }
        }
        // 降级，比最佳走法少8分以上的
        let actionNotBestList = listActions.filter(e => e.score <= actionBest.score - 8)
        if (actionNotBestList.length == 0) {
            // 如果没有这样的次优走法，那就取比最佳解分数低的
            actionNotBestList = listActions.filter(e => e.score < actionBest.score)
            if (actionNotBestList.length == 0) {
                // 如果没有比最优分数低的,就直接用最佳
                actionNotBestList = [actionBest]
            }
        }
        return {
            best: actionBest.action,
            nobest: actionNotBestList[0].action
        }
    }

    // 如果依次查询，可以递归出一条从colorStart到colorEnd的路径，则说明贯通
    getWinPath(color: number, desk: GameData10_10, withBlockNotGet = false, all = false) {
        let checkColorList = [color];
        if (withBlockNotGet) {
            // 未占领的也可以查
            checkColorList.push(0)
        }
        let colorBlockList = desk.desk.filter(e => checkColorList.indexOf(e.color) > -1);
        let listStart = colorBlockList.filter(e => e.colorEnd.indexOf(color) > -1);
        // 可以作为初始的块块
        if (listStart.length == 0) {
            return false
        }
        let listPath: any[] = []
        listStart = listStart.sort((a, b) => {
            // 优先查已经占领的
            if (a.color != 0 && b.color == 0) {
                return -1
            } else if (a.color == 0 && b.color == 0) {
                return 0
            } else {
                return 1
            }
        });

        listStart.forEach(confStart => {
            let res = this.checkPathEach(color, [], confStart, desk.desk, 0, withBlockNotGet)
            if (res) {
                listPath.push(res);
            }
        })
        // let res = this.checkPathEach(color, [], listStart[1], desk.desk, 0, withBlockNotGet)
        // console.log(res, 'checkpatheach', desk.desk.filter(e => e.color == 0).map(e => e.id))
        // console.log('checkpatheach2', desk.desk.filter(e => e.color == 2).map(e => e.id))
        // if (res) {
        //     listPath.push(res);
        // }

        if (listPath.length > 0) {
            if (all) {
                return listPath
            }
            // 返回最短路径
            let listSortByNeedFill = listPath.sort((a, b) => {
                let needFillA: number = a.filter((e: any) => e.color == 0);
                if (needFillA == 0) {
                    needFillA = 999;
                }
                let needFillB: number = b.filter((e: any) => e.color == 0);
                if (needFillB == 0) {
                    needFillB = 999;
                }
                if (needFillA == needFillB) {
                    return a.length - b.length
                } else {
                    return needFillA - needFillB
                }
            })
            return listSortByNeedFill[0]
        } else {
            return false
        }
    }

    checkPathEach(color: number, listPath: number[], block: DataBlock10_10, blockList: DataBlock10_10[], count: number, withBlockNotGet: boolean): boolean | number[] {
        listPath.push(block.id)
        // 根据order对相邻点做优先级排序
        let listSort = color == 1 ? block.blockOrder1 : block.blockOrder2;
        let listNSorted = block.blockNeighbour.sort((a, b) => {
            // 优先查已经占领的
            let blockA: any = blockList.find(e => e.id == a);
            let blockB: any = blockList.find(e => e.id == b);
            if (blockA.color == color && blockB.color == 0) {
                return -1
            } else if (blockA.color == 0 && blockB.color == color) {
                return 1
            } else {
                let idxSortA = listSort.indexOf(a);
                let idxSortB = listSort.indexOf(b);
                return idxSortA - idxSortB;
            }
        });

        let colorEnd = color + 2;
        let checkColorList = [color];
        if (withBlockNotGet) {
            checkColorList.push(0)
        }
        for (let i = 0; i < listNSorted.length; i++) {
            let idNeighbour = listNSorted[i]
            let dataNei = blockList.find(e => e.id == idNeighbour);
            if (!dataNei || checkColorList.indexOf(dataNei.color) == -1) {
            } else if (dataNei.colorEnd.indexOf(colorEnd) > -1) {
                listPath.push(dataNei.id);
                return listPath
            } else if (listPath.indexOf(idNeighbour) == -1) {
                return this.checkPathEach(color, listPath, dataNei, blockList, count, withBlockNotGet);
            } else {
            }
        }
        listPath.pop()
        return false
    }
    updateDeskBlockStatus(desk: GameData10_10) {
        // 遍历当前的点，如果有一个格子上的点占领超过或等于一半，则标记为该颜色
        desk.desk.forEach(block => {
            if (block.color == 0) {
                let list1 = desk.points1.filter(e => block.points.indexOf(e) > -1);
                let list2 = desk.points2.filter(e => block.points.indexOf(e) > -1);
                let needLen = block.points.length / 2;
                if (list1.length >= needLen) {
                    block.color = 1;
                }
                if (list2.length >= needLen) {
                    block.color = 2;
                }
            }
        })
    }
}
