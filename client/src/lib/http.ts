type CustomOpts = RequestInit & {
  baseUrl?: string;
  withCredentials?: boolean; // Add withCredentials option
};

const request = async <Response>(
  method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET",
  url: string,
  body: any | undefined,
  options: CustomOpts | undefined
) => {
  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;
  const { baseUrl: _baseUrl, withCredentials, ...headers } = options ?? {};
  let fetchOptions: RequestInit = {
    headers: {
      ...(headers.headers ?? {}),
    },
    credentials: withCredentials ? "include" : "same-origin",
  };
  if (method !== "GET") {
    fetchOptions.method = method;
    fetchOptions.body = body ?? {};
  }
  const result = await fetch(fullUrl, fetchOptions);
  const data: Response = await result.json();

  return data;
};
const http = {
  get<Response>(url: string, options: CustomOpts | undefined) {
    return request<Response>("GET", url, undefined, options);
  },
  put<Response>(url: string, body: any, options: CustomOpts | undefined) {
    return request<Response>("PUT", url, JSON.stringify(body), options);
  },
  patch<Response>(url: string, body: any, options: CustomOpts | undefined) {
    return request<Response>("PATCH", url, JSON.stringify(body), options);
  },
  post<Response>(url: string, body: any, options: CustomOpts | undefined) {
    return request<Response>("POST", url, JSON.stringify(body), options);
  },
  delete<Response>(url: string, body: any, options: CustomOpts | undefined) {
    return request<Response>("DELETE", url, JSON.stringify(body), options);
  },
};
class SessionToken {
  private token = "";
  get value() {
    return this.token;
  }
  set value(token: string) {
    if (typeof window === undefined) {
      throw new Error("Cannot set token in server side");
    }
    this.token = token;
  }
}
export const sessionToken = new SessionToken();
export default http;
