/**
 * Created by Raquel on 2019/06/24
 */
const fs = require('fs');
const path = require('path');

const date = {
  state: {
    beginDate: '',
    expireDate: '',
  },
  mutations: {
    SAVE_DATE(state, { date }) {
      state.beginDate = date;
      const expireDate = new Date(new Date(date).setMonth(new Date(date).getMonth() + 1));
      state.expireDate = `${expireDate.getFullYear()}/${expireDate.getMonth() + 1}/${expireDate.getDate()}`;
    },
  },
  actions: {
    /**
     * 初始化开始日期，仅执行一次
     * @param commit
     * @return {Promise<any>}
     * @constructor
     */
    InitDate({ commit }) {
      return new Promise((resolve, reject) => {
        let datePath = path.join(__static, '/licence');
        if (process.platform === 'darwin') {
          datePath = path.join(__static, '/licence');
        } else {
          datePath = path.join(__static, '\\licence');
        }
        fs.readFile(datePath, 'utf-8', (err, date) => {
          if (err) {
            reject(err);
          } else {
            try {
              if (!date) {
                date = new Date();
                fs.writeFileSync(datePath, date, 'utf-8');
              }
              commit('SAVE_DATE', { date });
              resolve(date);
            } catch (e) {
              reject(e);
            }
          }
        });
        // fs.readFile(datePath, 'utf-8').then((date) => {
        //   console.log(11, date);
        //   try {
        //     console.log(111, date);
        //     if (!date) {
        //       date = new Date();
        //       fs.writeFileSync(datePath, date, 'utf-8');
        //     }
        //     commit('SAVE_DATE', { date });
        //     resolve(date);
        //   } catch (e) {
        //     reject(e);
        //   }
        // }).catch(reject);
      });
    },
  },
};


export default date;
