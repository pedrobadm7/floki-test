interface CheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onCheckedChange,
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={e => onCheckedChange(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-600 border-primary rounded focus:ring-blue-500"
      />
    </div>
  );
};

export default Checkbox;
