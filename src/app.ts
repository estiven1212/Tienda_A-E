import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';
import swaggerUi, { setup } from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(cors());
app.use(express.json());

const swaggerPath = path.join(__dirname, '../swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

app.use(errorHandler);
setupSwagger(app);

export default app;