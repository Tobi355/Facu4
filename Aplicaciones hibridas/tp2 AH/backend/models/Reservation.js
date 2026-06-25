const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: [true, 'Class is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  status: {
    type: String,
    enum: {
      values: ['confirmed', 'cancelled'],
      message: 'Status must be confirmed or cancelled',
    },
    default: 'confirmed',
  },
}, {
  timestamps: true,
});

reservationSchema.index({ user: 1, class: 1, date: 1 }, { unique: true });

reservationSchema.pre('save', async function (next) {
  if (this.isNew) {
    const Class = mongoose.model('Class');
    await Class.findByIdAndUpdate(this.class, { $inc: { enrolledCount: 1 } });
  }
  if (this.isModified('status') && this.status === 'cancelled' && !this.isNew) {
    const Class = mongoose.model('Class');
    await Class.findByIdAndUpdate(this.class, { $inc: { enrolledCount: -1 } });
  }
  next();
});

module.exports = mongoose.model('Reservation', reservationSchema);
