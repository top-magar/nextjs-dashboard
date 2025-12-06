// Test database connection and check if products table exists
// Run with: node scripts/test-db-connection.js

require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...\n');

    // Test basic connection
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connected successfully!');
    console.log('   Current time:', result.rows[0].current_time);
    console.log('');

    // Check if products table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'products'
      );
    `;
    
    const productsTableExists = tableCheck.rows[0].exists;
    
    if (productsTableExists) {
      console.log('✅ Products table exists!');
      
      // Get table info
      const countResult = await sql`SELECT COUNT(*) as count FROM products`;
      console.log(`   Products count: ${countResult.rows[0].count}`);
      
      // Check other tables
      const tables = ['categories', 'collections', 'product_categories', 'product_collections'];
      console.log('\n📋 Checking other tables:');
      
      for (const table of tables) {
        const check = await sql.query(
          `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)`,
          [table]
        );
        const exists = check.rows[0].exists;
        console.log(`   ${exists ? '✅' : '❌'} ${table}`);
      }
    } else {
      console.log('❌ Products table does NOT exist!');
      console.log('\n📝 You need to run the migration:');
      console.log('   psql $POSTGRES_URL -f scripts/migrations/002_products.sql');
    }

    console.log('\n✨ Test complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testConnection();
