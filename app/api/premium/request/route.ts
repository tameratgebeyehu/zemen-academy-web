import { assertSameOrigin, callAppsScript, errorResponse, json, readJson, sessionToken } from "../_lib";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const token = sessionToken(request);
    const body = await readJson(request);
    const planId = String(body.planId || "").trim();
    const paymentMethodId = String(body.paymentMethodId || "").trim();
    const senderName = String(body.senderName || "").replace(/\s+/g, " ").trim();
    if (!/^[\w-]{2,80}$/.test(planId) || !/^[\w-]{2,80}$/.test(paymentMethodId)) {
      return json({ ok: false, error: "Choose a plan and bank before continuing." }, 400);
    }
    if (senderName.length < 2 || senderName.length > 100 || /^[=+\-@]/.test(senderName)) {
      return json({ ok: false, error: "Enter the account-holder name shown on the transfer." }, 400);
    }
    const result = await callAppsScript({
      action: "createPremiumRequest",
      token,
      planId,
      paymentMethodId,
      senderName,
    });
    return json({ ok: true, ...result as object });
  } catch (error) {
    return errorResponse(error);
  }
}
