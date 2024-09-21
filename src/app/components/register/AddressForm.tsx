import { Field, ErrorMessage } from "formik";
// import DatePickerField from "./DatePickerField";

interface AddressFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const AddressForm = ({ onChange, onBlur }: AddressFormProps) => {
  return (
    <section className="space-y-6 p-5 mx-auto max-w-md">
      <h3 className="absolute left-5 top-5 text-xl"> Address Form</h3>
      <div>
        <label
          htmlFor="address.city"
          className="block text-sm font-medium text-gray-800"
        >
          city
        </label>
        <Field
          id="address.city"
          name="address.city"
          type="text"
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <ErrorMessage
          name="address.city"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="address.street"
          className="block text-sm font-medium text-gray-800"
        >
          street
        </label>
        <Field
          id="address.street"
          name="address.street"
          type="text"
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <ErrorMessage
          name="address.street"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="address.zipcode"
          className="block text-sm font-medium text-gray-800"
        >
          zip code
        </label>
        <Field
          id="address.zipcode"
          name="address.zipcode"
          type="number"
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <ErrorMessage
          name="address.zipcode"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </section>
  );
};

export default AddressForm;
