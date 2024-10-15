import React, { InputHTMLAttributes } from 'react';

const SelectBox = React.forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ id, checked, value, onChange, ...props }, ref) => (
  <div className="flex items-center">
    {value && (
      <label htmlFor={id} className="mr-2 text-sm text-text_body font-medium">
        {value}
      </label>
    )}
    <input
      ref={ref}
      type="radio"
      id={id}
      checked={checked}
      className="form-radio h-5 w-5 text-blue-600"
      onChange={onChange}
      {...props}
    />
  </div>
));

export default SelectBox;
