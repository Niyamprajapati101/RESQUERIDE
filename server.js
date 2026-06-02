const jsonServer = require("json-server");
const cors = require("cors");
const axios = require("axios");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// ── Cashfree credentials (sandbox) ──────────────────────────────
const CF_APP_ID  = process.env.CF_APP_ID || "YOUR_CASHFREE_APP_ID";
const CF_SECRET  = process.env.CF_SECRET || "YOUR_CASHFREE_SECRET";
const CF_BASE    = "https://sandbox.cashfree.com/pg";
// ────────────────────────────────────────────────────────────────

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === "POST") req.body.createdAt = new Date().toISOString();
  next();
});

// ── Create Cashfree Order ────────────────────────────────────────
server.post("/create-order", async (req, res) => {
  const { orderId, amount, customerName, customerEmail, customerPhone } = req.body;

  try {
    const response = await axios.post(
      `${CF_BASE}/orders`,
      {
        order_id:       orderId,
        order_amount:   amount,
        order_currency: "INR",
        customer_details: {
          customer_id:    `CUST_${Date.now()}`,
          customer_name:  customerName  || "Guest",
          customer_email: customerEmail || "guest@resqueride.com",
          customer_phone: (() => {
            const digits = (customerPhone || "").replace(/\D/g, "").slice(-10);
            return digits.length === 10 ? digits : "9999999999";
          })(),
        },
        order_meta: {
          notify_url: `http://localhost:3001/payment-webhook`,
        },
      },
      {
        headers: {
          "x-api-version": "2023-08-01",
          "x-client-id":   CF_APP_ID,
          "x-client-secret": CF_SECRET,
          "Content-Type":  "application/json",
        },
      }
    );

    res.json({
      success:        true,
      paymentSessionId: response.data.payment_session_id,
      orderId:        response.data.order_id,
    });
  } catch (err) {
    const errData = err?.response?.data;
    const msg = errData?.message || JSON.stringify(errData) || err.message;
    console.error("Cashfree error:", msg);
    res.status(500).json({ success: false, error: msg });
  }
});

// ── Verify Payment ───────────────────────────────────────────────
server.get("/verify-order/:orderId", async (req, res) => {
  try {
    const response = await axios.get(
      `${CF_BASE}/orders/${req.params.orderId}`,
      {
        headers: {
          "x-api-version":   "2023-08-01",
          "x-client-id":     CF_APP_ID,
          "x-client-secret": CF_SECRET,
        },
      }
    );
    res.json({ success: true, data: response.data });
  } catch (err) {
    res.status(500).json({ success: false, error: err?.response?.data || err.message });
  }
});

server.use(router);

server.listen(3001, () => {
  console.log("✅ RESQUERIDE API running at http://localhost:3001");
});
