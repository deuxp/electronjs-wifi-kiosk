// import { useState } from "react";
// import wifi from "node-wifi";
const wifi = require("node-wifi");

//TODO: MOVE THIS TO electron backend and ipc to the handler
async function getWifi() {
  // Initialize wifi module
  // Absolutely necessary even to set interface to null
  wifi.init({
    iface: null, // network interface, choose a random wifi interface if set to null
  });

  // Scan networks
  async function scanNetworks() {
    return new Promise((resolve, reject) => {
      wifi.scan((error, networks) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          // console.log(networks);
          resolve(networks);
        }
      });
    });
  }
  const networks = await scanNetworks();
  return networks;
}

module.exports = { getWifi };

/* DATA SHAPE:

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
