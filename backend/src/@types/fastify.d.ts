import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    getCurrentUserId(): Promises<string>
  }
}