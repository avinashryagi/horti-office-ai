import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { personal, land, bank } = body;

    console.log("Saving real data to Supabase...");

    // 1. Create the Farmer in the database
    const farmer = await prisma.farmer.create({
      data: {
        id: `farm_${Date.now()}`,
        bidNumber: `BID/${Math.floor(Math.random() * 1000000)}`,
        name: personal.fullName,
        mobile: personal.mobile,
        aadhaarMasked: "XXXX-XXXX-1234",
        bankAccountMask: bank.accountNumber,
        ifsc: bank.ifsc,
        village: land.village,
        surveyNumber: land.surveyNumber,
        landArea: parseFloat(land.area) || 0,
      },
    });

    // 2. Create a linked Application
    await prisma.application.create({
      data: {
        id: `app_${Date.now()}`,
        farmerId: farmer.id,
        schemeName: "General Application",
        status: "APPROVED",
        subsidyAmount: 5000,
      },
    });

    console.log("✅ Successfully saved to Supabase!");
    return NextResponse.json({ success: true, farmerId: farmer.id });
  } catch (error: any) {
    console.error("DATABASE ERROR:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Internal Server Error" 
    }, { status: 500 });
  }
}