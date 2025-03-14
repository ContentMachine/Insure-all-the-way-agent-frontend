import CustomTable from "@/components/CustomTable/CustomTable";
import Modal from "@/components/Modal/Modal";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { useAgentLeads } from "@/hooks/usePolicies";
import { modalGenericType, requestType } from "@/utilities/types";
import React, { useMemo, useState } from "react";
import MessageModalBody from "../MessageModalBody/MessageModalBody";
import LeadsInformatyionModalBody from "../LeadsInformatyionModalBody/LeadsInformatyionModalBody";
import InsuranceTypesModalBody from "../InsuranceTypesModalBody/InsuranceTypesModalBody";
import InsuranceSubTypesModalBody from "../InsuranceSubTypesModalBody/InsuranceSubTypesModalBody";
import InsuranceForms from "../InsuranceForms.tsx/InsuranceForms";

export const policyHeaders = [
  "Full Name",
  "Email Address",
  "User",
  "Number Plate",
];

const LeadsTable = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [activeUserId, setActiveUserId] = useState<null | string>(null);
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<
    string | null
  >(null);
  const [selectedInsuranceSubType, setSelectedInsuranceSubType] = useState<
    string | null
  >(null);
  const [modals, setModals] = useState<modalGenericType>({
    leadDetails: false,
    message: false,
    insuranceType: false,
    insuranceSubType: false,
    insurancePlans: false,
    insuranceForm: false,
  });
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  //   Requests
  const { isLoading: leadsIsLoading, data: leadsData } = useAgentLeads();

  //   Memo
  const leads = useMemo(() => {
    return leadsData?.data?.leads?.map((data: any) => {
      return {
        ...data,
        userDetails: `${data?.user?.lastName} ${data?.user?.firstName} `,
      };
    });
  }, [leadsData?.data]);

  const policiesOptions = [
    {
      text: "Send User a Message",
      action: (row: any) => {
        setModalTrue(setModals, "message");
        setActiveUserId(row?._id);
      },
    },
    {
      text: "Create Policy",
      action: () => {
        setModalTrue(setModals, "insuranceType");
      },
    },
  ];

  return (
    <>
      {modals.message && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <MessageModalBody
              onClose={() => setAllModalsFalse(setModals)}
              policyId={activeUserId as string}
            />
          }
        />
      )}

      {modals.insuranceType && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <InsuranceTypesModalBody
              onClose={() => setAllModalsFalse(setModals)}
              selectedId={selectedInsuranceType}
              onProgress={() => {
                setAllModalsFalse(setModals);
                setModalTrue(setModals, "insuranceSubType");
              }}
              setSelectedId={setSelectedInsuranceType}
            />
          }
        />
      )}

      {modals.insuranceSubType && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <InsuranceSubTypesModalBody
              onClose={() => setAllModalsFalse(setModals)}
              selectedId={selectedInsuranceSubType}
              onProgress={() => {
                setAllModalsFalse(setModals);
                setModalTrue(setModals, "insuranceForm");
              }}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              id={selectedInsuranceType as string}
              setSelectedId={setSelectedInsuranceSubType}
            />
          }
        />
      )}

      {modals.leadDetails && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <LeadsInformatyionModalBody
              onClose={() => setAllModalsFalse(setModals)}
              id={activeUserId as string}
            />
          }
        />
      )}

      {modals.insuranceForm && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <InsuranceForms
              leadId={activeUserId as string}
              insuranceType={selectedInsuranceSubType as string}
            />
          }
        />
      )}

      <section>
        <CustomTable
          header="Leads"
          data={leads}
          headers={policyHeaders}
          options={policiesOptions}
          fields={["name", "email", "phone", "numberPlate"]}
          isOptions
          setState={setActiveUserId}
          onRowClick={() => {
            setModalTrue(setModals, "leadDetails");
          }}
          loading={
            (requestState?.id === "toggle-policy-status" &&
              requestState?.isLoading) ||
            leadsIsLoading
          }
        />
      </section>
    </>
  );
};

export default LeadsTable;
