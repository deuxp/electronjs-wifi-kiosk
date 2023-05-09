import { useState, useEffect } from "react";
import useWifiConnect from "./hooks/useWifiConnect";
import style from "./App.module.css";
import WifiConnect from "./components/WifiConnect/WifiConnect";
import Welcome from "./components/Welcome/Welcome";

function App() {
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const {
    handleClick,
    handleChange,
    netSelect,
    getNetworks,
    password,
    setPassword,
    networks,
    networkNames,
  } = useWifiConnect();

  // useEffect(() => {
  //   if (navigator.onLine === false) {
  //     getNetworks();
  //   }
  // }, []);

  function onWifi() {
    const isOnline = navigator.onLine;
    if (isConnected === isOnline) return;
    if (navigator.onLine === false) getNetworks();
    setIsConnected(isOnline);
  }

  window.addEventListener("online", () => {
    console.log("online: ", navigator.onLine);
    onWifi();
  });
  window.addEventListener("offline", () => {
    console.log("online: ", navigator.onLine);
    onWifi();
  });

  return (
    <div className={style.main}>
      {isConnected && <Welcome />}
      {!isConnected && (
        <WifiConnect
          handleClick={handleClick}
          handleChange={handleChange}
          netSelect={netSelect}
          password={password}
          setPassword={setPassword}
          networks={networks}
          networkNames={networkNames}
          getNetworks={getNetworks}
        />
      )}
    </div>
  );
}

export default App;
