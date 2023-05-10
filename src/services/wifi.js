const wifi = require("node-wifi");

async function getNetworks() {
  wifi.init({ iface: null });
  try {
    const net = await wifi.scan();
    if (net.length === 0) {
      const attempt2 = await wifi.scan();
      return { data: attempt2, message: "node-wifi.scan: Success" };
    }
    return { data: net, message: "node-wifi.scan: Success" };
  } catch (error) {
    return { data: null, message: "node-wifi.scan: Failure" };
  }
}

async function connectWifi(ssid, password) {
  try {
    const res = await wifi.connect({ ssid, password });
    console.log(res);
    const connection = await wifi.getCurrentConnections();
    console.log({ connection });
    const network = connection[0]?.ssid;
    if (!network) {
      return { data: false, message: "connection failed: check password" };
    }
    return { data: true, message: `connected to: ${network}` };
  } catch (error) {
    return { data: false, message: "connection failed: node-wifi error" };
  }
}

module.exports = { getNetworks, connectWifi };
