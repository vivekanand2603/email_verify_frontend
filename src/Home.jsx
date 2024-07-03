import {SidebarLayout} from './components/sidebar-layout'
import {Navbar} from './components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from './components/sidebar'

import { Avatar } from './components/avatar'
import { Divider } from './components/divider'
import { Badge } from './components/badge'
import { Heading, Subheading } from './components/heading'
import { Select } from './components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/table'

import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from '@heroicons/react/20/solid'
const pathname = window.location.pathname

export function Stat({ title, value, change }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={'lime'}>{change}</Badge>{' '}
      </div>
    </div>
  )
}
const orders = [
  {
    id: 3000,
    url: '/orders/3000',
    date: 'May 9, 2024',
    amount: {
      usd: '$80.00',
      cad: '$109.47',
      fee: '$3.28',
      net: '$106.19',
    },
    payment: {
      transactionId: 'ch_2HLf8DfYJ0Db7asfCC5T546TY',
      card: {
        number: '1254',
        type: 'American Express',
        expiry: '01 / 2025',
      },
    },
    customer: {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      address: '123 Main St. Toronto, ON',
      country: 'Canada',
      countryFlagUrl: '/flags/ca.svg',
    },

  },]
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
       <Heading>
        Welcome to Email Verification
       </Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total Emails" value="0" change="Emails In Dashboard" />
        <Stat title="Verified Emails" value="0" change="Emails Verified by API" />
        <Stat title="Unreachable Emails" value="0" change="Emails marked as incorrect by API" />
        <Stat title="Unknown Emails" value="0" change="Emails that could not be verified" />
      </div>
      <Subheading className="mt-14">Recent Email Lists</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>
              List Name
            </TableHeader>
            <TableHeader>
              Number of Emails
            </TableHeader>
            <TableHeader>
              Status
            </TableHeader>
            <TableHeader>
              Emails Processed
            </TableHeader>
            <TableHeader className="text-right">
              Actions
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
              <TableCell>
                Test
              </TableCell>
              <TableCell>
                0
              </TableCell>
              <TableCell>
                <Badge color="lime">Verified</Badge>
              </TableCell>
              <TableCell>
                0
              </TableCell>
              <TableCell className="text-right">
              <Select>
                  <option>Start</option>
                  <option>Pause</option>
                  <option>Stop</option>
                  <option>View</option>
                  
                </Select>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </SidebarLayout>
  )
}