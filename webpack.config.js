/**
 * External Dependencies
 */
 const path = require( 'path' );

 /**
  * WordPress Dependencies
  */
 const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

 module.exports = {
     ...defaultConfig,
     ...{
         entry: {
             "ep-frontend": path.resolve( process.cwd(), 'src', 'ep-frontend.js' ),
             "index": path.resolve( process.cwd(), 'src', 'index.js' ),
         },
     }
 }