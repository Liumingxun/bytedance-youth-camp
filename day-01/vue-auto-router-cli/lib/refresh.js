const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const chalk = require('chalk')

module.exports = async  () => {
  const list = fs.readdirSync('./src/views')
    .filter(v => v !== 'Home.vue')
    .map(v => ({
      name: path.basename(v,'.vue'),
      file: v
    }))
  // 生成路由定义
  compile({list}, './src/router.js', './template/router.js.hbs')
  // 生成菜单
  compile({list}, './src/App.vue', './template/App.vue.hbs')
  /**
   *
   * @param meta 数据定义
   * @param filePath 目标文件
   * @param templatePath 模板
   */
  function compile(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString()
      const result = handlebars.compile(content)(meta)
      fs.writeFileSync(filePath, result)
      console.log(chalk.bold.bgCyan.rgb(102, 204, 255)(`🎉${filePath} 创建成功`))
    }
  }
}