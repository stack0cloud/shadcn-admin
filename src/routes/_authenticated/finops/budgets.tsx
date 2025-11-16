import { createFileRoute } from '@tanstack/react-router'
import { Budgets } from '@/features/finops/budgets'

export const Route = createFileRoute('/_authenticated/finops/budgets')({
  component: Budgets,
})
