import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import uuidv4 from "uuid/v4";

// Icons
import { FaCogs, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdSettings, MdInfo, MdPrint } from "react-icons/md";

// Local
import styles from "./Admin.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Aws from "./pages/Aws";
import AwsUsage from "./reports/AwsUsage";
import { GlobalContext } from "App";
import { REFRESH_TOKEN_INTERVAL } from "consts";
import { http } from "helpers/axios";
import { dateExpired } from "helpers/token";
import { ACTION_REFRESH_TOKEN, ACTION_LOGOUT } from "reducer/actions/auth";

// Default menu config
const iconSize = 18;
const iconColor = "#9CA1B1";

// Menu config
const menu = [
  {
    id: uuidv4(),
    type: "item",
    label: "Dashboard",
    icon: <MdDashboard size={iconSize} color={iconColor} />,
    link: "/admin"
  },
  {
    id: uuidv4(),
    type: "folder",
    label: "Integration",
    icon: <FaCogs size={iconSize} color={iconColor} />,
    expanded: true,
    content: [
      {
        id: uuidv4(),
        type: "item",
        label: "Customers",
        link: "/admin/customers"
      },
      {
        id: uuidv4(),
        type: "item",
        label: "AWS",
        link: "/admin/aws"
      }
    ]
  },
  {
    id: uuidv4(),
    type: "folder",
    label: "Reports",
    icon: <MdPrint size={iconSize} color={iconColor} />,
    expanded: false,
    content: [
      {
        id: uuidv4(),
        type: "item",
        label: "AWS Usage Report",
        link: "/admin/reports/aws_usage"
      }
    ]
  },
  {
    id: uuidv4(),
    type: "item",
    label: "Settings",
    icon: <MdSettings size={iconSize} color={iconColor} />,
    link: "/admin/settings"
  },
  {
    id: uuidv4(),
    type: "item",
    label: "About",
    icon: <MdInfo size={iconSize} color={iconColor} />,
    link: "/admin/about"
  }
];

export const Admin = () => {
  const { auth, dispatch } = useContext(GlobalContext);
  const [interv, setInterv] = useState();

  useEffect(() => {
    // Refresh token
    if (!interv) {
      const intervalId = setInterval(() => {
        console.log("Refreshing token...");
        http.post("/refresh").then(({ data }) => {
          dispatch({ type: ACTION_REFRESH_TOKEN, payload: data });
          console.log("Token refreshed");
        });
      }, REFRESH_TOKEN_INTERVAL);
      setInterv(intervalId);
    }

    // Cleanup code
    return () => {
      if (interv) {
        clearInterval(interv);
      }
    };
  }, [interv, dispatch]);

  // Detect if we need to redirect to login
  const authorized =
    auth && auth.token && auth.user && !dateExpired(auth.user.exp);

  return (
    <div className={styles.gridContainer}>
      {!authorized && <Redirect to="/login" />}
      {authorized && (
        <>
          <header className={styles.header}>
            <Header />
          </header>
          <aside className={styles.sidenav}>
            <Menu menu={menu} />
          </aside>
          <main className={styles.main}>
            <Switch>
              <Route path="/admin/customers" component={Customers} />
              <Route path="/admin/aws" component={Aws} />
              <Route path="/admin/settings" component={Settings} />
              <Route path="/admin/about" component={About} />
              <Route path="/admin/reports/aws_usage" component={AwsUsage} />
              <Route
                path="/admin/signout"
                component={() => {
                  dispatch({ type: ACTION_LOGOUT });
                  return <Redirect to="/login" />;
                }}
              />
              <Dashboard />
            </Switch>
          </main>
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </>
      )}
    </div>
  );
};

export default Admin;
