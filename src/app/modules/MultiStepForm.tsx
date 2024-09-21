"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import StepIndicator from "../components/StepIndicator";
import ProfileForm from "../components/register/ProfileForm";
import AccountForm from "../components/register/AccountForm";
import AddressForm from "../components/register/AddressForm";
import { UseDataContext } from "../contexts/UseDataContext";
import { RotatingLoader } from "../components/Loader/NewLoader";

import {
  ProfileValidationForm,
  AccountValidationForm,
  AddressValidationForm,
} from "./Schema";

import { registerUserProps } from "../interfaces";
import { addUsersMultiStep } from "../api";
import { useRouter } from "next/navigation";

const MultiStepForm: React.FC = () => {
  const { isLoading, setLoadingState } = UseDataContext();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const router = useRouter();
  const [step, setStep] = useState(1);

  const initialValues = {
    username: "",
    email: "",
    password: "1234qwerty",
    confirmPassword: "1234qwerty",
    name: {
      firstname: "",
      lastname: "",
    },
    phone: "",
    address: {
      street: "",
      city: "",
      zipcode: 0,
    },
  };
  const validationSchema = [
    AccountValidationForm,
    ProfileValidationForm,
    AddressValidationForm,
  ];

  const handleNext = () => {
    setStep(step + 1);
    console.log(step);
  };

  const handlePrevious = () => {
    setStep(step - 1);
    console.log(step);
  };

  const handleSubmit = async (values: registerUserProps) => {
    async function loader(value: boolean) {
      setLoadingState(value);
      await delay(2000);
    }
    const register = async () => {
      await loader(true)
        .then(async () => {
          const result = await addUsersMultiStep(values);
          if (result) {
            router.push("/login");
          }
        })
        .then(() => {
          loader(false);
        });
    };
    register();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema[step - 1]}
      onSubmit={(values, { setSubmitting }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...dataToSubmit } = values;
        setTimeout(() => {
          if (step === validationSchema.length) {
            handleSubmit(dataToSubmit);
          } else {
            setSubmitting(false);
            handleNext();
          }
        });
      }}
    >
      {({ isSubmitting, handleBlur, handleChange }) => (
        <section className="flex flex-col justify-center">
          {isLoading ? (
            <div className="mt-20 mx-auto">
              <RotatingLoader />
            </div>
          ) : (
            <>
              <div className="mt-20 self-center">
                <StepIndicator step={step} />
              </div>
              <Form className="relative flex flex-col mx-auto mt-10 w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
                {/* <SwitchCaseStep index={step} /> */}
                <div>
                  {step === 1 ? (
                    <AccountForm onChange={handleChange} onBlur={handleBlur} />
                  ) : step === 2 ? (
                    <ProfileForm onChange={handleChange} onBlur={handleBlur} />
                  ) : (
                    <AddressForm onChange={handleChange} onBlur={handleBlur} />
                  )}
                </div>

                <div className="mx-auto flex gap-4">
                  {step > 1 && (
                    <button
                      className="w-24 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      type="button"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                  )}
                  <button
                    className="w-24 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {step === validationSchema.length ? "Submit" : "Next"}
                  </button>
                </div>
              </Form>
            </>
          )}
        </section>
      )}
    </Formik>
  );
};

export default MultiStepForm;
