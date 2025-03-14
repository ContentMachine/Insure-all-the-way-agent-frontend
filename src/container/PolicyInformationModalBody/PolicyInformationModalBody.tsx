import Button from "@/components/Button/Button";
import classes from "./PolicyInformationModalBody.module.css";
import Phone from "@/assets/svgIcons/Phone";
import Close from "@/assets/svgIcons/Close";
import Draft from "@/assets/svgIcons/Draft";
import { usePolicyById } from "@/hooks/usePolicies";
import { useMemo } from "react";
import Loader from "@/components/Loader/Loader";
import { capitalize, structureWords } from "@/helpers/capitalize";
import moment from "moment";
import { formatObject } from "@/helpers/validateObjectValues";

type PolicyInformationModalBodyTypes = {
  onClose?: () => void;
  id: string;
};

const PolicyInformationModalBody = ({
  onClose,
  id,
}: PolicyInformationModalBodyTypes) => {
  // Requests
  const { isLoading, data } = usePolicyById(id);

  // MEmos
  const policyInfo: { title: string; value: string }[] | undefined =
    useMemo(() => {
      if (data?.data) {
        return formatObject(data?.data?.policy, [
          "_id",
          "__v",
          "user",
          "createdAt",
          "agent",
        ]);
      }
    }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Policy Information</h2>

      <div className={classes.body}>
        {policyInfo?.map((data, i) => {
          if (data?.title.includes("Date")) {
            return (
              <div key={i}>
                <h4>{data?.title}</h4>
                <p>{capitalize(data?.value)}</p>
              </div>
            );
          }
          return (
            <div key={i}>
              <h4>{data?.title}</h4>
              <p>{structureWords(data?.value)}</p>
            </div>
          );
        })}
      </div>

      <div className={classes.buttonContainer}>
        <Button type="bordered" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default PolicyInformationModalBody;
