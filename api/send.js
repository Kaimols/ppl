export default async function handler(req, res) {
  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).send("Missing BOT_TOKEN or CHAT_ID");
  }

  let text;

  // FALL 1: Nachricht wird explizit gesendet (dein alter Use-Case)
  if (req.body && typeof req.body.message === "string") {
    const message = req.body.message.trim();
    if (!message || message.length > 200) {
      return res.status(400).send("Invalid message");
    }
    text = message;
  } 
  // FALL 2: Klick von der Webseite (kein Body)
  else {
    text = "📬 Jemand hat auf den Link geklickt";
  }

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  if (!tgRes.ok) {
    return res.status(500).send("Telegram error");
  }

  return res.status(200).send("OK");
}