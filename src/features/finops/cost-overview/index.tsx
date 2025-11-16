import { TrendingDown, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ConfigDrawer } from '@/components/config-drawer'
import { EnvironmentBreadcrumb } from '@/components/environment-breadcrumb'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useEnvironmentStore } from '@/stores/environment-store'

export function CostOverview() {
  const { selected, viewMode } = useEnvironmentStore(
    (state) => state.environment
  )

  return (
    <>
      <Header fixed>
        <EnvironmentBreadcrumb />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Cost Overview</h1>
            <p className='text-muted-foreground text-sm'>
              {viewMode === 'all' || !selected
                ? 'Monitor and optimize your multi-cloud infrastructure costs'
                : `Cost overview for ${selected.name}`}
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Button variant='outline' size='sm'>
              Download Report
            </Button>
            <Button size='sm'>Create Budget</Button>
          </div>
        </div>

        {/* Cost Summary Cards */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Spend (MTD)
              </CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='text-muted-foreground h-4 w-4'
              >
                <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$12,847.52</div>
              <div className='flex items-center gap-1 text-xs'>
                <TrendingUp className='h-3 w-3 text-green-500' />
                <span className='text-green-500'>+8.2%</span>
                <span className='text-muted-foreground'>from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Projected Monthly
              </CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='text-muted-foreground h-4 w-4'
              >
                <path d='M3 3v18h18' />
                <path d='m19 9-5 5-4-4-3 3' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$18,240</div>
              <p className='text-muted-foreground text-xs'>
                Based on current usage
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Budget Remaining</CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='text-muted-foreground h-4 w-4'
              >
                <circle cx='12' cy='12' r='10' />
                <path d='M12 6v6l4 2' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$3,652</div>
              <p className='text-muted-foreground text-xs'>
                22% of monthly budget
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Cost Savings</CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='text-muted-foreground h-4 w-4'
              >
                <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$1,847</div>
              <div className='flex items-center gap-1 text-xs'>
                <TrendingDown className='h-3 w-3 text-green-500' />
                <span className='text-green-500'>12% reduction</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost by Cloud Provider */}
        <div className='grid gap-4 mb-6'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle>Cost by Cloud Provider</CardTitle>
                  <CardDescription>
                    Breakdown of infrastructure costs across GCP, Azure, and AWS
                  </CardDescription>
                </div>
                <Badge variant='outline'>Last 30 days</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div>
                  <div className='mb-2 flex items-center justify-between text-sm'>
                    <div className='flex items-center gap-2'>
                      <div className='h-3 w-3 rounded-full bg-[#4285F4]' />
                      <span className='font-medium'>Google Cloud (GCP)</span>
                    </div>
                    <span className='font-semibold'>$5,240.18</span>
                  </div>
                  <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                    <div
                      className='h-full bg-[#4285F4]'
                      style={{ width: '41%' }}
                    />
                  </div>
                  <p className='text-muted-foreground mt-1 text-xs'>
                    Compute Engine, Cloud Storage, GKE
                  </p>
                </div>

                <div>
                  <div className='mb-2 flex items-center justify-between text-sm'>
                    <div className='flex items-center gap-2'>
                      <div className='h-3 w-3 rounded-full bg-[#0078D4]' />
                      <span className='font-medium'>Microsoft Azure</span>
                    </div>
                    <span className='font-semibold'>$4,127.34</span>
                  </div>
                  <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                    <div
                      className='h-full bg-[#0078D4]'
                      style={{ width: '32%' }}
                    />
                  </div>
                  <p className='text-muted-foreground mt-1 text-xs'>
                    Virtual Machines, Blob Storage, AKS
                  </p>
                </div>

                <div>
                  <div className='mb-2 flex items-center justify-between text-sm'>
                    <div className='flex items-center gap-2'>
                      <div className='h-3 w-3 rounded-full bg-[#FF9900]' />
                      <span className='font-medium'>Amazon Web Services (AWS)</span>
                    </div>
                    <span className='font-semibold'>$3,480.00</span>
                  </div>
                  <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                    <div
                      className='h-full bg-[#FF9900]'
                      style={{ width: '27%' }}
                    />
                  </div>
                  <p className='text-muted-foreground mt-1 text-xs'>
                    EC2, S3, EKS
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Cost Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Top Cost Resources</CardTitle>
            <CardDescription>
              Highest spending resources across all clouds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[
                { name: 'prod-gke-cluster', provider: 'GCP', cost: '$1,240.50', type: 'GKE Cluster' },
                { name: 'prod-vm-pool', provider: 'Azure', cost: '$980.25', type: 'Virtual Machines' },
                { name: 'data-warehouse', provider: 'GCP', cost: '$875.00', type: 'BigQuery' },
                { name: 'prod-eks-cluster', provider: 'AWS', cost: '$720.80', type: 'EKS Cluster' },
                { name: 'blob-storage-prod', provider: 'Azure', cost: '$645.30', type: 'Blob Storage' },
              ].map((resource, i) => (
                <div key={i} className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div
                      className={`h-2 w-2 rounded-full ${
                        resource.provider === 'GCP'
                          ? 'bg-[#4285F4]'
                          : resource.provider === 'Azure'
                            ? 'bg-[#0078D4]'
                            : 'bg-[#FF9900]'
                      }`}
                    />
                    <div>
                      <p className='font-medium text-sm'>{resource.name}</p>
                      <p className='text-muted-foreground text-xs'>
                        {resource.provider} · {resource.type}
                      </p>
                    </div>
                  </div>
                  <span className='font-semibold text-sm'>{resource.cost}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
