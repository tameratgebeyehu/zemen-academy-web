import { assertSameOrigin, callAppsScript, errorResponse, json, readJson, sessionCookie } from "../_lib";

type LoginResult = { token: string; user: { id: string; name: string; email: string; isPremium: boolean } };

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const body = await readJson(request);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8 || password.length > 128) {
      return json({ ok: false, error: "Check your email and password, then try again." }, 400);
    }
    const result = await callAppsScript<LoginResult>({ action: "webLogin", email, password });
    return json(
      { ok: true, user: result.user },
      200,
      { "Set-Cookie": sessionCookie(result.token, request) },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
