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



##Troubleshooting

Ensure Raspberry Pi is turned on and connected to the Internet

Run `node ~/Desktop/cs50/huebot/index.js`

In a new Terminal window, run `ngrok http 8080`
[img](http://imgur.com/nzN9PLC)

Visit https://cs50.slack.com/services/B1RUW0AHX

Ensure integration settings url is = ngrok url
[img](http://imgur.com/YLe6TyY)

