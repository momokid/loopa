const pool = require("../config/db");

//Get chat history
const getChatHistory = async (req, res) => {
  const { sender_id, receiver_id } = req.query;

  if (!sender_id || !receiver_id) {
    return res.status(400).json({ error: "Missing sender or receiver ID" });
  }

  try {
    const messages = await pool.query(
      `SELECT * FROM messages
        WHERE 
        (sender_id= $1 AND receiver_id= $2) OR
        (sender_id= $2 AND receiver_id= $1)
        ORDER BY created_at ASC
    `,
      [sender_id, receiver_id]
    );
    return res.status(200).json({ success: true, message: messages.rows });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ success: false, message: `Server error, ${error}` });
  }
};

module.exports = {
  getChatHistory,
};
