/**  
   https://developer.chrome.com/articles/bluetooth/
   Blog For Dealing Bluetooth in browser
   */

const button = document.getElementById("getDetails");
const details = document.getElementById("details");

button.addEventListener("click", async () => {
  try {
    details.innerHTML = "connecting...";
    const device = await navigator.bluetooth.requestDevice({
      filters: [
        {
          services: ["battery_service"],
        },
      ],
    });

    let server = await device.gatt.connect();

    let batteryService = await server.getPrimaryService("battery_service");
    let character = await batteryService.getCharacteristic("battery_level");
    let value = await character.readValue();

    details.innerHTML = `
      Device Name - ${device.name}<br />
      Battery Level - ${value.getUint8(0)}%<br />

    `;
  } catch (err) {
    console.log(err);
    details.innerHTML = "";
    alert("An error occured while fetching device details");
  }
});
