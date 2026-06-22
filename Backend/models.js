const mongoose = require('mongoose');

// ======================
// Package
// ======================
const PackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tagline: String,
    theoryLessons: Number,
    practicalLessons: Number,
    durationDays: { type: Number, default: 30 },
    hoursPerDay: { type: Number, default: 1 },
    carType: { type: String, default: 'Basic Model' },
    freePickup: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false }
});

// ======================
// Course
// ======================
const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startingPrice: { type: Number, required: true },
    theoryHours: Number,
    practicalHours: Number,
    image: { type: String, default: '/images/6.jpg' },
    note: String
});

// ======================
// Booking
// ======================
const BookingSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentPhone: { type: String, required: true },

    itemType: { type: String, required: true },
    itemName: { type: String, required: true },
    itemPrice: { type: Number, required: true },

    bookingDate: { type: Date, default: Date.now },

    status: { type: String, default: 'Pending' },
    paymentStatus: { type: String, default: 'Unpaid' },
    transactionId: { type: String, default: null },

    attendedSessions: { type: Number, default: 0 },  // Increments when they check in
totalSessions: { type: Number, default: 20 },     // Total lessons in the course bundle
remainingSessions: { type: Number, default: 20 },

}, { timestamps: true });

// ======================
// Site Settings
// ======================
const SiteSettingsSchema = new mongoose.Schema({
    name: { type: String, default: 'GlobalSettings' },

    heroTitle: { type: String, default: 'Learn Driving With Confidence' },

    aboutText: { type: String, default: 'Professional certified instructors...' },

    stats: {
        drivers: { type: String, default: '4000+' },
        instructors: { type: String, default: '25+' },
        passRate: { type: String, default: '98%' },
        cars: { type: String, default: '50+' }
    }
}, { timestamps: true });

// ======================
// Blog
// ======================
const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Isaac Herman' },
    date: { type: Date, default: Date.now },
    commentsCount: { type: Number, default: 0 },
    image: { type: String, default: '/images/blog1.jpg' },
    category: { type: String, default: 'Driving Course' },
    tags: [String]
}, { timestamps: true });

// ======================
// Contact
// ======================
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    category: String,
    instructor: String,
    message: String,
    date: { type: Date, default: Date.now }
});

// ======================
// User
// ======================
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
}, { timestamps: true });

// ======================
// Team
// ======================
const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    fbUrl: String,
    twUrl: String,
    lnUrl: String
}, { timestamps: true });

// ======================
// Slot
// ======================
const SlotSchema = new mongoose.Schema({
    slotTime: String,
    isBooked: { type: Boolean, default: false },
    studentEmail: { type: String, default: '' },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }
}, { timestamps: true });



// ======================
// Page Setting
// ======================
const PageSettingSchema = new mongoose.Schema({
    tuitionCost: { type: Number, default: 64 },
    theoryHours: { type: Number, default: 4 },
    behindWheelHours: { type: Number, default: 18 },
    courseLengthDays: { type: Number, default: 30 },
    instructorName: { type: String, default: 'Isaac Herman' }
}, { timestamps: true });

// ======================
// Review
// ======================
const ReviewSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// ======================
// Settings (Generic)
// ======================
const SettingsSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    data: mongoose.Schema.Types.Mixed
}, { timestamps: true });

// ======================
// Models (safe for hot-reload / Next.js)
// ======================
const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);
const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);
const Slot = mongoose.models.Slot || mongoose.model('Slot', SlotSchema);
const PageSetting = mongoose.models.PageSetting || mongoose.model('PageSetting', PageSettingSchema);
const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);


// ======================
// Export
// ======================
module.exports = {
    Package,
    Course,
    Booking,
    Blog,
    Contact,
    User,
    Team,
    Slot,
    PageSetting,
    Review,
    Settings,
    SiteSettings,
};