import { cn } from '@/lib/utils'

interface ProviderIconProps {
  className?: string
}

export function GCPIcon({ className }: ProviderIconProps) {
  return (
    <img
      src='/images/gcp-logo.svg'
      alt='Google Cloud Platform'
      className={cn('h-4 w-4', className)}
    />
  )
}

export function AzureIcon({ className }: ProviderIconProps) {
  return (
    <img
      src='/images/azure-logo.svg'
      alt='Microsoft Azure'
      className={cn('h-4 w-4', className)}
    />
  )
}

export function AWSIcon({ className }: ProviderIconProps) {
  return (
    <img
      src='/images/aws-logo.svg'
      alt='Amazon Web Services'
      className={cn('h-4 w-4', className)}
    />
  )
}

export function ProviderIcon({
  provider,
  className,
}: {
  provider: 'gcp' | 'azure' | 'aws'
  className?: string
}) {
  switch (provider) {
    case 'gcp':
      return <GCPIcon className={className} />
    case 'azure':
      return <AzureIcon className={className} />
    case 'aws':
      return <AWSIcon className={className} />
  }
}
