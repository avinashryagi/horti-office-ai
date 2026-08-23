import ExcelJS from 'exceljs';
import { prisma } from '@/lib/prisma';

export async function generateHortiMIS() {
  const workbook = new ExcelJS.Workbook();
  
  // 1. Fetch real farmers from your Supabase database
  const farmers = await prisma.farmer.findMany();
  
  // 2. Create the "Consolidated MIS" Sheet
  const sheet = workbook.addWorksheet('Consolidated MIS');
  
  // Define professional headers
  sheet.columns = [
    { header: 'BID Number', key: 'bid', width: 20 },
    { header: 'Farmer Name', key: 'name', width: 25 },
    { header: 'Village', key: 'village', width: 20 },
    { header: 'Mobile', key: 'mobile', width: 15 },
    { header: 'Survey No', key: 'survey', width: 15 },
    { header: 'Area (Ha)', key: 'area', width: 15 },
  ];

  // 3. Add the real data from Supabase
  if (farmers.length === 0) {
    sheet.addRow({ name: 'No data found in database' });
  } else {
    farmers.forEach(f => {
      sheet.addRow({
        bid: f.bidNumber,
        name: f.name,
        village: f.village,
        mobile: f.mobile,
        survey: f.surveyNumber,
        area: f.landArea,
      });
    });
  }

  // 4. Professional Styling (Government Green Header)
  sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF2E7D32' }, 
  };

  return await workbook.xlsx.writeBuffer();
}