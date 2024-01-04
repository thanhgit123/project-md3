const { getAllUsers, getUserById, updateStatus } = require("../service/user.service");

async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      users,
      message: "oke",
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateStatusUser (req,res){
  try {
    const {id} = req.params
    const user = await getUserById(id);
    const newStatus = !user.status
    const updateUser = await updateStatus(id,newStatus);
    const users = await getAllUsers();
    res.status(200).json({
      message: "update oke",
      users  
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getUsers,
  updateStatusUser
};
