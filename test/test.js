'use strict';
const expect = require('chai').expect;
const algo = require('../dist/index');

/**
 * 一些语法说明 https://blog.csdn.net/wsln_123456/article/details/114540622
 */

describe('测试模块module2_1', () => {

  // 初始化对应的模块
  let ctr = new algo.module2_1();

  it('检查module2_1的getRiddleByLev方法', () => {
    // 调用模块具体方法
    const result = ctr.getRiddleByLev(1, {});
    // 判断是否符合预期
    expect(result).to.eql({
      lev: 1
    });
  });

});