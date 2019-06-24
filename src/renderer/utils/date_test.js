/**
 * 日期模块
 *
 * Created by Raquel on 2019/06/24.
 */

// import config from './../../config';
const fs = require('fs');
const path = require('path');

// /**
//  * 从 config 文件获取开始时间
//  * @return { String }
//  */
// export function getBeginDate() {
//   return config.beginDate;
// }
//
// /**
//  * 从 config 文件获取到期时间
//  * @return { String }
//  */
// export function getExpireDate() {
//   return config.expireDate;
// }

/**
 * 设置开始时间和到期时间
 */
function saveDate() {
  console.log('save Date called..');
  const str = JSON.stringify({
    a: '0000/00/00',
    b: '0000/00/00',
  });
  const datePath = path.resolve(__dirname, './../../licence');

  try {
    const datetime = fs.readFileSync(datePath, 'utf-8');
    console.log(datetime)
    fs.writeFileSync(datePath, str, 'utf-8');
  } catch (e) {
    console.log(e);
  }
}

saveDate()
