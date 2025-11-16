import { createFileRoute } from '@tanstack/react-router'
import { Resources } from '@/features/infrastructure/resources'

export const Route = createFileRoute('/_authenticated/infrastructure/resources')({
  component: Resources,
})
