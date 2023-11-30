
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';
import 'dotenv/config'
import container from './Config/inversify.config';

const app = express();

const server = new InversifyExpressServer(container, null, null, app);

server.setConfig((app) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
});

const serverInstance = server.build();
const PORT = process.env.PORT;

serverInstance.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).send({
    message: `Route '${req.path}', NOT found...`,
    status: 'error'
  });
});


serverInstance.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
export default app;
