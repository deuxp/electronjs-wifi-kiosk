import { useState } from "react";
export default function useWifiConnect() {
  const [password, setPassword] = useState("");
  const [networks, setNetworks] = useState([]);
  const [netSelect, setNetSelect] = useState("");

  async function getNetworks() {
    const res = await window.api.mainThread("get/networks");
    console.log(res);
    setNetworks(res);
  }

  const networkNames = netArr => {
    let networks;
    if (netArr) {
      networks = netArr.map((net, idx) => {
        return (
          <option key={idx + 1} value={net.ssid}>
            {net.ssid}
          </option>
        );
      });
      const defaultOption = <option key={0}> -- select a network -- </option>;
      return [defaultOption, ...networks];
    }
    return [];
  };

  const handleChange = e => {
    const select = e.target.value;
    setNetSelect(select);
  };

  const handleClick = async () => {
    // invoke login
    const res = await window.api.mainThread("connect/wifi", {
      ssid: netSelect,
      password,
    });
    console.log(res.message);
    // undo the loading symbol
    // log if it worked
  };

  return {
    handleClick,
    handleChange,
    netSelect,
    getNetworks,
    password,
    setPassword,
    networks,
    networkNames,
  };
}
