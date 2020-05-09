import {
    getUserById
} from '../src/combineRequest';
import {
    getRequestCount,
    setRequestCount
} from './mock/mockFetch';

describe('combineRequest', () => {
    test('combineRequest test1', (done) => {
        expect.assertions(5)
        var count = 0;
        const callback = () => {
            expect(getRequestCount()).toBe(1)
            done()
        }
        getUserById('111').then(res => {
            expect(res).toEqual({
                id: '111',
                name: 'xiaoming'
            })
            count++
        });
        getUserById('112').then(res => {
            expect(res).toEqual({
                id: '112',
                name: 'lihong'
            })
            count++
        });
        setTimeout(() => {
            getUserById('111').then(res => {
                expect(res).toEqual({
                    id: '111',
                    name: 'xiaoming'
                })
                count++
                if (count == 4) {
                    callback()
                }
            });
            getUserById('112').then(res => {
                expect(res).toEqual({
                    id: '112',
                    name: 'lihong'
                })
                count++
                if (count == 4) {
                    callback()
                }
            });
        }, 1000)
    });
});