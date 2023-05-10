import { useState } from "react";
import useWifiConnect from "./hooks/useWifiConnect";
import style from "./App.module.css";
import WifiConnect from "./components/WifiConnect/WifiConnect";
import Welcome from "./components/Welcome/Welcome";
import Loading from "./components/Loading/Loading";

function App() {
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    submit,
    handleChange,
    netSelect,
    getData,
    password,
    setPassword,
    networks,
    networkNames,
  } = useWifiConnect();

  const debounceGetNetworks = async () => {
    setIsLoading(true);
    // setTimeout(() => {
    //   console.log("...loading");
    //   setIsLoading(false);
    //   getData();
    // }, 1000);
    console.log("...loading");
    const res = await getData();
    if (!res.data || res.data.length === 0) {
      setMessage(res.message);
    }
    setIsLoading(false);
  };

  function onWifi(isOnline) {
    if (isConnected === isOnline) return;

    if (isConnected === true) {
      setIsLoading(false);
    }
    setIsConnected(isOnline);
    if (isOnline === false) {
      debounceGetNetworks();
    }
  }

  window.addEventListener("online", () => {
    console.log("online: ", navigator.onLine);
    onWifi(navigator.onLine);
  });
  window.addEventListener("offline", () => {
    console.log("online: ", navigator.onLine);
    onWifi(navigator.onLine);
  });

  async function handleClick() {
    const res = await submit();
    if (res.data) {
      console.log("ok! ->", res.message);
    }
    if (!res.data) {
      console.log("error: ", res.message);
      setMessage(res.message);
    }
  }

  return (
    <div className={style.main}>
      {isConnected && <Welcome />}
      {!isConnected && !isLoading && (
        <WifiConnect
          handleClick={handleClick}
          handleChange={handleChange}
          netSelect={netSelect}
          password={password}
          setPassword={setPassword}
          networks={networks}
          networkNames={networkNames}
          getData={getData}
          setisLoading={setIsLoading}
          isConnected={isConnected}
          message={message}
        />
      )}
      {isLoading && <Loading />}
    </div>
  );
}

export default App;
