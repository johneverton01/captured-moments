import type { FastifyInstance } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";
import { BadRequestError } from "./__errors/bad-request-error.js";
import { UnauthorizedError } from "./__errors/unauthorized-error.js";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.code(400).send({
      error: 'Response validation error',
      message: "Request doesn't match the expected schema",
      details: {
        issues: error.validation,
      }
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      code: "BAD_REQUEST",
      error: error.message,
    });
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      code: "UNAUTHORIZED",
      error: error.message,
    });
  }

  console.error(error);

  // Send a structure that matches ErrorSchema to avoid serialization issues for unexpected errors
  return reply.status(500).send({
    code: "INTERNAL_SERVER_ERROR",
    error: "Internal server error"
  });
}