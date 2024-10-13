import * as React from 'react';
import { forwardRef } from 'react';

import { cn } from '../../../utils/cn';

const Table = forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, children, ...props }, ref) => (
  <table
    ref={ref}
    className={cn('w-full border-collapse', className)}
    {...props}
  >
    {children}
  </table>
));

Table.displayName = 'Table';

const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <tbody ref={ref} className={className} {...props}>
    {children}
  </tbody>
));

TableBody.displayName = 'TableBody';

const TableCell = forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('px-5 py-3 whitespace-nowrap', className)}
    {...props}
  >
    {children}
  </td>
));

TableCell.displayName = 'TableCell';

const TableHead = forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider',
      className,
    )}
    {...props}
  >
    {children}
  </th>
));

TableHead.displayName = 'TableHead';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <thead ref={ref} className={cn('bg-gray-primary', className)} {...props}>
    {children}
  </thead>
));

TableHeader.displayName = 'TableHeader';

const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, children, ...props }, ref) => (
  <tr ref={ref} className={className} {...props}>
    {children}
  </tr>
));

TableRow.displayName = 'TableRow';

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
