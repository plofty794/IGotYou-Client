import { ReactNode, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

type TSocket = {
  socket: Socket | null;
};

export const SocketContextProvider = createContext<TSocket>({ socket: null });

function SocketContext({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const _socket = io(
      "http://ec2-54-206-111-44.ap-southeast-2.compute.amazonaws.com:5050",
      {
        withCredentials: true,
      },
    );
    setSocket(_socket);
  }, []);

  return (
    <SocketContextProvider.Provider value={{ socket }}>
      {children}
    </SocketContextProvider.Provider>
  );
}

export default SocketContext;
