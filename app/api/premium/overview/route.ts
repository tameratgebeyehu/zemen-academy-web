import { callAppsScript, errorResponse, json, sessionToken } from "../_lib";

export async function GET(request: Request) {
  try {
    const token = sessionToken(request);
    const overview = await callAppsScript({
      action: "premiumOverview",
      token,
      includeEntitlement: true,
      includeCommerce: true,
    });
    return json({ ok: true, overview });
  } catch (error) {
    return errorResponse(error);
  }
}
