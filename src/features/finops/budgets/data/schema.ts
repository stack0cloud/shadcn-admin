import { z } from 'zod'

export const budgetSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  spent: z.number(),
  period: z.enum(['monthly', 'quarterly', 'yearly']),
  cloudProvider: z.enum(['gcp', 'azure', 'aws', 'multi-cloud']),
  status: z.enum(['healthy', 'warning', 'exceeded']),
  createdAt: z.coerce.date(),
})

export type Budget = z.infer<typeof budgetSchema>

export const budgetListSchema = z.array(budgetSchema)
