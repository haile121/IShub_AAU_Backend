import { connectDB, closeDB } from "./dt/db.js";
import { insertUsers, findAllUsers, updateUserEmail, deleteUserByName } from "./dt/users.js";
import { insertTasks, findTasksByUser, findCompletedTasks, findTaskTitles, updateTaskStatus, addTagToTask, deleteCompletedTasks } from "./dt/tasks.js";

const main = async () => {
  try {
    await insertUsers();
    await insertTasks();

    console.log("All Users:", await findAllUsers());
    console.log("Tasks for user 1:", await findTasksByUser(1));
    console.log("Tasks for user 3:", await findTasksByUser(3));
    console.log("Completed Tasks:", await findCompletedTasks());
    console.log("Task Titles:", await findTaskTitles());

    await updateUserEmail("Abebe", "abebe_new@example.com");
    await updateTaskStatus("pending", "in progress");
    await addTagToTask("Develop Homepage", "UI");

    await deleteUserByName("Mekdes");
    await deleteCompletedTasks();

    console.log("All CRUD operations completed successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await closeDB();
  }
};

main();
