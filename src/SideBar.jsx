import {SidebarLayout} from './components/sidebar-layout'
import {Navbar} from './components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from './components/sidebar'

import {
  HomeIcon,
  Square2StackIcon,
} from '@heroicons/react/20/solid'
const pathname = window.location.pathname
import { DashboardProvider } from './contexts/dashboard' 
export default function App({
  SideComponent
}) {

  return (
    <DashboardProvider>
    <SidebarLayout
      navbar={<Navbar />}
      sidebar={<Sidebar>
        <SidebarBody>
          <SidebarSection>
            <SidebarItem href="/" current={pathname === '/'}>
              <HomeIcon />
              <SidebarLabel>Home</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/upload-lists" current={pathname.startsWith('/upload-lists')}>
              <Square2StackIcon />
              <SidebarLabel>Upload List</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
        </SidebarBody>
      </Sidebar>}
    >
      <SideComponent />
    </SidebarLayout>
    </DashboardProvider>
  )
}