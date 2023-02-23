import { ApiService } from "./index";
import { PREORDER_PRICE } from "../constants";

const API_URL = process.env.NEXT_PUBLIC_NFT_API_URL;
const version = "v1";

export async function getCurrencyVal(noOfNft) {
  const totalPrice = noOfNft * PREORDER_PRICE;
  try {
    const contractInfo = await ApiService(
      `${API_URL}eth-price?currency=EUR&price=${totalPrice}`,
      "get"
    );

    return contractInfo.data;
  } catch (e) {
    console.log(e);
  }
}

export async function payment(formValues) {
  const res = await ApiService(
    `${API_URL}${version}/payment`,
    "post",
    formValues
  );

  return res.data;
}

export async function paymentSuccess(customerId, paymentId) {
  const data = {
    customer: customerId,
    payment: paymentId,
  };

  const res = await ApiService(
    `${API_URL}${version}/payment/success`,
    "post",
    data
  );
  return res.data;
}

export async function ethPaymentSuccess(promocode, tokens, wallet, tsx) {
  const getIpAddress = await fetch("https://geolocation-db.com/json/");

  const resIp = await getIpAddress.json();

  const data = {
    promocode,
    tokens,
    wallet,
    tsxHash: tsx,
    ipAddress: resIp.IPv4,
  };

  const res = await ApiService(
    `${API_URL}${version}/payment/eth`,
    "post",
    data
  );
  return res.data;
}

export async function checkIfWhitelist(email) {
  const res = await ApiService(`${API_URL}whitelist`, "post", {
    email,
  });

  return res.data.amount;
}

export async function validatePromocode(promocode) {
  const res = await ApiService(`${API_URL}verify-promocode`, "post", {
    promocode,
  });

  return res.data.success;
}

export async function validateWalletAddress(walletAddress) {
  const res = await ApiService(
    `${API_URL}${version}/eth-token-validate/${walletAddress}`,
    "get"
  );
  return res.data.success;
}

export async function soldout() {
  const res = await ApiService(`${API_URL}sold-out`, "get");
  return res.data["sold-out"];
}

export async function saveEmailAddress(email) {
  const res = await ApiService(
    `${API_URL}${version}/user/later-signup`,
    "post",
    {
      email,
    }
  );

  console.log("res", res);
  return res.message;
}
