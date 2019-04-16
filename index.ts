import { Server } from './src/classes/server';
const default_port = process.env.PORT || 3000;

Server.getInstance().start(default_port).then(() => {
  console.log(`Server is listening on port ${default_port}`);
});