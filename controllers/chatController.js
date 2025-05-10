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


const getActiveChatUsers = async (req, res)=>{
    const userId = req.user.id;

    try {
        const allUsers = await pool.query(`SELECT id, username FROM users WHERE id != $1`,[userId] );
        const currentUser = await pool.query(`SELECT id, username FROM users WHERE id = $1`,[userId]);

        return res.json({
            currentUser : currentUser.rows[0],
            otherUsers: allUsers.rows
        });
    } catch (err) {
        console.log('Error fetching users:', err);
        return res.status(500).json({success:false, message:'Internal server error 500'})
    }
}

module.exports = {
  getChatHistory,
  getActiveChatUsers
};
