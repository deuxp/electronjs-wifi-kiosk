const wifi = require("node-wifi");

async function getNetworks() {
  wifi.init({ iface: null });
  return await wifi.scan();
}

async function connectWifi(ssid, password) {
  wifi.connect({ ssid, password });
}

module.exports = { getNetworks, connectWifi };
