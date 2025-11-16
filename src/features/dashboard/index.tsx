import { Cloud } from 'lucide-react'
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
import { Overview } from './components/overview'

export function Dashboard() {
  const { selected, viewMode } = useEnvironmentStore(
    (state) => state.environment
  )

  const getContextTitle = () => {
    if (viewMode === 'all' || !selected) {
      return 'Multi-Cloud Overview'
    }
    return `${selected.provider.toUpperCase()} - ${selected.name}`
  }

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='flex items-center gap-2'>
          <h2 className='text-lg font-semibold'>{getContextTitle()}</h2>
          <EnvironmentBreadcrumb />
        </div>
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
            <p className='text-muted-foreground text-sm'>
              {viewMode === 'all' || !selected
                ? 'Overview of your multi-cloud infrastructure and costs'
                : `Infrastructure and cost overview for ${selected.name}`}
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Button variant='outline' size='sm'>
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Monthly Cost
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
              <div className='text-2xl font-bold'>$12,847</div>
              <p className='text-muted-foreground text-xs'>
                +8.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Active Resources
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
                <rect width='20' height='14' x='2' y='5' rx='2' />
                <path d='M2 10h20' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>347</div>
              <p className='text-muted-foreground text-xs'>
                Across 3 cloud providers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Deployments</CardTitle>
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
                <path d='M12 2L2 7l10 5 10-5-10-5z' />
                <path d='M2 17l10 5 10-5' />
                <path d='M2 12l10 5 10-5' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>23</div>
              <p className='text-muted-foreground text-xs'>
                5 pending, 18 completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Budget Status
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
                <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>78%</div>
              <p className='text-muted-foreground text-xs'>
                $12.8K of $16.5K used
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
          <Card className='col-span-1 lg:col-span-4'>
            <CardHeader>
              <CardTitle>Cost Trends</CardTitle>
              <CardDescription>
                Monthly infrastructure costs across all providers
              </CardDescription>
            </CardHeader>
            <CardContent className='ps-2'>
              <Overview />
            </CardContent>
          </Card>
          <Card className='col-span-1 lg:col-span-3'>
            <CardHeader>
              <CardTitle>Cloud Provider Breakdown</CardTitle>
              <CardDescription>
                Cost distribution by cloud provider
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='h-3 w-3 rounded-full bg-[#4285F4]' />
                    <span className='text-sm'>GCP</span>
                  </div>
                  <span className='font-semibold'>$5,240</span>
                  <span className='text-muted-foreground text-xs'>41%</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='h-3 w-3 rounded-full bg-[#0078D4]' />
                    <span className='text-sm'>Azure</span>
                  </div>
                  <span className='font-semibold'>$4,127</span>
                  <span className='text-muted-foreground text-xs'>32%</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='h-3 w-3 rounded-full bg-[#FF9900]' />
                    <span className='text-sm'>AWS</span>
                  </div>
                  <span className='font-semibold'>$3,480</span>
                  <span className='text-muted-foreground text-xs'>27%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
