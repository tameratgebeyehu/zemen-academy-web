"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MdCheck, MdContentCopy, MdLockOutline, MdLogout, MdRefresh, MdVerifiedUser } from "react-icons/md";

type PremiumPlan = {
  id: string;
  name: string;
  durationDays: number;
  priceEtb: number;
  badge?: string | null;
  description?: string | null;
};

type PaymentMethod = {
  id: string;
  name: string;
  accountName: string;
  accountNumber: string;
  instructions?: string | null;
};

type PremiumRequest = {
  id: string;
  requestCode: string;
  planId: string;
  amountEtb: number;
  paymentMethodId: string;
  senderName: string;
  paymentDate: string;
  status: "pending" | "under-review" | "approved" | "rejected" | "cancelled";
  reviewNote?: string;
};

type Entitlement = {
  isPremium: boolean;
  status: string;
  planId?: string | null;
  startedAt?: string | null;
  until?: string | null;
};

type Overview = {
  plans: PremiumPlan[];
  paymentMethods: PaymentMethod[];
  entitlement: Entitlement;
  request: PremiumRequest | null;
};

type ApiResult = { ok: boolean; error?: string; overview?: Overview; request?: PremiumRequest };
type PortalView = "checking" | "login" | "portal";
type Step = 1 | 2 | 3;

async function api(path: string, init?: RequestInit): Promise<ApiResult> {
  const response = await fetch(path, {
    ...init,
    headers: init?.body ? { "Content-Type": "application/json", ...init.headers } : init?.headers,
    credentials: "same-origin",
  });
  const result = await response.json() as ApiResult;
  if (!response.ok || !result.ok) throw new Error(result.error || "The request could not be completed.");
  return result;
}

function readableDate(value?: string | null) {
  if (!value) return "Not available";
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "Not available";
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function periodLabel(days: number) {
  if (days <= 31) return "30 days";
  if (days <= 92) return "90 days";
  return "1 year";
}

export function PremiumPortal() {
  const [view, setView] = useState<PortalView>("checking");
  const [overview, setOverview] = useState<Overview | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [planId, setPlanId] = useState("");
  const [methodId, setMethodId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadOverview = useCallback(async (quiet = false) => {
    if (!quiet) setBusy(true);
    try {
      const result = await api("/api/premium/overview");
      if (!result.overview) throw new Error("Premium information is unavailable.");
      setOverview(result.overview);
      setView("portal");
      setError("");
      setPlanId((current) => current || result.overview?.plans.find((plan) => plan.id === "premium-90")?.id || result.overview?.plans[0]?.id || "");
      setMethodId((current) => current || result.overview?.paymentMethods[0]?.id || "");
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Premium information is unavailable.";
      if (/sign in|session expired/i.test(message)) {
        setView("login");
        setOverview(null);
      } else {
        setError(message);
        setView((current) => current === "checking" ? "login" : current);
      }
    } finally {
      if (!quiet) setBusy(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadOverview(), 0);
    return () => window.clearTimeout(timer);
  }, [loadOverview]);

  const requestOpen = overview?.request && ["pending", "under-review"].includes(overview.request.status);
  useEffect(() => {
    if (!requestOpen) return;
    const timer = window.setInterval(() => void loadOverview(true), 30_000);
    return () => window.clearInterval(timer);
  }, [loadOverview, requestOpen]);

  const selectedPlan = useMemo(() => overview?.plans.find((plan) => plan.id === planId), [overview?.plans, planId]);
  const selectedMethod = useMemo(() => overview?.paymentMethods.find((method) => method.id === methodId), [methodId, overview?.paymentMethods]);

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/premium/login", { method: "POST", body: JSON.stringify({ email, password }) });
      setPassword("");
      await loadOverview(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Sign-in could not be completed.");
    } finally {
      setBusy(false);
    }
  }

  async function submitRequest(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedPlan || !selectedMethod || !confirmed || senderName.trim().length < 2) return;
    setBusy(true);
    setError("");
    try {
      await api("/api/premium/request", {
        method: "POST",
        body: JSON.stringify({ planId: selectedPlan.id, paymentMethodId: selectedMethod.id, senderName: senderName.trim() }),
      });
      setSenderName("");
      setConfirmed(false);
      setNotice("Your activation request was received. We will update this page automatically after verification.");
      await loadOverview(true);
      setStep(1);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The activation request could not be submitted.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    setBusy(true);
    try { await api("/api/premium/logout", { method: "POST" }); } catch { /* Cookie is cleared by the route. */ }
    setOverview(null);
    setView("login");
    setBusy(false);
  }

  async function copyAccountNumber() {
    if (!selectedMethod) return;
    try {
      await navigator.clipboard.writeText(selectedMethod.accountNumber);
      setNotice("Account number copied.");
    } catch {
      setNotice("Press and hold the account number to copy it.");
    }
  }

  if (view === "checking") {
    return <div className="portal-state" role="status"><span className="portal-spinner" /><b>Checking your account…</b><p>This normally takes only a moment.</p></div>;
  }

  if (view === "login") {
    return (
      <form className="premium-login" onSubmit={signIn}>
        <div className="portal-heading"><span>SECURE ACCOUNT</span><h2>Sign in to continue.</h2><p>Use the same email and password you use in the Zemen Academy app.</p></div>
        {error ? <div className="portal-alert error" role="alert">{error}</div> : null}
        <label><span>Email address</span><input type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label><span>Password</span><input type="password" autoComplete="current-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        <button className="portal-button primary" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in securely"}</button>
        <div className="portal-security"><MdLockOutline aria-hidden="true" /><span>Your password is sent securely for verification and is never stored by this website.</span></div>
        <a className="portal-help" href="/help#account">Need help with your account?</a>
      </form>
    );
  }

  if (!overview) return null;

  if (overview.entitlement?.isPremium) {
    const plan = overview.plans.find((item) => item.id === overview.entitlement.planId);
    return (
      <div className="premium-active-panel">
        <div className="premium-active-mark"><MdVerifiedUser aria-hidden="true" /></div>
        <span>ACTIVE PREMIUM ACCOUNT</span>
        <h2>You are already Premium.</h2>
        <p>Your complete learning library is ready in the Zemen Academy app. You do not need to submit another activation request.</p>
        <div className="premium-dates"><div><small>PLAN</small><b>{plan?.name || "Zemen Premium"}</b></div><div><small>START DATE</small><b>{readableDate(overview.entitlement.startedAt)}</b></div><div><small>EXPIRATION DATE</small><b>{overview.entitlement.until ? readableDate(overview.entitlement.until) : "No expiration"}</b></div></div>
        <div className="portal-actions"><button className="portal-button secondary" type="button" onClick={() => void loadOverview()} disabled={busy}><MdRefresh /> Refresh access</button><button className="portal-button quiet" type="button" onClick={() => void signOut()} disabled={busy}><MdLogout /> Sign out</button></div>
      </div>
    );
  }

  if (requestOpen && overview.request) {
    const requestPlan = overview.plans.find((item) => item.id === overview.request?.planId);
    const requestMethod = overview.paymentMethods.find((item) => item.id === overview.request?.paymentMethodId);
    const underReview = overview.request.status === "under-review";
    return (
      <div className="premium-status-panel">
        <div className="status-top"><div><span>{underReview ? "VERIFICATION IN PROGRESS" : "REQUEST RECEIVED"}</span><h2>{underReview ? "Your transfer is being checked." : "Your request is in the queue."}</h2></div><b className="status-pill">{underReview ? "Under review" : "Pending"}</b></div>
        <div className="status-track"><div className="done"><i><MdCheck /></i><b>Submitted</b></div><span className="done" /><div className={underReview ? "done" : ""}><i>2</i><b>Verification</b></div><span /><div><i>3</i><b>Premium</b></div></div>
        <div className="request-code"><div><small>REQUEST CODE</small><strong>{overview.request.requestCode}</strong></div><button type="button" onClick={() => navigator.clipboard.writeText(overview.request?.requestCode || "")}><MdContentCopy /> Copy</button></div>
        <div className="request-summary"><div><small>Plan</small><b>{requestPlan?.name || "Premium"}</b></div><div><small>Amount</small><b>{overview.request.amountEtb.toLocaleString()} ETB</b></div><div><small>Bank</small><b>{requestMethod?.name || "Selected bank"}</b></div><div><small>Submitted</small><b>{readableDate(overview.request.paymentDate)}</b></div></div>
        <p className="status-note">Keep the app installed. Premium access and the approval celebration will appear automatically after verification.</p>
        {notice ? <div className="portal-alert success" role="status">{notice}</div> : null}
        <div className="portal-actions"><button className="portal-button secondary" type="button" onClick={() => void loadOverview()} disabled={busy}><MdRefresh /> {busy ? "Checking…" : "Check status"}</button><button className="portal-button quiet" type="button" onClick={() => void signOut()} disabled={busy}><MdLogout /> Sign out</button></div>
      </div>
    );
  }

  return (
    <div className="premium-workspace">
      <div className="portal-toolbar"><div><span>ACTIVATE PREMIUM</span><b>Three simple steps</b></div><button type="button" onClick={() => void signOut()}><MdLogout /> Sign out</button></div>
      <div className="portal-progress" aria-label={`Step ${step} of 3`}><div className={step >= 1 ? "active" : ""}><i>1</i><span>Choose plan</span></div><b className={step >= 2 ? "active" : ""} /><div className={step >= 2 ? "active" : ""}><i>2</i><span>Transfer</span></div><b className={step >= 3 ? "active" : ""} /><div className={step >= 3 ? "active" : ""}><i>3</i><span>Submit</span></div></div>
      {error ? <div className="portal-alert error" role="alert">{error}</div> : null}
      {notice ? <div className="portal-alert success" role="status">{notice}</div> : null}

      {step === 1 ? <section className="portal-step"><div className="portal-heading"><span>STEP 01</span><h2>Choose your access period.</h2><p>Every plan unlocks the same Premium experience. Only the access period changes.</p></div><div className="web-plan-grid">{overview.plans.map((plan) => <button key={plan.id} type="button" className={plan.id === planId ? "selected" : ""} onClick={() => setPlanId(plan.id)}><div><b>{plan.name}</b>{plan.badge ? <em>{plan.badge}</em> : null}</div><small>{periodLabel(plan.durationDays)}</small><strong>{plan.priceEtb.toLocaleString()} <span>ETB</span></strong><p>{plan.description || "Complete Premium access."}</p><i>{plan.id === planId ? <><MdCheck /> Selected</> : "Choose plan"}</i></button>)}</div><button className="portal-button primary forward" type="button" disabled={!selectedPlan} onClick={() => setStep(2)}>Continue to bank details <span>→</span></button></section> : null}

      {step === 2 ? <section className="portal-step"><div className="portal-heading"><span>STEP 02</span><h2>Choose a bank and transfer.</h2><p>Transfer exactly <b>{selectedPlan?.priceEtb.toLocaleString()} ETB</b> using one of the verified accounts below.</p></div><div className="bank-select-grid">{overview.paymentMethods.map((method) => <button key={method.id} type="button" className={method.id === methodId ? "selected" : ""} onClick={() => setMethodId(method.id)}><i>{method.name.toLowerCase().includes("commercial") || method.id.toLowerCase().includes("cbe") ? "CBE" : "AB"}</i><span><b>{method.name}</b><small>Tap to select</small></span><em>{method.id === methodId ? <MdCheck /> : null}</em></button>)}</div>{selectedMethod ? <div className="bank-account-card"><div><span>ACCOUNT HOLDER</span><b>{selectedMethod.accountName}</b></div><div><span>ACCOUNT NUMBER</span><strong>{selectedMethod.accountNumber}</strong></div><button type="button" onClick={() => void copyAccountNumber()}><MdContentCopy /> Copy account number</button><aside><small>TRANSFER EXACTLY</small><b>{selectedPlan?.priceEtb.toLocaleString()} ETB</b><span>The submission date is recorded automatically.</span></aside></div> : <div className="portal-alert error">No active bank account is available. Do not transfer money yet.</div>}<div className="portal-nav"><button className="portal-button secondary" type="button" onClick={() => setStep(1)}>← Change plan</button><button className="portal-button primary" type="button" disabled={!selectedMethod} onClick={() => setStep(3)}>I completed the transfer →</button></div></section> : null}

      {step === 3 ? <form className="portal-step" onSubmit={submitRequest}><div className="portal-heading"><span>STEP 03</span><h2>Send one final detail.</h2><p>Enter the exact account-holder name shown on the transfer. If someone paid for you, enter their name.</p></div><div className="final-summary"><div><small>PLAN</small><b>{selectedPlan?.name}</b></div><div><small>AMOUNT</small><b>{selectedPlan?.priceEtb.toLocaleString()} ETB</b></div><div><small>BANK</small><b>{selectedMethod?.name}</b></div></div><label className="sender-field"><span>Bank account-holder name</span><input value={senderName} onChange={(event) => setSenderName(event.target.value)} maxLength={100} autoComplete="name" placeholder="Name shown on the transfer" required /></label><label className="portal-confirm"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /><span>I transferred the exact amount to the selected account and confirm that this name is correct.</span></label><div className="portal-nav"><button className="portal-button secondary" type="button" onClick={() => setStep(2)}>← Check bank details</button><button className="portal-button primary" type="submit" disabled={busy || !confirmed || senderName.trim().length < 2}>{busy ? "Submitting…" : "Send for verification"}</button></div></form> : null}
    </div>
  );
}
