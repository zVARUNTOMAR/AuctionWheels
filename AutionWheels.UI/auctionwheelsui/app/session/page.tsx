import { auth } from "@/auth";
import React from "react";
import Heading from "../components/Heading";
import AuthTest from "./AuthTest";

const Session = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <Heading
        title="Session dashboard"
        subtitle="View your session data"
        center={true}
      ></Heading>
      <div className="bg-blue-200 border-2 border-blue-500">
        <h3 className="text-lg">Session Data</h3>
        <h1>{JSON.stringify(session, null, 2)}</h1>
      </div>
      <div className="mt-4">
        <AuthTest />
      </div>
    </div>
  );
};

export default Session;
