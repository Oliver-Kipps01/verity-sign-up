"use client";

import { ShieldIcon, CheckIcon } from "./icons";

export function SuccessView() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6"
            style={{ background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%)" }}>
            <div className="w-full max-w-lg text-center animate-scale-in">
                <div className="bg-white rounded-[40px] shadow-2xl p-12 relative overflow-hidden border border-slate-100">
                    {/* Decorative blobs */}
                    <div style={{
                        position: "absolute", top: -80, right: -80, width: 240, height: 240,
                        background: "radial-gradient(circle, rgba(134,239,172,0.25) 0%, transparent 70%)",
                        borderRadius: "50%",
                    }} />
                    <div style={{
                        position: "absolute", bottom: -64, left: -64, width: 192, height: 192,
                        background: "radial-gradient(circle, rgba(147,197,253,0.2) 0%, transparent 70%)",
                        borderRadius: "50%",
                    }} />

                    <div className="relative">
                        {/* Icon cluster */}
                        <div className="mx-auto mb-8 relative" style={{ width: 96, height: 96 }}>
                            <div className="animate-ping-slow absolute inset-0 rounded-full"
                                style={{ background: "rgba(34,197,94,0.15)" }} />
                            <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, #4ade80 0%, #10b981 100%)", boxShadow: "0 16px 40px rgba(34,197,94,0.3)" }}>
                                <ShieldIcon size={38} className="text-white" />
                            </div>
                            {/* Checkmark badge */}
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full flex items-center justify-center"
                                style={{ width: 30, height: 30, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                                <CheckIcon size={16} className="text-emerald-500" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                            Welcome to the inner circle.
                        </h1>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-sm mx-auto mb-10">
                            We&apos;re fighting the accountability gap one record at a time.
                            <strong className="text-slate-700 font-semibold"> Check your inbox</strong> for your login details.
                        </p>

                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest"
                            style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}>
                            <CheckIcon size={14} className="text-emerald-600" />
                            You&apos;re on the list
                        </div>
                    </div>
                </div>
                <p className="text-xs text-slate-300 font-bold uppercase tracking-widest mt-8">Verity Beta Program</p>
            </div>
        </div>
    );
}
