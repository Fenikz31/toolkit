const toolkit = {
  /**
   * flatten any object in array.
   * @param { Array } array Argument to check.
   */
  // flattenObj ( array, separator = '' ) {
  //   if ( array )
  //     return Object.keys( array ).map(( key ) => key ).reduce(( acc, curr, index ) => {
  //       console.log( 'type of curr => ', typeof curr, curr, Array.isArray( array[curr]), typeof array[curr], array[curr] )
  //       const pref = separator.length ? separator + '_' : separator
  //       if ( Array.isArray( array[ curr ])) {
  //         // console.log( 'curr => ', curr )
  //         // console.log( 'Array.isArray( array[ curr ]) =>', array[ curr ] )
  //         console.log( 'test ', array[ curr ].reduce(( a, c ) => ({ ...a, ...{[ pref + c ]: array[ curr ][ c ] } })))
  //         const depth = this.flattenObj( array[ curr ],  curr  )
          
  //       console.log( 'depth => ', depth )
  //       return { ...acc, ...depth }

  //       }
  //       if ( !Array.isArray( array[ curr ]) || typeof array[ curr ] !== 'object' || array[ curr ] === null) {
  //         // console.log( 'curr => ', curr )
  //         // console.log( 'pref => ', pref )
  //         return { ...acc, ...{[ pref + curr ]: array[ curr ] }}
  //       }
  //       // console.log( 'array[ curr ] => ', array[ curr ] )
        
  //       const depth = this.flattenObj( array[ curr ], [ curr ] )
  //       // console.log( 'depth => ', depth )
  //       return { ...acc, ...depth }
  //     }, {})

  //   return null
  // },

  /**
   * Check if an argument is empty.
   * @param { * } arg Argument to check.
   */
  isEmpty( arg ) {
    if ( arg === undefined )
      return undefined

    if (
      Array.isArray( arg ) ||
      typeof arg === 'string' ||
      arg instanceof String
    )
      return arg.length === 0

    if ( arg instanceof Map || arg instanceof Set )
      return arg.size === 0

    if (({}).toString.call( arg ) === '[object Object]')
      return Object.keys( arg ).length === 0

    // return false
  },

  isOfType: {
    /**
     * Check for null type.
     * @param { * } arg Argument to check.
     */
    null : ( arg ) => arg === null,
    
    /**
     * Check for undefined type.
     * @param { * } arg Argument to check.
     */
    undefined: ( arg ) => arg === undefined,

    /**
     * Check for nil type. Either null or undefined.
     * @param { * } arg Argument to check.
     */
    nil ( arg ) {
      return this.null( arg ) || this.undefined( arg )
    },

    /**
     * Check for strings and string literal type. e.g: `'s'`, `"s"`,`` `str` ``, `new String()`.
     * @param { * } arg Argument to check.
     */
    string ( arg ) {
      return !this.nil( arg ) && ( typeof arg === 'string' || arg instanceof String )
    },

    /**
     * Check for number or number literal type. e.g: `12`, `30.5`, `new Number()`.
     * @param { * } arg Argument to check.
     */
    number ( x ) {
      return !this.nil( x ) &&
      ( // NaN & Infinity have typeof "number" and this excludes that
        ( !isNaN( x ) && isFinite( x ) && typeof x === 'number' ) || x instanceof Number
      )
    },

    /**
     * Check for boolean or boolean literal type. e.g: `true`, `false`, `new Boolean()`.
     * @param { * } arg Argument to check.
     */
    boolean ( x ) {
      return !this.nil( x ) && ( typeof x === 'boolean' || x instanceof Boolean )
    },
    
    /**
     * Check for array type.
     * @param { * } arg Argument to check.
     */
    array ( x ) {
      return !this.nil( x ) && Array.isArray( x )
    },

    /**
     * Check for object or object literal type. e.g: `{}`, `new Object()`, `Object.create( null )`.
     * @param { * } arg Argument to check.
     */
    object: ( x ) => ({}).toString.call( x ) === '[object Object]',

    /**
     * Check for provided type instance.
     * @param { * } arg Argument to check.
     * @param { * } Inst Argument to check against.
     */
    type ( arg, Inst ) {
      return !this.nil( arg ) && arg instanceof Inst
    },

    // check for set type
    set ( arg ) {
      return this.type( arg, Set )
    },

    // check for map type
    map ( arg ) {
      return this.type( arg, Map )
    },

    // check for date type
    date ( arg ) {
      return this.type( arg, Date )
    }
  },

  /**
   *
   * @param { Array } array - An array of Object to merge
   * @description
   * Merge an array of object to a single object.
   * @example <caption> With different keys</caption>
   * const data = [
   *  \t{ first:{ id: 0, value: 1 }},
   *  { second: { id: 1, value: 2 }}
   * ];
   *
   * toolkit.MergeObject( data );
   * returns
   * {
   *  "first": {
   *    "id": 0,
   *    "value": 1
   *  },
   *  "second": {
   *    "id": 1,
   *    "value": 2
   *  }
   * }
   * or
   *
   * const data = [
   *  { id: 0, value: 1 },
   *  { id: 0, value: 2, ref: 10 }
   * ];
   *
   * toolkit.MergeObject( data );
   * {
   *   "id": 0,
   *   "value": 2,
   *   "ref": 10
   * }
   */
  mergeIntoObject: ( array ) => {
    if ( array === undefined )
      return  'Missing parameter. It has to be a value of type Array'

    if ( !Array.isArray( array ))
      return  'Wrong parameter. It has to be a value of type Array'
      
    return array.reduce(( a, b ) => ({ ...a, ...b }), {})
  } ,

  /**
  * Remove duplicate from an array
  * @param {Array} array Array from which duplicates will be removed
  */
  removeDuplicate: ( array ) => {
    if ( array === undefined )
      return  'Missing parameter. It has to be a value of type Array'

    if ( !Array.isArray( array ))
      return  'Wrong parameter. It has to be a value of type Array'
      
    return ([ ...new Set( array )])
  }
}

// console.log( toolkit.flattenObj())
// console.log( toolkit.flattenObj([]))
// console.log( toolkit.flattenObj([{}]))
// console.log( toolkit.flattenObj([1]))
// console.log( toolkit.flattenObj([1,2]))
// console.log( toolkit.flattenObj([1,2,{}]))
// console.log( toolkit.flattenObj([1,2,{ key: 'value'}]))
// console.log( toolkit.flattenObj([
//   {
//     user: {
//       id: Math.floor(Math.random() * 100),
//       username: 'username',
//       articles: [
//         {
//         id: 'depth 2 value',
//         title: 'depth 2_1 value',
//         author: ['depth 2_2 value','depth 2_2 value']
//         }
//       ]
//     }
//   }
// ]))

export default toolkit