
import { Divider } from '../components/divider'
import { Badge } from '../components/badge'
import { Heading, Subheading } from '../components/heading'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/table'


import { Button } from '../components/button'


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

export default function Home(){
  return(<>
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
              <Button color="lime">View</Button>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
  </>)
}
