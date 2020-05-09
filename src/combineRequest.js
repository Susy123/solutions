import {
    mockFetch
} from '../test/mock/mockFetch'
var idArr = [];
var resolveArr = [];
var rejectArr = [];
var dataCache = {};
var timer = null;

export function getUserById(userId) {
    if (dataCache[userId]) {
        return new Promise(resolve => {
            resolve(dataCache[userId]);
        });
    }
    return new Promise((resolve, reject) => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            if (idArr.length == 1) {
                mockFetch(`/api/user/${userId}`)
                    .then(data => {
                        dataCache[userId] = data;
                        resolve(data);
                    })
                    .catch(reject);
            } else {
                getUserByIds(idArr)
                    .then(resp => {
                        resolveArr.forEach((item, index) => {
                            typeof item === 'function' &&
                                item(getItemById(resp, idArr[index]));
                        });
                        resolveArr = []
                        idArr = [];
                    })
                    .catch(e => {
                        rejectArr.forEach(item => {
                            typeof item === 'function' && item(e);
                        });
                        rejectArr = []
                        idArr = [];
                    });
            }
        }, 100);
        idArr.push(userId);
        resolveArr.push(resolve);
        rejectArr.push(reject);
    });
}

export function getUserByIds(ids) {
    return (
        mockFetch(`/api/users/${ids.join(',')}`)
        // .then(resp => resp.json())
        .then(data => {
            data.forEach(item => {
                dataCache[item.id] = item;
            });
            return data;
        })
    );
}

function getItemById(arr, id) {
    let arrLength = arr.length;
    for (let i = 0; i < arrLength; i++) {
        if (arr[i].id == id) {
            return arr[i];
        }
    }
}