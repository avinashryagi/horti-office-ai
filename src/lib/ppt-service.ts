import pptxgen from 'pptxgenjs';

/**
 * Interface for Table Cell to satisfy TypeScript
 */
interface TableCell {
  text: string;
  options?: any;
}

interface TableRow {
  cells: TableCell[];
}

export async function generateHortiPPT() {
  // 1. Create a new Presentation
  const pres = new pptxgen();

  // 2. Add a Title Slide
  const titleSlide = pres.addSlide();
  titleSlide.addText("Horti Office AI Automation", { 
    x: 1, y: 1, w: '80%', h: 1, 
    fontSize: 36, color: '363636', align: 'center', bold: true 
  });
  titleSlide.addText("Progress & Farmer Verification Report", { 
    x: 1, y: 2, w: '80%', h: 0.5, 
    fontSize: 20, color: '666666', align: 'center' 
  });

  // 3. Prepare Sample Data (In reality, you'll fetch this from your DB)
  const rawData: string[][] = [
    ["Farmer Name", "Village", "Crop", "Status"],
    ["Ramesh Kumar", "Village A", "Mango", "Verified"],
    ["Suresh Patil", "Village B", "Pomegranate", "Pending"],
    ["Anita Devi", "Village A", "Mango", "Approved"],
  ];

  // 🛠️ FIX 1: Convert raw string[][] into TableRow[] format
  // This solves the error: "Argument of type 'string[][]' is not assignable to parameter of type 'TableRow[]'"
  const tableRows: TableRow[] = rawData.map((row) => ({
    cells: row.map((cellText) => ({
      text: cellText,
    })),
  }));

  // 4. Add Data Slide
  const dataSlide = pres.addSlide();
  dataSlide.addText("Farmer Processing Status", { x: 0.5, y: 0.5, fontSize: 24, bold: true });

  // Add the table using the fixed tableRows
  dataSlide.addTable(tableRows, { 
    x: 0.5, y: 1.2, w: 9, 
    border: { pt: 1, color: 'CCCCCC' },
    fill: { color: 'F1F1F1' },
    fontSize: 12 
  });

  // 🛠️ FIX 2: Use the correct WriteProps object
  // This solves the error: "Type '"blob"' has no properties in common with type 'WriteProps'"
  // In Node.js/Vercel environment, we use 'nodebuffer' to get a buffer
  const buffer = await pres.write({ type: 'nodebuffer' });

  return buffer;
}