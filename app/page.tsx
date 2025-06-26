"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatsCards } from "@/components/stats-cards"
import { VulnerabilityList } from "@/components/vulnerability-list"
import { VulnerabilityCreateModal } from "@/components/vulnerability-create-modal"
import { VulnerabilityEditModal } from "@/components/vulnerability-edit-modal"
import type { Vulnerability } from "@/types/vulnerability"

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingVulnerability, setEditingVulnerability] = useState<Vulnerability | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Strike Feedback</h1>
              <p className="text-gray-600 mt-1">Vulnerability Management System</p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Report Vulnerability
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCards />
        </div>

        {/* Vulnerability List */}
        <VulnerabilityList onEdit={setEditingVulnerability} />

        {/* Modals */}
        <VulnerabilityCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />

        <VulnerabilityEditModal
          vulnerability={editingVulnerability}
          open={!!editingVulnerability}
          onOpenChange={(open) => !open && setEditingVulnerability(null)}
        />
      </div>
    </div>
  )
}
