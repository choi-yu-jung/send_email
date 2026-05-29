const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { getConnection } = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   Gmail SMTP 설정
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dbwjd2014@gmail.com",
    pass: "aaaa aaaa aaaa aaaa"
  }
});

/* SMTP 확인 */
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP 로그인 실패:", error.message);
  } else {
    console.log("✅ SMTP 로그인 성공");
  }
});

/* =========================
   MAIL API
========================= */
app.post("/send-mail", async (req, res) => {
  try {
    const { subject, message } = req.body;

    await transporter.sendMail({
      from: "2014dbwjd@gmail.com",
      to: "14yuyuyu@infosolution.co.kr",
      subject,
      text: message
    });

    return res.json({
      success: true,
      message: "메일 전송 성공"
    });

  } catch (err) {
    console.error(err);

    return res.json({
      success: false,
      message: "메일 전송 실패",
      error: err.message
    });
  }
});

/* =========================
   DB TEST API
========================= */
app.get("/test-db", async (req, res) => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `SELECT SYSDATE FROM DUAL`
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  } finally {
    if (conn) await conn.close();
  }
});

/* =========================
   서버 시작
========================= */
app.listen(5000, () => {
  console.log("Server running on 5000");
});