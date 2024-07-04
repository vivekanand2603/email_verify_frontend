
import { Divider } from '../components/divider'
import { Badge } from '../components/badge'
import { Heading, Subheading } from '../components/heading'
import {
  getLists,
  getListCount, 
  getListVerifiedCount,
  downloadVerifiedList,
  isListInQueue,
  addListToQueue,
  processQueue,
  getLeadsCount
} from '../utils/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/table'

import { CiSaveDown2 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { RxResume } from "react-icons/rx";
import { FiRepeat } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
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
        <LeadCount title="Total Emails" email_is_valid="" change="Emails In Dashboard" />
        <LeadCount title="Verified Emails" email_is_valid="yes" change="Emails Verified by API" />
        <LeadCount title="Unreachable Emails" email_is_valid="no" change="Emails marked as incorrect by API" />
        <LeadCount title="Unknown Emails" email_is_valid="unknown" change="Emails that could not be verified" />
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
        {lists?.[0]?.ID ? lists.map((list) => (
          <TableRow key={list?.ID}>
            <TableCell>
              {list?.Name}
            </TableCell>
            <TableCell>
                <NumberOfEmails id={list?.ID} />
            </TableCell>
            <TableCell>
              <StatusBadge id={list?.ID} />
            </TableCell>
            <TableCell>
              <NumberOfVerifiedEmails id={list?.ID} />
            </TableCell>
            <TableCell className="text-right">
              <Button outline className="mr-2" onClick={()=>{
                downloadVerifiedList(list?.ID)
              }}>
                {/* download icon */}
                <CiSaveDown2 />
              </Button>
              <Button outline>
                {/* delete icon */}
                <MdDeleteOutline />
              </Button>
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
  useEffect(() => {
    setInterval(() => {
      getListVerifiedCount(id)
        .then((data) => {
          setCount(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 2000);
  }, []);
  return <>{count}</>;
}

function StatusBadge({ id }) {
  const [listInQueue, setIsListInQueue] = useState('⟳');
  const [count, setCount] = useState('⟳');
  const [countTotal, setCountTotal] = useState('⟳');
  useEffect(() => {
    getListCount(id)
      .then((data) => {
        setCountTotal(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  useEffect(() => {
    getListVerifiedCount(id)
      .then((data) => {
        setCount(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  useEffect(() => {
    isListInQueue(id)
      .then((data) => {
        setIsListInQueue(data?.in_queue);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  return (<div className='flex justify-start items-start'>
  <Badge color={
    listInQueue ? 'lime' : count === 0 ? 'red' : count === countTotal ? 'green' : 'yellow'
  }>{
    listInQueue ? 'In Progress' : count === 0 ? 'Not Started' : count === countTotal ? 'Completed' : 'Paused'
  }</Badge>
  {/* play pause start button */}
  <Button outline className="ml-2">
    {listInQueue ? <CiPause1 onClick={()=>{
      // pause the list
    }}/> : count === 0 ? <CiPlay1 onClick={()=>{
      addListToQueue(id).then((data) => {
        processQueue().then((data) => {
          window.location.href = '/'
        })
      })
    }}/> : count === countTotal ? <FiRepeat />:<RxResume onClick={()=>{}} />}
  </Button>
  </div>);
}

function LeadCount({ title, email_is_valid, change }) {
  const [count, setCount] = useState('⟳');
  useEffect(() => {
    getLeadsCount(email_is_valid)
      .then((data) => {
        setCount(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [email_is_valid]);
  useEffect(() => {
    setInterval(() => {
      getLeadsCount(email_is_valid)
        .then((data) => {
          setCount(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 2000);
  }, []);
  return <Stat title={title} value={count} change={change} />;
}