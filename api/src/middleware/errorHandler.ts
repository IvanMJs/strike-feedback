import type { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"
import { Prisma } from "@prisma/client"

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  console.error("Error:", error)

  // Zod validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    })
  }

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return res.status(409).json({
          error: "Conflict",
          message: "A record with this data already exists",
        })
      case "P2025":
        return res.status(404).json({
          error: "Not found",
          message: "The requested record was not found",
        })
      default:
        return res.status(500).json({
          error: "Database error",
          message: "An error occurred while processing your request",
        })
    }
  }

  // Default error
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "production" ? "Something went wrong" : error.message,
  })
}
