import { Server } from './src/classes/server';

Server.getInstance().start(process.env.PORT || 3000).then(() => {
  console.log('Server is listening');
});