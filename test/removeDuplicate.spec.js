import toolkit from '../index.js';

describe( 'removeDuplicate method', () => {
  test( 'should return error message without parameter', () => {
    expect( toolkit.removeDuplicate()).toEqual( 'Missing parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with string', () => {
    expect( toolkit.removeDuplicate( 'test' )).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with number', () => {
    expect( toolkit.removeDuplicate( 1235 )).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with null', () => {
    expect( toolkit.removeDuplicate( null )).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with object', () => {
    expect( toolkit.removeDuplicate( {} )).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with boolean', () => {
    expect( toolkit.removeDuplicate( true )).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with Map', () => {
    expect( toolkit.removeDuplicate( new Map())).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with Set', () => {
    expect( toolkit.removeDuplicate( new Set())).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return empty array', () => {
    expect( toolkit.removeDuplicate( [] )).toEqual( [] );
  })
  
  test( 'should return { key: "value1" }', () => {
    expect( toolkit.removeDuplicate([
      {
        key: "value"
      },
      {
        key: "value1"
      },
    ])).toEqual([{ key: "value" }, { key: "value1" }]);
  })
  
  test( 'should return [{ key: "value" }, "a", "b", "d"]', () => {
    expect( toolkit.removeDuplicate([{ key: "value" }, "a", "b", "d", "a"]))
    .toEqual([{ key: "value" }, "a", "b", "d"]);
  })
  
  test( 'should return [ 1, 2, 3]', () => {
    expect( toolkit.removeDuplicate([ 1, 2, 3, 3, 1, 2 ]))
    .toEqual([ 1, 2, 3]);
  })
})
