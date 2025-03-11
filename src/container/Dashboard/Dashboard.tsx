"use client";

import GreetingComponent from "@/components/GreetingComponent/GreetingComponent";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import classes from "./Dashboard.module.css";
import DashboardStats from "../DashboardStats/DashboardStats";
import Button from "@/components/Button/Button";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { modalGenericType } from "@/utilities/types";
import CreateLeadForm from "../CreateLeadForm/CreateLeadForm";
import Plus from "@/assets/svgIcons/Plus";

const Dashboard = () => {
  // States
  const [modals, setModals] = useState<modalGenericType>({
    createLead: false,
    success: false,
  });

  return (
    <>
      {modals?.createLead && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={<CreateLeadForm onClose={() => setAllModalsFalse(setModals)} />}
        />
      )}

      <DashboardLayout className={classes.container}>
        <div className={classes.header}>
          <GreetingComponent />
          <Button
            type="secondary"
            onClick={() => setModalTrue(setModals, "createLead")}
          >
            <Plus />
            <span>Add a Lead</span>
          </Button>
        </div>
        <DashboardStats />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
