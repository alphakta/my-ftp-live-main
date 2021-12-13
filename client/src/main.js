import { createConnection } from "net";
import { createInterface } from "readline";

let currentCommand = ''
const client = createConnection({ port: process.argv[2], host: 'localhost' }, () => {
  console.log("Client connected.");
});

const rl = createInterface({
  input: process.stdin,
});

client.on("data", (data) => {

  const message = data.toString();
  console.log("Message received:", message);
  const [status, ...args] = message.trim().split(" ");
  console.log("taper commande :")

  if (status == 220) {

    rl.on("line", (input) => {
      let string = input.split(' ')

      if (string[0] == 'USER') {
        client.write(input);
        currentCommand = 'USER'
      }
      else if (currentCommand == 'USER' && string[0] != 'PASS') {
        console.log('Please enter a password !')
      } else if (currentCommand == 'USER' && string[0] == 'PASS') {
        client.write(input);
        currentCommand = 'PASS'
      } else if (currentCommand == 'PASS')
        client.write(input)
      else
        console.log('Please log in', status)
    });
  }

  if (status == 221)
    process.exit()

});


