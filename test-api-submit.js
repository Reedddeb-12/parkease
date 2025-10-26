require('dotenv').config();
const mongoose = require('mongoose');
const Feedback = require('./models/Feedback');
const Contact = require('./models/Contact');

console.log('🧪 Testing API Data Submission...\n');

async function testSubmission() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Test 1: Submit Feedback
    console.log('📝 Test 1: Submitting feedback...');
    const testFeedback = new Feedback({
      type: 'suggestion',
      message: 'This is a test feedback submission to verify database connectivity.',
      rating: 5,
      email: 'test@parkease.com',
      userAgent: 'Test Script',
      ipAddress: '127.0.0.1'
    });

    const savedFeedback = await testFeedback.save();
    console.log('✅ Feedback saved successfully!');
    console.log('   ID:', savedFeedback._id);
    console.log('   Type:', savedFeedback.type);
    console.log('   Rating:', savedFeedback.rating);
    console.log('   Time:', savedFeedback.submittedAt);

    // Test 2: Submit Contact
    console.log('\n📧 Test 2: Submitting contact form...');
    const testContact = new Contact({
      name: 'Test User',
      email: 'testuser@parkease.com',
      phone: '+91 9876543210',
      city: 'mumbai',
      subject: 'general',
      message: 'This is a test contact form submission to verify database connectivity. Testing the API endpoints.',
      userAgent: 'Test Script',
      ipAddress: '127.0.0.1'
    });

    const savedContact = await testContact.save();
    console.log('✅ Contact saved successfully!');
    console.log('   ID:', savedContact._id);
    console.log('   Name:', savedContact.name);
    console.log('   Email:', savedContact.email);
    console.log('   Time:', savedContact.submittedAt);

    // Test 3: Verify data in database
    console.log('\n🔍 Test 3: Verifying data in database...');
    const feedbackCount = await Feedback.countDocuments();
    const contactCount = await Contact.countDocuments();
    
    console.log(`✅ Total Feedback: ${feedbackCount}`);
    console.log(`✅ Total Contacts: ${contactCount}`);

    // Show recent entries
    console.log('\n📋 Recent Feedback Entries:');
    const recentFeedback = await Feedback.find().sort({ submittedAt: -1 }).limit(5);
    recentFeedback.forEach((fb, i) => {
      console.log(`   ${i + 1}. [${fb.type}] ${fb.message.substring(0, 60)}...`);
      console.log(`      Rating: ${fb.rating || 'N/A'} | ${fb.submittedAt.toLocaleString()}`);
    });

    console.log('\n📋 Recent Contact Entries:');
    const recentContacts = await Contact.find().sort({ submittedAt: -1 }).limit(5);
    recentContacts.forEach((contact, i) => {
      console.log(`   ${i + 1}. ${contact.name} (${contact.email})`);
      console.log(`      Subject: ${contact.subject} | ${contact.submittedAt.toLocaleString()}`);
    });

    console.log('\n✅ All tests passed! Database is working correctly.');
    console.log('\n💡 Next steps:');
    console.log('   1. Start your server: npm start');
    console.log('   2. Open http://localhost:3000 in browser');
    console.log('   3. Submit forms through the website');
    console.log('   4. Check MongoDB Atlas dashboard to see the data');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

testSubmission();
