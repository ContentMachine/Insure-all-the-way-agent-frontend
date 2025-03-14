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
    reassignAgent: false,
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

  // Requests
  const policyStatusToggleHandeler = () => {
    requestHandler({
      url: `/admin/policies/${activeUserId}/toggle-status`,
      method: "PATCH",
      requestCleanup: true,
      state: requestState,
      id: "toggle-policy-status",
      setState: setRequestState,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate(`/admin/policies/${activeUserId}`);
        mutate(`/admin/policies`);
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  const policiesOptions = [
    {
      text: "Send Policy Holder a Message",
      action: () => {
        setModalTrue(setModals, "reassignAgent");
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

      <section>
        {policies?.length > 0 && (
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
        )}
      </section>
    </>
  );
};

export default PoliciesTable;
