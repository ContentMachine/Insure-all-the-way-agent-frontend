import Loader from "@/components/Loader/Loader";
import Dashboard from "@/container/Dashboard/Dashboard";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import React, { Suspense } from "react";

const pahge = () => {
  return (
    <Suspense fallback={<Loader />}>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </Suspense>
  );
};

export default pahge;
