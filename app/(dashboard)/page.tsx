"use client";

// import InfoBars from "@/components/infoBar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/auth/sign-in");
    }
  }, [userId, isLoaded, router]);

  if (!isLoaded || !userId) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* <InfoBars /> */}
      <div className="w-full chat-window flex-1 h-full flex flex-col gap-10 p-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Welcome to your Dashboard</h1>
          <p className="text-gray-600">
            Monitor your AI-powered sales assistant performance and analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Conversations</h3>
            <p className="text-gray-600 text-sm">
              Monitor and manage customer conversations
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Integrations</h3>
            <p className="text-gray-600 text-sm">
              Connect your domains and services
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <p className="text-gray-600 text-sm">
              Configure your account and billing
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
