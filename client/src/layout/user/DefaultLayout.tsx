/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import ChatBoxAI from "../../components/chatboxAI";
import ToastComponent from "../../components/toastComponent";

const DefaultLayout = () => {
  return (
    <div className="h-screen overflow-y-auto" style={{ width: "1152px" }}>
      <div className="flex flex-col scroll-y w-full  mx-auto  bg-background_primary">
        <Navbar />
        <main className="flex flex-col tablet:pb-20 tablet:bg-white  bg-background_primary  h-full w-full max-w-[1200px] tablet:px-0  mx-auto  ">
          <Outlet />
        </main>
        <ChatBoxAI />
      </div>
      <ToastComponent />
    </div>
  );
};

export default DefaultLayout;
