import { Check, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar'
import { ProviderIcon } from '@/components/provider-icons'
import { cloudEnvironmentsTree, type TreeNode } from '@/config/cloud-environments'
import { useEnvironmentStore, type CloudEnvironment } from '@/stores/environment-store'

export function EnvironmentTree() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Cloud Environments</SidebarGroupLabel>
      <SidebarMenu>
        {cloudEnvironmentsTree.map((item, index) => (
          <Tree key={index} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function Tree({ item, parentPath = [] }: { item: TreeNode; parentPath?: string[] }) {
  const [id, metadata, ...children] = item
  const { selected, setSelected } = useEnvironmentStore(
    (state) => state.environment
  )

  const currentPath = [...parentPath, id]
  const isProvider = metadata.type === 'provider'
  const isOrganization = metadata.type === 'organization'
  const isLeaf = children.length === 0 // Project/Subscription/Account

  const isSelected = selected?.id === id

  // Leaf node - selectable environment (project/subscription/account)
  if (isLeaf) {
    const handleClick = () => {
      // Find provider and org from path
      const provider = currentPath[0] as 'gcp' | 'azure' | 'aws'
      const orgId = currentPath[1]

      // Find org name from tree
      const providerNode = cloudEnvironmentsTree.find((n) => n[0] === provider)
      const orgNode = providerNode
        ? (providerNode.slice(2) as TreeNode[]).find((n) => n[0] === orgId)
        : null
      const orgName = orgNode ? orgNode[1].name : 'Unknown'

      const env: CloudEnvironment = {
        id,
        name: metadata.name,
        provider,
        type: metadata.type as 'project' | 'subscription' | 'account',
        organizationId: orgId,
        organizationName: orgName,
        resourceCount: metadata.resourceCount,
      }
      setSelected(env)
    }

    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={handleClick}
          isActive={isSelected}
          tooltip={metadata.name}
          className='cursor-pointer hover:bg-sidebar-accent'
        >
          <div className='flex items-center gap-2 flex-1 min-w-0'>
            {isSelected && <Check className='h-3 w-3 text-primary shrink-0' />}
            <span className='text-xs truncate'>{metadata.name}</span>
          </div>
          {metadata.resourceCount && (
            <Badge variant='outline' className='text-[10px] px-1 py-0 h-4 shrink-0'>
              {metadata.resourceCount}
            </Badge>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  // Branch node - collapsible (provider or organization)
  const defaultOpen = isProvider // Keep providers open by default

  return (
    <SidebarMenuItem>
      <Collapsible
        className='group/collapsible'
        defaultOpen={defaultOpen}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className='hover:bg-sidebar-accent'
            tooltip={metadata.name}
          >
            {isProvider ? (
              <>
                <ProviderIcon provider={id as 'gcp' | 'azure' | 'aws'} className='shrink-0' />
                {metadata.resourceCount && (
                  <Badge
                    variant='outline'
                    className='text-xs px-1.5 py-0 h-5 ms-auto me-1 shrink-0'
                  >
                    {metadata.resourceCount}
                  </Badge>
                )}
              </>
            ) : (
              <>
                <span className='text-xs font-medium truncate flex-1 min-w-0'>
                  {metadata.name}
                </span>
              </>
            )}
            <ChevronRight className='transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180 h-3 w-3 shrink-0' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className='CollapsibleContent'>
          <SidebarMenuSub className='mx-0 px-3'>
            {children.map((child, index) => (
              <Tree key={index} item={child} parentPath={currentPath} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
