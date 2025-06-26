"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangle, CheckCircle, Clock, Shield } from "lucide-react"
import { vulnerabilityApi } from "@/lib/api"

export function StatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["vulnerability-stats"],
    queryFn: vulnerabilityApi.getStats,
    refetchInterval: 5000, // Refetch every 5 seconds instead of 30
    staleTime: 0, // Consider data immediately stale
  })

  const cards = [
    {
      title: "Total Vulnerabilities",
      value: stats?.total || 0,
      icon: Shield,
      color: "text-blue-600",
    },
    {
      title: "Pending Fix",
      value: stats?.byStatus.pendingFix || 0,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "In Progress",
      value: stats?.byStatus.inProgress || 0,
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Solved",
      value: stats?.byStatus.solved || 0,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Critical Severity",
      value: stats?.bySeverity.critical || 0,
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "High Severity",
      value: stats?.bySeverity.high || 0,
      icon: AlertTriangle,
      color: "text-orange-600",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {cards.map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
