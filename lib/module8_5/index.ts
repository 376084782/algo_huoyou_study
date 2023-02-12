/**
 * @author Gao
 * @updateTime 2023/1/16
 * @tip 回文取数
 * @description
 * 一．挑战模式
 1.初始默认值：蓝色为X，红色为O
 XOXOOOXOXOOOXOXO


 2.参数范围：
 X = [5,15]  O=[5,15]
 位置随机


 3.过程记录：无
 二．练习模式
电脑等级实现即可

 游戏策略：
 最后一手取完获胜
 *
 */
import {getRiddle} from "../module4_6";


export class GameData8_5{
    typeSet?:number=1;
    desk:string[]=[];

    player=1;

    allRes:any = [];  //所有走法，满足条件时才有值

    step:number=0;  //当前步数

    dangerRes:any = []; //危险走法，下一手对面赢

    greatRes:any = [];  //下一手自己赢

    betterRes:any = []; //还可以的走法，下一手对面不赢

    constructor() {
    }



}

export class GameConfig8_5{

    xNum:number = 5;   //X的数量

    oNum:number = 5;   //O的数量


    //参数设置在区间外时自动变为区间内最大获最小
    constructor(xNum:number=5,oNum:number=5) {
        if(xNum>15)
        {
            xNum = 15
        }
        if(xNum<5)
        {
            xNum = 5
        }
        if(oNum>15)
        {
            oNum =15
        }
        if(oNum<5)
        {
            oNum = 5
        }
        this.xNum = xNum
        this.oNum= oNum
    }
}


export class GameAction8_5{

    nextFlag:string = 'e'; //下一手从左边还是右边。l：左边，r：右边 e:结束

    beginSeat:number = -1; //开始位置下标，左右都从0开始,-1表示已结束

    endSeat:number = -1; //结束位置下标，左右都从0开始

}


export default class  example8_5 {


    /**
     * 三个等级 1-3 从简答到难
     * @param level 1-3
     * @param config
     */
    getRiddleByLev(level: number,config?: any): GameData8_5 {
        // let gd = new GameData8_5();
        return this.getRiddle(config);
    }

    getRiddle(config:GameConfig8_5): GameData8_5{
        let gd = new GameData8_5();
        let total = config.xNum+config.oNum
        let xNum = config.xNum
        let oNum = config.oNum
        for(let i=0;i<total;i++)
        {
            if(xNum>0&&oNum>0)
            {
                if(0.5 - Math.random()>0)
                {
                    gd.desk.push('x')
                    xNum--;
                }
                else
                {
                    gd.desk.push('o')
                    oNum--
                }
            }
            else if (xNum<=0)
            {
                gd.desk.push('o')
                oNum--;
            }
            else
            {
                gd.desk.push('x')
                xNum--
            }
        }

        this.getActionAuto(gd,0)

        if(gd.greatRes.length>0)
        {
            console.log('no')
            return this.getRiddle(config)
        }

        return  gd;
    }

    checkRiddle(deskData:GameData8_5): number {
        return 0;
    }


    doAction(deskData:GameData8_5,dataAction:GameAction8_5):[flagResult:number,dataResult:GameData8_5]{

        if(dataAction.nextFlag=='l')  //从左开始的走法
        {
            deskData.desk.splice(dataAction.beginSeat,dataAction.endSeat+1)
        }
        else if(dataAction.nextFlag=='r')  //从右开始的走法
        {
            deskData.desk.splice(deskData.desk.length-1-dataAction.endSeat,dataAction.endSeat+1)
        }

        deskData.player= (deskData.player==2?3:2) //换选手
        deskData.step++;
        return  [1,deskData]
    }


    /**
     * 检测对称性
     * @param deskData
     * @param beginSeat 开始位置，不管左右从0开始
     * @param endSeat 结束位置,不管左右从0开始
     * @param lrFlag 从左还是从右开始数，l:左，r:右
     * return true或者false
     */
    checkSymmetry(deskData:GameData8_5,beginSeat:number,endSeat:number,lrFlag:string):boolean{

        let tempArr = JSON.parse(JSON.stringify(deskData.desk))

        if(lrFlag=='l'&&(endSeat+1<=tempArr.length))  //从左切割数组元素
        {
            tempArr.splice(endSeat+1,tempArr.length-endSeat-1)
            tempArr.splice(0,beginSeat)
        }
        else if(lrFlag == 'r' && (endSeat+1<=tempArr.length)) //从右切割数组元素
        {
            tempArr.splice(0,tempArr.length-endSeat-1)
            tempArr.splice(tempArr.length-beginSeat,tempArr.length-1)
        }


        let midNum:number = Math.floor(tempArr.length / 2)

        let leftStr:string = '';

        let rightStr:string = '';
        for(let i:number =0 ; i < midNum; i++)
        {
            leftStr+= tempArr[i];
            rightStr+= tempArr[tempArr.length-1-i]
        }

        return leftStr==rightStr;
    }


    /**
     * 分析所有对称性组合
     * @param deskData
     * return 返回从左开始的对称性组合，从右开始的对称性组合
     */
    enumData(deskData:GameData8_5):[listL:any[][],listR:any[][]]{
        let length = deskData.desk.length

        let arr:any[][] = [];

        let arrR:any[][] = []

        for (let i=0 ; i<length ;i++) //从左开始查找对称组合
        {
            arr[i] = []
            for(let j = i;j<length;j++)
            {
                if(this.checkSymmetry(deskData,i,j,'l'))
                {
                    arr[i].push(j)
                }
            }
        }

        for (let i=0 ; i<length ;i++) //从左开始查找对称组合
        {
            arrR[i] = []
            for(let j = i;j<length;j++)
            {
                if(this.checkSymmetry(deskData,i,j,'r'))
                {
                    arrR[i].push(j)
                }
            }
        }
        return [arr,arrR]
    }


    /**
     * 剩余数小于8时的自动策略
     * @param deskData
     * @param arr
     * @param arrR
     */
    getAutoStep(deskData:GameData8_5,arr:any[],arrR:any[]):GameAction8_5{

        //初始化数据列表
        deskData.dangerRes=[]
        deskData.betterRes=[];
        deskData.greatRes=[]
        deskData.allRes = []

        this.runRes(0,arr,arrR,deskData,[],0,0)


        for (let i=0;i<deskData.allRes.length;i++)
        {
            let inList = false;
            for(let j =0;j<deskData.dangerRes.length;j++)
            {
                if(deskData.allRes[i][0]==deskData.dangerRes[j][0]) //排除下一手就胜利的走法
                {
                    inList = true;
                }
            }
            if(inList == false) {
                deskData.betterRes.push(deskData.allRes[i])
            }
        }

        let planList = []

        //有限必胜走法，然后下一手对面不胜利的走法，最后智能对方胜利的走法
        planList=[...deskData.greatRes.sort(() => {
            return 0.5 - Math.random()
        }),...deskData.betterRes.sort(() => {
            return 0.5 - Math.random()
        }),...deskData.dangerRes.sort(() => {
            return 0.5 - Math.random()
        }),...deskData.allRes.sort(() => {
            return 0.5 - Math.random()
        })]

        let ga = new GameAction8_5();
        ga.nextFlag=planList[0][0].substring(planList[0][0].length-1)
        ga.beginSeat=0;
        ga.endSeat=parseInt(planList[0][0].substring(0,planList[0][0].length-1));


        return ga;
    }

    getAutoLongStep(deskData:GameData8_5,list:any[]):GameAction8_5{

        let listA = []; //本手直接结束
        let listB = [];  //下一手对面不结束
        let listC = [];  //最坏解
        if(list[0][0][list[0][0].length-1] == deskData.desk.length-1) //这一手结束,从左
        {
            let ga = new GameAction8_5()
            ga.beginSeat=0
            ga.endSeat=list[0][0][list[0][0].length-1]
            ga.nextFlag='l'
            listA.push(ga);
        }
        if(list[1][0][list[1][0].length-1] == deskData.desk.length-1) //这一手结束,从右
        {
            let ga = new GameAction8_5()
            ga.beginSeat=0
            ga.endSeat=list[1][0][list[1][0].length-1]
            ga.nextFlag='r'
            listA.push(ga);
        }


        for (let i=0;i<list[0][0].length;i++)  //下一手对面不赢的走法
        {
            let end = list[0][0][i];
            if(end<deskData.desk.length-1)
                if(list[0][end+1][(list[0][end+1]).length-1]<deskData.desk.length-1)
                {
                    let ga = new GameAction8_5()
                    ga.beginSeat=0
                    ga.endSeat=list[0][0][i]
                    ga.nextFlag='l'
                    listB.push(ga);
                }
        }


        for (let i=0;i<list[1][0].length;i++) //下一手对面不赢的走法
        {
            let end = list[1][0][i];
            if(end<deskData.desk.length-1)
                if(list[1][end+1][(list[1][end+1]).length-1]<deskData.desk.length-1)
                {
                    let ga = new GameAction8_5()
                    ga.beginSeat=0
                    ga.endSeat=list[1][0][i]
                    ga.nextFlag='r'
                    listB.push(ga);
                }
        }


        for(let i = 0;i<list[0][0].length;i++)  //随便走
        {
            let ga = new GameAction8_5()
            ga.beginSeat=0
            ga.endSeat=list[0][0][list[0][0].length-1]
            ga.nextFlag='l'
            listC.push(ga);
        }

        for(let i = 0;i<list[1][0].length;i++)  //随便走
        {
            let ga = new GameAction8_5()
            ga.beginSeat=0
            ga.endSeat=list[1][0][list[1][0].length-1]
            ga.nextFlag='r'
            listC.push(ga);
        }

        let planList:any[]=[];

        planList=[...listA.sort(() => {
            return 0.5 - Math.random()
        }),...listB.sort(() => {
            return 0.5 - Math.random()
        }),...listC.sort(() => {
            return 0.5 - Math.random()
        })]


        return planList[0];

    }


    /**
     * 递归所有走法,当剩余数量小于8时可触发
     * @param stepList
     * @param deskData
     * @param nowStep
     * @param nowIndex 从左开始的下标
     */
    runRes(stepNum:number,stepList:any,stepListR:any,deskData:GameData8_5,nowStep:number[],nowIndex:number,nowRindex:number):any{

        //通过setp来控制我方赢或者对方赢，step=1时为这一手我方赢了
        if(nowIndex>=deskData.desk.length)
        {
            if(nowStep.length==1)
            {
                deskData.greatRes.push(nowStep)
            }
            if(nowStep.length==2) //下一手对面直接赢的
            {
                deskData.dangerRes.push(nowStep)
            }
            deskData.allRes.push(nowStep)
            return nowStep;
        }

        if(nowIndex>(deskData.desk.length-1-nowRindex))
        {
            if(nowStep.length==1)
            {
                deskData.greatRes.push(nowStep)
            }
            if(nowStep.length==2) //下一手对面直接赢的
            {
                deskData.dangerRes.push(nowStep)
            }
            deskData.allRes.push(nowStep)
            return nowStep;
        }

        if(nowRindex>(deskData.desk.length-1-nowIndex))
        {
            if(nowStep.length==1)
            {
                deskData.greatRes.push(nowStep)
            }
            if(nowStep.length==2) //下一手对面直接赢的
            {
                deskData.dangerRes.push(nowStep)
            }
            deskData.allRes.push(nowStep)
            return nowStep;
        }

        for(let i =0 ;i<stepList[nowIndex].length;i++)
        {
            let tempNowStep = JSON.parse(JSON.stringify(nowStep))
            tempNowStep.push(stepList[nowIndex][i]+'l')
            this.runRes(stepNum+1,stepList,stepListR,deskData,tempNowStep,stepList[nowIndex][i]+1,nowRindex)
        }

        for(let i =0 ;i<stepListR[nowRindex].length;i++)
        {
            if(stepListR[nowRindex][i]<= (deskData.desk.length-1-nowIndex)) {
                let tempNowStep = JSON.parse(JSON.stringify(nowStep))
                tempNowStep.push((stepListR[nowRindex][i]) + 'r')
                this.runRes(stepNum + 1, stepList, stepListR, deskData, tempNowStep, nowIndex, stepListR[nowRindex][i] + 1)
            }
        }

    }









    /**
     * 检查是否合法，-1不合法，1合法
     * @param deskData
     * @param act
     */
    checkAction(deskData:GameData8_5,act:GameAction8_5):number{
        if(deskData.desk.length<=0)
        {
            return  -1;
        }

        if(act.beginSeat!=0||act.beginSeat>=deskData.desk.length||(act.nextFlag!='l'&&act.nextFlag!='r'))
        {
            return  -1
        }

        if(this.checkSymmetry(deskData,act.beginSeat,act.endSeat,act.nextFlag))
        {
            return 1;
        }
        return -1;
    }

    /**
     * 查看当前桌面信息，是否有人获胜，不存在平局的情况
     * @param deskData
     * return -1 未结束 1表示先手赢，2表示后手赢
     */
    checkDesk(deskData:GameData8_5):number{

        if(deskData.desk.length<=0)
        {
            return deskData.player-1;
        }
        return -1; //未结束
    }

    /**
     * @param deskData 桌面信息
     * @param seat 2表示先手，3表示后手
     * return [优解，次优解?]
     */
    getActionAuto(deskData:GameData8_5,seat:number):[GameAction8_5,GameAction8_5]{

        if(deskData.desk.length<=0)
        {
            return [new GameAction8_5(),new GameAction8_5()]
        }
        let list = this.enumData(deskData)

        let thisga;

        if(deskData.desk.length<=8)
        {
            thisga= this.getAutoStep(deskData,list[0],list[1])
        }
        else
        {
            thisga=this.getAutoLongStep(deskData,list);
        }
        return [thisga,thisga];
    }









}


//走法测试用
// let em = new example8_5();
// //
// // let gc = new GameConfig8_5(10,6)
// let gd =em.getRiddleByLev(2)
// console.log(gd.desk)
//
// for(let i = 0 ;i<30;i++)
// {
//     if(em.checkDesk(gd)!=-1)
//     {
//         break;
//     }
//     console.log(gd.step)
//     console.log(gd.desk)
//     em.doAction(gd,em.getActionAuto(gd,0)[0])
//     console.log(em.checkDesk(gd))
// }