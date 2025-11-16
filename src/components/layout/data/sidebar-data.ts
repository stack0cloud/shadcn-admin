import {
  LayoutDashboard,
  Monitor,
  Bell,
  Palette,
  Settings,
  Wrench,
  UserCog,
  Users,
  Cloud,
  Server,
  Rocket,
  Layers,
  DollarSign,
  LineChart,
  PieChart,
  FileText,
  Building2,
  Globe,
  Boxes,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Demo User',
    email: 'demo@stack0.cloud',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Stack0',
      logo: Cloud,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp',
      logo: Building2,
      plan: 'Professional',
    },
    {
      name: 'Demo Org',
      logo: Boxes,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'Overview',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Platform',
      items: [
        {
          title: 'Infrastructure',
          icon: Cloud,
          items: [
            {
              title: 'Resources',
              url: '/infrastructure/resources',
              icon: Server,
            },
            {
              title: 'Deployments',
              url: '/infrastructure/deployments',
              icon: Rocket,
            },
            {
              title: 'Workspaces',
              url: '/infrastructure/workspaces',
              icon: Layers,
            },
          ],
        },
        {
          title: 'FinOps',
          icon: DollarSign,
          items: [
            {
              title: 'Cost Overview',
              url: '/finops/cost-overview',
              icon: LineChart,
            },
            {
              title: 'Cloud Providers',
              url: '/finops/providers',
              icon: Cloud,
            },
            {
              title: 'Budgets',
              url: '/finops/budgets',
              icon: PieChart,
            },
            {
              title: 'Reports',
              url: '/finops/reports',
              icon: FileText,
            },
          ],
        },
      ],
    },
    {
      title: 'Organization',
      items: [
        {
          title: 'Team',
          url: '/users',
          icon: Users,
        },
        {
          title: 'Domains',
          url: '/domains',
          icon: Globe,
        },
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
      ],
    },
  ],
}
