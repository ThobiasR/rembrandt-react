const API_KEY_NFTPORT = process.env.API_KEY_NFTPORT;

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  console.log("response", response);
  return response.json().then((data) => {
    console.log("data", data);
    throw data.errors || data.message;
  });
}

export const ApiService = async (url, type, data, isFile) => {
  const headerOptions = {
    Authorization: API_KEY_NFTPORT,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "access-control-request-headers": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "application/json",
  };
  const options = {};

  if (isFile) {
    delete headerOptions["Content-Type"];
  }

  const headers = new Headers(headerOptions);
  options.method = type || "get";
  options.headers = headers;

  if (type === "post" || type === "put") {
    options.body = JSON.stringify(data);
  }

  if (isFile) {
    options.body = data;
  }

  const res = await fetch(url, options);
  return checkStatus(res);
};
