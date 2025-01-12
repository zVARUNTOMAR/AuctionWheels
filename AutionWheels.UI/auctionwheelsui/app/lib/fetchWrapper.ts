import { auth } from "@/auth";

const baseUrl = process.env.API_URL;

async function handleResponse(response: Response) {
  const text = await response.text();

  // const data = text && JSON.parse(text);
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      message: response.statusText,
    };
    return error;
  }
}

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: await getHeaders(),
  };

  console.log(baseUrl + url);

  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function post(url: string, body: any) {
  const requestOptions = {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };

  const response = await fetch(baseUrl + url, requestOptions);

  return await handleResponse(response);
}

async function put(url: string, body: any) {
  const requestOptions = {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };
  const response = await fetch(baseUrl + url, requestOptions);

  return await handleResponse(response);
}

async function del(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: await getHeaders(),
  };

  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function getHeaders() {
  const session = await auth();
  const sessionObj = session as any;
  const headers = {
    "Content-type": "application/json",
  } as any;

  if (sessionObj != null && sessionObj.accessToken) {
    headers.Authorization = "Bearer " + sessionObj.accessToken;
  }

  return headers;
}

export const fetchWrapper = {
  get,
  post,
  put,
  del,
};
