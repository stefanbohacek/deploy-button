![View of the littleBits cloudBit with a notification showing server deployment in progress](https://cdn.glitch.com/d1e6e429-cc0c-432d-8c23-2092bce7a350%2Fdeploy-button-thumbnail-1-small.png?1557746045867)

# Proof of concept: Physical AWS deployment button
## Made with littleBits cloudBit, AWS, and Glitch

## Getting Started

### 1. Glitch

First, [remix the deploy-button project](https://glitch.com/edit/#!/remix/deploy-button). As we go through the following steps, we will be mostly working with the `.env` and `aws.js` files.

### 2. littleBits cloudBit

You are going to need three littleBits modules:

- [button](https://littlebits.com/products/button)
- [cloudBit](https://littlebits.com/products/cloudbit)
- one of the [power bits](https://littlebits.com/pages/search-results-page?page=1&rb_collections=Power+Bits), I personally recommend [power (USB)](https://littlebits.com/products/usb-power)
- optionally you can also get a [mounting board](https://littlebits.com/collections/all-bits-accessories/products/mounting-board) to keep your bits nicely together

Connect your power source, button, and the littleBits cloudBit:

![littleBits CloudBits setup](https://cdn.glitch.com/9f67720d-ad82-43b1-a7a5-2edc81e35b48%2FCloudBitSetup.png)

Once you set up your cloudBit using [littleBits Cloud Control](http://control.littlebitscloud.cc), add your Device ID and Access Token to the `.env` file in your Glitch app. (You can find these on the "Settings" page under "Advanced".)


### 3. AWS

This part depends on your particular AWS setup. For example, at my current job, we use [Stacks](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacks.html) which we deploy through [AWS OpsWorks](https://aws.amazon.com/opsworks/).

You can see inside `aws.js` that I'm using following functions:

- [describeDeployments](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/OpsWorks.html#describeDeployments-property) to check if there are any deployments running on a specific stack
- [createDeployment](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/OpsWorks.html#createDeployment-property) to deploy a stack

Finding the Stack and Application IDs was a bit tricky for me, I pretty much just went to the deployment page, and copied the IDs from the URL  ¯\\_(ツ)\_/¯

You will need to add your Amazon AWS Access Key Id and Secret Access Key to `.env`. You can find them on the [Security Credentials](https://console.aws.amazon.com/iam/home?region=us-east-1#/security_credentials) page.


### 4. Slack (optional)

You can add a Slack token (see the [Slack legacy token generator](https://api.slack.com/custom-integrations/legacy-tokens)) and a channel ID (you can use Slack's [channels.list API method tester tool](https://api.slack.com/methods/channels.list/test) to find it) to get notified about deployments in your Slack group.

![Running deployment](https://cdn.glitch.com/d1e6e429-cc0c-432d-8c23-2092bce7a350%2Fdeploy-button-slack-1-start-deploy.png?1557670793059)

## Suggestions and improvements

**Note: If you're not able to subscribe to your device, or are getting server errors, be sure to check if the [littleBits Cloud Control](http://control.littlebitscloud.cc/) is working.**

- When a button is pressed, start a five second timer. If the button is pressed during these five seconds, cancel timer. When the five seconds are up, then run the deployment.
- Same as above, but use the [Slack Dialog API](https://api.slack.com/dialogs) so that you can cancel deployment inside Slack. (You can add [Botkit](https://glitch.com/botkit) to your project to make working with Slack API easier.)
- Add [more littleBits modules](https://littlebits.com/pages/search-results-page).

## Attributions

- This project was remixed from [littlebits-api](https://glitch.com/edit/#!/littlebits-api) created by [Jenn Schiffer](https://glitch.com/@jennschiffer) and [Gareth Wilson](https://glitch.com/@_gw).
- Project icon: [EmojiOne/JoyPixels](https://www.joypixels.com/)