const wifi = require("node-wifi");

async function getNetworks() {
  wifi.init({ iface: null });
  return await wifi.scan();
}

async function connectWifi(ssid, password) {
  wifi.connect({ ssid, password });
}

module.exports = { getNetworks, connectWifi };

/* ---------- DATA SHAPE:
networks = [
    {
      ssid: '...',
      bssid: '...',
      mac: '...', // equals to bssid (for retrocompatibility)
      channel: <number>,
      frequency: <number>, // in MHz
      signal_level: <number>, // in dB
      quality: <number>, // same as signal level but in %
      security: 'WPA WPA2' // format depending on locale for open networks in Windows
      security_flags: '...' // encryption protocols (format currently depending of the OS)
      mode: '...' // network mode like Infra (format currently depending of the OS)
    },
    ...
];
*/
