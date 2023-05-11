import { useEffect, useState } from "react";

export default function useWifiConnect() {
  const [password, setPassword] = useState("");
  const [networks, setNetworks] = useState([]);
  const [netSelect, setNetSelect] = useState("");
  const [message, setMessage] = useState("");

  function clearForm() {
    setPassword("");
    setMessage("");
    setMessage("");
  }

  async function getData() {
    const res = await window.api.mainThread("get/networks");
    // console.log(res);
    if (res.data) {
      console.log("set the networks");
      setNetworks(res.data);
    }
    if (!res.data) {
      setMessage(res.message);
    }
    return res;
  }
  useEffect(() => {
    getData();
  }, []);

  /**
   * @param {:Array} netArr array of wifi objects
   * @returns array of ssid names & pushes blank selector as first item
   */
  const networkNames = netArr => {
    let list;
    if (netArr) {
      list = netArr.map((net, idx) => {
        return (
          <option key={idx + 1} value={net.ssid}>
            {net.ssid}
          </option>
        );
      });
      const defaultOption = <option key={0}> -- select a network -- </option>;
      return [defaultOption, ...list];
    }
    return [];
  };

  const handleChange = e => {
    const select = e.target.value;
    setNetSelect(select);
  };

  const submit = async () => {
    clearForm();
    // invoke login
    const res = await window.api.mainThread("connect/wifi", {
      ssid: netSelect,
      password,
    });
    return res;
  };

  return {
    submit,
    handleChange,
    netSelect,
    password,
    setPassword,
    networks,
    getData,
    networkNames,
    message,
    setMessage,
  };
}
