const fs = require('fs');
const path = require('path');

const date = {
  state: {
    beginDate: '123',
  },
  mutations: {
    SAVE_DATE(state, { date }) {
      console.log(2222, date);
      state.beginDate = date;
    },
  },
  actions: {
    UpdateDate({ commit }) {
      console.log(2222);
      return new Promise((resolve, reject) => {
        const datePath = path.resolve(__dirname, './../../licence');
        fs.readFile(datePath, 'utf-8').then((date) => {
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
        }).catch((e) => {
          reject(e);
        });
      });
    },
  },
  Test() {
    console.log(111111111);
  },
};


export default date;
