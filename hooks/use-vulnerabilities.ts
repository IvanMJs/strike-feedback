"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { vulnerabilityApi } from "@/lib/api"
import type { FilterParams } from "@/lib/validations"
import type { Vulnerability } from "@/types/vulnerability"
import toast from "react-hot-toast"

const QUERY_KEYS = {
  vulnerabilities: (params: FilterParams) => ["vulnerabilities", params] as const,
  vulnerability: (id: string) => ["vulnerability", id] as const,
}

export function useVulnerabilities(params: FilterParams) {
  return useQuery({
    queryKey: QUERY_KEYS.vulnerabilities(params),
    queryFn: () => vulnerabilityApi.getVulnerabilities(params),
  })
}

export function useCreateVulnerability() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: vulnerabilityApi.createVulnerability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vulnerabilities"] })
      queryClient.invalidateQueries({ queryKey: ["vulnerability-stats"] })
      toast.success("Vulnerability created successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create vulnerability")
    },
  })
}

export function useUpdateVulnerability() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Vulnerability> }) =>
      vulnerabilityApi.updateVulnerability(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vulnerabilities"] })
      queryClient.invalidateQueries({ queryKey: ["vulnerability-stats"] })
      toast.success("Vulnerability updated successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update vulnerability")
    },
  })
}

export function useDeleteVulnerability() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: vulnerabilityApi.deleteVulnerability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vulnerabilities"] })
      queryClient.invalidateQueries({ queryKey: ["vulnerability-stats"] })
      toast.success("Vulnerability deleted successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete vulnerability")
    },
  })
}
