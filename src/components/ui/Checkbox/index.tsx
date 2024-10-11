const Checkbox = ({ id }: { id: string }) => (
  <input
    type="checkbox"
    id={id}
    className="form-checkbox h-5 w-5 text-blue-600"
  />
);

export default Checkbox;
