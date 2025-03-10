import Loader from "@/components/Loader/Loader";
import SignUp from "@/container/SignUp/SignUp";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SignUp />
    </Suspense>
  );
};

export default page;
