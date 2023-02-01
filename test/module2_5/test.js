'use strict';
const expect = require('chai').expect;
const algo = require('../../lib/index.ts');

/**
 * 一些语法说明 https://blog.csdn.net/wsln_123456/article/details/114540622
 */
 console.info(1)

describe('测试模块module2_5', () => {

  // 初始化对应的模块
  let ctr = new algo.module2_5();

  it('检查module2_5的getRiddle方法', () => {
    // 调用模块具体方法
    let config = new algo.GameConfig2_5();
    const result = ctr.getRiddle();
    // 判断是否符合预期
    console.info(result)
    // expect(result).to.eql({
    //   lev: 1
    // });
  });

});