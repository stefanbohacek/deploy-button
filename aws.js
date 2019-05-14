if ( !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_STACK_ID ){
  console.log('see README.md...');
  process.exit();
}

const AWS = require('aws-sdk'),
      opsworks = new AWS.OpsWorks( {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAcessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
      } ),
      slack = require(__dirname + '/slack.js');

module.exports = {
  checkDeploymentStatus: function( cb ){
    console.log( 'checking deployment status...' );
    opsworks.describeDeployments({
      StackId: process.env.AWS_STACK_ID,
    }, function(err, data) {
      if (err){
        slack.postSlackMessage( process.env.SLACK_CHANNEL_ID, 'Unable to check deployment status.' );
        console.log( err );
      };
      let isDeploying = false;

      if ( data && data.Deployments ){
        data.Deployments.forEach( function( deployment ){
          if ( deployment && deployment.Status && deployment.Status === 'running' ){
            isDeploying = true;
          }
        } );
        
        console.log( { isDeploying } );
        
        if ( cb ){
          cb( isDeploying );
        }
      }
    });
  },
  runDeployment: function( cb ){
    var helper = this;

    opsworks.createDeployment( {
      Command: {
        Name: 'deploy'
      },
      StackId: process.env.AWS_STACK_ID,
      AppId: process.env.AWS_APPLICATION_ID,
      Comment: 'Running automated stage deploy.'
    }, function( err, data ) {
      if ( err ){
        console.log( err );
        slack.postSlackMessage( process.env.SLACK_CHANNEL_ID, 'There was an error while running deployment.' );
      } else {
        console.log( 'running deployment...', data );

        helper.notifyWhenDeploymentIsFinished();

        slack.postSlackMessage( process.env.SLACK_CHANNEL_ID, 'Deploying stage.', function( err ){
          console.log( err );
        } );
      }    
      if ( cb ){
        cb( err, data );
      }
    });
  },
  notifyWhenDeploymentIsFinished: function( cb ){
    var helper = this;
    helper.checkDeploymentStatus( function( isDeploying ) {
      console.log( `checking deployment status: ${isDeploying}` );
      if ( isDeploying ){
        setTimeout( function(){
          helper.notifyWhenDeploymentIsFinished();
        }, 5000 );
      } else {
        slack.postSlackMessage( process.env.SLACK_CHANNEL_ID, 'Deployment is finished.' );        
      }
    });
  }
};
