const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

sqlite3.verbose();

async function connect() {
  return open({
    filename: "./db/spenzoo.db",
    driver: sqlite3.Database,
  });
}

async function getUsers() {
  const db = await connect();

  return await db.all("SELECT * FROM User ORDER BY name LIMIT 20");
}

async function createUser(newUser) {
  const db = await connect();

  const stmt = await db.prepare(`INSERT INTO
    User(userId, name, gender, dateOfBirth, state)
    VALUES (:userId, :name, :gender, :dateOfBirth, :state)
  `);

  stmt.bind({
    ":userId": newUser.userId,
    ":name": newUser.name,
    ":gender": newUser.gender,
    ":dateOfBirth": newUser.dateOfBirth,
    ":state": newUser.state,
  });

  return await stmt.run();
}

async function getUserById(userId) {
  const db = await connect();

  const stmt = await db.prepare(`SELECT *
    FROM User
    WHERE
      userId = :userId
  `);

  stmt.bind({
    ":userId": userId,
  });

  return await stmt.get();
}

async function deleteUser(userToDelete) {
  const db = await connect();

  const stmt = await db.prepare(`DELETE FROM
    User
    WHERE userId = :userToDelete
  `);

  stmt.bind({
    ":userToDelete": userToDelete.userId,
  });

  return await stmt.run();
}

async function getUserBudgets() {
  const db = await connect();

  return await db.all(
    "SELECT * FROM User_Budget ORDER BY budgetId DESC LIMIT 20"
  );
}

async function createUserBudget(newUserBudget) {
  const db = await connect();

  const stmt = await db.prepare(`INSERT INTO
    User_Budget(UserId, budgetId)
    VALUES (:UserId, :budgetId)
  `);

  stmt.bind({
    ":UserId": newUserBudget.UserId,
    ":budgetId": newUserBudget.budgetId,
  });

  return await stmt.run();
}

async function getUserBudgetById(UserId) {
  const db = await connect();

  const stmt = await db.prepare(`SELECT *
    FROM User_Budget
    WHERE
      UserId = $UserId
  `);

  stmt.bind({
    ":UserId": UserId,
  });

  return await stmt.get();
}

async function deleteUserBudget(userBudgetToDelete) {
  console.log("try to delete");
  const db = await connect();
  console.log("112");
  const stmt = await db.prepare(`DELETE FROM
    User_Budget
    WHERE UserId = :userBudgetToDelete
  `);

  stmt.bind({
    ":deleteUserBudget": userBudgetToDelete.UserId,
  });
  console.log("122");
  return await stmt.run();
}

module.exports.getUsers = getUsers;
module.exports.createUser = createUser;
module.exports.getUserById = getUserById;
module.exports.deleteUser = deleteUser;

module.exports.getUserBudgets = getUserBudgets;
module.exports.createUserBudget = createUserBudget;
module.exports.getUserBudgetById = getUserBudgetById;
module.exports.deleteUserBudget = deleteUserBudget;

// It would be handy if the functions for the user and budgets are separated into separate files.
