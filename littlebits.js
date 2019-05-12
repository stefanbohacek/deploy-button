const api = require( 'littlebits-cloud-http' ).defaults( { access_token: process.env.ACCESS_TOKEN } );

module.exports = {
  subscribeToCloudBit: function( cb ){
    if ( process.env.DEVICE_ID ){
      console.log( `subscribing to events for device ${process.env.DEVICE_ID}...` );
      api.subscribe( {
        publisher_id: process.env.DEVICE_ID,
        subscriber_id: `https://${process.env.PROJECT_DOMAIN}.glitch.me/on`,
        publisher_events: ['amplitude:delta:ignite']
      }, function( err, result ){
        if ( err ){
          console.log( err );
        }
        else{
          console.log( 'successfully subscribed to "on" events...' );          
        }
        if ( cb ){
          cb( err );
        }          
      } );
    } else {
        if ( cb ){
          cb( { error: 'DEVICE_ID not specified, please see README.md...' } );
        }
    }
  }
};
