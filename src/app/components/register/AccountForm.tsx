import { Field, ErrorMessage } from "formik";
// import DatePickerField from "./DatePickerField";

interface AccountFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const AccountForm = ({ onChange, onBlur }: AccountFormProps) => {
  return (
    <section className="space-y-6 p-5 mx-auto max-w-md">
      <h3 className="absolute left-5 top-5 text-xl"> Account Form </h3>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-800"
        >
          email
        </label>
        <Field
          id="email"
          name="email"
          type="email"
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <ErrorMessage
          name="email"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-800"
        >
          username
        </label>
        <Field
          id="username"
          name="username"
          type="text"
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <ErrorMessage
          name="username"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-800"
        >
          password
        </label>
        <Field
          id="password"
          name="password"
          type="password"
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <ErrorMessage
          name="password"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-800"
        >
          confirmPassword
        </label>
        <Field
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <ErrorMessage
          name="confirmPassword"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </section>
  );
};

export default AccountForm;
