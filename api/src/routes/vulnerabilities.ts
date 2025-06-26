import { Router } from "express"
import { prisma } from "../lib/prisma"
import {
  createVulnerabilitySchema,
  updateVulnerabilitySchema,
  querySchema,
  type CreateVulnerabilityInput,
  type UpdateVulnerabilityInput,
} from "../lib/validations"
import type { Prisma } from "@prisma/client"

const router = Router()

// Helper function to transform database records
function transformVulnerability(vuln: any) {
  return {
    ...vuln,
    affectedSystems: JSON.parse(vuln.affectedSystems || "[]"),
    dateCreated: vuln.createdAt.toISOString().split("T")[0],
    dateUpdated: vuln.updatedAt.toISOString().split("T")[0],
    // Keep original values for severity and status - frontend will handle display formatting
    severity: vuln.severity,
    status: vuln.status,
  }
}

// Helper function to transform input data for database
function transformInputForDb(data: CreateVulnerabilityInput | UpdateVulnerabilityInput) {
  const transformed: any = { ...data }

  if (data.affectedSystems) {
    transformed.affectedSystems = JSON.stringify(data.affectedSystems)
  }

  if (data.severity) {
    transformed.severity = data.severity.toUpperCase()
  }

  if (data.status) {
    transformed.status = data.status.toUpperCase()
  }

  return transformed
}

// GET /api/vulnerabilities
router.get("/", async (req, res, next) => {
  try {
    const query = querySchema.parse(req.query)

    // Build where clause
    const where: Prisma.VulnerabilityWhereInput = {}

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
        { cwe: { contains: query.search, mode: "insensitive" } },
      ]
    }

    if (query.status) {
      where.status = query.status
    }

    if (query.severity) {
      where.severity = query.severity
    }

    // Get total count
    const total = await prisma.vulnerability.count({ where })

    // Get paginated results
    const vulnerabilities = await prisma.vulnerability.findMany({
      where,
      orderBy: { [query.sortBy]: query.sortOrder },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    })

    const transformedVulnerabilities = vulnerabilities.map(transformVulnerability)

    res.json({
      data: transformedVulnerabilities,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    })
  } catch (error) {
    next(error)
  }
})

// GET /api/vulnerabilities/:id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    const vulnerability = await prisma.vulnerability.findUnique({
      where: { id },
    })

    if (!vulnerability) {
      return res.status(404).json({ error: "Vulnerability not found" })
    }

    res.json(transformVulnerability(vulnerability))
  } catch (error) {
    next(error)
  }
})

// POST /api/vulnerabilities
router.post("/", async (req, res, next) => {
  try {
    const data = createVulnerabilitySchema.parse(req.body)
    const transformedData = transformInputForDb(data)

    const vulnerability = await prisma.vulnerability.create({
      data: transformedData,
    })

    res.status(201).json(transformVulnerability(vulnerability))
  } catch (error) {
    next(error)
  }
})

// PUT /api/vulnerabilities/:id
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const data = updateVulnerabilitySchema.parse(req.body)
    const transformedData = transformInputForDb(data)

    const vulnerability = await prisma.vulnerability.update({
      where: { id },
      data: transformedData,
    })

    res.json(transformVulnerability(vulnerability))
  } catch (error) {
    next(error)
  }
})

// DELETE /api/vulnerabilities/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    await prisma.vulnerability.delete({
      where: { id },
    })

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

// GET /api/vulnerabilities/stats
router.get("/stats/summary", async (req, res, next) => {
  try {
    const [total, pendingFix, inProgress, solved, falsePositive, critical, high] = await Promise.all([
      prisma.vulnerability.count(),
      prisma.vulnerability.count({ where: { status: "PENDING_FIX" } }),
      prisma.vulnerability.count({ where: { status: "IN_PROGRESS" } }),
      prisma.vulnerability.count({ where: { status: "SOLVED" } }),
      prisma.vulnerability.count({ where: { status: "FALSE_POSITIVE" } }),
      prisma.vulnerability.count({ where: { severity: "CRITICAL" } }),
      prisma.vulnerability.count({ where: { severity: "HIGH" } }),
    ])

    res.json({
      total,
      byStatus: {
        pendingFix,
        inProgress,
        solved,
        falsePositive,
      },
      bySeverity: {
        critical,
        high,
      },
    })
  } catch (error) {
    next(error)
  }
})

export { router as vulnerabilityRoutes }
