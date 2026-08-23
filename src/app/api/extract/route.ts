import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("🚀 RUNNING IN DEMO MODE - Simulating AI extraction for:", file.name);

    // This is simulated data. In the real version, this comes from OpenAI.
    // This allows you to continue building the app for FREE.
    const demoData = {
      personal: { 
        fullName: "Rajesh Patil", 
        mobile: "9900112233", 
        address: "Village Kudal, Jewargi Taluka, Kalaburagi" 
      },
      land: { 
        surveyNumber: "45/B", 
        area: "1.2 Hectares", 
        village: "Kudal", 
        hobli: "Jewargi" 
      },
      bank: { 
        accountHolder: "Rajesh Patil", 
        accountNumber: "123456789012", 
        ifsc: "SBIN0004567", 
        bankName: "State Bank of India" 
      },
    };

    return NextResponse.json({ success: true, data: demoData });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Demo Mode Error" }, { status: 500 });
  }
}