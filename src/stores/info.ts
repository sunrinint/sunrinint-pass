import { persistentAtom, persistentMap } from "@nanostores/persistent";
import JSEncrypt from "jsencrypt";
import { computed, map } from "nanostores";
import { publicKey } from "../keys/pass";
import { encryptedUserInfo } from "./encinfo";

export type UserInfo = {
  name: string;
  division: string;
  email: string;
  date: string;
  barcode: string;
};

const DEFAULT_USER_INFO: UserInfo = {
  name: "",
  division: "",
  email: "",
  date: "",
  barcode: "",
};

export function getInfo(encrypted: string): UserInfo {
  const decrypted = decrypt(encrypted);
  if (!decrypted) return DEFAULT_USER_INFO;
  return JSON.parse(decrypted);
}

export const userInfo = computed([encryptedUserInfo], (encrypted): UserInfo => {
  if (encrypted === "") return DEFAULT_USER_INFO;
  const decrypted = decrypt(encrypted);
  if (!decrypted) return DEFAULT_USER_INFO;
  return JSON.parse(decrypted);
});

export const isEmpty = computed([encryptedUserInfo], () => {
  console.log(encryptedUserInfo.get());
  console.log(decrypt(encryptedUserInfo.get()));
  return encryptedUserInfo.get() === "" || !decrypt(encryptedUserInfo.get());
});

function decrypt(encrypted: string) {
  // const crypto = new JSEncrypt();
  // crypto.setPublicKey(publicKey);
  // return crypto.decrypt(encrypted);
  importRsaKey(publicKey);
  return "";
}

// from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function importRsaKey(pem: string) {
  // fetch the part of the PEM string between header and footer
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length - 1
  );
  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  return window.crypto.subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );
}
