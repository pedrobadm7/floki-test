interface SelectBoxProps {
  id: string;
  checked: boolean;
  name?: string;
  value: string;
  ariaLabel?: string;
  onChange: () => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  id,
  checked,
  name,
  value,
  ariaLabel,
  onChange,
}) => (
  <div className="flex items-center">
    {value && (
      <label htmlFor={id} className="mr-2 text-sm text-text_body font-medium">
        {value}
      </label>
    )}
    <input
      type="radio"
      name={name}
      id={id}
      checked={checked}
      value={value}
      className="form-radio h-5 w-5 text-blue-600"
      onChange={onChange}
      aria-label={ariaLabel || value}
    />
  </div>
);

export default SelectBox;
