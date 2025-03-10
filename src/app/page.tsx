import { Suspense } from "react";
import { redirect } from "next/navigation";
import { routes } from "@/utilities/routes";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  return (
    <Suspense fallback={<Loader />}>{redirect(routes.DASHBOARD)}</Suspense>
  );
}
