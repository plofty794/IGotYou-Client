import { ReactNode, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

type TSocket = {
  socket: Socket | null;
};

export const SocketContextProvider = createContext<TSocket>({ socket: null });

function SocketContext({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const _socket = io("https://igot-you.online/", {
      path: "/api/socket.io/",
      withCredentials: true,
    });
    setSocket(_socket);
  }, []);

  return (
    <SocketContextProvider.Provider value={{ socket }}>
      {children}
    </SocketContextProvider.Provider>
  );
}

export default SocketContext;
