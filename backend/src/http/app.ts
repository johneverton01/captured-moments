import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifyApiReference from "@scalar/fastify-api-reference";
import fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { createAccount } from "./routes/auth/create-account.js";
import { signIn } from "./routes/auth/sign-in.js";
import { docApi } from './routes/docs/docs.js';
import { errorHandler } from './routes/error-handler.js';
import { createMoment } from './routes/moment/create-moment.js';
import { getMoment } from './routes/moment/get-moment.js';
import { searchMoment } from './routes/moment/search-moment.js';
import { updateMoment } from './routes/moment/update-moment.js';
import { getUser } from './routes/user/get-user.js';

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Captured Moments API',
      description: 'API for the Captured Moments application',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifyApiReference, {
  routePrefix: '/docs',
  configuration: {
    sources: [
      {
        title: "Captured Moments API",
        slug: "captured-moments-api",
        url: "/swagger.json",
      },
      {
        title: "Auth API",
        slug: "auth-api",
        url: "/api/auth/open-api/generate-schema",
      },
    ],
  },
})

app.register(fastifyJwt, {
  secret: 'jwt-secret',
})

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

app.get("/", async (request, reply) => {
  reply.status(200).send({
    message: "Hello, World!",
  })
});

app.register(docApi)
app.register(createAccount)
app.register(signIn)
app.register(getUser)
app.register(createMoment)
app.register(getMoment)
app.register(searchMoment)
app.register(updateMoment)

export { app };
