const TableRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <tr className={className}>{children}</tr>;

export default TableRow;
