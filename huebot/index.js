const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

require('dotenv').load();
const bip = process.env.BRIDGE_ID;
const usr = process.env.USER_ID;

const app = express();
app.use(bodyParser.json());     // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

const hostAddress = `http://${bip}/api/${usr}`;
const getConnectedLights = () => fetch(`${hostAddress}/lights`).then(data => data.json());

const colors = {
  red: [0.6679, 0.3181],
  green: [0.41, 0.51721],
  blue: [0.1691,	0.0441],
  white: [0.3227, 0.329],
};

const setLight = (id, state) => {
  fetch(`${hostAddress}/lights/${id}/state`, {
    method: 'PUT',
    body: JSON.stringify({
      on: state.on,
      xy: state.color || colors.white,
      effect: state.effect || 'none',
      alert: state.alert || 'none',
      transitiontime: state.transitiontime || 'none',
    }),
  });
};

app.use('/store', (req, res, next) => {
  if (req.body.token !== process.env.SLACK_TOKEN) {
    return res.status(500).send('Cross site request forgerizzle!');
  } return next();
});

app.post('/store', (req, res) => {
  switch (req.body.text.split(' ')[0]) {

    case 'on': {
      getConnectedLights()
      .then(json => {
        Object.keys(json).forEach(id => {
          setLight(id, { on: true });
        });
      });
      return res.send('Turned on!');
    }

    case 'off': {
      getConnectedLights()
      .then(json => {
        Object.keys(json).forEach(id => {
          setLight(id, { on: false });
        });
      });
      return res.send('Turned off!');
    }

    case 'party': {
      getConnectedLights()
      .then(json => Object.keys(json).forEach(id => {
        fetch(`${hostAddress}/lights/${id}/state`, {
          method: 'PUT',
          body: JSON.stringify({
            on: true,
            transitiontime: 1,
            alert: 'lselect',
            effect: 'colorloop',
          }),
        });
      }));
      return res.send('Party started :tada:');
    }

    case 'red':
    case 'green':
    case 'blue':
    case 'white': {
      getConnectedLights()
      .then(json => Object.keys(json).forEach(id => {
        setLight(id, {
          color: colors[req.body.text.split(' ')[0]],
        });
      }));
      return res.send(`Color changed to ${req.body.text.split(' ')[0]}`);
    }

    default: {
      return res.send('Usage: /lights [on, off, party, red, green, blue, white]');
    }

  }
});

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'));
