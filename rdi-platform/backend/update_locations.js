const { Pool } = require("pg");

const pool = new Pool({
  user: "rdi_user",
  password: "rdi_password_secure",
  host: "localhost",
  port: 5432,
  database: "rdi_platform",
});

async function main() {
  try {
    // First, query all companies
    console.log("Current companies:");
    const result = await pool.query(
      "SELECT id, name, location FROM companies ORDER BY id",
    );
    result.rows.forEach((r) =>
      console.log(`${r.id}: ${r.name} - "${r.location}"`),
    );

    console.log("\n--- Updating locations ---\n");

    // Update fenland to helsinki
    const update1 = await pool.query(
      "UPDATE companies SET location = 'Helsinki' WHERE location ILIKE '%fenland%' RETURNING id, name, location",
    );
    console.log("Updated Fenland → Helsinki:", update1.rowCount, "rows");
    update1.rows.forEach((r) => console.log(`  ${r.name}: ${r.location}`));

    // Update LUT to Lahti
    const update2 = await pool.query(
      "UPDATE companies SET location = 'Lahti' WHERE name ILIKE '%lut%' RETURNING id, name, location",
    );
    console.log("\nUpdated LUT → Lahti:", update2.rowCount, "rows");
    update2.rows.forEach((r) => console.log(`  ${r.name}: ${r.location}`));

    console.log("\n--- Final companies data ---\n");
    const final = await pool.query(
      "SELECT id, name, location FROM companies ORDER BY id",
    );
    final.rows.forEach((r) =>
      console.log(`${r.id}: ${r.name} - "${r.location}"`),
    );

    pool.end();
  } catch (err) {
    console.error("Error:", err);
    pool.end();
  }
}

main();
