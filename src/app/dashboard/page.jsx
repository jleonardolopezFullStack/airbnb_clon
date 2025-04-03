"use client";

import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data, status, update } = useSession();
  console.log(status);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
