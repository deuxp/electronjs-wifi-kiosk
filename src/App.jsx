import { useState } from "react";
import style from "./App.module.css";
import WifiConnect from "./components/WifiConnect/WifiConnect";
import Welcome from "./components/Welcome/Welcome";
import Loading from "./components/Loading/Loading";

function App() {
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);

  window.addEventListener("online", () => {
    console.log("online: ", navigator.onLine);
    setIsLoading(false);
    setIsConnected(true);
  });
  window.addEventListener("offline", () => {
    console.log("online: ", navigator.onLine);
    setIsLoading(true);
    setIsConnected(false);
  });
  return (
    <div className={style.main}>
      {isConnected && <Welcome />}
      {!isConnected && (
        <WifiConnect
          setIsLoading={setIsLoading}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
      )}
      {isLoading && <Loading />}
    </div>
  );
}

export default App;
