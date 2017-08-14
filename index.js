#!/usr/bin/env node

const midi = require('midi');

const input = new midi.input();
const portCount = input.getPortCount();

const callback = (delta, msg) => {
  // The message is an array of numbers corresponding to the MIDI bytes:
  //   [status, data1, data2]

  const code = msg[1];

  switch (code) {
    case 75: // top-right knob
      console.log(`received closing code [${code}], closing connection to [${input.getportname(0)}]`);
      input.closeport();
      break;
    case 10: // top-left knob
      const exec = require('child_process').exec;

      exec('sh ./scripts/spotify-notification.sh', (error, stdout, stderr) => {
        if (error) return console.error(error);
        // Success
      })
      break;
    default:
      console.log(code);
  }
}

console.log(`Found [${portCount}] number of ports`);

if (portCount) {
  console.log(`Using first port with name [${input.getPortName(0)}]`);

  input.on('message', callback);
  console.log('Listener successfully registered');

  input.openPort(0);
  console.log('Opened port 0, ready for accepting MIDI messages');
}

