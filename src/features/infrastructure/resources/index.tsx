import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ConfigDrawer } from '@/components/config-drawer'
import { EnvironmentBreadcrumb } from '@/components/environment-breadcrumb'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useEnvironmentStore } from '@/stores/environment-store'
import { resources } from './data/resources'

export function Resources() {
  const { selected, viewMode } = useEnvironmentStore(
    (state) => state.environment
  )

  // Filter resources based on selected environment
  const filteredResources =
    viewMode === 'single' && selected
      ? resources.filter((r) => r.environmentId === selected.id)
      : resources

  const getProviderColor = (provider: string) => {
    const colors: Record<string, string> = {
      gcp: 'bg-[#4285F4]/10 text-[#4285F4]',
      azure: 'bg-[#0078D4]/10 text-[#0078D4]',
      aws: 'bg-[#FF9900]/10 text-[#FF9900]',
    }
    return colors[provider] || ''
  }

  const getProviderLabel = (provider: string) => {
    const labels: Record<string, string> = {
      gcp: 'GCP',
      azure: 'Azure',
      aws: 'AWS',
    }
    return labels[provider] || provider
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500/10 text-green-500'
      case 'stopped':
        return 'bg-gray-500/10 text-gray-500'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500'
      case 'terminated':
        return 'bg-red-500/10 text-red-500'
      default:
        return ''
    }
  }

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
            <h1 className='text-2xl font-bold tracking-tight'>Cloud Resources</h1>
            <p className='text-muted-foreground text-sm'>
              {viewMode === 'all' || !selected
                ? 'Manage infrastructure resources across all cloud providers'
                : `Resources in ${selected.name} (${filteredResources.length} total)`}
            </p>
          </div>
          <Button>Deploy Resource</Button>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow className='group/row'>
                <TableHead>Resource Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Cloud Provider</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Monthly Cost</TableHead>
                <TableHead className='w-[100px]'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.map((resource) => (
                <TableRow key={resource.id} className='group/row'>
                  <TableCell className='font-medium'>{resource.name}</TableCell>
                  <TableCell className='text-muted-foreground'>{resource.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant='outline'
                      className={getProviderColor(resource.cloudProvider)}
                    >
                      {getProviderLabel(resource.cloudProvider)}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-muted-foreground text-sm'>
                    {resource.region}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='outline'
                      className={`capitalize ${getStatusColor(resource.status)}`}
                    >
                      {resource.status}
                    </Badge>
                  </TableCell>
                  <TableCell className='font-semibold'>
                    {resource.monthlyCost > 0
                      ? `$${resource.monthlyCost.toLocaleString()}`
                      : '-'}
                  </TableCell>
                  <TableCell>
                    <Button variant='ghost' size='sm'>
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Main>
    </>
  )
}
