import { useState } from "react";
import useWifiConnect from "./hooks/useWifiConnect";
import style from "./App.module.css";
import WifiConnect from "./components/WifiConnect/WifiConnect";
import Welcome from "./components/Welcome/Welcome";
import Loading from "./components/Loading/Loading";

function App() {
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);

  const {
    submit,
    handleChange,
    netSelect,
    getNetworks,
    password,
    setPassword,
    networks,
    networkNames,
  } = useWifiConnect();

  const debounce = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("...loading");
      setIsLoading(false);
      getNetworks();
    }, 1000);
  };

  function onWifi() {
    const isOnline = navigator.onLine;
    if (isConnected === isOnline) return;
    setIsConnected(isOnline);
    if (isOnline === false) {
      debounce();
    }
  }

  window.addEventListener("online", () => {
    console.log("online: ", navigator.onLine);
    onWifi();
  });
  window.addEventListener("offline", () => {
    console.log("online: ", navigator.onLine);
    onWifi();
  });

  async function handleClick() {
    const res = await submit();
    if (res.data) {
      console.log("ok! ->", res.message);
    }
    if (!res.data) {
      console.log("error: ", res.message);
    }
  }

  return (
    <div className={style.main}>
      {isConnected && !isLoading && <Welcome />}
      {!isConnected && !isLoading && (
        <WifiConnect
          handleClick={handleClick}
          handleChange={handleChange}
          netSelect={netSelect}
          password={password}
          setPassword={setPassword}
          networks={networks}
          networkNames={networkNames}
          getNetworks={getNetworks}
          setIsLoading={setIsLoading}
          isConnected={isConnected}
        />
      )}
      {isLoading && <Loading />}
    </div>
  );
}

export default App;
