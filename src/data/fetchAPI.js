import { checkResponse } from "./utils";

const status_url = 'ajax/get/index/status';
const playback_url = 'ajax/get/playback/playback';
const mon_url = 'ajax/get/monitor';


export async function fetchGeneralData(devices) {
  let arr = [];
  await Promise.all(
    devices.map(d =>
      fetch(`${d.ipaddress}${status_url}`)
      .then(response => checkResponse(response))
      .then(json => {
        // inject ID
        json.id = d.id;
        // inject timestamp
        json.lastSeen = new Date();
        arr.push(json);
      })
    ))
  return(arr);
}

export async function fetchPlaybackData(ipaddress) {
  return await Promise.all([
    fetch(`${ipaddress}${playback_url}`)
    .then(response => checkResponse(response))
  ])
}

export async function fetchNetworkData(ipaddress, protocol) {
  switch (protocol) {
    case 'tcp':
      return await Promise.all([
        fetch(`${ipaddress}${mon_url}/tcp/in`)
        .then(response => checkResponse(response)),
        fetch(`${ipaddress}${mon_url}/tcp/out`)
        .then(response => checkResponse(response)),
      ]);
      break;
    case 'udp':
      return await Promise.all([
        fetch(`${ipaddress}${mon_url}/udp/in`)
        .then(response => checkResponse(response)),
        fetch(`${ipaddress}${mon_url}/udp/out`)
        .then(response => checkResponse(response)),
      ]);
      break;
    case 'osc':
      return await Promise.all([
        fetch(`${ipaddress}${mon_url}/osc/in`)
        .then(response => checkResponse(response)),
        fetch(`${ipaddress}${mon_url}/osc/out`)
        .then(response => checkResponse(response)),
      ]);
      break;
    case 'rs232':
      return await Promise.all([
        fetch(`${ipaddress}${mon_url}/rs232/in`)
        .then(response => checkResponse(response)),
        fetch(`${ipaddress}${mon_url}/rs232/out`)
        .then(response => checkResponse(response)),
      ]);
      break;

    default:
      return null;
      break;
  }

}