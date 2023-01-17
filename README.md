# 必须方法
见doc 【腾讯文档】算法要求
https://docs.qq.com/doc/DUmNlSXJTdG1nckpm

## 步骤一.使用
1. 首次运行项目时 npm install 安装相关依赖
2. 运行 npm run build 使现有的ts文件转成js到dist目录
3. 运行 npm run watch 启动监视，模块会自动检测文件改变，并实时转ts为js到dist目录

## 步骤二.调试
1. 在test目录下按照目录创建和编写自己的测试模块
2. 按照module{册数}_{题号}的格式创建自己的算法主文件在lib目录下
3. 在lib/index.ts里按照示例添加自己负责的算法模块的对应引用和导出
4. 调试修改算法(请注意这里应该已完成步骤一)
5. 运行 mocha test/自己的模块/**.js --reporter spec   进行单元测试
6. 循环45

## 步骤三.提交
1. 应保证注释可读性
2. 提交时应保证已经过自测
3. 自己提交的模块对应的index入口文件，注释上作者姓名和提交时间
4. 提交git 应保证提交记录说明对应的修改内容和题号

# 额外的调试方法
1. 参考test.ts 自己建一个入口文件
2. package.json里参考debug自己建一个对应的debug指令
3. 直接运行ts代码进行调试，可以打断点等

# 开发资源
1. 资源汇总 [资源汇总](https://docs.qq.com/sheet/DUndTUG5KWldyVEZP?tab=BB08J2)
2. 大致的机器人递归两步思路[腾讯文档](https://docs.qq.com/flowchart/DUklQc2ZLcklHbGhJ)


