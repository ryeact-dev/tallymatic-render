import UserOptions from '@/common/buttons/UserOptions';
import LoadingSpinner from '@/common/spinner/LoadingSpinner';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';

const TABLE_HEADER = [
  { title: 'Username', className: '' },
  { title: 'Name', className: '' },
  { title: 'Role', className: '' },
  { title: 'Event', className: '' },
  { title: 'Options', className: '' },
];

export default function ListOfAdminAndManagers({ usersEMAndAdmins }) {
  return !usersEMAndAdmins ? (
    <LoadingSpinner />
  ) : (
    <div className='rounded-md border mt-4'>
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_HEADER.map((header) => {
              return (
                <TableHead key={header.title} className={header.className}>
                  {header.title}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersEMAndAdmins.map(
            ({ id, username, fullName, role, eventName }, index) => (
              <TableRow key={id}>
                <TableCell>{username}</TableCell>
                <TableCell>{fullName}</TableCell>
                <TableCell>{role}</TableCell>
                <TableCell>{role !== 'admin' ? eventName : 'all'}</TableCell>
                <TableCell className='space-x-2'>
                  <UserOptions userData={usersEMAndAdmins[index]} />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
