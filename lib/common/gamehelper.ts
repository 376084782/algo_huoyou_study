export default interface gamehelper {

    /** 
    gameConfig：部分题目可能存在多种玩法扩展，比如8张牌排序，10张牌排序，由此传入
    lev:  1初级 2中级 3高级  每个级别的要求视游戏内容每个单独补充(对抗类的游戏基本的要求是 利用游戏基本规则，生成有利于玩家的题目 使得玩家和机器人对战的情况下，初级是玩家可以2步内获胜，中级4步内获胜，高级是4步以上才可以获胜。具体几部内获胜看具体游戏定)
    GameData:游戏题目数据，数据格式视具体游戏单独定
    部分题型实时生成的算法有难度可以做成递归，每个难度的题目提前跑代码递归生成好以后入库。
    */
    getRiddleByLevel(level: number, config: any): GameData

    /**
    普通获取题目：
    完全随机生成题目，但要考虑到先后手的相对公平，不能有先手一步马上获胜的情况
    config:部分题目可能存在多种玩法扩展，比如8张牌排序，10张牌排序，由此传入
    GameData:游戏题目数据，数据格式视具体游戏单独定
    */
    getRiddle(config: GameConfig): GameData

    /**
    判断题目是否合法：
    deskData:玩家自行录入的题目，有自定义题目的功能，需要校验其合法性
    FlagValid:该题目是否可用 （可用的标准就是是否有解，是否符合基本要求，基本要求指：比如题玩法要求是1-8号牌排序，那玩家只可以且必须完整输入1-8）
    */
    checkRiddle(deskData: DeskData): FlagValid

    /**
    执行操作：
    dataAction:操作信息
    dataDesk:当前桌面信息
    flagResult:结束标注  基本按照  -1不合法不可执行 0未结束 1先手获胜 2后手获胜  部分游戏可能略有不同
    dataResult：完成操作后的桌面信息及交换信息，每个游戏单独定，视对应的前端动画要求定
    */
    doAction(deskData: DeskData, dataAction: string): { flagResult: number, dataResult: JSON }

    /**
    检查操作是否合法：
    code:该操作是否合法  -1非法 1合法
    dataDesk:当前桌面信息
    dataAction:操作信息
    */
    checkAction(deskData: DeskData, dataAction: string): FlagValid

    /**
    检查桌面状态：
    flagResult:结束标注  基本按照-1未结束 1先手获胜 2后手获胜  部分游戏可能略有不同
    dataDesk:当前桌面信息
    */
    checkDesk(deskData: DeskData): number

    /**
    获取当前最佳应对策略，即机器人算法
    dataDesk:当前桌面信息
    robotLevel: 1最佳策略 2次级策略 （目前就分成两种，因为机器人有难度划分，初中高分别按照不同的概率决定是否走最佳策略）
    seat：机器人是蓝方还是红方
    dataAction:操作信息
     */
    getActionAuto(deskData: DeskData, robotLevel: RobotLevel, player: Player): string

} 