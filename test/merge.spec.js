import toolkit from '../index.js';

describe( 'mergeIntoObject method', () => {
  test( 'should return error message without parameter', () => {
    expect( toolkit.mergeIntoObject()).toEqual( 'Missing parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with string', () => {
    expect( toolkit.mergeIntoObject( 'test' )).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with number', () => {
    expect( toolkit.mergeIntoObject( 1235 )).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with null', () => {
    expect( toolkit.mergeIntoObject( null )).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with object', () => {
    expect( toolkit.mergeIntoObject( {} )).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with boolean', () => {
    expect( toolkit.mergeIntoObject( true )).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with Map', () => {
    expect( toolkit.mergeIntoObject( new Map())).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return error message wrong parameter with Set', () => {
    expect( toolkit.mergeIntoObject( new Set())).toEqual( 'Wrong parameter. It has to be a value of type Array' );
  })
  
  test( 'should return empty object', () => {
    expect( toolkit.mergeIntoObject( [] )).toEqual( {} );
  })
  
  test( 'should return { key: "value" }', () => {
    expect( toolkit.mergeIntoObject([
      {
        key: "value"
      }
    ])).toEqual({ key: "value" });
  })
  
  test( 'should return { key: "value1" }', () => {
    expect( toolkit.mergeIntoObject([
      {
        key: "value"
      },
      {
        key: "value1"
      },
    ])).toEqual({ key: "value1" });
  })
  
  test( 'should return { key_1: "value", key: "value1" }', () => {
    expect( toolkit.mergeIntoObject([
      {
        key_1: "value"
      },
      {
        key: "value1"
      },
    ])).toEqual({ key_1: "value", key: "value1" });
  })
})
