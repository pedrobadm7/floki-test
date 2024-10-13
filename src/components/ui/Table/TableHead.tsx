const TableHead = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <th
    className={`px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider ${className}`}
  >
    {children}
  </th>
);

export default TableHead;
