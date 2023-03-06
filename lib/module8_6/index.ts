/**
 * @author Gao
 * @updateTime 2023/2/19
 * @tip 翻翻翻
 * @description
 * 一．挑战模式
 1.初始默认值：棋盘3*3
 棋子反面朝上，正面x，反面o


 2.参数范围：
 ①.2*2~4*4
 ②.正反状态任意设置


 3.过程记录：无
 二．练习模式
电脑等级实现即可

 游戏策略：
 最后一手翻正获胜
 *
 */


export class GameData8_6{
    typeSet?:number=1;
    desk:string[][]=[];

    player=1;


    step:number=0;  //当前步数


    badDesk = [
        [
            ['o','x','o'],
            ['x','x','x'],
            ['x','x','o']
        ],
        [
            ['o','x','x'],
            ['x','x','x'],
            ['o','x','o']
        ],
        [
            ['o','x','x'],
            ['x','o','x'],
            ['x','x','o']
        ],
        [
            ['x','x','x'],
            ['x','o','x'],
            ['o','x','o']
        ],
        [
            ['x','x','o'],
            ['x','x','x'],
            ['o','x','o']
        ],
        [
            ['x','x','o'],
            ['x','o','x'],
            ['x','x','o']
        ],
        [
            ['x','x','x','o'],
            ['x','x','x','x'],
            ['x','x','o','x'],
            ['x','x','x','o']
        ],
        [
            ['x','x','x','o'],
            ['x','x','x','x'],
            ['x','x','x','x'],
            ['x','o','x','o']
        ],
        [
            ['x','x','x','o'],
            ['x','x','x','o'],
            ['x','x','x','x'],
            ['x','x','x','o']
        ],
        [
            ['x','x','x','o'],
            ['x','o','x','x'],
            ['x','x','x','x'],
            ['x','x','x','o']
        ],
        [
            ['x','x','o','o'],
            ['x','x','x','x'],
            ['x','x','x','x'],
            ['x','x','x','o']
        ],
        [
            ['x','x','x','o'],
            ['x','x','x','x'],
            ['o','x','x','x'],
            ['x','x','x','o']
        ],
        [
            ['o','x','x','o'],
            ['x','x','x','x'],
            ['x','x','x','x'],
            ['x','x','x','o']
        ]
    ]


    constructor(config?:GameConfig8_6) {

        this.step = 0;
        if(!config)
        {
            let conf = new GameConfig8_6()
            this.desk = conf.desk
        }
        else
        {
            this.desk = config.desk
        }
    }



}

export class GameConfig8_6{

    desk:string[][] = [];

    constructor(desk:string[][]=[
        ['o','o','o'],
        ['o','o','o'],
        ['o','o','o']
    ] ) {
        this.desk = desk
    }
}


export class GameAction8_6{

    /** 数组obj 下一手走一步示例为
     *  nextAct = [{x:1,y:2,val:'x'}]
     *
     *  下一步翻两枚示例为 ,val =x 表示从反面翻到正面
     *  nextAct = [{x:1,y:1,val:'x'},{x:1,y:2,val:'o'}]
      */
    nextAct:any[] =[
    ]


}


export default class  example8_6 {


    /**
     * 不实现
     * @param config
     */
    getRiddleByLev(config?: any): GameData8_6 {
        // let gd = new GameData8_5();
        return this.getRiddle(config);
    }

    getRiddle(config?:GameConfig8_6): GameData8_6{
        let gd = new GameData8_6(config);
        return  gd;
    }

    /**
     * 返回 1 表示合法，-1不合法
     * @param deskData
     */
    checkRiddle(deskData:GameData8_6): number {

        let leni = deskData.desk.length

        for(let i = 0 ;i < leni ;i++)
        {
            for(let j = 0 ; j<leni ;j ++)
            {
                if(deskData.desk[i][j]=='o')
                {
                    return 1;
                }
            }
        }
        return -1;
    }


    doAction(deskData:GameData8_6,dataAction:GameAction8_6):[flagResult:number,dataResult:GameData8_6]{

        dataAction.nextAct.forEach( (x)=>{
            deskData.desk[x.x][x.y] = x.val
        } )
        deskData.step++;
        deskData.player = (deskData.player == 1 ? 2:1);
        return  [1,deskData]
    }











    /**
     * 检查是否合法，-1不合法，1合法
     * @param deskData
     * @param act
     */
    checkAction(deskData:GameData8_6,act:GameAction8_6):number{

        let actLen = act.nextAct.length;

        if(actLen == 1)
        {
            if(deskData.desk[act.nextAct[0].x][act.nextAct[0].y]!='x'&&act.nextAct[0].val=='x')
            {
                return 1
            }

            return -1
        }

        if(actLen == 2) //翻两个的情况
        {
            if( (act.nextAct[0].x==act.nextAct[1].x) && (act.nextAct[0].y==act.nextAct[1].y+1)) //同一行，0在右，1在左
            {
                if(deskData.desk[act.nextAct[1].x][act.nextAct[1].y]=='o'&&act.nextAct[1].val=='x') //左边的判定是否符合
                {
                    if(deskData.desk[act.nextAct[0].x][act.nextAct[0].y]!=act.nextAct[0].val)
                    {
                        return 1;
                    }
                    return -1;
                }
                return -1;
            }
            if( (act.nextAct[0].x==act.nextAct[1].x) && (act.nextAct[0].y==act.nextAct[1].y-1)) //同一行，1在右，0在左
            {

                if(deskData.desk[act.nextAct[0].x][act.nextAct[0].y]=='o'&&act.nextAct[0].val=='x') //左边的判定是否符合
                {
                    if(deskData.desk[act.nextAct[1].x][act.nextAct[1].y]!=act.nextAct[1].val)
                    {
                        return 1;
                    }
                    return -1;
                }
                return -1;

            }
            if( (act.nextAct[0].y==act.nextAct[1].y) && (act.nextAct[0].x==act.nextAct[1].x+1)) //同一竖，0在下，1在上
            {

                if(deskData.desk[act.nextAct[1].x][act.nextAct[1].y]=='o'&&act.nextAct[1].val=='x') //上边的判定是否符合
                {
                    if(deskData.desk[act.nextAct[0].x][act.nextAct[0].y]!=act.nextAct[0].val)
                    {
                        return 1;
                    }
                    return -1;
                }
                return -1;
            }
            if( (act.nextAct[0].y==act.nextAct[1].y) && (act.nextAct[0].x==act.nextAct[1].x-1)) //同一竖，1在下，0在上
            {
                if(deskData.desk[act.nextAct[0].x][act.nextAct[0].y]=='o'&&act.nextAct[0].val=='x') //上边的判定是否符合
                {
                    if(deskData.desk[act.nextAct[1].x][act.nextAct[1].y]!=act.nextAct[1].val)
                    {
                        return 1;
                    }
                    return -1;
                }
                return -1;
            }
            return -1;
        }


        return -1;
    }

    /**
     * 查看当前桌面信息，是否有人获胜，不存在平局的情况
     * @param deskData
     * return -1 未结束 1表示先手赢，2表示后手赢
     */
    checkDesk(deskData:GameData8_6):number{

        for(let i =0; i < deskData.desk.length;i++)
        {
            for(let j = 0 ; j < deskData.desk.length; j++)
            {
                if(deskData.desk[i][j]=='o')
                {
                    return -1; //未结束
                }
            }
        }
        return deskData.player; //结束
    }

    /**
     * @param deskData 桌面信息
     * @param seat 2表示先手，3表示后手
     * return [优解，次优解?]
     */
    getActionAuto(deskData:GameData8_6,seat:number):[GameAction8_6,GameAction8_6]{


        this.getAutoStep(deskData);

        return this.getAutoStep(deskData);;
    }


    getAutoStep(deskData:GameData8_6):[GameAction8_6,GameAction8_6]{

        let leni = deskData.desk.length

        let allRes:any[] = []

        let greatRes:any[] = []

        let betterRes:any[] = []

        // let oCount = 0
        // let lenj = deskData.desk[0].length
        for(let i=0;i<leni;i++)
        {
            for(let j = 0; j<leni;j++)
            {
                if(deskData.desk[i][j] == 'o')
                {
                    // oCount++;
                    let act = new GameAction8_6();
                    act.nextAct = [];
                    let thisStep = {
                        x:i,
                        y:j,
                        val:'x'
                    }
                    act.nextAct.push(thisStep)
                    allRes.push(act)


                    // 优质步数，这手直接赢

                    let tempDesk = JSON.parse(JSON.stringify(deskData.desk))

                    tempDesk[i][j] = 'x'
                    let finish = true
                    for (let ii=0;ii<leni;ii++)
                    {
                        for(let jj = 0 ; jj<leni ;jj++) {
                            if (tempDesk[ii][jj] == 'o')
                            {
                                finish = false
                                break;
                            }
                        }
                    }

                    if(finish == true)
                    {
                        greatRes.push(act);
                    }
                    else
                    {

                        let inPar = JSON.parse(JSON.stringify(tempDesk))

                        if(this.getAutoStepNext(inPar)==false&&this.checkSpcStep(inPar,deskData.badDesk)==true)
                        {
                            // if(inPar!=[
                            //     ['o','x','o'],
                            //     ['x','x','x'],
                            //     ['x','x','o']
                            // ]&&)
                            betterRes.push(act);
                        }
                    }

                    //

                    if(i+1<leni)
                    {
                        let actX = new GameAction8_6();
                        actX.nextAct = [];
                        actX.nextAct.push(thisStep);
                        let xStep = {
                            x:i+1,
                            y:j,
                            val: (deskData.desk[i+1][j]=='x'?'o':'x')
                        }
                        actX.nextAct.push(xStep)
                        allRes.push(actX)

                        //筛选优质步数
                        let tempDesk = JSON.parse(JSON.stringify(deskData.desk))
                        tempDesk[i][j] = 'x';
                        tempDesk[i+1][j] = xStep.val;
                        let finishi = true
                        for (let ii=0;ii<leni;ii++)
                        {
                            for(let jj = 0 ; jj<leni ;jj++) {
                                if (tempDesk[ii][jj] == 'o')
                                {
                                    finishi = false
                                    break;
                                }
                            }
                        }

                        if(finishi == true)
                        {
                            greatRes.push(actX);
                        }
                        else
                        {

                            let inPar = JSON.parse(JSON.stringify(tempDesk))
                            if(this.getAutoStepNext(inPar)==false&&this.checkSpcStep(inPar,deskData.badDesk)==true)
                            {
                                betterRes.push(actX);
                            }
                        }

                        //


                    }

                    if( j+1<leni )
                    {
                        let actJ = new GameAction8_6();
                        actJ.nextAct = [];
                        actJ.nextAct.push(thisStep);
                        let yStep = {
                            x:i,
                            y:j+1,
                            val: (deskData.desk[i][j+1]=='x'?'o':'x')
                        }
                        actJ.nextAct.push(yStep)
                        allRes.push(actJ)

                        //筛选优质步数
                        let tempDesk = JSON.parse(JSON.stringify(deskData.desk))
                        tempDesk[i][j] = 'x';
                        tempDesk[i][j+1] = yStep.val;
                        let finishj = true
                        for (let ii=0;ii<leni;ii++)
                        {
                            for(let jj = 0 ; jj<leni ;jj++) {
                                if (tempDesk[ii][jj] == 'o')
                                {
                                    finishj = false
                                    break;
                                }
                            }
                        }

                        if(finishj == true)
                        {
                            greatRes.push(actJ);
                        }
                        else
                        {

                            let inPar = JSON.parse(JSON.stringify(tempDesk))
                            if(this.getAutoStepNext(inPar)==false&&this.checkSpcStep(inPar,deskData.badDesk)==true)
                            {
                                betterRes.push(actJ);
                            }
                        }

                        //
                    }
                }
            }
        }



        let sortAllRes= [...greatRes.sort(() => {
            return 0.5 - Math.random()
        }),...betterRes.sort(() => {
            return 0.5 - Math.random()
        }),...allRes.sort(() => {
            return 0.5 - Math.random()
        })]
        return [sortAllRes[0],sortAllRes[0]];
    }


    /**
     * 特殊处理，返回false表示坏步数
     * @param deskDataNow
     * @param badDesk
     */
    checkSpcStep(deskDataNow:any,badDesk:any):boolean
    {
        for(let i = 0;i<badDesk.length;i++)
        {
            if(deskDataNow==badDesk[i])
            {
                return false
            }
        }

        return true
    }



    /**
     * 下一手对面是否赢
     * @param deskData
     */
    getAutoStepNext(deskDataRe:string[][]):boolean{

        let leni = deskDataRe.length

        let deskData= {
            desk: deskDataRe
        }

        for(let i=0;i<leni;i++)
        {
            for(let j = 0; j<leni;j++)
            {
                if(deskData.desk[i][j] == 'o')
                {

                    // 优质步数，这手直接赢

                    let tempDesk = JSON.parse(JSON.stringify(deskData.desk))

                    tempDesk[i][j] = 'x'
                    let finish = true
                    for (let ii=0;ii<leni;ii++)
                    {
                        for(let jj = 0 ; jj<leni ;jj++) {
                            if (tempDesk[ii][jj] == 'o')
                            {
                                finish = false
                                break;
                            }
                        }
                    }

                    if(finish == true)
                    {
                        return true;
                    }

                    //

                    if(i+1<leni)
                    {

                        //筛选优质步数
                        let tempDesk = JSON.parse(JSON.stringify(deskData.desk))
                        tempDesk[i][j] = 'x';
                        tempDesk[i+1][j] = 'x';
                        let finishi = true
                        for (let ii=0;ii<leni;ii++)
                        {
                            for(let jj = 0 ; jj<leni ;jj++) {
                                if (tempDesk[ii][jj] == 'o')
                                {
                                    finishi = false
                                    break;
                                }
                            }
                        }

                        if(finishi == true)
                        {
                            return true
                        }

                        //


                    }

                    if( j+1<leni )
                    {

                        //筛选优质步数
                        let tempDesk = JSON.parse(JSON.stringify(deskData.desk))
                        tempDesk[i][j] = 'x';
                        tempDesk[i][j+1] = 'x';
                        let finishj = true
                        for (let ii=0;ii<leni;ii++)
                        {
                            for(let jj = 0 ; jj<leni ;jj++) {
                                if (tempDesk[ii][jj] == 'o')
                                {
                                    finishj = false
                                    break;
                                }
                            }
                        }

                        if(finishj == true)
                        {
                            return true;
                        }

                        //
                    }
                }
            }
        }


        return false;
    }









}


//走法测试用
let em = new example8_6();
// //
let dd = [
    ['o','o'],
    ['x','x']
]
let gc = new GameConfig8_6()
gc.desk=[
    ['o','x','x','o'],
    ['x','x','x','x'],
    ['x','x','x','x'],
    ['o','x','x','o']
]
let gd =em.getRiddle(gc);
console.log(gd.desk)
//
for(let i = 0 ;i<30;i++)
{
    if(em.checkDesk(gd)!=-1)
    {
        break;
    }
    em.doAction(gd,em.getActionAuto(gd,0)[0])
    console.log(gd.step)
    console.log(gd.desk)
    console.log(em.checkDesk(gd))
}