
import { Divider } from '../components/divider'
import { Badge } from '../components/badge'
import { Heading, Subheading } from '../components/heading'
import {
  getLists,
  getListCount, 
  getListVerifiedCount
} from '../utils/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/table'


import { Button } from '../components/button'
import { DashboardContext } from '../contexts/dashboard'
import { useContext, useEffect, useState } from 'react'

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
  const { state, dispatch } = useContext(DashboardContext);
  const [lists, setLists] = useState([]);
  useEffect(() => {
    dispatch({ type: 'GET_DASHBOARD' });
    getLists()
      .then((data) => {
        dispatch({ type: 'GET_DASHBOARD_SUCCESS', payload: data });
      })
      .catch((error) => {
        dispatch({ type: 'GET_DASHBOARD_ERROR', payload: error });
      });
  }, []);
  useEffect(() => {
    // check if state.dashboard is an array & has length
    if (Array.isArray(state.dashboard) && state.dashboard.length) {
      setLists(state.dashboard);
    } else {
      setLists([]);
    }
  }, [state]);
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
             Verified Emails
            </TableHeader>
            <TableHeader className="text-right">
              Actions
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
        {lists?.[0]?.ID ? lists.map((list) => (
          <TableRow key={list?.ID}>
            <TableCell>
              {list?.Name}
            </TableCell>
            <TableCell>
                <NumberOfEmails id={list?.ID} />
            </TableCell>
            <TableCell>
              <Badge color="lime">Verified</Badge>
            </TableCell>
            <TableCell>
              <NumberOfVerifiedEmails id={list?.ID} />
            </TableCell>
            <TableCell className="text-right">
              <Button color="lime" className="mr-2">Download Verified</Button>
              <Button color="red" outline>Delete</Button>
            </TableCell>
          </TableRow>
        )) : <TableRow>
          <TableCell colSpan={5} className="text-center">
            No lists found
          </TableCell>
        </TableRow>}
        </TableBody>
      </Table>

  </>)
}

function NumberOfEmails({ id }) {
  const [count, setCount] = useState('⟳');
  useEffect(() => {
    getListCount(id)
      .then((data) => {
        setCount(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  return <>{count}</>;
}

function NumberOfVerifiedEmails({ id }) {
  const [count, setCount] = useState('⟳');
  useEffect(() => {
    getListVerifiedCount(id)
      .then((data) => {
        setCount(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  return <>{count}</>;
}
