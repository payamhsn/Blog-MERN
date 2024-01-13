import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

export default function Dashboard() {
  //
  //Get URL address from browser:

  const location = useLocation();
  const [tab, setTab] = useState("");
  //
  //Each time location changes,this code runs and stores tab section from URL :

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar Section */}
        <DashSidebar />
      </div>
      {/* Profile Section */}

      {/* When tab in URL change to profile, render DashProfile : */}

      {tab === "profile" && <DashProfile />}
    </div>
  );
}
