import React from "react";
import ThirdPartyInsuranceForm from "../ThirdPartyMotorInsurance/ThirdPartyMotorInsurance";

type InsuranceFormsTypes = {
  insuranceType: string;
  leadId: string;
};

const InsuranceForms = ({ insuranceType, leadId }: InsuranceFormsTypes) => {
  return <ThirdPartyInsuranceForm leadId={leadId} />;
};

export default InsuranceForms;
