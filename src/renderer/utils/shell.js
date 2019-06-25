/**
 * shell模块
 *
 * Created by Raquel on 2019/06/24.
 */

const shell = require('shelljs');
const path = require('path');

const cwd = path.join(process.cwd(), '/checker-279/bin/scan-build');
let openReportsCommand = '';

/**
 * 在 clang 执行 scan-build 命令
 * @param o
 * @param d
 * @return {Promise<any>}
 */
export function scanBuild(o, d) {
  return new Promise((resolve, reject) => {
    if (d) {
      shell.cd(d);
    }
    const scanBuildPath = `./${path.relative(d, cwd)}`;
    const command = o.replace(/smartrocket-analyze/, scanBuildPath);
    shell.exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(stdout);
      }
      openReportsCommand = stdout;
      resolve(stderr);
    });
  });
}

/**
 * 在 clang 执行 scan-view 命令
 * @return {Promise<any>}
 */
export function scanView() {
  return new Promise((resolve, reject) => {
    const start = openReportsCommand.indexOf('scan-view');
    const end = openReportsCommand.indexOf('to examine') - 2;

    shell.cd('checker-279/bin');
    const command = openReportsCommand.substring(start, end).replace(/scan-view/, './scan-view');
    shell.exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(stdout);
      }
      resolve(stderr);
    });
  });
}
