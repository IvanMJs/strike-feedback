import type { Vulnerability, PaginatedResponse } from "@/types/vulnerability"
import type { VulnerabilityFormData, FilterParams } from "@/lib/validations"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
    throw new ApiError(response.status, errorData.error || errorData.message || "Request failed")
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

export const vulnerabilityApi = {
  async getVulnerabilities(params: FilterParams): Promise<PaginatedResponse<Vulnerability>> {
    const searchParams = new URLSearchParams()

    if (params.search) searchParams.set("search", params.search)
    if (params.status) searchParams.set("status", params.status.toUpperCase().replace(" ", "_"))
    if (params.severity) searchParams.set("severity", params.severity.toUpperCase())
    if (params.page) searchParams.set("page", params.page.toString())
    if (params.limit) searchParams.set("limit", params.limit.toString())

    return fetchApi<PaginatedResponse<Vulnerability>>(`/vulnerabilities?${searchParams}`)
  },

  async getVulnerability(id: string): Promise<Vulnerability> {
    return fetchApi<Vulnerability>(`/vulnerabilities/${id}`)
  },

  async createVulnerability(data: VulnerabilityFormData): Promise<Vulnerability> {
    // Transform frontend data to API format
    const apiData = {
      ...data,
      severity: data.severity.toUpperCase(),
      status: data.status.toUpperCase().replace(" ", "_"),
    }

    return fetchApi<Vulnerability>("/vulnerabilities", {
      method: "POST",
      body: JSON.stringify(apiData),
    })
  },

  async updateVulnerability(id: string, data: Partial<Vulnerability>): Promise<Vulnerability> {
    // Transform frontend data to API format
    const apiData: Record<string, unknown> = { ...data }
    if (data.severity) {
      apiData.severity = data.severity.toUpperCase()
    }
    if (data.status) {
      apiData.status = data.status.toUpperCase().replace(" ", "_")
    }

    return fetchApi<Vulnerability>(`/vulnerabilities/${id}`, {
      method: "PUT",
      body: JSON.stringify(apiData),
    })
  },

  async deleteVulnerability(id: string): Promise<void> {
    return fetchApi<void>(`/vulnerabilities/${id}`, {
      method: "DELETE",
    })
  },

  async getStats(): Promise<{
    total: number
    byStatus: {
      pendingFix: number
      inProgress: number
      solved: number
      falsePositive: number
    }
    bySeverity: {
      critical: number
      high: number
    }
  }> {
    return fetchApi<{
      total: number
      byStatus: {
        pendingFix: number
        inProgress: number
        solved: number
        falsePositive: number
      }
      bySeverity: {
        critical: number
        high: number
      }
    }>("/vulnerabilities/stats/summary")
  },
}
