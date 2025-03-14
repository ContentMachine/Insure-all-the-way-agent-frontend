import CustomTable from "@/components/CustomTable/CustomTable";
import { capitalizeEachWord, structureWords } from "@/helpers/capitalize";
import { useAgentsPolicies } from "@/hooks/usePolicies";
import React, { useMemo } from "react";
import PoliciesTable from "../PoliciesTable/PoliciesTable";

const DashboardTables = () => {
  return (
    <section>
      <PoliciesTable />
    </section>
  );
};

export default DashboardTables;
