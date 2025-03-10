import DashboardHeader from "@/container/DashboardHeader/DashboardHeader";
import classes from "./DashboardLayout.module.css";

type DashboardLayout = {
  children: React.ReactNode;
  className?: string;
};

const DashboardLayout = ({ children, className }: DashboardLayout) => {
  return (
    <main className={classes.container}>
      <DashboardHeader />
      <section className={className}>{children}</section>
    </main>
  );
};

export default DashboardLayout;
