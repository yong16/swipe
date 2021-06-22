const pkg = require('./package.json');
module.exports = {
  // skip: {
  //   tag: true,
  // },
  //types为Conventional Commits标准中定义，目前支持
  //https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
  types: [
    { type: "feat", section: "新特性" },
    { type: "fix", section: "Bug修复" },
    { type: "docs", section: "文档", hidden: true },
    { type: "chore", section: "配置项", hidden: true },
    { type: "style", section: "格式", hidden: true },
    { type: "refactor", section: "重构", hidden: true },
    { type: "perf", section: "性能", hidden: true },
    { type: "test", section: "测试", hidden: true },
    { type: "build", section: "构建", hidden: true },
    { type: "ci", section: "CI", hidden: true },
    { type: "revert", section: "回滚", hidden: true },
  ]
};