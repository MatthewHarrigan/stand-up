import { test, expect } from "@playwright/test";

function generateUniqueName(baseName) {
  const timestamp = new Date().getTime();
  return `${baseName}-${timestamp}`;
}

// test("Add new Team Member", async ({ page }) => {
//   await page.goto("http://localhost:4000/");

//   const name = generateUniqueName("Chekhov");

//   await page.getByPlaceholder("Enter new team member's name").click();
//   await page
//     .getByPlaceholder("Enter new team member's name")
//     .fill(name);

//   await page.getByRole("button", { name: "Add Team Member" }).click();

//   const teamMemberElement = await page.locator(`[data-testid="team-members"] >> text=${name}`);
//   const deleteButton = await teamMemberElement.locator('button'); // Adjust if the button has a specific name
//   await deleteButton.click();
//   await page.getByPlaceholder("Enter new team member's name").click();
// });

test("Add a user and a note", async ({ page }) => {
  await page.goto("http://localhost:4000/");

  const name = generateUniqueName("Chekhov");
  await page.getByPlaceholder("Enter new team member's name").click();
  await page.getByPlaceholder("Enter new team member's name").fill(name);

  await page.getByRole("button", { name: "Add Team Member" }).click();

  // Select the last team member from the combobox
  // const lastOptionId = await page
  //   .locator("role=combobox")
  //   .evaluate((element) => {
  //     const select = element as HTMLSelectElement;
  //     return select.options[select.options.length - 1].value;
  //   });
  await page.locator("role=combobox").selectOption(name);

  const content = `Writing another play ${name}`;

  // // Enter and submit a note
  await page.getByPlaceholder("Enter notes").click();
  await page.getByPlaceholder("Enter notes").fill(content);
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByPlaceholder("Enter notes").click();

  // // Wait for the note to be added and appear in the list
  // await page.waitForSelector('text={' + content + '}');

  // Count the current number of notes
  const initialCount = await page
    .locator('[data-testid="notes-history"] > li')
    .count();

  // Locate the 'Delete Note' button for the last note and click it
  const lastAddedNote = await page.locator(
    '[data-testid="notes-history"] >> li:last-child >> text=Delete Note'
  );
  await lastAddedNote.click();

  // Verify the last note has been deleted
  await page.waitForFunction(
    (count) =>
      document.querySelectorAll('[data-testid="notes-history"] > li').length ===
      count - 1,
    initialCount
  );
  const finalCount = await page
    .locator('[data-testid="notes-history"] > li')
    .count();
  expect(finalCount).toBe(initialCount - 1);

  const teamMemberElement = await page.locator(
    `[data-testid="team-members"] >> text=${name}`
  );
  const deleteButton = await teamMemberElement.locator("button"); // Adjust if the button has a specific name
  await deleteButton.click();
  await page.getByPlaceholder("Enter new team member's name").click();
});
