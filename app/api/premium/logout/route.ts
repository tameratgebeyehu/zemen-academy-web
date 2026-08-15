import { assertSameOrigin, callAppsScript, errorResponse, expiredSessionCookie, json, sessionToken } from "../_lib";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const token = sessionToken(request);
    await callAppsScript({ action: "logout", token });
    return json({ ok: true }, 200, { "Set-Cookie": expiredSessionCookie(request) });
  } catch (error) {
    const response = errorResponse(error);
    response.headers.set("Set-Cookie", expiredSessionCookie(request));
    return response;
  }
}
