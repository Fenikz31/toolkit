import { expect } from 'chai';
import toolkit from '../index.mjs';

describe( 'isEmpty method', () => {
  it( 'should return undefined without paramater', () => {
    expect( toolkit.isEmpty() ).to.equal( undefined );
  })
  
  it( 'should return true if paramater is an empty Array', () => {
    expect( toolkit.isEmpty([]) ).to.equal( true );
  })
  
  it( 'should return true if paramater is an empty Map', () => {
    expect( toolkit.isEmpty( new Map() ) ).to.equal( true );
  })
  
  it( 'should return true if paramater is an empty Object', () => {
    expect( toolkit.isEmpty({}) ).to.equal( true );
  })
  
  it( 'should return true if paramater is an empty Set', () => {
    expect( toolkit.isEmpty( new Set() ) ).to.equal( true );
  })
  
  it( 'should return true if paramater is an empty string', () => {
    expect( toolkit.isEmpty( '' ) ).to.equal( true );
  })
  
  it( 'should return false if paramater is not an empty Array', () => {
    expect( toolkit.isEmpty([ 'array' ]) ).to.equal( false );
  })
  
  it( 'should return false if paramater is not an empty Map', () => {
    const map = new Map();
    map.set( 'key', 'value' );
    expect( toolkit.isEmpty( map ) ).to.equal( false );
  })
  
  it( 'should return false if paramater is not an empty Object', () => {
    expect( toolkit.isEmpty({ key: 'value' }) ).to.equal( false );
  })
  
  it( 'should return false if paramater is not an empty Set', () => {
    const set = new Set([ 1, 2, 3, 4, 5 ]);
    expect( toolkit.isEmpty( set ) ).to.equal( false );
  })
  
  it( 'should return false if paramater is not an empty string', () => {
    expect( toolkit.isEmpty( 'this is a string' ) ).to.equal( false );
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
            return it( `Method '${ key }' with ${ primitive } : should return true`, () => {
              expect( toolkit.isOfType[ key ]( primitives[ primitive ])).to.equal( true )
            })
          }
          return it( `Method '${ key }' with ${ primitive } : should return false`, () => {
            expect( toolkit.isOfType[ key ]( primitives[ primitive ])).to.equal( false )
          })
        }
        if ( key === primitive.toLowerCase() ) {
          return it( `Method '${ key }' with ${ primitive } : should return true`, () => {
            expect( toolkit.isOfType[ key ]( new primitives[ primitive ]())).to.equal( true )
          })
        }
        return it( `Method '${ key }' with ${ primitive } : should return false`, () => {
          expect( toolkit.isOfType[ key ]( new primitives[ primitive ]())).to.equal( false )
        })
      })

    if ( key === 'nil' ) {
      return Object.keys( primitives ).forEach(( primitive ) => {
        if ( [ 'null', 'undefined' ].indexOf( primitive ) !== -1 ) 
          return it( `Method '${ key }' with ${ primitive } : should return true`, () => {
            expect( toolkit.isOfType[ key ]( typeof primitives[ primitive ] !== 'function' ? primitives[ primitive ] : primitives[ primitive ]())).to.equal( true )
          })
        
        return it( `Method '${ key }' with ${ primitive } : should return false`, () => {
          expect( toolkit.isOfType[ key ]( typeof primitives[ primitive ] !== 'function' ? primitives[ primitive ] : new primitives[ primitive ]())).to.equal( false )
        })
      })
    }

    if ( key === 'type' ) {
      return Object.keys( primitives ).forEach(( primitive ) => {
        if ( [ 'Array', 'Map', 'Set', 'Date', 'Object', 'String', 'Number', 'Boolean' ].indexOf( primitive ) !== -1 ) 
          return it( `Method '${ key }' with ${ primitive } : should return true`, () => {
            expect( toolkit.isOfType[ key ](
              typeof primitives[ primitive ] !== 'function' ? primitives[ primitive ] : new primitives[ primitive ](),
              typeof primitives[ primitive ] !== 'function' ? primitives[ primitive ] : new primitives[ primitive ]()
              )).to.equal( true )
          })
        
        return it( `Method '${ key }' with ${ primitive } : should return false`, () => {
          expect( toolkit.isOfType[ key ](
            typeof primitives[ primitive ] !== 'function' ? primitives[ primitive ] : new primitives[ primitive ](),
            typeof primitives[ primitive ] !== 'function' ? primitives[ primitive ] : new primitives[ primitive ]()
          )).to.equal( false )
        })
      })
    }
  })
});
