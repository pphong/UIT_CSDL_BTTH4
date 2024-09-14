// index.js
const { fetchData } = require("./db");
const generatePdf = require("./genpdf");

async function exportDataToPdf() {
  // Fetch data from SQL Server
  // Generate PDF for Bai 1.a
  query1a = `SELECT dtsv.MSDT as MSDT, TENDT as TEN_DE_TAI, gv.TENGV as TEN_GVHD, gv.MSGV
FROM [PhamPhong_BTTH2_QLDT].[dbo].[SINHVIEN] AS sv
LEFT JOIN [PhamPhong_BTTH2_QLDT].[dbo].[SV_DETAI] as dtsv ON sv.MSSV = dtsv.MSSV
LEFT JOIN [PhamPhong_BTTH2_QLDT].[dbo].[DETAI] as dt ON dtsv.MSDT = dt.MSDT
LEFT JOIN [PhamPhong_BTTH2_QLDT].[dbo].[GV_HDDT] as gvhddt ON gvhddt.MSDT = dt.MSDT
LEFT JOIN [PhamPhong_BTTH2_QLDT].[dbo].[GIAOVIEN] as gv ON gv.MSGV = gvhddt.MSGV`;
  const data1a = await fetchData(query1a);
  const title = "DANH SÁCH ĐỀ TÀI";
  const colWidth = [80, 170, 170];
  const headers = ["MSDT", "TÊN ĐỀ TÀI", "TÊN GVHD", "MS GVHD"];
  const rowkeys = ["MSDT", "TEN_DE_TAI", "TEN_GVHD", "MSGV"];
  const fileName = "24550034_PhamPhong_Bai_1_a.pdf";
  await generatePdf.pdf(data1a, title, headers, rowkeys, fileName, colWidth);

  // Generate PDF for Bai 1.b
  query1b = `SELECT hd.MSHD, hd.PHONG, dt.TENDT, dt.MSDT, hddt.QUYETDINH FROM [PhamPhong_BTTH2_QLDT].[dbo].[HOIDONG] as hd
  LEFT JOIN [PhamPhong_BTTH2_QLDT].[dbo].[HOIDONG_DT] as hddt ON hd.MSHD = hddt.MSHD
  LEFT JOIN [PhamPhong_BTTH2_QLDT].[dbo].[DETAI] as dt ON hddt.MSDT = dt.MSDT`;
  const data1b = await fetchData(query1b);
  const title1b = "DANH SÁCH HỘI ĐỒNG CHẤM ĐỀ TÀI";
  const colWidthb = [60, 60, 170, 100];
  const headers1b = ["MSHD", "PHÒNG", "TÊN ĐT", "MSĐT", "QUYẾT ĐỊNH"];
  const rowkeys1b = ["MSHD", "PHONG", "TENDT", "MSDT", "QUYETDINH"];
  const fileName1b = "24550034_PhamPhong_Bai_1_b.pdf";
  await generatePdf.pdf(data1b, title1b, headers1b, rowkeys1b, fileName1b, colWidthb);

  // Generate PDF for Bai 1.c
  query1c = `SELECT * FROM [PhamPhong_BTTH2_QLDT].[dbo].[DETAI] as dt
  LEFT JOIN [PhamPhong_BTTH2_QLDT].[dbo].[HOIDONG_DT] as hddt ON dt.MSDT = hddt.MSDT
  LEFT JOIN [PhamPhong_BTTH2_QLDT].[dbo].[DETAI_DIEM] ON dt.MSDT = DETAI_DIEM.MSDT`;
  const data1c = await fetchData(query1c);
  const title1c = "KẾT QUẢ BẢO VỆ ĐỀ TÀI";
  const colWidthc = [60, 190, 160];
  const headers1c = ["MSDT", "TÊN ĐỀ TÀI", "MSHD", "Điểm TB"];
  const rowkeys1c = ["MSDT", "TENDT", "MSHD", "DIEMTB"];
  const fileName1c = "24550034_PhamPhong_Bai_1_c.pdf";
  await generatePdf.pdf(data1c, title1c, headers1c, rowkeys1c, fileName1c, colWidthc);
}

exportDataToPdf();
