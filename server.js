const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();
app.use(express.json());

async function main() {
  const newUser = await prisma.user.create({
    data: { email: "johndoe@test.fr", name: "John Doe" },
  });
  console.log(newUser);
  const users = await prisma.user.findMany();
  console.log(users);
}
main().catch((e) => console.error(e));

// Get all users
app.get("/", async (req, res) => {
  const userCount = await prisma.user.count();
  res.json(
    userCount == 0
      ? "No users have been added yet."
      : "Sonme users have been added to the database."
  );
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
