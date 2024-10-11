const TableCell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
);

export default TableCell;
