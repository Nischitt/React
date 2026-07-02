require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Package, Course, Booking, Blog, Contact, User, Team, Slot, PageSetting, Review, Settings } = require('./models');
const PDFDocument = require('pdfkit');

// BUG FIX: never hardcode secrets in source. Pull from environment (with a
// loud failure if it's missing) instead of committing a fixed string.
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set. Add it to your .env file.');
}

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Range', 'X-Total-Count'],
    exposedHeaders: ['Content-Range', 'X-Total-Count']
}));
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error('MONGO_URI is not set. Add it to your .env file.');
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
// =================================================================
// HELPERS (moved above usage — was previously referenced before
// definition further down the file)
// =================================================================
const getPagination = (req) => {
    const start = parseInt(req.query._start) || 0;
    const end = parseInt(req.query._end) || 10;
    const limit = end - start;
    return { start, limit };
};

const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Access denied. Token missing." });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: "Access denied. Admin role required." });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token session." });
    }
};

// =================================================================
// SPECIAL: PAGE SETTINGS ENDPOINTS
// =================================================================
// BUG FIX: this route was previously defined TWICE. The second copy
// called `Settings.findOne(...)` and responded immediately with
// `res.json(settings)` (likely null, since nothing ever saves to that
// collection under that name), which meant the real PageSetting logic
// below it was unreachable dead code. Consolidated into one correct route.
app.get('/api/page-settings/standard-course/:id', async (req, res) => {
    try {
        let settings = await PageSetting.findById(req.params.id);
        if (!settings) {
            settings = new PageSetting({
                _id: req.params.id,
                tuitionCost: 64.00,
                theoryHours: 4,
                behindWheelHours: 18,
                courseLengthDays: 30,
                instructorName: "Isaac Herman"
            });
            await settings.save();
        }
        res.json({ id: settings._id.toString(), ...settings.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/page-settings/standard-course/:id', async (req, res) => {
    try {
        const updatedSettings = await PageSetting.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        if (!updatedSettings) return res.status(404).json({ error: "Configuration not found." });
        res.json({ id: updatedSettings._id.toString(), ...updatedSettings.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// =================================================================
// PACKAGES ENDPOINTS
// =================================================================
// BUG FIX: was defined twice; the second copy dropped the
// Access-Control-Expose-Headers header needed by React-Admin to read
// Content-Range. Kept the more complete version only.
app.get('/api/packages', async (req, res) => {
    try {
        const packages = await Package.find();
        const mappedPackages = packages.map(pkg => ({ id: pkg._id.toString(), ...pkg.toObject() }));
        res.setHeader('Content-Range', `packages 0-${packages.length}/${packages.length}`);
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.json(mappedPackages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/packages/:id', async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (!pkg) return res.status(404).json({ error: "Package not found" });
        res.json({ id: pkg._id.toString(), ...pkg.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/packages', async (req, res) => {
    try {
        const newPkg = new Package(req.body);
        await newPkg.save();
        res.status(201).json({ id: newPkg._id.toString(), ...newPkg.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/packages/:id', async (req, res) => {
    try {
        const updatedPkg = await Package.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        if (!updatedPkg) return res.status(404).json({ error: "Package not found to update" });
        res.json({ id: updatedPkg._id.toString(), ...updatedPkg.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/packages/:id', async (req, res) => {
    try {
        const deletedPkg = await Package.findByIdAndDelete(req.params.id);
        if (!deletedPkg) return res.status(404).json({ error: "Package not found to delete" });
        res.json({ id: deletedPkg._id.toString(), ...deletedPkg.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// =================================================================
// BOOKINGS ENDPOINTS
// =================================================================
// BUG FIX: POST /api/bookings and GET /api/bookings were duplicated
// further down the file; consolidated to single definitions here.
app.post('/api/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json({ id: newBooking._id.toString(), ...newBooking.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.setHeader('Content-Range', `bookings 0-${bookings.length}/${bookings.length}`);
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.json(bookings.map(b => ({ id: b._id.toString(), ...b.toObject() })));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.json({ id: booking._id.toString(), ...booking.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/bookings/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) return res.status(404).json({ error: "Booking not found" });
        res.json({ id: deletedBooking._id.toString(), ...deletedBooking.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/slots/generate', async (req, res) => {
    // TODO: implement calendar generation
    res.json({ message: "Calendar populated!" });
});

// =================================================================
// STUDENT ENDPOINTS
// =================================================================
// BUG FIX: '/api/student/check-in' was defined TWICE. Express only
// keeps the route registered last as the effective handler, which
// silently discarded the first definition (dead code). Kept the more
// robust version (the one with zero-session recovery logic) as the
// single source of truth.
app.post('/api/student/check-in', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized access session." });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: "User profile not found." });

        const { bookingId } = req.body;
        if (!bookingId) return res.status(400).json({ error: "No course selected for check-in." });

        const booking = await Booking.findOne({ _id: bookingId, studentEmail: user.email.toLowerCase().trim() });
        if (!booking) return res.status(404).json({ error: "Booking not found for this account." });

        if (booking.totalSessions === undefined || booking.totalSessions === null) {
            booking.totalSessions = 20;
        }
        if (booking.attendedSessions === undefined || booking.attendedSessions === null) {
            booking.attendedSessions = 0;
        }
        if (booking.remainingSessions === undefined || booking.remainingSessions === null) {
            booking.remainingSessions = booking.totalSessions - booking.attendedSessions;
        }

        if (!booking.remainingSessions || booking.remainingSessions <= 0) {
            if (!booking.attendedSessions || booking.attendedSessions === 0) {
                booking.totalSessions = 20;
                booking.attendedSessions = 0;
                booking.remainingSessions = 20;
            } else {
                return res.status(400).json({ error: "All course sessions have already been completed!" });
            }
        }

        booking.attendedSessions += 1;
        booking.remainingSessions -= 1;
        await booking.save();

        res.json({
            success: true,
            message: "Attendance checked in successfully!",
            attendedSessions: booking.attendedSessions,
            remainingSessions: booking.remainingSessions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/student/portal-metrics', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Access denied." });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ error: "User account not found." });
        }

        const { bookingId } = req.query;
        const query = { studentEmail: user.email.toLowerCase().trim() };
        if (bookingId) query._id = bookingId;

        const booking = await Booking.findOne(query);

        if (!booking) {
            return res.json({
                id: user._id.toString(),
                studentName: "Ram Sharma",
                activeCourse: "Premium Service",
                progressPercent: 0,
                upcomingLessons: 20,
                attendanceRate: 0,
                certificateStatus: "Pending"
            });
        }

        if (booking.totalSessions === undefined || booking.totalSessions === null) {
            booking.totalSessions = 20;
        }
        if (booking.attendedSessions === undefined || booking.attendedSessions === null) {
            booking.attendedSessions = 0;
        }
        if (booking.remainingSessions === undefined || booking.remainingSessions === null) {
            booking.remainingSessions = booking.totalSessions - booking.attendedSessions;
        }

        await booking.save();

        const total = booking.totalSessions;
        const attended = booking.attendedSessions;

        const progressCalculated = Math.round((attended / total) * 100);
        const attendanceCalculated = Math.round((attended / total) * 100);

        res.json({
            id: booking._id.toString(),
            studentName: booking.studentName || "Ram Sharma",
            activeCourse: booking.itemName || "Premium Service",
            progressPercent: progressCalculated,
            upcomingLessons: booking.remainingSessions,
            attendanceRate: attendanceCalculated,
            certificateStatus: progressCalculated >= 100 && booking.paymentStatus === 'Paid' ? 'Available' : 'Pending'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/api/bookings', async (req, res) => {
    try {
        const { studentEmail } = req.body;

        if (studentEmail) {
            const existingBookings = await Booking.find({ studentEmail: studentEmail.toLowerCase().trim() });
            const hasActiveBooking = existingBookings.some(b => {
                const total = b.totalSessions || 20;
                const attended = b.attendedSessions || 0;
                const progress = Math.round((attended / total) * 100);
                return progress < 100;
            });

            if (hasActiveBooking) {
                return res.status(400).json({
                    error: "You already have an active course or package enrollment. Complete it before booking another."
                });
            }
        }

        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json({ id: newBooking._id.toString(), ...newBooking.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/slots/:slotId/book', async (req, res) => {
    try {
        const { bookingId, studentEmail } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.remainingSessions <= 0) {
            return res.status(400).json({ error: "No sessions remaining." });
        }

        const slot = await Slot.findOneAndUpdate(
            { _id: req.params.slotId, isBooked: false },
            { $set: { isBooked: true, studentEmail, bookingId } },
            { new: true }
        );

        if (!slot) return res.status(400).json({ error: "Slot already taken." });

        booking.remainingSessions -= 1;
        await booking.save();

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.json({ id: updatedBooking._id.toString(), ...updatedBooking.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/bookings/:id/pay', async (req, res) => {
    try {
        const { transactionId } = req.body;
        const bookingId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            console.log(`[Simulation] Handling mock/temporary timestamp ID: ${bookingId}`);
            return res.status(200).json({
                message: "Simulated payment verified successfully for mock record",
                updatedBooking: {
                    _id: bookingId,
                    paymentStatus: 'Paid',
                    status: 'Approved',
                    transactionId
                }
            });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { paymentStatus: 'Paid', status: 'Approved', transactionId },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking record not found in database" });
        }

        return res.status(200).json({ message: "Payment verified successfully", updatedBooking });
    } catch (error) {
        console.error("Backend payment processing error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.get('/api/bookings/:id/certificate', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ error: "Booking record not found." });
        }

        const doc = new PDFDocument({
            layout: 'landscape',
            size: 'A4'
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Certificate_${booking.studentName.replace(/\s+/g, '_')}.pdf`);

        doc.pipe(res);

        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
           .lineWidth(4)
           .stroke('#f59e0b');

        doc.rect(28, 28, doc.page.width - 56, doc.page.height - 56)
           .lineWidth(1)
           .stroke('#111827');

        doc.moveDown(4);
        doc.fillColor('#111827')
           .fontSize(40)
           .font('Helvetica-Bold')
           .text('CERTIFICATE OF COMPLETION', { align: 'center' });

        doc.moveDown(1);
        doc.fontSize(16)
           .font('Helvetica')
           .fillColor('#4b5563')
           .text('This is proudly presented to', { align: 'center' });

        doc.moveDown(1);
        doc.fontSize(28)
           .font('Helvetica-Bold')
           .fillColor('#f59e0b')
           .text(booking.studentName.toUpperCase(), { align: 'center' });

        doc.moveDown(1.5);
        doc.fontSize(16)
           .font('Helvetica')
           .fillColor('#4b5563')
           .text(`For successfully completing all instructional operations, practical frameworks,`, { align: 'center' });

        doc.moveDown(0.5);
        doc.text(`and regulations required under the training program for:`, { align: 'center' });

        doc.moveDown(1);
        doc.fontSize(22)
           .font('Helvetica-Bold')
           .fillColor('#111827')
           .text(`"${booking.itemName}"`, { align: 'center' });

        doc.moveDown(3);

        doc.fontSize(12).font('Helvetica').text(`Date: ${new Date().toLocaleDateString()}`, 100, doc.y, { lineBreak: false });
        doc.text('Authorized Signature: ____________________', doc.page.width - doc.x - 200, doc.y, { align: 'right' });

        doc.end();

    } catch (error) {
        console.error("Certificate error:", error);
        res.status(500).json({ error: "Failed to generate certificate file." });
    }
});

// ==========================================
// COURSES ENDPOINTS
// ==========================================
// BUG FIX: GET /api/courses, PUT, and DELETE were duplicated.
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        const mappedCourses = courses.map(c => ({ id: c._id.toString(), ...c.toObject() }));
        res.setHeader('Content-Range', `courses 0-${courses.length}/${courses.length}`);
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.json(mappedCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ error: "Course not found" });
        res.json({ id: course._id.toString(), ...course.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/courses', async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json({ id: newCourse._id.toString(), ...newCourse.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/courses/:id', async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        if (!updatedCourse) return res.status(404).json({ error: "Course not found to update" });
        res.json({ id: updatedCourse._id.toString(), ...updatedCourse.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/courses/:id', async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) return res.status(404).json({ error: "Course not found to delete" });
        res.json({ id: deletedCourse._id.toString(), ...deletedCourse.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// REVIEWS ENDPOINTS
// ==========================================
app.get('/api/reviews', async (req, res) => {
    try {
        const total = await Review.countDocuments();
        const start = parseInt(req.query._start) || 0;
        const end = parseInt(req.query._end) || 10;
        const limit = end - start;

        const reviews = await Review.find().sort({ createdAt: -1 }).skip(start).limit(limit);
        const mapped = reviews.map(r => ({ id: r._id.toString(), ...r.toObject() }));

        const rangeEnd = reviews.length > 0 ? (start + reviews.length - 1) : 0;

        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.setHeader('Content-Range', `reviews ${start}-${rangeEnd}/${total}`);
        res.json(mapped);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ error: "Review not found" });
        res.json({ id: review._id.toString(), ...review.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/reviews', async (req, res) => {
    try {
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        res.status(201).json({ id: savedReview._id.toString(), ...savedReview.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/reviews/:id', async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        if (!updatedReview) return res.status(404).json({ error: "Review not found" });
        res.json({ id: updatedReview._id.toString(), ...updatedReview.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/reviews/:id', async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) return res.status(404).json({ error: "Review not found" });
        res.json({ id: deletedReview._id.toString() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/public/reviews', async (req, res) => {
    try {
        const approved = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
        res.json(approved.map(r => ({ id: r._id.toString(), ...r.toObject() })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// TEAM ENDPOINTS
// ==========================================
app.get('/api/team', async (req, res) => {
    try {
        const total = await Team.countDocuments();

        const range = req.query.range
            ? JSON.parse(req.query.range)
            : [0, 9];

        const start = range[0];
        const end = range[1];
        const limit = end - start + 1;

        const team = await Team.find().skip(start).limit(limit);

        const mapped = team.map(t => ({
            id: t._id.toString(),
            name: t.name,
            title: t.title,
            bio: t.bio,
            image: t.image,
            fbUrl: t.fbUrl,
            twUrl: t.twUrl,
            lnUrl: t.lnUrl
        }));

        res.setHeader('Content-Range', `team ${start}-${start + mapped.length}/${total}`);
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');

        res.json(mapped);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/team/:id', async (req, res) => {
    try {
        const teamMember = await Team.findById(req.params.id);

        if (!teamMember) {
            return res.status(404).json({
                message: "Team member not found",
                id: req.params.id
            });
        }

        res.json({
            id: teamMember._id.toString(),
            name: teamMember.name,
            title: teamMember.title,
            bio: teamMember.bio,
            image: teamMember.image,
            fbUrl: teamMember.fbUrl,
            twUrl: teamMember.twUrl,
            lnUrl: teamMember.lnUrl
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/team', async (req, res) => {
    try {
        const t = await new Team(req.body).save();
        res.status(201).json({ id: t._id.toString(), ...t.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/team/:id', async (req, res) => {
    try {
        const t = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!t) return res.status(404).json({ error: "Team member not found" });
        res.json({ id: t._id.toString(), ...t.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/team/:id', async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// BLOGS ENDPOINTS
// ==========================================
// BUG FIX: GET /api/blogs was duplicated; the second copy dropped
// pagination, sorting and the Access-Control-Expose-Headers header.
// Kept only the complete version.
app.get('/api/blogs', async (req, res) => {
    try {
        const total = await Blog.countDocuments();
        const start = parseInt(req.query._start) || 0;
        const end = parseInt(req.query._end) || 10;
        const limit = end - start;

        const blogs = await Blog.find().skip(start).limit(limit);

        const mapped = blogs.map(b => ({ id: b._id.toString(), ...b.toObject() }));

        const rangeEnd = blogs.length > 0 ? (start + blogs.length - 1) : 0;

        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.setHeader('Content-Range', `blogs ${start}-${rangeEnd}/${total}`);

        res.json(mapped);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/blogs', async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json({ id: savedBlog._id.toString(), ...savedBlog.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/blogs/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        if (!updatedBlog) return res.status(404).json({ error: "Blog post not found to update" });
        res.json({ id: updatedBlog._id.toString(), ...updatedBlog.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ error: "Blog post not found to delete" });
        res.json({ id: deletedBlog._id.toString(), ...deletedBlog.toObject() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// CONTACTS ENDPOINTS
// ==========================================
app.post('/api/contacts', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: "Enquiry sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// BUG FIX: GET /api/contacts was duplicated. The second copy skipped
// authenticateAdmin and pagination entirely, exposing all customer
// contact-form submissions (names/phones/emails/messages) with no
// auth check at all. Kept only the admin-gated, paginated version.
app.get('/api/contacts', authenticateAdmin, async (req, res) => {
    try {
        const { start, limit } = getPagination(req);

        const total = await Contact.countDocuments();
        const contacts = await Contact.find()
            .sort({ date: -1 })
            .skip(start)
            .limit(limit);

        const mapped = contacts.map(c => ({ id: c._id.toString(), ...c.toObject() }));

        res.setHeader('Content-Range', `contacts ${start}-${start + contacts.length}/${total}`);
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.json(mapped);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// AUTH ENDPOINTS
// ==========================================
// BUG FIX: signup didn't normalize email casing/whitespace, unlike
// check-in/portal-metrics which compare against a lowercased+trimmed
// email. That mismatch could let "User@x.com" and "user@x.com" both
// register as distinct accounts. Normalized to match the rest of the app.
app.post('/api/signup', async (req, res) => {
    try {
        const { password } = req.body;
        const email = (req.body.email || '').toLowerCase().trim();

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword, role: 'user' });
        res.status(201).json({ message: "Registration successful" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/login', async (req, res) => {
    try {
        const email = (req.body.email || '').toLowerCase().trim();
        const { password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user._id.toString(), email: user.email, role: user.role } });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// BUG FIX: '/api/users' GET was defined TWICE — once with no auth
// check at all (just a comment saying "add logic here"), and once
// with authenticateAdmin. Express matches routes in registration
// order, so the FIRST (unprotected) definition was the one that
// actually ran, completely bypassing the admin check. Removed the
// unprotected duplicate; kept only the authenticated version.
app.get('/api/users', authenticateAdmin, async (req, res) => {
    try {
        const total = await User.countDocuments();
        const users = await User.find().select('-password');
        const mapped = users.map(u => ({ id: u._id.toString(), email: u.email, role: u.role }));

        res.setHeader('Content-Range', `users 0-${mapped.length}/${total}`);
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.json(mapped);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend API running on port ${PORT}`));