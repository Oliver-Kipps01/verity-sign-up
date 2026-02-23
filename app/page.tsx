"use client";

import { useState, useEffect } from "react";
import { SuccessView } from "@/components/SuccessView";
import {
  ShieldIcon,
  ArrowRightIcon,
  SparkleIcon,
  ChevronDownIcon,
  CheckIcon
} from "@/components/icons";

/* ─── Types ─────────────────────────────────────────── */
type FormData = {
  email: string;
  company: string;
  crm: string;
  dataPain: string;
  leadVolume: string;
  commitment: boolean;
};
type FormErrors = Partial<Record<keyof FormData, string>>;

/* ─── Data ───────────────────────────────────────────── */
const CRM_OPTIONS = ["HubSpot", "Salesforce", "Pipedrive", "Zoho", "Other"];
const PAIN_OPTIONS = [
  { value: "silent_drift", label: "Silent Drift", desc: "Schema changes breaking reports" },
  { value: "stale_records", label: "Stale Records", desc: 'The "Accountability Gap"' },
  { value: "human_error", label: "Human Error", desc: "Manual entry mistakes" },
  { value: "overwrites", label: "Overwrites", desc: "Team members clashing on records" },
];
const VOLUME_OPTIONS = ["<100", "100 – 1,000", "1,000+"];

/* ─── Helpers ────────────────────────────────────────── */
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function BetaPage() {
  const [form, setForm] = useState<FormData>({
    email: "", company: "", crm: "",
    dataPain: "", leadVolume: "", commitment: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const set = (field: keyof FormData, value: string | boolean) => {
    setForm(p => ({ ...p, [field]: value }));
    setErrors(p => { const n = { ...p }; delete n[field]; return n; });
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.email) e.email = "Work email is required.";
    else if (!isValidEmail(form.email)) e.email = "Please enter a valid email address.";
    if (!form.company) e.company = "Company name is required.";
    if (!form.crm) e.crm = "Please select your current CRM.";
    if (!form.dataPain) e.dataPain = "Please select your primary data pain.";
    if (!form.leadVolume) e.leadVolume = "Please select your monthly lead volume.";
    if (!form.commitment) e.commitment = "Please confirm your commitment.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setErrors({ email: data.error || "Submission failed. Please try again." });
      }
    } catch (err) {
      setErrors({ email: "Network error. Please check your connection." });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <SuccessView />;

  const inputBase = (hasError: boolean) =>
    `w-full bg-slate-50 border-2 py-4 px-6 text-base font-semibold text-slate-900 outline-none transition-all placeholder-slate-300 ${hasError
      ? "border-red-300 focus:ring-4 ring-red-100"
      : "border-transparent focus:border-blue-300 focus:ring-4 ring-blue-50"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%)" }}>

      <div className="w-full max-w-2xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)",
        }}>

        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest"
            style={{ background: "#eff6ff", color: "#3b82f6", border: "1px solid #bfdbfe" }}>
            <SparkleIcon size={13} />
            Private Beta
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2.5 rounded-2xl text-white"
              style={{ background: "#3b82f6", boxShadow: "0 8px 24px rgba(59,130,246,0.3)" }}>
              <ShieldIcon size={26} />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">Verity</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.1] mb-4">
            Help us kill the<br />Shadow Spreadsheet.
          </h1>
          <p className="text-slate-400 text-lg font-medium">
            Complete your enrollment in under 2&nbsp;minutes.
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-white rounded-[40px] p-8 sm:p-12 border border-slate-100"
            style={{ boxShadow: "0 24px 64px rgba(15,23,42,0.09)" }}>

            <div className="space-y-7">
              <div>
                <label htmlFor="f-email" className="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-3">
                  Work Email
                </label>
                <input
                  id="f-email"
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={e => set("email", e.target.value)}
                  className={inputBase(!!errors.email)}
                  style={{ borderRadius: 40 }}
                  autoComplete="email"
                />
                {errors.email && <p className="text-red-500 text-xs font-bold mt-2 ml-4">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="f-company" className="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-3">
                  Company Name
                </label>
                <input
                  id="f-company"
                  type="text"
                  placeholder="Acme Corp"
                  value={form.company}
                  onChange={e => set("company", e.target.value)}
                  className={inputBase(!!errors.company)}
                  style={{ borderRadius: 40 }}
                  autoComplete="organization"
                />
                {errors.company && <p className="text-red-500 text-xs font-bold mt-2 ml-4">{errors.company}</p>}
              </div>

              <div>
                <label htmlFor="f-crm" className="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-3">
                  Current CRM
                </label>
                <div className="relative">
                  <select
                    id="f-crm"
                    value={form.crm}
                    onChange={e => set("crm", e.target.value)}
                    className={`${inputBase(!!errors.crm)} appearance-none cursor-pointer pr-12`}
                    style={{ borderRadius: 40, color: form.crm ? "#0f172a" : "#cbd5e1" }}
                  >
                    <option value="" disabled>Select your CRM</option>
                    {CRM_OPTIONS.map(o => <option key={o} value={o} style={{ color: "#0f172a" }}>{o}</option>)}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                    <ChevronDownIcon />
                  </div>
                </div>
                {errors.crm && <p className="text-red-500 text-xs font-bold mt-2 ml-4">{errors.crm}</p>}
              </div>

              <div className="border-t border-slate-100 pt-1" />

              <fieldset>
                <legend className="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-4">
                  Primary Data Pain
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAIN_OPTIONS.map(opt => {
                    const sel = form.dataPain === opt.value;
                    return (
                      <label key={opt.value} className="flex items-start gap-4 p-5 cursor-pointer transition-all border-2"
                        style={{
                          borderRadius: 24,
                          borderColor: sel ? "#3b82f6" : "transparent",
                          background: sel ? "rgba(59,130,246,0.05)" : "#f8fafc",
                        }}>
                        <input type="radio" name="dataPain" value={opt.value} checked={sel}
                          onChange={e => set("dataPain", e.target.value)} className="sr-only" />
                        <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 transition-all"
                          style={{
                            borderColor: sel ? "#3b82f6" : "#cbd5e1",
                            background: sel ? "#3b82f6" : "transparent",
                          }}>
                          {sel && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div>
                          <span className="block font-bold text-sm" style={{ color: sel ? "#3b82f6" : "#334155" }}>
                            {opt.label}
                          </span>
                          <span className="block text-xs text-slate-400 mt-0.5 font-medium">
                            {opt.desc}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {errors.dataPain && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.dataPain}</p>}
              </fieldset>

              <fieldset>
                <legend className="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-4">
                  Monthly Lead Volume
                </legend>
                <div className="flex flex-wrap gap-3">
                  {VOLUME_OPTIONS.map(opt => {
                    const sel = form.leadVolume === opt;
                    return (
                      <label key={opt} className="flex items-center gap-3 px-6 py-4 cursor-pointer transition-all border-2 font-bold text-sm"
                        style={{
                          borderRadius: 40,
                          borderColor: sel ? "#3b82f6" : "transparent",
                          background: sel ? "rgba(59,130,246,0.05)" : "#f8fafc",
                          color: sel ? "#3b82f6" : "#475569",
                        }}>
                        <input type="radio" name="leadVolume" value={opt} checked={sel}
                          onChange={e => set("leadVolume", e.target.value)} className="sr-only" />
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 border-2 transition-all"
                          style={{
                            borderColor: sel ? "#3b82f6" : "#cbd5e1",
                            background: sel ? "#3b82f6" : "transparent",
                          }}>
                          {sel && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        {opt}
                      </label>
                    );
                  })}
                </div>
                {errors.leadVolume && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.leadVolume}</p>}
              </fieldset>

              <div className="border-t border-slate-100 pt-1" />

              <div>
                <label className="flex items-start gap-4 p-6 cursor-pointer transition-all border-2"
                  style={{
                    borderRadius: 24,
                    borderColor: form.commitment ? "#3b82f6" : "transparent",
                    background: form.commitment ? "rgba(59,130,246,0.05)" : "#f8fafc",
                  }}>
                  <input type="checkbox" checked={form.commitment}
                    onChange={e => set("commitment", e.target.checked)} className="sr-only" />
                  <div className="mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border-2 transition-all"
                    style={{
                      borderColor: form.commitment ? "#3b82f6" : "#cbd5e1",
                      background: form.commitment ? "#3b82f6" : "transparent",
                    }}>
                    {form.commitment && <CheckIcon size={14} className="text-white" />}
                  </div>
                  <div>
                    <span className="block font-bold text-sm leading-relaxed"
                      style={{ color: form.commitment ? "#3b82f6" : "#334155" }}>
                      I am ready to provide feedback on the Verity &ldquo;Gatekeeper&rdquo; logic this week.
                    </span>
                    <span className="block text-xs text-slate-400 mt-1 font-medium">
                      We&apos;ll schedule a session based on your availability.
                    </span>
                  </div>
                </label>
                {errors.commitment && <p className="text-red-500 text-xs font-bold mt-2 ml-4">{errors.commitment}</p>}
              </div>

              <button
                id="btn-join-beta"
                type="submit"
                disabled={submitting}
                className="btn-shine w-full py-5 text-white font-black text-sm uppercase tracking-widest transition-all"
                style={{
                  borderRadius: 40,
                  background: submitting ? "#94a3b8" : "#3b82f6",
                  boxShadow: submitting ? "none" : "0 8px 32px rgba(59,130,246,0.35)",
                  cursor: submitting ? "wait" : "pointer",
                  transform: submitting ? "none" : undefined,
                  border: "none",
                }}>
                <span className="flex items-center justify-center gap-3">
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enrolling…
                    </>
                  ) : (
                    <>Join the Beta <ArrowRightIcon size={18} /></>
                  )}
                </span>
              </button>
            </div>
          </div>
        </form>

        <p className="text-center text-xs text-slate-300 font-bold uppercase tracking-widest mt-8">
          By joining you agree to our terms of service
        </p>
      </div>
    </div>
  );
}
