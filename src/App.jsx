import { useEffect, useState } from "react";
import style from "./App.module.css";
import Button from "./components/Button/Button";
import useWifiConnect from "./hooks/useWifiConnect";

function App() {
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

  useEffect(() => {
    getNetworks();
  }, []);

  return (
    <div className={style.main}>
      <div className={style.container}>
        <div className={style.title}>Wifi Networks</div>
        <select
          defaultValue={netSelect}
          // value={netSelect}
          onChange={handleChange}
        >
          {networkNames(networks)}
        </select>
        <input
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="password"
        />
        <Button handleClick={handleClick}>Click</Button>
      </div>
    </div>
  );
}

export default App;
