require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Testing MongoDB Connection...\n');

// Show connection string (masked password)
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}

const maskedUri = uri.replace(/:[^:@]+@/, ':****@');
console.log('📝 Connection String:', maskedUri);
console.log('');

// Connect to MongoDB
mongoose.connect(uri)
  .then(async () => {
    console.log('✅ Successfully connected to MongoDB Atlas!\n');
    
    // Get database info
    const db = mongoose.connection.db;
    console.log('📊 Database Name:', db.databaseName);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📁 Collections in database:');
    if (collections.length === 0) {
      console.log('   (No collections yet - they will be created when you submit forms)');
    } else {
      for (const collection of collections) {
        const count = await db.collection(collection.name).countDocuments();
        console.log(`   - ${collection.name}: ${count} documents`);
      }
    }
    
    // Check if we can read from collections
    console.log('\n🔍 Checking for data...\n');
    
    try {
      const Feedback = require('./models/Feedback');
      const Contact = require('./models/Contact');
      
      const feedbackCount = await Feedback.countDocuments();
      const contactCount = await Contact.countDocuments();
      
      console.log(`📬 Feedback submissions: ${feedbackCount}`);
      console.log(`📧 Contact submissions: ${contactCount}`);
      
      if (feedbackCount > 0) {
        console.log('\n📝 Recent Feedback:');
        const recentFeedback = await Feedback.find().sort({ submittedAt: -1 }).limit(3);
        recentFeedback.forEach((fb, i) => {
          console.log(`   ${i + 1}. [${fb.type}] ${fb.message.substring(0, 50)}... (${fb.submittedAt})`);
        });
      }
      
      if (contactCount > 0) {
        console.log('\n📧 Recent Contacts:');
        const recentContacts = await Contact.find().sort({ submittedAt: -1 }).limit(3);
        recentContacts.forEach((contact, i) => {
          console.log(`   ${i + 1}. ${contact.name} - ${contact.email} (${contact.submittedAt})`);
        });
      }
      
      if (feedbackCount === 0 && contactCount === 0) {
        console.log('\n⚠️  No data found in database yet.');
        console.log('💡 This is normal if you haven\'t submitted any forms yet.');
        console.log('\n📋 To test:');
        console.log('   1. Start the server: npm start');
        console.log('   2. Open index.html in browser');
        console.log('   3. Submit a feedback or contact form');
        console.log('   4. Run this test again to see the data');
      }
      
    } catch (error) {
      console.error('❌ Error reading data:', error.message);
    }
    
    console.log('\n✅ Database connection test completed!');
    process.exit(0);
    
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed!');
    console.error('Error:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Check if MONGODB_URI in .env is correct');
    console.log('   2. Verify MongoDB Atlas network access (allow 0.0.0.0/0)');
    console.log('   3. Check if database user has read/write permissions');
    console.log('   4. Ensure your IP is whitelisted in MongoDB Atlas');
    process.exit(1);
  });
