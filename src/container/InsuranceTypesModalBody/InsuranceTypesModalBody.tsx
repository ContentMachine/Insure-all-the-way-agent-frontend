import React, { Dispatch, SetStateAction, useMemo } from "react";
import classes from "./InsuranceTypesModalBody.module.css";
import Button from "@/components/Button/Button";
import Close from "@/assets/svgIcons/Close";
import { useAllInsuranceTypes } from "@/hooks/usePolicies";
import Loader from "@/components/Loader/Loader";
import { structureWords } from "@/helpers/capitalize";

type InsuranceTypesModalBodyTypes = {
  onClose: () => void;
  selectedId: string | null;
  onProgress: () => void;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
};

const InsuranceTypesModalBody = ({
  onClose,
  selectedId,
  onProgress,
  setSelectedId,
}: InsuranceTypesModalBodyTypes) => {
  // Requests
  const { isLoading, data } = useAllInsuranceTypes();

  // Memos
  const insuranceTypes = useMemo(() => {
    return data?.data?.policies;
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Select an Insurance Type</h2>

      <div className={classes.body}>
        {insuranceTypes?.map((data: any, i: number) => {
          return (
            <div
              key={i}
              onClick={() =>
                setSelectedId(data?.replaceAll(" ", "-").toLowerCase())
              }
              className={
                selectedId && data === structureWords(selectedId as string)
                  ? classes.active
                  : classes.inActive
              }
            >
              <h4>{data}</h4>
            </div>
          );
        })}
      </div>

      <div className={classes.buttonContainer}>
        <Button type="bordered" onClick={onClose}>
          Close
        </Button>
        <Button
          disabled={!selectedId}
          onClick={() => {
            if (selectedId) onProgress();
          }}
          loading={isLoading}
        >
          Select Policy
        </Button>
      </div>
    </div>
  );
};

export default InsuranceTypesModalBody;
