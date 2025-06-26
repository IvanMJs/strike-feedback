import { z } from "zod"

export const severityEnum = z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"])
export const statusEnum = z.enum(["PENDING_FIX", "IN_PROGRESS", "SOLVED", "FALSE_POSITIVE"])

export const createVulnerabilitySchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().min(1, "Description is required").max(2000, "Description must be less than 2000 characters"),
  severity: severityEnum,
  cwe: z.string().optional(),
  cvssScore: z.number().min(0, "CVSS Score must be at least 0").max(10, "CVSS Score must be at most 10"),
  affectedSystems: z.array(z.string()).default([]),
  suggestedFix: z.string().optional(),
  reporter: z.string().optional(),
  assignee: z.string().optional(),
  status: statusEnum.default("PENDING_FIX"),
})

export const updateVulnerabilitySchema = createVulnerabilitySchema.partial()

export const querySchema = z.object({
  page: z.string().transform(Number).pipe(z.number().min(1)).default("1"),
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).default("10"),
  search: z.string().optional(),
  status: statusEnum.optional(),
  severity: severityEnum.optional(),
  sortBy: z.enum(["createdAt", "updatedAt", "title", "severity", "cvssScore"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
})

export type CreateVulnerabilityInput = z.infer<typeof createVulnerabilitySchema>
export type UpdateVulnerabilityInput = z.infer<typeof updateVulnerabilitySchema>
export type QueryParams = z.infer<typeof querySchema>
