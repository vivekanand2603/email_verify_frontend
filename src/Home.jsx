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
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from '@heroicons/react/20/solid'
const pathname = window.location.pathname
export default function App() {

  return (
    <SidebarLayout
      navbar={<Navbar />}
      sidebar={<Sidebar>
        <SidebarBody>
          <SidebarSection>
            <SidebarItem href="/" current={pathname === '/'}>
              <HomeIcon />
              <SidebarLabel>Home</SidebarLabel>
            </SidebarItem>
            <SidebarItem href="/lists" current={pathname.startsWith('/lists')}>
              <Square2StackIcon />
              <SidebarLabel>Lists</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
        </SidebarBody>
      </Sidebar>}
    >
      
    </SidebarLayout>
  )
}