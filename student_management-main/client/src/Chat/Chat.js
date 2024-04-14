
import React from "react";
import { ChatEngine } from "react-chat-engine";
//import { PeopleSettings } from "react-chat-engine";
export const Chat = () => {
  const username = sessionStorage.getItem("msv");
  return (
    <div style={{ overflow: "hidden" }}>
      <ChatEngine
        height="100vh"
        projectID="9616480b-4334-418c-a0d8-414246664df9"
        userName={username}
        userSecret={username}

      />
    </div>
  );
};
