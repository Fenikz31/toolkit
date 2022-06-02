import toolkit from '../index.js';

describe( 'isEmpty method', () => {
  test( 'should return undefined without paramater', () => {
    expect( toolkit.isEmpty()).toEqual( undefined );
  })
  
  test( 'should return true if paramater is an empty Array', () => {
    expect( toolkit.isEmpty([])).toEqual( true );
  })
  
  test( 'should return true if paramater is an empty Map', () => {
    expect( toolkit.isEmpty( new Map() )).toEqual( true );
  })
  
  test( 'should return true if paramater is an empty Object', () => {
    expect( toolkit.isEmpty({})).toEqual( true );
  })
  
  test( 'should return true if paramater is an empty Set', () => {
    expect( toolkit.isEmpty( new Set() )).toEqual( true );
  })
  
  test( 'should return true if paramater is an empty string', () => {
    expect( toolkit.isEmpty( '' )).toEqual( true );
  })
  
  test( 'should return false if paramater is not an empty Array', () => {
    expect( toolkit.isEmpty([ 'array' ])).toEqual( false );
  })
  
  test( 'should return false if paramater is not an empty Map', () => {
    const map = new Map();
    map.set( 'key', 'value' );
    expect( toolkit.isEmpty( map )).toEqual( false );
  })
  
  test( 'should return false if paramater is not an empty Object', () => {
    expect( toolkit.isEmpty({ key: 'value' })).toEqual( false );
  })
  
  test( 'should return false if paramater is not an empty Set', () => {
    const set = new Set([ 1, 2, 3, 4, 5 ]);
    expect( toolkit.isEmpty( set )).toEqual( false );
  })
  
  test( 'should return false if paramater is not an empty string', () => {
    expect( toolkit.isEmpty( 'this is a string' )).toEqual( false );
  })
});
