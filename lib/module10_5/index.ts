/**
 * @author Gao
 * @updateTime 2023/1/1
 * @tip 超级井字棋
 * @description
 * 一．挑战模式
 1.初始默认值：棋盘空置即可


 2.参数范围：无


 3.过程记录：实现规则中相应标记即可
 二．练习模式
电脑等级实现即可

 游戏策略：
 连成3个区域即可获胜
 *
 */


class GameData10_5{
  typeSet = 1;//前端用的，存是否是自定义棋盘
  // // 步数
    step = 0;

    // 当前选手
    currentPlayer = 2;


    nextArea = 5;

    // 桌面布局，二维套二维，0表示为空
    desk: any[][] =
        [
            [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ] ,
            [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ] ,
            [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ]
        ]

    // 占据区域条件,行数到达3即占据
    rowList: any[][]=[
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ]
    ]

    // 列数到达3即占据区域
    colList: any[][]=[
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,0,0]
        ]
    ]
    // 斜1到达3或者斜7到达3即占据区域
    x1or7: any[][]=[
        [
            [0,0],
            [0,0]
        ],
        [
            [0,0],
            [0,0]
        ],
        [
            [0,0],
            [0,0]
        ],
        [
            [0,0],
            [0,0]
        ],
        [
            [0,0],
            [0,0]
        ],
        [
            [0,0],
            [0,0]
        ],
        [
            [0,0],
            [0,0]
        ],
        [
            [0,0],
            [0,0]
        ],
        [
            [0,0],
            [0,0]
        ]
    ]

    //大区域行数达到3即胜利
    bigRowList:number[][]=[
        [0,0,0],
        [0,0,0]
    ]

    // 大区域列数到达3即胜利
    bigColList:number[][]=[
        [0,0,0],
        [0,0,0]
    ]
    // 大区域斜1到达3或者斜7到达3即胜利
    bigX1or7:number[][]=[
        [0,0],
        [0,0]
    ]

    constructor() {
    }

    initEndData(){
        // 占据区域条件,行数到达3即占据
        this.rowList=[
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ]
        ]

        // 列数到达3即占据区域
        this.colList=[
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,0],
                [0,0,0]
            ]
        ]
        // 斜1到达3或者斜7到达3即占据区域
        this.x1or7=[
            [
                [0,0],
                [0,0]
            ],
            [
                [0,0],
                [0,0]
            ],
            [
                [0,0],
                [0,0]
            ],
            [
                [0,0],
                [0,0]
            ],
            [
                [0,0],
                [0,0]
            ],
            [
                [0,0],
                [0,0]
            ],
            [
                [0,0],
                [0,0]
            ],
            [
                [0,0],
                [0,0]
            ],
            [
                [0,0],
                [0,0]
            ]
        ]

        //大区域行数达到3即胜利
        this.bigRowList=[
            [0,0,0],
            [0,0,0]
        ]

        // 大区域列数到达3即胜利
        this.bigColList=[
            [0,0,0],
            [0,0,0]
        ]
        // 大区域斜1到达3或者斜7到达3即胜利
        this.bigX1or7=[
            [0,0],
            [0,0]
        ]
    }
}


class GameAction10_5{

    // 下一个操作区域
    nextArea:number;


    //当前步数 从0开始
    step:number;


    //下的Y坐标，因为是数组下标，才导致反转
    xPos:number;

    //下的X坐标
    yPos:number;

    //操作选手 2表示先手，3为后手
    player: number;



    constructor(nextArea:number,step:number,xPos:number,yPos:number,player:number) {
        this.nextArea = nextArea;
        this.step = step;
        this.xPos = xPos;
        this.yPos = yPos;
        this.player = player
    }

}


export default class  example10_5 {

    getRiddleByLev(level: number,config: any): GameData10_5 {
        let gd = new GameData10_5();
        return gd;
    }

    getRiddle(config?:any): GameData10_5{
        let gd = new GameData10_5();
        return  gd;
    }

    checkRiddle(deskData:GameData10_5): number {
        return 0;
    }


    doAction(deskData:GameData10_5,dataAction:GameAction10_5):[flagResult:number,dataResult:GameData10_5]{

        this.move(dataAction.nextArea,dataAction.xPos,dataAction.yPos,deskData.step,dataAction.player,deskData)
        return [this.checkDesk(deskData),deskData];
    }


    move(area:number,xPos:number,yPos:number,step:number,player:number,deskData:GameData10_5){
        area=area-1;
        yPos=yPos-1;
        xPos=xPos-1;
        deskData.desk[area][yPos][xPos]=(player==2?'x'+step:'y'+step)
        deskData.step++;
        deskData.currentPlayer = (player==2?3:2)
        deskData.nextArea = 3*yPos+xPos+1;
        return [deskData.step,player==2?3:2,3*yPos+xPos+1];
    }

    /**
     * 检查是否合法，-1不合法，1合法
     * @param deskData
     * @param act
     */
    checkAction(deskData:GameData10_5,act:GameAction10_5):number{
        let nextPlane = deskData.desk[deskData.nextArea-1];
        if(nextPlane[act.yPos-1][act.xPos-1]!=0||act.step!=deskData.step)
        {
            return -1
        }
        return 1;
    }

    /**
     * 查看当前桌面信息，是否有人获胜，存在平局的情况，当区域5的棋子满了后会出现无子可下
     * @param deskData
     * return 99 平局 1表示先手赢，2表示后手赢
     */
    checkDesk(deskData:GameData10_5):number{


        // 初始化计数
        deskData.initEndData();



        for(let area:number=0;area<9;area++)
        {
            for(let xPos:number=0;xPos<3;xPos++)
            {
                for(let yPos:number=0;yPos<3;yPos++)
                {
                    let player:number = deskData.desk[area][xPos][yPos].toString().charAt(0).replace('x',2).replace('y',3);

                       if(player == 2 || player == 3) {
                           if (xPos == yPos) //1 斜线
                           {
                               deskData.x1or7[area][player - 2][0]++;
                           }
                           if (xPos + yPos == 2) //7 斜线
                           {
                               deskData.x1or7[area][player - 2][1]++;
                           }
                           deskData.colList[area][player - 2][xPos]++;
                           deskData.rowList[area][player - 2][yPos]++;


                           if ((deskData.x1or7[area][player - 2][0] == 3) || (deskData.x1or7[area][player - 2][1] == 3) || (deskData.colList[area][player - 2][xPos] == 3) || (deskData.rowList[area][player - 2][yPos] == 3)) {
                               if ((area == 0 || area == 4 || area == 8) && deskData.bigX1or7[player - 2][99 - area] == undefined) // 斜线1
                               {
                                   deskData.bigX1or7[player - 2][0]++;
                                   deskData.bigX1or7[player - 2][99 - area] = 1;
                               }
                               if ((area == 6 || area == 4 || area == 2) && deskData.bigX1or7[player - 2][88 - area] == undefined) //斜线7
                               {
                                   deskData.bigX1or7[player - 2][1]++;
                                   deskData.bigX1or7[player - 2][88 - area] = 1;
                               }
                               if (deskData.bigColList[player - 2][99 - (area)] == undefined) {
                                   deskData.bigColList[player - 2][(area) % 3]++;
                                   deskData.bigColList[player - 2][99 - (area)] = 1;
                               }
                               if (deskData.bigRowList[player - 2][99 - Math.floor(area)] == undefined) {
                                   deskData.bigRowList[player - 2][Math.floor(area / 3)]++;
                                   deskData.bigRowList[player - 2][99 - Math.floor(area)] = 1;
                               }
                           }

                       }
                }
            }
        }



        if((deskData.bigX1or7[0][0]>=3)||(deskData.bigX1or7[0][1]>=3)) {
            return 1; //先手斜线赢
        }
        for(let i:number=0;i<3;i++)
        {
            if((deskData.bigColList[0][i]>=3)||(deskData.bigRowList[0][i]>=3))
            {
                return 1; //先手竖横赢
            }
        }

        if((deskData.bigX1or7[1][0]>=3)||(deskData.bigX1or7[1][1]>=3)) {
            return 2; // 后手斜线赢
        }
        for(let i:number=0;i<3;i++)
        {
            if((deskData.bigColList[1][i]>=3)||(deskData.bigRowList[1][i]>=3))
            {
                return 2; //后手竖横赢
            }
        }

        let allPlane = deskData.desk[deskData.nextArea-1]
        for(let i = 0; i<3;i++)
        {
           for (let j = 0;j<3;j++)
           {
               if(allPlane[i][j]==0)
               {
                   return -1; //未结束
               }
           }
        }
        return 99; //平局
    }

    /**
     * @param deskData 桌面信息
     * @param seat 2表示先手，3表示后手
     * return [优解，次优解?]
     */
    getActionAuto(deskData:GameData10_5,seat:number):[GameAction10_5,GameAction10_5]{

        let nextOne = this.checkAutoMoveNext(deskData,seat==2?'x':'y',4);

        let nextTwo = this.checkAutoMoveNext(deskData,seat==2?'x':'y',1);
        return [new GameAction10_5(deskData.nextArea,deskData.step,nextOne[1]+1,nextOne[0]+1,deskData.currentPlayer),
            new GameAction10_5(deskData.nextArea,deskData.step,nextTwo[1]+1,nextTwo[0]+1,deskData.currentPlayer),
        ];
    }


    /**
     * 先手2+x 后手3+y
     * @param deskData
     * @param playFlag 自己的标记，以自己为视角
     * @param level 难度 4 3 2 1
     */
    checkAutoMoveNext(deskData:GameData10_5,playFlag:String,level:number){

        let area = deskData.nextArea;
        let nextPlane:any = deskData.desk[area-1];

        area= area-1;

        // 自己接下来走的计划
        let myPlan:any = [[],[],[],[],[]];

        // 对方接下来走的计划
        let yourPlan:any = [[],[],[],[],[]];

        // 最后走的计划
        let finishPlan:any = [];


        // 可以走的格子
        let canMove: any = [[],[],[],[],[],[],[],[],[]];

        // 我方X的计数
        let myXcount:number[][] = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];

        let yourXcount:number[][] = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];

        let myYcount:number[][] = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];

        let yourYcount:number[][] = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];

        let my45count:number[] = [0,0,0,0,0,0,0,0,0];

        let my135count:number[] = [0,0,0,0,0,0,0,0,0];

        let your45count:number[] = [0,0,0,0,0,0,0,0,0];

        let your135count:number[] = [0,0,0,0,0,0,0,0,0];


        for(let areaf = 0; areaf<9; areaf++) {
            nextPlane = deskData.desk[areaf]
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    if (nextPlane[x][y] == 0) {
                        canMove[areaf].push([x, y])
                    }
                    if (nextPlane[x][y].toString().indexOf(playFlag) >= 0) //我方计数
                    {
                        if (x == y) {
                            my45count[areaf]++;
                        }
                        if (x + y == 2) {
                            my135count[areaf]++;
                        }
                        myXcount[areaf][x]++;
                        myYcount[areaf][y]++;
                    } else if (nextPlane[x][y].toString().indexOf((playFlag == 'x' ? 'y' : 'x')) >= 0) {
                        if (x == y) {
                            your45count[areaf]++;
                        }
                        if (x + y == 2) {
                            your135count[areaf]++;
                        }
                        yourXcount[areaf][x]++;
                        yourYcount[areaf][y]++;
                    }
                }
            }

        }

        let dontWalk :number[] = []

        for(let areaS =0 ;areaS<9 ; areaS++)
        {
            for(let i=0;i<canMove[areaS].length;i++) {
                if (yourXcount[areaS][canMove[areaS][i][0]] == 2 || yourYcount[areaS][canMove[areaS][i][1]] == 2) {
                    dontWalk.push(areaS)
                }
            }
        }

        if(canMove[area]==undefined)
        {
            console.log('ss')
        }


        for (let i=0;i<canMove[area].length;i++)
        {

            let tag =false
            for(let wk=0;wk<dontWalk.length;wk++)
            {
                if(canMove[area][i][0]*3+canMove[area][i][1]==dontWalk[wk])
                {
                    tag=true;
                }
            }

            if((canMove[area][i][0]==canMove[area][i][1])&&my45count[area]==2) //自己斜线2子
            {
                myPlan[0].push(canMove[area][i])
            }
            if((canMove[area][i][0]+canMove[area][i][1]==2)&&my135count[area]==2) //自己斜线2子
            {
                myPlan[0].push(canMove[area][i])
            }
            if(myXcount[area][canMove[area][i][0]] == 2 || myYcount[area][canMove[area][i][1]] == 2) //自己横竖2子
            {
                myPlan[0].push(canMove[area][i])
            }
            if((canMove[area][i][0]==canMove[area][i][1])&&your45count[area] == 2) //对面斜线2子
            {
                yourPlan[0].push(canMove[area][i])
            }

            if((canMove[area][i][0]+canMove[area][i][1]==2)&&your135count[area] == 2) //对面斜线2子
            {
                yourPlan[0].push(canMove[area][i])
            }
            if(yourXcount[area][canMove[area][i][0]]== 2 || yourYcount[area][canMove[area][i][1]] == 2) //对面横竖2子
            {
                yourPlan[0].push(canMove[area][i])
            }
            if(((canMove[area][i][0]==canMove[area][i][1])&&my45count[area]>0&&your45count[area]==0)||
                ((canMove[area][i][0]+canMove[area][i][1]==2)&&my135count[area]>0&&your135count[area]==0)) // 先确保斜线可以构成2子,对面没有占子
            {
                if((myXcount[area][canMove[area][i][0]]>0&&yourXcount[area][canMove[area][i][0]]==0)||
                    (myYcount[area][canMove[area][i][1]]>0&&yourYcount[area][canMove[area][i][0]]==0)) // 直线再确保构成2子，对面没有占子
                {
                    if(!tag) {   //剔除不可下
                        myPlan[1].push(canMove[area][i])  //2两子的走法
                    }
                }

                if(!tag) {   //剔除不可下
                    myPlan[2].push(canMove[area][i])   //一2子对面未占子走法
                }


            }


            if(((canMove[area][i][0]==canMove[area][i][1])&&your45count[area]>0&&my45count[area]==0)||
                ((canMove[area][i][0]+canMove[area][i][1]==2)&&your135count[area]>0&&my135count[area]==0)) // 对面先确保斜线可以构成2子,我方没有占子
            {
                if((yourXcount[area][canMove[area][i][0]]>0&&myXcount[area][canMove[area][i][0]]==0)||
                    (yourYcount[area][canMove[area][i][1]]>0&&myYcount[area][canMove[area][i][0]]==0)) // 直线再确保构成2子，我方没有占子
                {
                    if(!tag) {   //剔除不可下
                        yourPlan[1].push(canMove[area][i]) //2两子对面走法
                    }
                }

                if(!tag) {   //剔除不可下
                    yourPlan[2].push(canMove[area][i])   //一2子我方未占子走法
                }


            }


            if (myXcount[area][canMove[area][i][0]]>0&&myYcount[area][canMove[area][i][1]]>0
                &&yourXcount[area][canMove[area][i][0]]==0&&yourYcount[area][canMove[area][i][0]]==0)  //自己下1子可以构成横竖2个两子,并且对面没有已占的
            {

                if(!tag) {
                    myPlan[1].push(canMove[area][i])  //2两子的走法
                }
            }


            if (yourXcount[area][canMove[area][i][0]]>0&&yourYcount[area][canMove[area][i][1]]>0
                &&myXcount[area][canMove[area][i][0]]==0&&myYcount[area][canMove[area][i][0]]==0)  //对面下1子可以构成横竖2个两子,并且我方没有已占的
            {

                if(!tag) {
                    yourPlan[1].push(canMove[area][i]) //2两子对面走法
                }
            }



            if (myXcount[area][canMove[area][i][0]]>0
                &&yourXcount[area][canMove[area][i][0]]==0)  //自己下1子可以构成竖两子,并且对面没有已占的
            {

                if(!tag) {
                    myPlan[2].push(canMove[area][i])   //一2子对面未占子走法
                }
            }


            if (myYcount[area][canMove[area][i][1]]>0
                &&yourYcount[area][canMove[area][i][0]]==0)  //自己下1子可以构成横两子,并且对面没有已占的
            {

                if(!tag) {
                    myPlan[2].push(canMove[area][i])   //一2子对面未占子走法
                }
            }


            if (yourXcount[area][canMove[area][i][0]]>0
                &&myXcount[area][canMove[area][i][0]]==0)  //对面下1子可以构成竖两子,并且我方没有已占的
            {

                if(!tag) {
                    yourPlan[2].push(canMove[area][i])   //一2子我方未占子走法
                }
            }


            if (yourYcount[area][canMove[area][i][1]]>0
                &&myYcount[area][canMove[area][i][0]]==0)  //对面下1子可以构成横两子,并且我方没有已占的
            {

                if(!tag) {
                    yourPlan[2].push(canMove[area][i])   //一2子我方未占子走法
                }
            }


            if(!tag) {   // 其余走法
                myPlan[3].push(canMove[area][i]);
                yourPlan[3].push(canMove[area][i]);
            }



        }



        // 难度等级 4 优先自己赢，然后截停对面2子赢，再优先下自己有1子的线上，再下对面有1子的线上，还会避免下一手对面直接赢的局面
        if(level == 4) {
            finishPlan = [...(myPlan[0].sort(() => {
                return 0.5 - Math.random()
            })), ...(yourPlan[0].sort(() => {
                return 0.5 - Math.random()
            })),
                ...(myPlan[1].sort(() => {
                    return 0.5 - Math.random()
                })), ...(yourPlan[1].sort(() => {
                    return 0.5 - Math.random()
                })),
                ...(yourPlan[2].sort(() => {
                    return 0.5 - Math.random()
                })), ...(myPlan[2].sort(() => {
                    return 0.5 - Math.random()
                })),
                ...(yourPlan[3].sort(() => {
                    return 0.5 - Math.random()
                })), ...(myPlan[3].sort(() => {
                    return 0.5 - Math.random()
                }))]

        }


        // 难度等级 3 优先自己赢，然后截停对面2子赢，再优先下自己有1子的线上，再下对面有1子的线上
        if(level == 3) {
            finishPlan = [...(myPlan[0].sort(() => {
                return 0.5 - Math.random()
            })), ...(yourPlan[0].sort(() => {
                return 0.5 - Math.random()
            })),
                ...(myPlan[2].sort(() => {
                    return 0.5 - Math.random()
                })), ...(yourPlan[2].sort(() => {
                    return 0.5 - Math.random()
                })),
                ...(yourPlan[3].sort(() => {
                    return 0.5 - Math.random()
                })), ...(myPlan[3].sort(() => {
                    return 0.5 - Math.random()
                }))]

        }


        // // 难度等级2 优先自己2子，然后截停对面2子，然后随意下
        if(level == 2) {
            finishPlan = [...(myPlan[0].sort(() => {
                return 0.5 - Math.random()
            })), ...(yourPlan[0].sort(() => {
                return 0.5 - Math.random()
            })),
                ...(yourPlan[3].sort(() => {
                    return 0.5 - Math.random()
                })), ...(myPlan[3].sort(() => {
                    return 0.5 - Math.random()
                }))]
        }
        //
        // //难度等级1 智障难度，只管自己随机下
        if(level==1){
            finishPlan = [
                ...(yourPlan[3].sort(() => {
                    return 0.5 - Math.random()
                })), ...(myPlan[3].sort(() => {
                    return 0.5 - Math.random()
                }))]
        }


        if(finishPlan[0]==undefined) //平局的情况，无子可下，棋盘5存在这种情况
        {
            if(canMove[area]!=undefined)  //这种情况只出现在机器人算法处，所有可下区域会导致对方3连，那就随便下一个
            {
                finishPlan = [...canMove[area]]
            }
        }
        return finishPlan[0];
    }

}

// 测试运行代码，双机器人下棋
// let start:number = Date.now();
// let ge= new example10_5();
// let gd = ge.getRiddle();
// let act = ge.getActionAuto(gd,gd.currentPlayer)
// ge.doAction(gd,act[0]);
// for(let i = 0;i<81;i++)
// {
//     console.log('step:'+i)
//     act = ge.getActionAuto(gd,gd.currentPlayer)
//     ge.checkAction(gd,act[0]);
//     ge.doAction(gd,act[0]);
//     if(ge.checkDesk(gd)!=-1) {
//         console.log(ge.checkDesk(gd)+'win')
//         break;
//     }
// }
//
// let end:number = Date.now();
// console.log(gd.desk)
// console.log(end - start);