import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";

import styles from "./index.module.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header className={styles.header}>
      {user ? (
        <>
          <Button onClick={onLogoutClick}>
            <LogoutOutlined />
            Выйти
          </Button>
          <div>Hello {user.name}!</div>
        </>
      ) : (
        ""
      )}
    </Layout.Header>
  );
};

export default Header;
