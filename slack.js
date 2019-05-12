/*
  Just a simple API call via an http request. Be sure to check out glitch.com/botkit if you'd like to add more Slack functionality. 
*/
const request = require( 'request' );

module.exports = {
  postSlackMessage: function( channel, message, cb ){
    if ( process.env.SLACK_TOKEN && channel && message ){
      request( `https://slack.com/api/chat.postMessage?token=${ process.env.SLACK_TOKEN }&channel=${ channel }&text=${ message }&username=AWS Deployment&icon_emoji=:control_knobs:`,
        function ( err, res, body ) {
          if ( cb ){
            cb( err, body );
          }
        }
      );
    }
  }
};