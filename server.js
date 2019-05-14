const express = require( 'express' ),
      app = express(),
      littlebits = require(__dirname + '/littlebits.js'),
      aws = require(__dirname + '/aws.js'),
      slack = require(__dirname + '/slack.js');

littlebits.subscribeToCloudBit( function( err ){
  if ( err ){
    console.log( err );
  }
} );

app.get('/', function (req, res) {
  /* Show project README when visiting home page. */
  res.redirect( `https://glitch.com/edit/#!/${process.env.PROJECT_DOMAIN}?path=README.md` );
} );

app.post( '/on', function ( req, res ) {
  /* When the button is pressed, check deployment status. If no deployment is running, start one. */
  aws.checkDeploymentStatus( function( isDeploying ){
    if ( !isDeploying ){
      aws.runDeployment( function( err ){
        /* Check for errors, do whatever. */
      } );
    } else {
        slack.postSlackMessage( process.env.SLACK_CHANNEL_ID, 'Deployment in progress.' );      
    }
  } );
} );    


var listener = app.listen( process.env.PORT, function () {
  console.log( `app is listening on port ${listener.address().port}` );
} );
