const SelectBox = ({
  id,
  checked,
  name,
  value,
  onChange,
}: {
  id: string;
  checked: boolean;
  name?: string;
  value: string;
  onChange: () => void;
}) => (
  <>
    <input
      type="radio"
      name={name}
      id={id}
      checked={checked}
      value={value}
      className="form-checkbox h-5 w-5 text-blue-600"
      onChange={onChange}
    />
    {name && (
      <label htmlFor={name} className="text-sm font-medium">
        {value}
      </label>
    )}
  </>
);

export default SelectBox;
