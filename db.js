// db.js
const odbc = require("odbc");
// Function to fetch data from the SQL Server
async function fetchData(query) {
  try {
    // Connect to SQL Server
    var sql = await odbc.connect("DSN=sqlserver17_64bit");

    // Run a query (customize this query based on your data)
    const result =
      await sql.query(query);

    const dataOnly = result.filter((row) => row.MSDT || row.MSHD);

    // Log the clean data
    console.log(dataOnly);
    return dataOnly;
  } catch (err) {
    console.error("Error fetching data from SQL Server", err);
  } finally {
    // Close the connection
    await sql.close();
  }
}

module.exports = { fetchData };
