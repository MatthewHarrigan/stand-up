var express = require("express");
var router = express.Router();

const { TeamMember } = require("../models/index"); // Destructure TeamMember from models

router.post("/", async function (req, res) {
  try {
    const { name } = req.body;
    const newTeamMember = await TeamMember.create({ name });
    res.json(newTeamMember);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
});

router.get("/", async function (req, res, next) {
  try {
    const teamMembers = await TeamMember.findAll();
    res.json(teamMembers);
  } catch (error) {
    console.error("Error fetching teamMembers:", error);
    res.status(500).send("Error fetching teamMembers");
  }
});

router.delete("/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const userToDelete = await TeamMember.findByPk(userId);
    if (!userToDelete) {
      return res.status(404).send("TeamMember not found");
    }
    await userToDelete.destroy(); // This will soft delete if the model is paranoid
    res.send("TeamMember deleted");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
});

module.exports = router;
