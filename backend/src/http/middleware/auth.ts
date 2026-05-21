import type { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../routes/__errors/unauthorized-error.js";

export const authMiddleware = fastifyPlugin(
  async (app: FastifyInstance) => {
    app.addHook("preHandler", async (request) => {
      request.getCurrentUserId = async function() {
        try {
          const authHeader = request.headers.authorization;
          
          if (!authHeader) {
            throw new UnauthorizedError("Missing auth token");
          }

          const token = authHeader.split(" ")[1];

          if (!token) {
            throw new UnauthorizedError("Invalid auth token format");
          }

          const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

          return decoded.userId;
        } catch (error) {
          throw new UnauthorizedError("Invalid auth token");
        }
      }
    })
  }
)