interface SelectBoxProps {
  id: string;
  checked: boolean;
  name?: string;
  value: string;
  onChange: () => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  id,
  checked,
  name,
  value,
  onChange,
}) => (
  <>
    {name && (
      <label htmlFor={name} className="text-sm text-text_body font-medium">
        {value}
      </label>
    )}
    <input
      type="radio"
      name={name}
      id={id}
      checked={checked}
      value={value}
      className="form-checkbox h-5 w-5 text-blue-600"
      onChange={onChange}
    />
  </>
);

export default SelectBox;
