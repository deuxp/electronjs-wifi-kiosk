const wifi = require("node-wifi");

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

async function getNetworks() {
  wifi.init({ iface: null });
  await sleep(1000);
  try {
    let res = await wifi.scan();

    if (res?.length === 0) {
      await sleep(1000);
      console.log("loop");
      res = await wifi.scan();
    }
    return { data: res, message: "node-wifi.scan" };
  } catch (error) {
    return { data: null, message: "error: refresh wifi" };
  }
  // return new Promise((resolve, reject) => {
  //   wifi
  //     .scan()
  //     .then(res => {
  //       return res;
  //     })
  //     .then(res => {
  //       if (!res?.length) {
  //         reject({ data: null, message: "error: refresh wifi" });
  //       }
  //       return res;
  //     })
  //     .then(res => {
  //       resolve({ data: res, message: "wifi init: success" });
  //     })
  //     .catch(error => {
  //       reject({ data: null, message: "problem: check wifi" });
  //     });
  // });
}

async function connectWifi(ssid, password) {
  try {
    const res = await wifi.connect({ ssid, password });
    console.log(res);
    const connection = await wifi.getCurrentConnections();
    // console.log({ connection });
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
