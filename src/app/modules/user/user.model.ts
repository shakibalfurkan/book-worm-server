import mongoose, { model } from "mongoose";
import type { IUser } from "./user.interface.js";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    photo: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: {
        values: ["USER", "ADMIN"],
      },
      default: "USER",
    },

    readingGoal: {
      year: {
        type: Number,
        default: new Date().getFullYear(),
      },
      targetBooks: {
        type: Number,
        default: 0,
        min: [0, "Reading goal cannot be negative"],
        max: [1000, "Reading goal cannot exceed 1000 books"],
      },
    },

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    favoriteGenres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],

    stats: {
      totalBooksRead: {
        type: Number,
        default: 0,
        min: 0,
      },

      totalPagesRead: {
        type: Number,
        default: 0,
        min: 0,
      },

      booksReadThisYear: {
        type: Number,
        default: 0,
        min: 0,
      },

      lastReadingDate: {
        type: Date,
        default: null,
      },

      currentStreak: {
        type: Number,
        default: 0,
        min: 0,
      },

      longestStreak: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

// Reading goal progress percentage
userSchema.virtual("readingGoalProgress").get(function () {
  if (
    !this.readingGoal ||
    !this.readingGoal.targetBooks ||
    this.readingGoal.targetBooks === 0
  ) {
    return 0;
  }

  if (!this.stats) {
    return 0;
  }

  return Math.round(
    (this.stats.booksReadThisYear / this.readingGoal.targetBooks) * 100
  );
});

// Followers count
userSchema.virtual("followersCount").get(function () {
  return this.followers ? this.followers.length : 0;
});

// Following count
userSchema.virtual("followingCount").get(function () {
  return this.following ? this.following.length : 0;
});

// Follow another user
userSchema.methods.followUser = async function (
  userIdToFollow: mongoose.Types.ObjectId
) {
  if (!this.following.includes(userIdToFollow)) {
    this.following.push(userIdToFollow);
    await this.save();

    await mongoose.model("User").findByIdAndUpdate(userIdToFollow, {
      $addToSet: { followers: this._id },
    });
  }
};

// Unfollow a user
userSchema.methods.unfollowUser = async function (
  userIdToUnfollow: mongoose.Types.ObjectId
) {
  this.following = this.following.filter(
    (id: mongoose.Types.ObjectId) => !id.equals(userIdToUnfollow)
  );
  await this.save();

  await mongoose
    .model("User")
    .findByIdAndUpdate(userIdToUnfollow, { $pull: { followers: this._id } });
};

// Find user by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() }).select("+password");
};

// Get all admins
userSchema.statics.getAdmins = function () {
  return this.find({ role: "admin" });
};

// Update lastLogin when user logs in
userSchema.methods.updateLastLogin = async function () {
  this.lastLogin = new Date();
  await this.save();
};

const User = model<IUser>("User", userSchema);

export default User;
