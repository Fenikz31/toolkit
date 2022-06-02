import toolkit from '../index.js';

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