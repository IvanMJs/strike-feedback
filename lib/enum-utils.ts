import type { SeverityLevel, VulnerabilityStatus } from "@/types/vulnerability"

export function formatSeverityDisplay(severity: SeverityLevel): string {
  switch (severity) {
    case "CRITICAL":
      return "Critical"
    case "HIGH":
      return "High"
    case "MEDIUM":
      return "Medium"
    case "LOW":
      return "Low"
    default:
      return severity
  }
}

export function formatStatusDisplay(status: VulnerabilityStatus): string {
  switch (status) {
    case "PENDING_FIX":
      return "Pending Fix"
    case "IN_PROGRESS":
      return "In Progress"
    case "SOLVED":
      return "Solved"
    case "FALSE_POSITIVE":
      return "False Positive"
    default:
      return status
  }
}

export const SEVERITY_OPTIONS = [
  { value: "CRITICAL", label: "Critical" },
  { value: "HIGH", label: "High" },
  { value: "MEDIUM", label: "Medium" },
  { value: "LOW", label: "Low" },
] as const

export const STATUS_OPTIONS = [
  { value: "PENDING_FIX", label: "Pending Fix" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "SOLVED", label: "Solved" },
  { value: "FALSE_POSITIVE", label: "False Positive" },
] as const
