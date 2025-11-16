import { ColumnDef } from '@tanstack/react-table'
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
import { budgets } from './data/budgets'
import { type Budget } from './data/schema'

export function Budgets() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
      case 'exceeded':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
      default:
        return ''
    }
  }

  const getProviderBadge = (provider: string) => {
    const colors: Record<string, string> = {
      gcp: 'bg-[#4285F4]/10 text-[#4285F4]',
      azure: 'bg-[#0078D4]/10 text-[#0078D4]',
      aws: 'bg-[#FF9900]/10 text-[#FF9900]',
      'multi-cloud': 'bg-primary/10 text-primary',
    }
    const labels: Record<string, string> = {
      gcp: 'GCP',
      azure: 'Azure',
      aws: 'AWS',
      'multi-cloud': 'Multi-Cloud',
    }
    return (
      <Badge variant='outline' className={colors[provider]}>
        {labels[provider]}
      </Badge>
    )
  }

  const getUtilizationColor = (percent: number) => {
    if (percent >= 100) return 'bg-red-500'
    if (percent >= 80) return 'bg-yellow-500'
    return 'bg-green-500'
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
            <h1 className='text-2xl font-bold tracking-tight'>Budgets</h1>
            <p className='text-muted-foreground text-sm'>
              Manage cost budgets and track spending limits
            </p>
          </div>
          <Button>Create Budget</Button>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow className='group/row'>
                <TableHead>Budget Name</TableHead>
                <TableHead>Cloud Provider</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='w-[100px]'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.map((budget) => {
                const utilization = (budget.spent / budget.amount) * 100
                return (
                  <TableRow key={budget.id} className='group/row'>
                    <TableCell className='font-medium'>{budget.name}</TableCell>
                    <TableCell>{getProviderBadge(budget.cloudProvider)}</TableCell>
                    <TableCell className='capitalize'>{budget.period}</TableCell>
                    <TableCell className='font-semibold'>
                      ${budget.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className='font-semibold'>
                      ${budget.spent.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                          <div className='h-2 w-24 overflow-hidden rounded-full bg-secondary'>
                            <div
                              className={`h-full ${getUtilizationColor(utilization)}`}
                              style={{ width: `${Math.min(utilization, 100)}%` }}
                            />
                          </div>
                          <span className='text-xs font-medium'>
                            {utilization.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className={`capitalize ${getStatusColor(budget.status)}`}
                      >
                        {budget.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant='ghost' size='sm'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Main>
    </>
  )
}
