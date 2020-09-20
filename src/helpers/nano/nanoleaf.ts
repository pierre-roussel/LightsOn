// Vendor
import { NetworkInfo } from "react-native-network-info";

// Internal
import { NanoLeafState } from "./types";
import { NANOLEAF_PORT } from "./constants";

export class NanoLeaf {
  address: string;
  authToken: string;

  constructor(settings: { address: string; authToken?: string }) {
    const { address, authToken } = settings;
    this.address = address;
    this.authToken = authToken || "2J36ge97WDAku8pKwUK7evVUgMRkYK9N";
  }

  getAddress = () => {
    return this.address;
  };

  getAuthToken = () => {
    return this.authToken;
  };

  /**
   * Starts the pairing process with the nanoleaf and returns an Auth token
   */
  pair = async (): Promise<string | null> => {
    const { address } = this;
    const url = `http://${address}:${NANOLEAF_PORT}/api/v1/new`;
    const response = await fetch(url, { method: "POST" });

    if (response.status !== 200) {
      console.log("Couldn't pair the device");
      return null;
    }

    const json = await response.json();

    if (!json) {
      console.log("Couldn't pair the device");
      return null;
    }

    const { auth_token: authToken } = json;
    console.log("Auth Token is ", authToken);

    this.authToken = authToken;

    return authToken;
  };

  /**
   * Gets all the nanoleaf informations
   */
  getNanoInfos = async (): Promise<NanoLeafState | null> => {
    const { address, authToken } = this;
    const url = `http://${address}:${NANOLEAF_PORT}/api/v1/${authToken}`;
    const response = await fetch(url);

    if (response.status !== 200) {
      console.log("Couldn't fetch the infos");
      return null;
    }

    const json = await response.json();

    if (!json) {
      console.log("Couldn't fetch the infos");
      return null;
    }

    return json as NanoLeafState;
  };

  /**
   * Sets the nanoleaf state
   */
  setNanoState = async (params: { [key: string]: any }): Promise<boolean> => {
    const { address, authToken } = this;
    const url = `http://${address}:${NANOLEAF_PORT}/api/v1/${authToken}/state`;
    const headers: Headers = new Headers({
      "Content-Type": "application/json",
    });

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(params),
    });

    if (response.status > 299 && response.status < 200) {
      console.log("Error setting state");
      return false;
    }

    return true;
  };

  /**
   * Sets the lights state
   */
  setLightsState = async (on: boolean) => {
    return await this.setNanoState({ on: { value: on } });
  };
}

/**
 * Find all the nanoleafs in the network
 */
const findNanoleafs = async (port = 16021) => {
  // const ip = await NetworkInfo.getIPV4Address();
  // console.log(ip);

  //if (!ip) return [];

  // const splitIp = ip.split(".");
  const splitIp = "192.168.1.1".split(".");

  const ipWithoutHost = splitIp.slice(0, -1);
  const nanoIps: string[] = [];

  await Promise.all(
    Array(254)
      .fill(1)
      .map(async (_val, index) => {
        const address = `http://${ipWithoutHost.join(".")}.${index}:${port}`;

        return fetch(`${address}/api/v1/`)
          .then((res) => {
            console.log("fetching : ", address);
            if (res.status === 401) return nanoIps.push(address);
          })
          .catch((e) => console.log("Error: ", address));
      })
  );

  // for (let i = 0; i < 255; i += 1) {
  //   const address = `http://${ipWithoutHost.join(".")}.${i}:${port}`;
  //   setTimeout(
  //     () =>
  //       setTimeout(async () => {
  //         await fetch(`${address}/api/v1/`)
  //           .then((res) => {
  //             console.log("fetching : ", address);
  //             if (res.status === 401) return nanoIps.push(address);
  //           })
  //           .catch((e) => console.log("Error: ", address));
  //       }, 100),
  //     100
  //   );
  // }

  console.log(nanoIps);

  return nanoIps;
};

export { findNanoleafs };
