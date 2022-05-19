// import { expect } from 'chai';
import toolkit from '../index.mjs';

describe( 'flattenObject method', () => {
  test( 'should return false', () => {
    expect( toolkit.flattenObj()).toEqual( undefined )
  })
})

describe( 'isEmpty method', () => {
  test( 'should return undefined without paramater', () => {
    expect( toolkit.isEmpty() ).toEqual( undefined );
  })
  
  test( 'should return true if paramater is an empty Array', () => {
    expect( toolkit.isEmpty([]) ).toEqual( true );
  })
  
  test( 'should return true if paramater is an empty Map', () => {
    expect( toolkit.isEmpty( new Map() ) ).toEqual( true );
  })
  
  test( 'should return true if paramater is an empty Object', () => {
    expect( toolkit.isEmpty({}) ).toEqual( true );
  })
  
  test( 'should return true if paramater is an empty Set', () => {
    expect( toolkit.isEmpty( new Set() ) ).toEqual( true );
  })
  
  test( 'should return true if paramater is an empty string', () => {
    expect( toolkit.isEmpty( '' ) ).toEqual( true );
  })
  
  test( 'should return false if paramater is not an empty Array', () => {
    expect( toolkit.isEmpty([ 'array' ]) ).toEqual( false );
  })
  
  test( 'should return false if paramater is not an empty Map', () => {
    const map = new Map();
    map.set( 'key', 'value' );
    expect( toolkit.isEmpty( map ) ).toEqual( false );
  })
  
  test( 'should return false if paramater is not an empty Object', () => {
    expect( toolkit.isEmpty({ key: 'value' }) ).toEqual( false );
  })
  
  test( 'should return false if paramater is not an empty Set', () => {
    const set = new Set([ 1, 2, 3, 4, 5 ]);
    expect( toolkit.isEmpty( set ) ).toEqual( false );
  })
  
  test( 'should return false if paramater is not an empty string', () => {
    expect( toolkit.isEmpty( 'this is a string' ) ).toEqual( false );
  })
});

describe( 'isOfType property', () => {
  const primitives = {
    Array,
    Map,
    Set,
    Date,
    Object,
    String,
    Number,
    Boolean,
    null: null,
    undefined: undefined
  }  
  
  Object.keys( toolkit.isOfType ).forEach(( key ) => {
    if ( key !== 'type' && key !== 'nil' ) 
      return Object.keys( primitives ).forEach(( primitive ) => {
        if ( typeof primitives[ primitive ] !== 'function' ) {
          if ( key === primitive.toLowerCase() ) {
            return test( `Method '${ key }' with ${ primitive } : should return true`, () => {
              expect( toolkit.isOfType[ key ]( primitives[ primitive ])).toEqual( true )
            })
          }
          return test( `Method '${ key }' with ${ primitive } : should return false`, () => {
            expect( toolkit.isOfType[ key ]( primitives[ primitive ])).toEqual( false )
          })
        }
        if ( key === primitive.toLowerCase() ) {
          return test( `Method '${ key }' with ${ primitive } : should return true`, () => {
            expect( toolkit.isOfType[ key ]( new primitives[ primitive ]())).toEqual( true )
          })
        }
        return test( `Method '${ key }' with ${ primitive } : should return false`, () => {
          expect( toolkit.isOfType[ key ]( new primitives[ primitive ]())).toEqual( false )
        })
      })

    if ( key === 'nil' ) {
      return Object.keys( primitives ).forEach(( primitive ) => {
        if ( [ 'null', 'undefined' ].indexOf( primitive ) !== -1 ) 
          return test( `Method '${ key }' with ${ primitive } : should return true`, () => {
            expect( toolkit.isOfType[ key ]( typeof primitives[ primitive ] !== 'function' ? primitives[ primitive ] : primitives[ primitive ]())).toEqual( true )
          })
        
        return test( `Method '${ key }' with ${ primitive } : should return false`, () => {
          expect( toolkit.isOfType[ key ]( typeof primitives[ primitive ] !== 'function' ? primitives[ primitive ] : new primitives[ primitive ]())).toEqual( false )
        })
      })
    }

    if ( key === 'type' ) {
      return Object.keys( primitives ).forEach(( primitive ) => {
        const instance = typeof primitives[ primitive ] !== 'function' ? primitives[ primitive ] : new primitives[ primitive ]()

        if ( [ 'Array', 'Map', 'Set', 'Date', 'Object', 'String', 'Number', 'Boolean' ].indexOf( primitive ) !== -1 ) 
        return test( `Method '${ key }' with ${ primitive } : should return true`, () => {
            expect( toolkit.isOfType[ key ](
              instance,
              primitives[ primitive ]
              )).toEqual( true )
          })
        
        return test( `Method '${ key }' with ${ primitive } : should return false`, () => {
          expect( toolkit.isOfType[ key ](
            instance,
            primitives[ primitive ]
          )).toEqual( false )
        })
      })
    }
  })
});