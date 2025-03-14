"use client";

import CustomTable from "@/components/CustomTable/CustomTable";
import Modal from "@/components/Modal/Modal";
import { useToast } from "@/context/ToastContext";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { useAgentsPolicies } from "@/hooks/usePolicies";
import { modalGenericType, requestType } from "@/utilities/types";
import React, { useMemo, useState } from "react";
import { mutate } from "swr";
import PolicyInformationModalBody from "../PolicyInformationModalBody/PolicyInformationModalBody";
import MessageModalBody from "../MessageModalBody/MessageModalBody";

export const policyHeaders = [
  "Policy Held",
  "Expiration Date",
  "User",
  "Status",
];

const PoliciesTable = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [activeUserId, setActiveUserId] = useState<null | string>(null);
  const [modals, setModals] = useState<modalGenericType>({
    policyDetails: false,
    message: false,
  });

  //   Hooks
  const { showToast } = useToast();
  const { errorFlowFunction } = useError();
  const { isLoading: policiesIsLoading, data: policiesData } =
    useAgentsPolicies();

  //   Memo
  const policies = useMemo(() => {
    return policiesData?.data?.policies?.map((data: any) => {
      return {
        ...data,
        userDetails: `${data?.user?.lastName} ${data?.user?.firstName} `,
      };
    });
  }, [policiesData?.data]);

  const policiesOptions = [
    {
      text: "Send Policy Holder a Message",
      action: (row: any) => {
        setModalTrue(setModals, "message");
        setActiveUserId(row?._id);
      },
    },
  ];

  return (
    <>
      {modals.policyDetails && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <PolicyInformationModalBody
              onClose={() => setAllModalsFalse(setModals)}
              id={activeUserId as string}
            />
          }
        />
      )}

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

      <section>
        <CustomTable
          header="Policies"
          data={policies}
          headers={policyHeaders}
          options={policiesOptions}
          fields={["insuranceType", "endDate", "userDetails", "status"]}
          isOptions
          setState={setActiveUserId}
          onRowClick={() => {
            setModalTrue(setModals, "policyDetails");
          }}
          loading={
            (requestState?.id === "toggle-policy-status" &&
              requestState?.isLoading) ||
            policiesIsLoading
          }
        />
      </section>
    </>
  );
};

export default PoliciesTable;
