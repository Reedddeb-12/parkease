const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Testing MongoDB Atlas Connection...\n');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ SUCCESS! Connected to MongoDB Atlas');
    console.log('📊 Database: parkease');
    console.log('🌐 Cluster:', process.env.MONGODB_URI.split('@')[1].split('/')[0]);
    console.log('\n🎉 Your MongoDB Atlas integration is working!\n');
    
    // Test creating a sample document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    return TestModel.create({ test: 'Connection successful!' });
  })
  .then(() => {
    console.log('✅ Test document created successfully');
    console.log('💾 Data can be saved to MongoDB Atlas\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Connection Failed!');
    console.error('Error:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Check if your password is correct in .env file');
    console.log('2. Verify Network Access allows 0.0.0.0/0 in MongoDB Atlas');
    console.log('3. Make sure your cluster is active (not paused)');
    console.log('4. Check if database user exists with correct permissions\n');
    process.exit(1);
  });