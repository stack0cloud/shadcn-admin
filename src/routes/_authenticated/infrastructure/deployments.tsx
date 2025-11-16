import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'

function Deployments() {
  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <h1 className='text-2xl font-bold'>Terraform Deployments</h1>
        <p className='text-muted-foreground'>Coming soon - View and manage Terraform deployment history</p>
      </Main>
    </>
  )
}

export const Route = createFileRoute('/_authenticated/infrastructure/deployments')({
  component: Deployments,
})
