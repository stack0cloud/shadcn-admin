import { createFileRoute } from '@tanstack/react-router'
import { CloudProviders } from '@/features/finops/providers'

export const Route = createFileRoute('/_authenticated/finops/providers')({
  component: CloudProviders,
})
