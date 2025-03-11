"use client";

import PoliciesSummaryCard from "@/components/PoliciesSummaryCard/PoliciesSummaryCard";
import classes from "./DashboardStats.module.css";
import { useRouter } from "next/navigation";
import { routes } from "@/utilities/routes";

const DashboardStats = () => {
  // Router
  const router = useRouter();

  return (
    <section className={classes.container}>
      <PoliciesSummaryCard title="Leads" amount={11} notAmount />
      <PoliciesSummaryCard title="Conversions " amount={11} notAmount />
      <PoliciesSummaryCard
        title="Assigned Active Policies"
        amount={11}
        notAmount
      />
      <PoliciesSummaryCard
        title="Assigned Expired Policies"
        amount={11}
        notAmount
      />
    </section>
  );
};

export default DashboardStats;
