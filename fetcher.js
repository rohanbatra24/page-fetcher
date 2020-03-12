const request = require('request');
const fs = require('fs');
const http = process.argv[2];
const file = process.argv[3];
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
request(http, (error, _response, body) => {
  if (error) {
    console.log('URL does not exist and/or is invalid');
    rl.close();
    return;
  }
  if (fs.existsSync(file)) {
    rl.question('File already exist. Do you want to overwrite the file? (Y/N) then <ENTER>', (exist) => {
      if (exist === 'Y') {
        fs.writeFile(file, body, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    });
  }
  fs.writeFile(file, body, (err) => {
    if (err) {
      throw err;
    }
    const stats = fs.statSync(file);
    const fileSizeInBytes = stats.size;
    console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${file}`);
    rl.close();
    return;
  });
});
