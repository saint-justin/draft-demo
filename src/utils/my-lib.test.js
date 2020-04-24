import MyLib from './my-lib.js';

const testLib = new MyLib();

describe('Testing library...', () => {
  test('Testing with a single employee', () => {
    let input =
      `2
    add,1,Sharilyn Gruber,-1
    print`;

    let output = testLib.readInput(input);
    let expected = `Sharilyn Gruber [1]`
    expect(output).toEqual(expected);
  })
})