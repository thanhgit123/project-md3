const db = require("../configs/mysql.config");
async function getAllUsers() {
  try {
    const [user] = await db.execute("select * from users");
    return user;
  } catch (error) {
    console.log(error);
  }
};

async function getUserById(id){
  try {
    const [findUser] = await db.execute("select * from users where user_id = ?", [
      id,
    ]);
    return findUser[0];
  } catch (error) {
    console.log(error);
  }
};

async function checkUserByEmail(email) {
  try {
    const [findUser] = await db.execute("select * from users where email = ?", [
      email,
    ]);
    return findUser[0];
  } catch (error) {
    console.log(error);
  }
}
async function addUser(user_name, password, email) {
  try {
    const [result] = await db.execute(
      "insert into users (user_name, password, email) values (?, ?, ?)",
      [user_name, password, email]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}
async function updateStatus(id,status){
  try {
    const [result]= await db.execute("update users set status = ? where user_id = ?",[status,id] )
    return result.insertId
    } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getAllUsers,
  addUser,
  checkUserByEmail, 
  getUserById,
  updateStatus
};
