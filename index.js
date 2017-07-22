const midi = require('midi');

const input = new midi.input();
const portCount = input.getPortCount();

const callback = (delta, msg) => {
  // The message is an array of numbers corresponding to the MIDI bytes:
  //   [status, data1, data2]

  const code = msg[1];

  console.log(code);

  // 75 resolves to most top-right knob
  if (code === 75) {
    console.log(`Received closing code [${code}], closing connection to [${input.getPortName(0)}]`);
    input.closePort();
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

