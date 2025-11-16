import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ConfigDrawer } from '@/components/config-drawer'
import { EnvironmentBreadcrumb } from '@/components/environment-breadcrumb'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

export function CloudProviders() {
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
            <h1 className='text-2xl font-bold tracking-tight'>Cloud Providers</h1>
            <p className='text-muted-foreground text-sm'>
              Detailed cost breakdown by cloud provider
            </p>
          </div>
        </div>

        <Tabs defaultValue='gcp' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='gcp' className='gap-2'>
              <div className='h-2 w-2 rounded-full bg-[#4285F4]' />
              Google Cloud
            </TabsTrigger>
            <TabsTrigger value='azure' className='gap-2'>
              <div className='h-2 w-2 rounded-full bg-[#0078D4]' />
              Azure
            </TabsTrigger>
            <TabsTrigger value='aws' className='gap-2'>
              <div className='h-2 w-2 rounded-full bg-[#FF9900]' />
              AWS
            </TabsTrigger>
          </TabsList>

          {/* GCP Tab */}
          <TabsContent value='gcp' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total GCP Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>$5,240.18</div>
                  <p className='text-muted-foreground text-xs'>41% of total spend</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Top Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-lg font-bold'>Compute Engine</div>
                  <p className='text-muted-foreground text-xs'>$2,180 (42%)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Active Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>142</div>
                  <p className='text-muted-foreground text-xs'>VMs, Storage, K8s</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Regions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>5</div>
                  <p className='text-muted-foreground text-xs'>us-central1, europe-north1</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cost by GCP Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[
                    { service: 'Compute Engine', cost: '$2,180.25', percent: '42%' },
                    { service: 'Google Kubernetes Engine', cost: '$1,420.50', percent: '27%' },
                    { service: 'Cloud Storage', cost: '$890.33', percent: '17%' },
                    { service: 'BigQuery', cost: '$540.10', percent: '10%' },
                    { service: 'Cloud SQL', cost: '$209.00', percent: '4%' },
                  ].map((item, i) => (
                    <div key={i} className='flex items-center justify-between'>
                      <span className='text-sm font-medium'>{item.service}</span>
                      <div className='flex items-center gap-4'>
                        <span className='text-muted-foreground text-xs'>{item.percent}</span>
                        <span className='font-semibold text-sm min-w-[80px] text-end'>{item.cost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Azure Tab */}
          <TabsContent value='azure' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Azure Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>$4,127.34</div>
                  <p className='text-muted-foreground text-xs'>32% of total spend</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Top Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-lg font-bold'>Virtual Machines</div>
                  <p className='text-muted-foreground text-xs'>$1,850 (45%)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Active Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>98</div>
                  <p className='text-muted-foreground text-xs'>VMs, Storage, AKS</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Regions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>4</div>
                  <p className='text-muted-foreground text-xs'>eastus, westeurope</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cost by Azure Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[
                    { service: 'Virtual Machines', cost: '$1,850.40', percent: '45%' },
                    { service: 'Azure Kubernetes Service', cost: '$1,120.30', percent: '27%' },
                    { service: 'Blob Storage', cost: '$680.50', percent: '16%' },
                    { service: 'Azure SQL Database', cost: '$340.14', percent: '8%' },
                    { service: 'App Service', cost: '$136.00', percent: '4%' },
                  ].map((item, i) => (
                    <div key={i} className='flex items-center justify-between'>
                      <span className='text-sm font-medium'>{item.service}</span>
                      <div className='flex items-center gap-4'>
                        <span className='text-muted-foreground text-xs'>{item.percent}</span>
                        <span className='font-semibold text-sm min-w-[80px] text-end'>{item.cost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AWS Tab */}
          <TabsContent value='aws' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total AWS Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>$3,480.00</div>
                  <p className='text-muted-foreground text-xs'>27% of total spend</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Top Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-lg font-bold'>EC2</div>
                  <p className='text-muted-foreground text-xs'>$1,450 (42%)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Active Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>107</div>
                  <p className='text-muted-foreground text-xs'>EC2, S3, RDS</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Regions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>6</div>
                  <p className='text-muted-foreground text-xs'>us-east-1, eu-west-1</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cost by AWS Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[
                    { service: 'EC2 (Elastic Compute)', cost: '$1,450.80', percent: '42%' },
                    { service: 'EKS (Kubernetes)', cost: '$940.20', percent: '27%' },
                    { service: 'S3 (Storage)', cost: '$590.00', percent: '17%' },
                    { service: 'RDS (Database)', cost: '$350.00', percent: '10%' },
                    { service: 'CloudFront', cost: '$149.00', percent: '4%' },
                  ].map((item, i) => (
                    <div key={i} className='flex items-center justify-between'>
                      <span className='text-sm font-medium'>{item.service}</span>
                      <div className='flex items-center gap-4'>
                        <span className='text-muted-foreground text-xs'>{item.percent}</span>
                        <span className='font-semibold text-sm min-w-[80px] text-end'>{item.cost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
