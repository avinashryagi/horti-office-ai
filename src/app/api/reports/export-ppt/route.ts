import { NextResponse } from 'next/server';
import { generateHortiPPT } from '@/lib/ppt-service';

export async function GET() {
  try {
    const buffer = await generateHortiPPT();
    
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename="Horti_Progress_Report.pptx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      },
    });
  } catch (error) {
    console.error("PPT Error:", error);
    return NextResponse.json({ error: "Failed to generate PPT" }, { status: 500 });
  }
}