import { Field, ErrorMessage } from "formik";
// import DatePickerField from "./DatePickerField";

interface ProfileFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const ProfileForm = ({ onChange, onBlur }: ProfileFormProps) => {
  return (
    <section className="space-y-6 p-5 mx-auto max-w-md">
      <h3 className="absolute left-5 top-5 text-xl"> Profile Form </h3>
      <div>
        <label
          htmlFor="name.firstname"
          className="block text-sm font-medium text-gray-800"
        >
          firstname
        </label>
        <Field
          id="name.firstname"
          name="name.firstname"
          type="text"
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <ErrorMessage
          name="name.firstname"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="name.lastname"
          className="block text-sm font-medium text-gray-800"
        >
          Lastname
        </label>
        <Field
          id="name.lastname"
          name="name.lastname"
          type="text"
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <ErrorMessage
          name="name.lastname"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-800"
        >
          phone
        </label>
        <Field
          id="phone"
          name="phone"
          type="text"
          onChange={onChange}
          onBlur={onBlur}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <ErrorMessage
          name="phone"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </section>
  );
};

export default ProfileForm;
