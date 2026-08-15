const SESSION_COOKIE = "zemen_web_session";
const MAX_BODY_BYTES = 12_000;
const DEFAULT_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwr1866LYX8qa4o4zWSRdbSqhaLVmNP8SDfUjikijzZv4XQj8MkojIED6pZwzFmt3uQ/exec";

type AppsScriptEnvelope<T> =
  | { ok: true; data: T }
  | { ok: false; error?: string };

export class PortalError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return;
  if (new URL(origin).host !== new URL(request.url).host) {
    throw new PortalError("This request could not be verified. Refresh the page and try again.", 403);
  }
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) throw new PortalError("The request is too large.", 413);
  try {
    const value = await request.json();
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return value as Record<string, unknown>;
  } catch {
    throw new PortalError("The submitted information could not be read.");
  }
}

function appsScriptUrl() {
  const value = (process.env.ZEMEN_APPS_SCRIPT_URL || process.env.EXPO_PUBLIC_APPS_SCRIPT_URL || DEFAULT_APPS_SCRIPT_URL).trim();
  if (!value || !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/i.test(value)) {
    throw new PortalError("Premium activation is temporarily unavailable. Please try again later.", 503);
  }
  return value;
}

export async function callAppsScript<T>(payload: Record<string, unknown>): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18_000);
  try {
    const response = await fetch(appsScriptUrl(), {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) throw new PortalError("Zemen Academy could not be reached. Please try again.", 502);
    const envelope = await response.json() as AppsScriptEnvelope<T>;
    if (!envelope.ok) throw new PortalError(envelope.error || "The request could not be completed.");
    return envelope.data;
  } catch (error) {
    if (error instanceof PortalError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new PortalError("The request took too long. Check your connection and try again.", 504);
    }
    throw new PortalError("Zemen Academy could not be reached. Please try again.", 502);
  } finally {
    clearTimeout(timeout);
  }
}

export function sessionToken(request: Request): string {
  const cookie = request.headers.get("cookie") || "";
  const encoded = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${SESSION_COOKIE}=`))?.slice(SESSION_COOKIE.length + 1);
  if (!encoded) throw new PortalError("Sign in to continue.", 401);
  try {
    const token = decodeURIComponent(encoded);
    if (!/^[\w-]{40,160}$/.test(token)) throw new Error();
    return token;
  } catch {
    throw new PortalError("Your session expired. Sign in again.", 401);
  }
}

export function sessionCookie(token: string, request: Request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict${secure}`;
}

export function expiredSessionCookie(request: Request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${SESSION_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${secure}`;
}

export function json(data: unknown, status = 200, headers?: HeadersInit) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

export function errorResponse(error: unknown) {
  const portalError = error instanceof PortalError
    ? error
    : new PortalError("The request could not be completed. Please try again.", 500);
  return json({ ok: false, error: portalError.message }, portalError.status);
}
