import { InvalidCredentialsError } from "@/use-cases/__errors/invalid-credentials-error.js";
import { UserAlreadyExistsError } from "@/use-cases/__errors/user-already-exists-error.js";
import type { FastifyInstance } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";
import { BadRequestError } from "./__errors/bad-request-error.js";
import { UnauthorizedError } from "./__errors/unauthorized-error.js";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    const validationIssues = error.validation.map(issue => ({
      field: issue.instancePath, 
      message: issue.message      
    }));
    
    return reply.code(400).send({
      code: "VALIDATION_ERROR",
      error: 'Response validation error',
      issues: validationIssues,
    })
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.status(409).send({
      code: "USER_ALREADY_EXISTS",
      error: error.message,
    });
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.status(400).send({
      code: "UNAUTHORIZED",
      error: error.message,
    });
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


  return reply.status(500).send({
    code: "INTERNAL_SERVER_ERROR",
    error: "Internal server error",
    
  });
}