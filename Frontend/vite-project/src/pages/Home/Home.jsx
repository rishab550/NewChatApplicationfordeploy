import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MessageContainer from "../../components/Sidebar/MessageContainer/MessageContainer";
import { SocketContextProvider } from "../../context/SocketContext";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <SocketContextProvider>
        <Sidebar />
        <MessageContainer />
      </SocketContextProvider>
    </div>
  );
};

export default Home;
