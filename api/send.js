const fetch = require("node-fetch");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).send("Missing BOT_TOKEN or CHAT_ID");
  }

  let text = "🔔 Jemand hat auf den Link geklickt";

  // Optional: Message aus dem Body übernehmen
  if (
    req.body &&
    typeof req.body.message === "string" &&
    req.body.message.trim().length > 0
  ) {
    text = req.body.message.trim();
  }

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      }
    );

    const tgText = await tgRes.text();
    console.log("Telegram status:", tgRes.status);
    console.log("Telegram response:", tgText);

    if (!tgRes.ok) {
      return res.status(500).send(tgText);
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).send("Internal error");
  }
};