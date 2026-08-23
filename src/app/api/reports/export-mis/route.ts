import { NextResponse } from 'next/server';
import { generateHortiMIS } from '@/lib/excel-service';

export async function GET() {
  try {
    const buffer = await generateHortiMIS();
    
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename="Horti_Office_MIS_Report.xlsx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
  } catch (error) {
    console.error("Excel Error:", error);
    return NextResponse.json({ error: "Failed to generate Excel" }, { status: 500 });
  }
}