const http = require('http');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('worker alive');
});
const port = process.env.PORT || 3000;
server.listen(port, () => console.log('Health server on port ' + port));

const worker = spawn('npm', ['run', 'worker'], { stdio: 'inherit' });
worker.on('exit', (code) => {
  console.log('Worker exited with code ' + code);
  process.exit(code || 0);
});
