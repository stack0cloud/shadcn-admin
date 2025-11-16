// Tree structure: each node is [id, metadata, ...children]
// Leaf nodes (projects) have no children
// Branch nodes (providers, orgs) have children

export interface TreeNodeMetadata {
  name: string
  type: 'provider' | 'organization' | 'project' | 'subscription' | 'account'
  provider?: 'gcp' | 'azure' | 'aws'
  resourceCount?: number
  organizationId?: string
  organizationName?: string
}

export type TreeNode = [string, TreeNodeMetadata, ...TreeNode[]]

export const cloudEnvironmentsTree: TreeNode[] = [
  [
    'gcp',
    { name: 'Google Cloud (GCP)', type: 'provider', provider: 'gcp', resourceCount: 147 },
    [
      'acme-prod-org',
      { name: 'Acme Production', type: 'organization', provider: 'gcp' },
      ['acme-frontend-prod', { name: 'Frontend Production', type: 'project', provider: 'gcp', resourceCount: 45 }],
      ['acme-backend-prod', { name: 'Backend Production', type: 'project', provider: 'gcp', resourceCount: 67 }],
      ['acme-data-prod', { name: 'Data Platform', type: 'project', provider: 'gcp', resourceCount: 23 }],
    ],
    [
      'acme-dev-org',
      { name: 'Acme Development', type: 'organization', provider: 'gcp' },
      ['acme-frontend-dev', { name: 'Frontend Dev', type: 'project', provider: 'gcp', resourceCount: 12 }],
      ['acme-backend-dev', { name: 'Backend Dev', type: 'project', provider: 'gcp', resourceCount: 15 }],
    ],
  ],
  [
    'azure',
    { name: 'Microsoft Azure', type: 'provider', provider: 'azure', resourceCount: 74 },
    [
      'acme-azure-mg',
      { name: 'Acme Azure', type: 'organization', provider: 'azure' },
      ['prod-subscription-1', { name: 'Production Subscription', type: 'subscription', provider: 'azure', resourceCount: 34 }],
      ['dev-subscription-1', { name: 'Development Subscription', type: 'subscription', provider: 'azure', resourceCount: 18 }],
      ['staging-subscription-1', { name: 'Staging Subscription', type: 'subscription', provider: 'azure', resourceCount: 22 }],
    ],
  ],
  [
    'aws',
    { name: 'Amazon Web Services (AWS)', type: 'provider', provider: 'aws', resourceCount: 115 },
    [
      'acme-root',
      { name: 'Acme AWS Organization', type: 'organization', provider: 'aws' },
      ['prod-account', { name: 'Production Account', type: 'account', provider: 'aws', resourceCount: 56 }],
      ['staging-account', { name: 'Staging Account', type: 'account', provider: 'aws', resourceCount: 28 }],
      ['dev-account', { name: 'Development Account', type: 'account', provider: 'aws', resourceCount: 23 }],
    ],
    [
      'acme-legacy',
      { name: 'Legacy Infrastructure', type: 'organization', provider: 'aws' },
      ['legacy-account', { name: 'Legacy Account', type: 'account', provider: 'aws', resourceCount: 8 }],
    ],
  ],
]

// Keep old structure for backward compatibility
export interface CloudProject {
  id: string
  name: string
  resourceCount: number
}

export interface CloudOrganization {
  id: string
  name: string
  projects: CloudProject[]
}

export interface CloudEnvironments {
  gcp: CloudOrganization[]
  azure: CloudOrganization[]
  aws: CloudOrganization[]
}

// Legacy structure - can be removed once all code uses tree
export const cloudEnvironments: CloudEnvironments = {
  gcp: [
    {
      id: 'acme-prod-org',
      name: 'Acme Production',
      projects: [
        { id: 'acme-frontend-prod', name: 'Frontend Production', resourceCount: 45 },
        { id: 'acme-backend-prod', name: 'Backend Production', resourceCount: 67 },
        { id: 'acme-data-prod', name: 'Data Platform', resourceCount: 23 },
      ],
    },
    {
      id: 'acme-dev-org',
      name: 'Acme Development',
      projects: [
        { id: 'acme-frontend-dev', name: 'Frontend Dev', resourceCount: 12 },
        { id: 'acme-backend-dev', name: 'Backend Dev', resourceCount: 15 },
      ],
    },
  ],
  azure: [
    {
      id: 'acme-azure-mg',
      name: 'Acme Azure',
      projects: [
        { id: 'prod-subscription-1', name: 'Production Subscription', resourceCount: 34 },
        { id: 'dev-subscription-1', name: 'Development Subscription', resourceCount: 18 },
        { id: 'staging-subscription-1', name: 'Staging Subscription', resourceCount: 22 },
      ],
    },
  ],
  aws: [
    {
      id: 'acme-root',
      name: 'Acme AWS Organization',
      projects: [
        { id: 'prod-account', name: 'Production Account', resourceCount: 56 },
        { id: 'staging-account', name: 'Staging Account', resourceCount: 28 },
        { id: 'dev-account', name: 'Development Account', resourceCount: 23 },
      ],
    },
    {
      id: 'acme-legacy',
      name: 'Legacy Infrastructure',
      projects: [
        { id: 'legacy-account', name: 'Legacy Account', resourceCount: 8 },
      ],
    },
  ],
}

// Helper to get total resource count by provider
export const getProviderResourceCount = (provider: keyof CloudEnvironments): number => {
  return cloudEnvironments[provider].reduce(
    (total, org) =>
      total + org.projects.reduce((sum, proj) => sum + proj.resourceCount, 0),
    0
  )
}

// Helper to get provider label
export const getProviderLabel = (provider: string): string => {
  const labels: Record<string, string> = {
    gcp: 'Google Cloud (GCP)',
    azure: 'Microsoft Azure',
    aws: 'Amazon Web Services (AWS)',
  }
  return labels[provider] || provider
}

// Helper to get environment type label
export const getEnvironmentTypeLabel = (provider: string): string => {
  const labels: Record<string, string> = {
    gcp: 'Project',
    azure: 'Subscription',
    aws: 'Account',
  }
  return labels[provider] || 'Environment'
}
