const TableCell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <td className={`px-5 py-3 whitespace-nowrap ${className}`}>{children}</td>
);

export default TableCell;
