import React from "react";
import MultiStepForm from "../../modules/MultiStepForm";
import Navbar from "../../components/Navbar";

const index = () => {
  return (
    <div className="register-page">
      <Navbar />
      <MultiStepForm />
    </div>
  );
};

export default index;
