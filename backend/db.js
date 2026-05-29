const oracledb = require("oracledb");

async function getConnection() {
  let conn;

  try {
    conn = await oracledb.getConnection({
      user: "NFK_PROD",
      password: "infoflex!",
      connectString: "localhost:1521/ORCL"
    });

    return conn;

  } catch (err) {
    console.error("❌ Oracle 연결 실패:", err.message);
    throw err;
  }
}

module.exports = {
  getConnection
};