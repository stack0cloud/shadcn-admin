import { z } from 'zod'

export const resourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  cloudProvider: z.enum(['gcp', 'azure', 'aws']),
  environmentId: z.string(), // GCP project ID, Azure subscription ID, or AWS account ID
  region: z.string(),
  status: z.enum(['running', 'stopped', 'pending', 'terminated']),
  monthlyCost: z.number(),
  createdAt: z.coerce.date(),
})

export type Resource = z.infer<typeof resourceSchema>

export const resourceListSchema = z.array(resourceSchema)
