"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { commonCWEs } from "@/lib/cwe-database"

interface CWESelectorProps {
  value: string
  onChange: (value: string) => void
}

export function CWESelector({ value, onChange }: CWESelectorProps) {
  const [open, setOpen] = useState(false)
  const [customCWE, setCustomCWE] = useState("")

  const selectedCWE = commonCWEs.find((cwe) => cwe.id === value)

  const handleSelect = (cweId: string) => {
    onChange(cweId)
    setOpen(false)
  }

  const handleCustomCWE = () => {
    if (customCWE.trim()) {
      onChange(customCWE.trim())
      setCustomCWE("")
      setOpen(false)
    }
  }

  // Group CWEs by category
  const groupedCWEs = commonCWEs.reduce(
    (acc, cwe) => {
      if (!acc[cwe.category]) {
        acc[cwe.category] = []
      }
      acc[cwe.category].push(cwe)
      return acc
    },
    {} as Record<string, typeof commonCWEs>,
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedCWE ? (
            <span className="truncate">
              {selectedCWE.id} - {selectedCWE.name}
            </span>
          ) : value ? (
            <span className="truncate">{value}</span>
          ) : (
            "Select CWE or search..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search CWE by name or code..." />
          <CommandList>
            <CommandEmpty>
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500 mb-2">No CWE found.</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter custom CWE (e.g., CWE-123)"
                    value={customCWE}
                    onChange={(e) => setCustomCWE(e.target.value)}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={handleCustomCWE}>
                    Add
                  </Button>
                </div>
              </div>
            </CommandEmpty>
            {Object.entries(groupedCWEs).map(([category, cwes]) => (
              <CommandGroup key={category} heading={category}>
                {cwes.map((cwe) => (
                  <CommandItem
                    key={cwe.id}
                    value={`${cwe.id} ${cwe.name}`}
                    onSelect={() => handleSelect(cwe.id)}
                    className="flex items-start gap-2 p-3"
                  >
                    <Check className={cn("mt-0.5 h-4 w-4", value === cwe.id ? "opacity-100" : "opacity-0")} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">
                        {cwe.id} - {cwe.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{cwe.description}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
