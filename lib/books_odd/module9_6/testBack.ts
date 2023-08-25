// 牌和对应的权重
const pokerBox = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];//下标+1刚好就是对应的分值
let calcSym: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];//0,1,2  3,4  5,6,7  8,9分别对应+-*/

function Calculate(a: number, b: number, c: number) {
    if (c <= 2) return a + b;
    if (c <= 4) return a - b;
    if (c <= 7) return a * b;
    if (c <= 9) return a / b;
    return -1;
}

function filter(c: number) {
    if (c <= 2) return "+";
    if (c <= 4) return "-";
    if (c <= 7) return "*";
    if (c <= 9) return "/";
    return;
}

let answer = "NONE";//回复的字符串 默认回复NONE，表示无解
function Calculate24(a: number, b: number, c: number, d: number, C1: number, C2: number, C3: number) {
    let sum = Calculate(Calculate(Calculate(a, b, C1), c, C2), d, C3);
    if (sum === 24) answer = `公式为：${a} ${filter(C1)} ${b} ${filter(C2)} ${c} ${filter(C3)} ${d} = ${sum}`;
    return sum;
}

// 全排列
//这里的全排序就是把原先的数组复制一个出来，然后新数组代替原先数组删除该值，temp数组添加该值，当新数组的长度为0，说明转移完成，就把temp数组放入matrix数组中
function permutation(pokers: any) {
    let matrix: any = [];
    const subFunc = (arr: any, temp: any) => {
        if (temp.length > 4) temp.length = 4;//为了避免过长
        if (arr.length === 0) matrix.push(temp);
        arr.forEach((elem: any, i: number) => {
            subFunc([...arr.slice(0, i), ...arr.slice(i + 1)], [...temp, elem]);
        });
    }
    subFunc(pokers, []);
    return matrix;
};

// 计算总数为24
function Count24(a: any, b: any, c: any, d: any) {
    calcSym.sort((x: number, y: number) => x - y);//升序排序
    if (Calculate24(a, b, c, d, calcSym[0], calcSym[1], calcSym[2]) === 24) return true;//第一次判断如果符合就不需要执行下面的循环了
    let i = 1;//上面判断了一次，因此这里从1开始
    if (calcSym.length <= 10) calcSym = [...new Set(permutation(calcSym).flatMap((item: any) => item.join()))].map((item: any) => item.split(","));//二维数组去重,并获取全排的数组(即每一种可能性)
    while (true) {
        if (Calculate24(a, b, c, d, calcSym[i][0], calcSym[i][1], calcSym[i][2]) === 24) return true;
        if (i < calcSym.length - 1) i++;
        else return false;//如果数组遍历完都没
    };
    return false;
}

function init() {
    if (calcSym.length === 12) calcSym = permutation(calcSym);//获取全排的数组(即每一种可能性)
}
init();//初始化就立即执行

// 对输入的数字进行一次全排
function calcNumber(arr: any) {
    if (Count24(arr[0], arr[1], arr[2], arr[3])) return true;//这一步满足那么下面就不用执行permutation了，因为底层是递归，很消耗性能
    let i = 1;
    if (arr.length <= 4) arr = [...new Set(permutation(arr).flatMap((item: any) => item.join()))].map((item: any) => item.split(","));//二维数组去重
    if (arr.length > 1) {
        while (true) {
            if (Count24(arr[i][0], arr[i][1], arr[i][2], arr[i][3])) return true;
            if (i < arr.length - 1) i++;
            else return answer = "NONE";
        }
    };
    return answer = "NONE";
}

let vIn = [1, 2, 3, 3]
let time1 = new Date().getTime()
let res = calcNumber(vIn)
console.log(new Date().getTime() - time1, '耗时')
console.log(res, answer, 'ressss')