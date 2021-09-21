#!/usr/bin/env node
import fs from 'fs'
import {createIndexTemplate} from './indexTemplate.js'
import {createPackageJsonTemplate} from './packageJsonTemplate.js'
import {question} from "./question.js"
import {createConfig} from "./config.js"
import execa from "execa"

const answer = await question();
const config = createConfig(answer);
//  核心：自动化
// 1, 创建文件夹（项目名）
fs.mkdirSync(getRootPath())

// 2, 创建 question.js
fs.writeFileSync(getRootPath() + '/question.js', createIndexTemplate(config))

// 3, 创建package.json
fs.writeFileSync(getRootPath() + '/package.json', createPackageJsonTemplate(config))

// 4, 安装依赖
// TODO


function getRootPath() {
  return './' + config.packageName
}
