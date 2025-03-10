"use client";

import { capitalize } from "@/helpers/capitalize";
import classes from "./GreetingComponent.module.css";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const GreetingComponent = () => {
  //   Context
  const { user } = useContext(AuthContext);

  const getCurrentHours = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours > 0 && hours < 12) {
      return <p>Good morning ⛅️</p>;
    } else if (hours >= 12 && hours < 17) {
      return <p>Good afternoon 🌤️</p>;
    } else if (hours >= 17) {
      return <p>Good evening 🌙</p>;
    }
  };

  return (
    <div>
      <section className={classes.container}>
        {getCurrentHours()}
        <h4>{capitalize(user?.firstName as string)}</h4>
      </section>
    </div>
  );
};

export default GreetingComponent;
