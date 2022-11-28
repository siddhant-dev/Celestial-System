const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req: { body: { email: any; password: any; }; }, res: { send: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }, next: any) => { 
  const users = db.users;

  const user = users.filter(
      (    u: { email: any; password: any; }) => u.email === req.body.email && u.password === req.body.password
  )[0];

  if (user) {
    res.send(user);
  } else {
    res.status(401).send('Incorrect username or password');
  }
});

server.post('/register', (req: { body: { id:any, email: any, name: any, password: any; }; }, res: { send: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
  const users = readUsers();
  const user = users.filter((u: { email: any; }) => u.email === req.body.email)[0];

  if (user === undefined || user === null) {
    db.users.push(req.body);
    console.log(db.users);
    res.send(req.body);
  } else {
    res.status(500).send('User already exists');
  }
});


server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

function readUsers() {
  const dbRaw = fs.readFileSync('./server/db.json');  
  const users = JSON.parse(dbRaw).users
  return users;
}