import { useMemo } from "react";
import classes from "../PolicyInformationModalBody/PolicyInformationModalBody.module.css";
import { useAgentLeadsById } from "@/hooks/usePolicies";
import { formatObject } from "@/helpers/validateObjectValues";
import Loader from "@/components/Loader/Loader";
import Close from "@/assets/svgIcons/Close";
import { capitalize, structureWords } from "@/helpers/capitalize";
import Button from "@/components/Button/Button";

type LeadsInformationModalBodyTypes = {
  onClose?: () => void;
  id: string;
};

const LeadsInformatyionModalBody = ({
  onClose,
  id,
}: LeadsInformationModalBodyTypes) => {
  // Requests
  const { isLoading, data } = useAgentLeadsById(id);

  // MEmos
  const leadInfo: { title: string; value: string }[] | undefined =
    useMemo(() => {
      if (data?.data) {
        return formatObject(data?.data?.lead, [
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
        {leadInfo?.map((data, i) => {
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

export default LeadsInformatyionModalBody;
