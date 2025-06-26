import { z } from "zod"

export const vulnerabilitySchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().min(1, "Description is required").max(2000, "Description must be less than 2000 characters"),
  severity: z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"]),
  cwe: z.string().optional(),
  cvssScore: z.number().min(0, "CVSS Score must be at least 0").max(10, "CVSS Score must be at most 10"),
  affectedSystems: z.array(z.string()).optional().default([]),
  suggestedFix: z.string().optional(),
  reporter: z.string().optional(),
  assignee: z.string().optional(),
  status: z.enum(["PENDING_FIX", "IN_PROGRESS", "SOLVED", "FALSE_POSITIVE"]).optional().default("PENDING_FIX"),
})

export const vulnerabilityUpdateSchema = vulnerabilitySchema.partial()

export type VulnerabilityFormData = z.infer<typeof vulnerabilitySchema>
export type VulnerabilityUpdateData = z.infer<typeof vulnerabilityUpdateSchema>

export const filterSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  severity: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
})

export type FilterParams = z.infer<typeof filterSchema>
