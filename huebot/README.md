# Huebot

Control your [Philips Hue Lights](www2.meethue.com/) using [Slack](https://api.slack.com/slash-commands) commands :bulb:

## Supported commands

```
/lights on
/lights off
/lights party
/lights [red, green, blue, white]
```
## Created by
- [Tobias Büschel](https://github.com/tobiasbueschel)
- [Luke Jackson](https://github.com/lukejacksonn)

## Troubleshooting

Ensure Raspberry Pi is turned on and connected to the Internet.

Run `node ~/Desktop/cs50/huebot/index.js`

In a new Terminal window, run `ngrok http 8080`.
![ngrok-status](http://imgur.com/nzN9PLC.jpeg)

Visit **https://{Your-Slack-Team}.slack.com/apps/manage/custom-integrations** and open **Custom Integrations**.

Ensure that your Slack Custom Integration uses the URL you have received from ngrok.
![slack-settings](http://imgur.com/YLe6TyY.jpeg)
