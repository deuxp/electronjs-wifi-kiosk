import { useEffect } from "react";
import style from "./WifiConnect.module.css";
import Button from "../Button/Button";

function WifiConnect({
  handleClick,
  handleChange,
  netSelect,
  password,
  setPassword,
  networks,
  networkNames,
  getNetworks,
}) {
  useEffect(() => {
    // if (navigator.onLine === false) {
    getNetworks();
    // }
  }, []);
  return (
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
      <Button handleClick={handleClick}>connect</Button>
    </div>
  );
}

export default WifiConnect;
