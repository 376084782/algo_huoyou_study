'use strict';
const expect = require('chai').expect;
const algo = require('../../dist/index.js');

/**
 * 一些语法说明 https://blog.csdn.net/wsln_123456/article/details/114540622
 */
 console.info(1)

describe('测试模块example', () => {

  // 初始化对应的模块
  let ctr = new algo.example();

  it('检查example的getRiddleByLev方法', () => {
    // 调用模块具体方法
    const result = ctr.getRiddleByLev(1, {});
    // 判断是否符合预期
    console.info(result)
    // expect(result).to.eql({
    //   lev: 1
    // });
  });

});