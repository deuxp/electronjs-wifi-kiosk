import { useEffect, useState } from "react";
import style from "./App.module.css";
import Button from "./components/Button/Button";

function App() {
  const [password, setPassword] = useState("");
  const [networks, setNetworks] = useState([]);
  const [netSelect, setNetSelect] = useState("");

  async function getNetworks() {
    const res = await window.api.getData("networks");
    console.log(res);
    setNetworks(res);
  }

  const networkNames = netArr => {
    const networks = netArr.map((net, idx) => {
      return (
        <option key={idx + 1} value={net.ssid}>
          {net.ssid}
        </option>
      );
    });
    const defaultOption = <option key={0}> -- select a network -- </option>;
    return [defaultOption, ...networks];
  };

  const handleChange = e => {
    const select = e.target.value;
    setNetSelect(select);
  };

  const handleClick = () => {
    console.log({ network: netSelect, password });
  };

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
