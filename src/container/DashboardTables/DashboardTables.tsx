import CustomTable from "@/components/CustomTable/CustomTable";
import { capitalizeEachWord, structureWords } from "@/helpers/capitalize";
import { useAgentsPolicies } from "@/hooks/usePolicies";
import React, { useMemo } from "react";
import PoliciesTable from "../PoliciesTable/PoliciesTable";
import classes from "./DashboardTables.module.css";
import LeadsTable from "../LeadsTable/LeadsTable";

const DashboardTables = () => {
  return (
    <section className={classes.container}>
      <PoliciesTable />
      <LeadsTable />
    </section>
  );
};

export default DashboardTables;
