import React from "react";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

import styles from "./index.module.css";
import Header from "../header";

type Props = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  const user = useSelector(selectUser);

  return (
    <div className={styles.main}>
      {user && <Header />}
      <Layout.Content style={{ height: "100%" }}>{children}</Layout.Content>
    </div>
  );
};
