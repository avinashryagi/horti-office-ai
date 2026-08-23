import { NextResponse } from 'next/server';
import { generateHortiPPT } from '@/lib/ppt-service';

export async function GET() {
  try {
    // 1. Generate the PPT buffer from the service
    const buffer = await generateHortiPPT();

    // 2. FIX: Wrap the buffer in a Blob. 
    // This solves the TS2345 error regarding 'BodyInit'
    const pptBlob = new Blob([buffer]);

    // 3. Return the response with the correct headers for a PPTX file
    return new NextResponse(pptBlob, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename="Horti_Progress_Report.pptx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      },
    });
  } catch (error) {
    console.error("PPT Error:", error);
    return NextResponse.json(
      { error: "Failed to generate PPT" }, 
      { status: 500 }
    );
  }
}