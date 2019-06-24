/**
 * 日期模块
 *
 * Created by Raquel on 2019/06/24.
 */

const fs = require('fs');
const path = require('path');

/**
 * 设置开始时间和到期时间
 */
export function saveDate() {
  const datePath = path.resolve(__dirname, './../../licence');
  try {
    const data = fs.readFileSync(datePath, 'utf-8');
    if (!data) {
      fs.writeFileSync(datePath, +new Date(), 'utf-8');
    }
  } catch (e) {
    console.log(e);
  }
}

export function test() {
}
