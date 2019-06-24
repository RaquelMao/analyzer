/**
 * 实用函数模块
 *
 * Created by Raquel on 2019/06/21.
 */

const randomstring = require('randomstring');
const path = require('path');
const fs = require('fs');
/**
 * 生成一个token，包含随机数和时间戳
 * @returns {String}
 */
export function generateToken() {
  return `${randomstring.generate(16)}@${Date.now()}`;
}

/**
 * 判断是否是数组类型
 * @param o
 * @returns {Boolean}
 */
export function isArrayType(o) {
  return !!o && Object.prototype.toString.call(o) === '[object Array]';
}

/**
 * 判断是否是文件
 * @param path
 * @returns {Boolean}
 */
export function isFile(path) {
  return fs.statSync(path).isFile();
}

/**
 * 读取文件内容
 * @param p
 * @return {string}
 */
export function readFile(p) {
  return fs.readFileSync(path.resolve(__dirname, p), 'utf-8');
}
