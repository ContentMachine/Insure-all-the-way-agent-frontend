import { Dispatch, SetStateAction, useMemo, useState } from "react";
import classes from "./InsuranceSubTypesModalBody.module.css";
import Close from "@/assets/svgIcons/Close";
import {
  useAllInsuranceTypes,
  useAllInsuranceTypesById,
} from "@/hooks/usePolicies";
import Loader from "@/components/Loader/Loader";
import Button from "@/components/Button/Button";
import { structureWords } from "@/helpers/capitalize";
import { formatCurrency } from "@/helpers/formatAmount";
import ArrowBack from "@/assets/svgIcons/ArrowBack";
import ArrowRight from "@/assets/svgIcons/ArrowRight";

type InsuranceSubTypesModalBodyTypes = {
  onClose: () => void;
  selectedId: string | null;
  onProgress: () => void;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
  selectedPlan: string | null;
  setSelectedPlan: Dispatch<SetStateAction<string | null>>;
  id: string;
};

const InsuranceSubTypesModalBody = ({
  onClose,
  selectedId,
  onProgress,
  setSelectedId,
  id,
  selectedPlan,
  setSelectedPlan,
}: InsuranceSubTypesModalBodyTypes) => {
  // Requests
  const { isLoading, data } = useAllInsuranceTypesById(id);

  //   States
  const [showPlans, setShowPlans] = useState(false);

  // Memos
  const insuranceTypes = useMemo(() => {
    return data?.data?.types;
  }, [data]);

  // Utils
  const hasPlans =
    insuranceTypes?.find((data: any) => data?.id === selectedId)?.plans
      ?.length > 0;

  const insurancePlans = useMemo(() => {
    return data?.data?.types?.find((data: any) => data?.id === selectedId)
      ?.plans;
  }, [selectedId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>
        {showPlans && <ArrowBack onClick={() => setShowPlans(false)} />}

        {!showPlans
          ? "Select an Insurance Sub-Type"
          : "Select an Insurance Plan"}
      </h2>

      {!showPlans && (
        <div className={classes.body}>
          {insuranceTypes?.map((data: any, i: number) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setSelectedId(data?.id);
                  if (data?.plans) {
                    setShowPlans(true);
                  } else {
                    setShowPlans(false);
                  }
                }}
                className={
                  data?.id === selectedId ? classes.active : classes.inActive
                }
              >
                <h4>{structureWords(data?.id)}</h4>
                <p>{data?.description}</p>
              </div>
            );
          })}
        </div>
      )}

      {showPlans && insurancePlans && (
        <div className={classes.body}>
          {insurancePlans?.map((data: any, i: number) => {
            return (
              <div
                key={i}
                className={
                  selectedPlan &&
                  data?.name === structureWords(selectedPlan as string)
                    ? classes.active
                    : classes.inActive
                }
                onClick={() => {
                  setSelectedPlan(
                    data?.name?.replaceAll(" ", "-").toLowerCase()
                  );
                }}
              >
                <h4>{data?.name}</h4>
                <p>₦{formatCurrency(data?.price)}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className={classes.buttonContainer}>
        <Button type="bordered" onClick={onClose}>
          Close
        </Button>
        <Button
          disabled={!selectedId}
          onClick={() => {
            if (hasPlans) {
              if (!showPlans) {
                setShowPlans(true);
              } else {
                onProgress();
              }
            } else {
              onProgress();
            }
          }}
          loading={isLoading}
        >
          Select Policy Sub-Type
        </Button>
      </div>
    </div>
  );
};

export default InsuranceSubTypesModalBody;
