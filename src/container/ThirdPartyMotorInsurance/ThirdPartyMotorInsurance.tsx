import Image from "next/image";
import classes from "./ThirdPartyMotorInsurance.module.css";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown/Dropdown";
import Button from "@/components/Button/Button";
import { states } from "@/utilities/states";
import {
  modalGenericType,
  requestType,
  thirdPartyInsuranceFormTypes,
} from "@/utilities/types";
import { useEffect, useMemo, useState } from "react";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import moment from "moment";
import { carColors } from "@/utilities/motorInsuranceData";
import { areAllValuesFilled } from "@/helpers/validateObjectValues";
import Modal from "@/components/Modal/Modal";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import SuccessModalBody from "@/components/SuccessModalBody/SuccessModalBody";
import Loader from "@/components/Loader/Loader";
import { projectTime } from "@/helpers/projectTime";
import { Alert } from "@mui/material";
import { useAgentLeadsById } from "@/hooks/usePolicies";

type ThirdPartyInsuranceFormTypes = {
  leadId: string;
};

const ThirdPartyInsuranceForm = ({ leadId }: ThirdPartyInsuranceFormTypes) => {
  // Requests
  const { isLoading, data } = useAgentLeadsById(leadId);

  // Memo
  const lead = useMemo(() => {
    return data?.data?.lead;
  }, [data]);

  // States
  const [vehicleColor, setVehicleColor] = useState("");
  const [state, setState] = useState("");
  const [roadWorthiness, setRoadWorthiness] = useState("");
  const [title, setTitle] = useState("");
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [thirdPartyFormDataFormdata, setThirdPartyFormDataFormdata] = useState(
    new FormData()
  );

  const [thirdPartyFormData, setthirdPartyFormData] =
    useState<thirdPartyInsuranceFormTypes>({
      product: "",
      registrationNumber: "",
      chasisNumber: "",
      vehicleColor: "",
      roadWorthiness: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      state: "",
      startDate: "",
      endDate: "",
    });

  const [modals, setModals] = useState<modalGenericType>({
    insuranceCreated: false,
    payment: false,
    paymentSuccess: false,
  });

  // Hooks
  const { errorFlowFunction } = useError();

  // Requests
  const askNiidHandler = (regNumber: string) => {
    requestHandler({
      method: "POST",
      url: "/scrape/ask-niid",
      id: "ask-niid",
      data: { policyNumber: regNumber },
      state: requestState,
      setState: setRequestState,
      requestCleanup: false,
    });
  };

  // Utils
  const existingThirdPartyPolicies = requestState?.data?.policyData?.filter(
    (data: any) => data["type-of-cover"]?.toLowerCase() === "third party"
  );
  const todaysDate = moment().format("YYYY-MM-DD");

  // Requests
  const thirdPartySubmissionFormHandler = () => {
    requestHandler({
      url: "/policies/policy/motor-insurance/third-party-motor-insurance",
      isMultipart: true,
      method: "POST",
      id: "submit-form",
      data: thirdPartyFormDataFormdata,
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  // Effects
  useEffect(() => {
    if (existingThirdPartyPolicies?.length > 0) {
      const thirdPartyPolicy = existingThirdPartyPolicies[0];

      setthirdPartyFormData((prevState) => {
        return {
          ...prevState,

          startDate: moment(thirdPartyPolicy["valid-to"], "D MMMM YYYY").format(
            "YYYY-MM-DD"
          ),
          chasisNumber: thirdPartyPolicy["chassis-no"],
        };
      });
    }
  }, [requestState?.data]);

  useEffect(() => {
    if (thirdPartyFormData?.startDate) {
      const endDate = projectTime(thirdPartyFormData?.startDate, 1, "year");
      setthirdPartyFormData((prevState) => {
        return { ...prevState, endDate };
      });
    }
  }, [thirdPartyFormData?.startDate]);

  useEffect(() => {
    if (vehicleColor) {
      setthirdPartyFormData((prevState) => {
        return { ...prevState, vehicleColor };
      });
    }

    if (state) {
      setthirdPartyFormData((prevState) => {
        return { ...prevState, state };
      });
    }

    if (roadWorthiness) {
      setthirdPartyFormData((prevState) => {
        return { ...prevState, roadWorthiness };
      });
    }

    if (title) {
      setthirdPartyFormData((prevState) => {
        return { ...prevState, title };
      });
    }
  }, [vehicleColor, state, roadWorthiness, title]);

  useEffect(() => {
    if (requestState?.data && requestState?.id === "submit-form") {
      setModalTrue(setModals, "insuranceCreated");
    }
  }, [requestState?.data]);

  useEffect(() => {
    const subThirdPartyFormData = new FormData();

    subThirdPartyFormData.append("plan", thirdPartyFormData?.product);
    subThirdPartyFormData.append(
      "registrationNumber",
      thirdPartyFormData?.registrationNumber
    );
    subThirdPartyFormData.append(
      "vehicleColor",
      thirdPartyFormData?.vehicleColor
    );
    subThirdPartyFormData.append(
      "chasisNumber",
      thirdPartyFormData?.chasisNumber
    );
    subThirdPartyFormData.append(
      "vehicleColor",
      thirdPartyFormData?.vehicleColor
    );
    subThirdPartyFormData.append(
      "roadWorthiness",
      thirdPartyFormData?.roadWorthiness
    );
    subThirdPartyFormData.append("firstName", thirdPartyFormData?.firstName);
    subThirdPartyFormData.append("lastName", thirdPartyFormData?.lastName);
    subThirdPartyFormData.append("email", thirdPartyFormData?.email);
    subThirdPartyFormData.append("phone", thirdPartyFormData?.phoneNumber);
    subThirdPartyFormData.append("address", thirdPartyFormData?.address);
    subThirdPartyFormData.append("startDate", thirdPartyFormData?.startDate);
    subThirdPartyFormData.append("endDate", thirdPartyFormData?.endDate);
    subThirdPartyFormData.append("state", thirdPartyFormData?.state);

    setThirdPartyFormDataFormdata(subThirdPartyFormData);
  }, [thirdPartyFormData]);

  useEffect(() => {
    if (lead) {
      setthirdPartyFormData((prevState) => {
        return {
          ...prevState,
          firstName: lead?.name.split(" ")[1],
          lastName: lead?.name.split(" ")[0],
          email: lead?.email,
          phoneNumber: lead?.phone,
          address: lead?.address,
          state: lead?.state,
        };
      });
    }
  }, [lead]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {modals.insuranceCreated && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <SuccessModalBody
              title="Your Insurance Policy has been successfully created!"
              caption="Please pay so we can walk you through the last step of this process"
              onClose={() => setAllModalsFalse(setModals)}
              onClick={() => {
                setAllModalsFalse(setModals);
                setModalTrue(setModals, "payment");
              }}
            />
          }
        />
      )}

      {modals.success && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <SuccessModalBody
              title="Your have successfully applied for a Third Party Motor Insurance Policy!"
              caption="Please check your mail to get your dashboard login details. Make sure you change your temporary password as soon as possible. "
              onClose={() => setAllModalsFalse(setModals)}
              onClick={() => {
                setAllModalsFalse(setModals);
              }}
              buttontext="Okay"
            />
          }
        />
      )}

      <section className={classes.container} id="insurance-form">
        <div className={classes.header}>
          <h4>Third Party Insurance Form</h4>
          <p>
            From Form to Coverage. Get Your Third Party Insurance in 5 Minutes
          </p>
        </div>

        <form>
          {requestState?.data && (
            <div className={classes.alert}>
              <Alert severity="warning">
                It appears you have an existing Third Party Policy. We can begin
                this renewal process!
              </Alert>
            </div>
          )}
          <Input
            label="Registration Number"
            placeholder="Eg: 12346"
            name="registrationNumber"
            value={thirdPartyFormData?.registrationNumber}
            onChange={(e) => inputChangeHandler(e, setthirdPartyFormData)}
            onBlur={() => {
              if (thirdPartyFormData?.registrationNumber) {
                askNiidHandler(thirdPartyFormData?.registrationNumber);
              }
            }}
            loading={requestState?.isLoading}
          />
          <Input
            label="Chassis Number"
            placeholder="Eg: 12346"
            name="chasisNumber"
            value={thirdPartyFormData?.chasisNumber}
            onChange={(e) => inputChangeHandler(e, setthirdPartyFormData)}
          />

          <Dropdown
            label="Vehicle Colour"
            options={carColors}
            title="Select"
            selected={vehicleColor}
            setSelected={setVehicleColor}
          />

          <Dropdown
            label="Do you require assistance with vehicle license and/or road worthiness"
            options={["Yes", "No"]}
            title="Select"
            selected={roadWorthiness}
            setSelected={setRoadWorthiness}
          />

          <Input
            label="Start Date"
            name="startDate"
            value={thirdPartyFormData?.startDate}
            onChange={(e) => inputChangeHandler(e, setthirdPartyFormData)}
            type="date"
            min={todaysDate}
          />

          <Input
            label="End Date"
            name="endDate"
            value={thirdPartyFormData?.endDate}
            onChange={(e) => inputChangeHandler(e, setthirdPartyFormData)}
            type="date"
            readOnly
          />

          <h4>Tell us About Yourself</h4>
          <Dropdown
            label="Title"
            options={["Mr.", "Mrs.", "Miss"]}
            title="Select"
            selected={title}
            setSelected={setTitle}
          />
          <Input
            label="First Name"
            placeholder="Eg: John"
            name="firstName"
            value={thirdPartyFormData?.firstName}
            onChange={(e) => inputChangeHandler(e, setthirdPartyFormData)}
          />
          <Input
            label="Last Name"
            placeholder="Eg: Doe"
            name="lastName"
            value={thirdPartyFormData?.lastName}
            onChange={(e) => inputChangeHandler(e, setthirdPartyFormData)}
          />
          <Input
            label="Email"
            placeholder="Eg: example@gmail.com"
            type="email"
            name="email"
            value={thirdPartyFormData?.email}
            onChange={(e) => inputChangeHandler(e, setthirdPartyFormData)}
          />
          <Input
            label="Phone Number"
            placeholder="+234 12 345 6789"
            name="phoneNumber"
            value={thirdPartyFormData?.phoneNumber}
            onChange={(e) => inputChangeHandler(e, setthirdPartyFormData)}
          />
          <Input
            label="Address"
            placeholder="No. 4, B Close, A State"
            name="address"
            value={thirdPartyFormData?.address}
            onChange={(e) => inputChangeHandler(e, setthirdPartyFormData)}
          />
          <Dropdown
            label="State"
            options={states}
            title="Select State"
            selected={state || data?.state}
            setSelected={setState}
          />

          <div>
            <Button
              disabled={!areAllValuesFilled(data)}
              onClick={(e) => {
                e.preventDefault();
                thirdPartySubmissionFormHandler();
              }}
              loading={requestState?.isLoading}
            >
              {requestState?.data ? "Renew" : "Submit"}
            </Button>
          </div>

          {requestState?.isLoading && (
            <div className={classes.loader}>
              <Loader />
              <p>
                Checking to see if you have an existing third party insurance
                policy...
              </p>
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default ThirdPartyInsuranceForm;
