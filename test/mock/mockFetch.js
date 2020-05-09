var requestCount = 0;
var mockData = {
    '111': {
        id: '111',
        name: 'xiaoming'
    },
    '112': {
        id: '112',
        name: 'lihong'
    },
    '111,112': [{
            id: '111',
            name: 'xiaoming'
        },
        {
            id: '112',
            name: 'lihong'
        }
    ]
};

export function mockFetch(url) {
    requestCount++;
    var param = url.split('/').pop();
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockData[param]);
        }, 500);
    });
}

export function getRequestCount() {
    return requestCount
}

export function setRequestCount(val) {
    requestCount = val
}