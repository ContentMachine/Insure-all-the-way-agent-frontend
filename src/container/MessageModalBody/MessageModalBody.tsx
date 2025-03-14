import Close from "@/assets/svgIcons/Close";
import classes from "./MessageModalBody.module.css";
import Input from "@/components/Input/Input";
import TextArea from "@/components/Textarea/TextArea";
import Button from "@/components/Button/Button";
import { usePolicyById } from "@/hooks/usePolicies";
import Loader from "@/components/Loader/Loader";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import FileUploadInput from "@/components/FileUploadInput/FileUploadInput";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { requestHandler } from "@/helpers/requestHandler";
import { requestType } from "@/utilities/types";
import { useToast } from "@/context/ToastContext";
import useError from "@/hooks/useError";

type MessageModalBodyTypes = {
  onClose: () => void;
  policyId: string;
};

const MessageModalBody = ({ onClose, policyId }: MessageModalBodyTypes) => {
  // Requests
  const { isLoading, data: policyData } = usePolicyById(policyId);

  // States
  const [message, setMessage] = useState({
    subject: "",
    messageBody: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [messageFormData, setMessageFormData] = useState(new FormData());
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Memos
  const policy = useMemo(() => policyData?.data?.policy, [policyData]);

  // Hooks
  const { showToast } = useToast();
  const { errorFlowFunction } = useError();

  //   Requests
  const handleSubmitMessage = () => {
    requestHandler({
      url: "/email/send-email",
      isMultipart: true,
      method: "POST",
      data: messageFormData,
      state: requestState,
      setState: setRequestState,
      successFunction: (res) => {
        showToast(
          `Message sent successfully to ${policy?.user?.firstName}`,
          "success"
        );
        setMessage({
          subject: "",
          messageBody: "",
        });
        onClose();
      },
      errorFunction: (err) => {
        errorFlowFunction(err);
      },
    });
  };

  // Effects
  useEffect(() => {
    const subFormData = new FormData();

    subFormData.append("recipient", policy?.user?.email);
    subFormData.append("subject", message?.subject);
    subFormData.append("body", message?.messageBody);
    files?.forEach((data) => {
      return subFormData.append("attachments", data);
    });

    setMessageFormData(subFormData);
  }, [message, files, policy]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Send {policy?.user?.firstName || "Test"} a Message</h2>

      <form className={classes.body}>
        <Input
          label="Subject"
          placeholder="Eg: Your Policy Is Now Active!"
          name="subject"
          onChange={(e) => inputChangeHandler(e, setMessage)}
          value={message?.subject}
        />

        <TextArea
          label="Message Body"
          placeholder={`Eg: Good day ${policy?.user?.firstName}!`}
          name="messageBody"
          onChange={(e) => inputChangeHandler(e, setMessage)}
          value={message?.messageBody}
        />

        <FileUploadInput
          files={files}
          setFiles={setFiles}
          title="Upload files if necessary"
          accept=".pdf,.docx,image/*"
          multiple
        />

        <div className={classes.buttonContainer}>
          <Button type="bordered" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!message?.subject || !message?.messageBody}
            onClick={(e) => {
              e.preventDefault();
              handleSubmitMessage();
            }}
            loading={requestState?.isLoading}
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageModalBody;
