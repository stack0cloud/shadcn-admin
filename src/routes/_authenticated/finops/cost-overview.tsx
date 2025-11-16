import { createFileRoute } from '@tanstack/react-router'
import { CostOverview } from '@/features/finops/cost-overview'

export const Route = createFileRoute('/_authenticated/finops/cost-overview')({
  component: CostOverview,
})
