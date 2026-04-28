const { Pool } = require("pg");

const pool = new Pool({
  user: "rdi_user",
  password: "rdi_password_secure",
  host: "localhost",
  port: 5432,
  database: "rdi_platform",
});

async function updateLocations() {
  try {
    // Update Finland to Helsinki
    const updateResult = await pool.query(
      "UPDATE companies SET location = 'Helsinki' WHERE location = 'Finland'",
    );
    console.log(
      ` Updated ${updateResult.rowCount} companies: Finland → Helsinki`,
    );

    // Show final data
    const result = await pool.query(
      "SELECT name, location FROM companies ORDER BY id",
    );
    console.log("\nFinal company locations:");
    result.rows.forEach((r) => {
      console.log(`  • ${r.name} - ${r.location}`);
    });

    await pool.end();
  } catch (err) {
    console.error("Error:", err.message);
    await pool.end();
  }
}

updateLocations();
