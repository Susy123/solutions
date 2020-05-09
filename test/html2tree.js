import {
  html2tree
} from '../src/html2tree';

describe('html2tree', () => {
  test('html2tree test1', () => {
    let html = '<div id="main" data-x="hello">Hello<span id="sub" /></div>'
    const expectedResult = {
      tag: "div",
      selfClose: false,
      attributes: {
        "id": "main",
        "data-x": "hello"
      },
      text: "Hello",
      children: [{
        tag: "span",
        selfClose: true,
        attributes: {
          "id": "sub"
        }
      }]
    }
    expect(html2tree(html)).toEqual(expectedResult);
  });
});