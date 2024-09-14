// generatePdf.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const fontPath = path.join(__dirname, 'fonts', 'Lora-Regular.ttf'); // Ensure the font file exists in this path
const tableTop = 100;
const tableLeft = 50;

const calculatePosition = (i, colWidth) => {
    console.log(colWidth);
    let currentPosition = 0;
    for (let index = 0; index < i; index++) {
        currentPosition += colWidth[index];
    }
    
    return currentPosition;
}

const headerBuilder = (doc, headers, colWidth) => {
    const tableTop = 100;
    const tableLeft = 50;

    headers.forEach((h, i) => {
        doc.text(h, tableLeft + calculatePosition(i, colWidth), tableTop)
    })

    doc.moveDown(0.5);
    return doc;
}

const rowBuilder = (doc, row, columns, y, colWidth) => {
    columns.forEach((r, i) => {
        doc.text(typeof row[r] === 'number' ? Math.fround(row[r]).toFixed(2) : row[r], tableLeft + calculatePosition(i, colWidth), y)
    })

    doc.moveDown(0.5);
    return doc;
}

const dataBuilder = (doc, tableData, rowKeys, colWidth) => {
    let rowHeight = 20;
    tableData.forEach((row, i) => {
        const y = tableTop + 25 + (i * rowHeight);

        doc = rowBuilder(doc, row, rowKeys, y, colWidth);

        // Draw horizontal line for each row
        doc.moveTo(tableLeft, y + 15)
           .lineTo(tableLeft + 450, y + 15)
           .stroke();
    });
    return doc;
}

// Generate PDF
const pdf = async (data, title, headers, rowkeys, fileName, colWidth) => {
    console.log(data);
    
    let doc = new PDFDocument({
        margins: {
            right: 10
        }
    });
    // Save the PDF file
    const writeStream = fs.createWriteStream(`./reports/${fileName}`);
    doc.pipe(writeStream);

    // Load a font that supports Unicode (such as Vietnamese)
    doc.font(fontPath);

    // Set name header for file
    doc.text('© PhamPhong 24550034 @ BTTH4', 400, 0);
    doc.text('', 0, 0);
    doc.moveDown(4);


    // Title of the PDF
    doc.fontSize(16).text(title, { align: 'center', underline: true });
    doc.moveDown();

    // Table headers
    doc.fontSize(12);

    

    // Draw the table header
    doc = headerBuilder(doc, headers, colWidth);

    // Draw horizontal line for table header
    doc.moveTo(tableLeft, tableTop + 15)
       .lineTo(tableLeft + 450, tableTop + 15)
       .stroke();

    // Populate the table with data
    doc = dataBuilder(doc, data, rowkeys, colWidth)

    // Add footer section (city, date, and signature)
    doc.moveDown(2);
    doc.moveTo(tableLeft, doc.y)
       .lineTo(tableLeft, doc.y);
    doc.text('Tp.HCM, ngày 01/01/2021', 380);
    doc.text('Người lập', 420);
    doc.text('Họ Tên SV', 420);

    // Finalize the PDF and end the stream
    doc.end();

    writeStream.on('finish', () => {
        console.log('PDF generated successfully!');
    });
}

module.exports = { pdf };
