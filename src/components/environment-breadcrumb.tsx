import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useEnvironmentStore } from '@/stores/environment-store'
import { getProviderLabel } from '@/config/cloud-environments'

const providerColors: Record<string, string> = {
  gcp: '#4285F4',
  azure: '#0078D4',
  aws: '#FF9900',
}

export function EnvironmentBreadcrumb() {
  const { selected, setSelected, viewMode, setViewMode } = useEnvironmentStore(
    (state) => state.environment
  )

  if (!selected || viewMode === 'all') {
    return (
      <Badge variant='outline' className='gap-1.5 px-2 py-1'>
        <div className='h-2 w-2 rounded-full bg-primary' />
        <span className='text-xs'>All Environments</span>
      </Badge>
    )
  }

  return (
    <div className='flex items-center gap-2'>
      <Badge variant='outline' className='gap-1.5 px-2 py-1 flex items-center'>
        <div
          className='h-2 w-2 rounded-full'
          style={{ backgroundColor: providerColors[selected.provider] }}
        />
        <span className='text-xs font-medium'>
          {selected.provider.toUpperCase()}
        </span>
        <span className='text-muted-foreground text-xs'>/</span>
        <span className='text-xs'>{selected.organizationName}</span>
        <span className='text-muted-foreground text-xs'>/</span>
        <span className='text-xs font-medium'>{selected.name}</span>
        <Button
          variant='ghost'
          size='sm'
          className='h-4 w-4 p-0 hover:bg-destructive/10 ms-1'
          onClick={() => setViewMode('all')}
        >
          <X className='h-3 w-3' />
        </Button>
      </Badge>
      {selected.resourceCount && (
        <Badge variant='secondary' className='text-xs px-2 py-0.5'>
          {selected.resourceCount} resources
        </Badge>
      )}
    </div>
  )
}
