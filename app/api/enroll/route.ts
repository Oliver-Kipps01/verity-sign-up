import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Console log for visibility during development
        console.log("New Beta Enrollment received:", body);

        // Save to Supabase 'enrollments' table
        const { error } = await supabase
            .from('enrollments')
            .insert([
                {
                    email: body.email,
                    company: body.company,
                    crm: body.crm,
                    data_pain: body.dataPain,
                    lead_volume: body.leadVolume,
                    commitment: body.commitment,
                    created_at: new Date().toISOString(),
                }
            ]);

        if (error) {
            console.error("Supabase Error:", error);
            throw new Error(error.message);
        }

        return NextResponse.json({ success: true, message: "Enrolled successfully" });
    } catch (error: any) {
        console.error("Enrollment error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Identification failed" },
            { status: 400 }
        );
    }
}
