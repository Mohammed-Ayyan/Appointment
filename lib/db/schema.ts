import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  doublePrecision,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Better Auth tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  password: text("password"),
  role: text("role").default("user"),
  phone: text("phone"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: timestamp("expiresAt"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

// App tables
export const serviceProvider = pgTable("service_provider", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("userId"),
  name: text("name").notNull(),
  specialty: text("specialty"),
  rating: doublePrecision("rating").default(0),
  reviewsCount: integer("reviewsCount").default(0),
  price: varchar("price"),
  availability: text("availability"),
  image: text("image"),
  specialization: text("specialization"),
  experience: text("experience"),
  location: text("location"),
  avatar: text("avatar"),
  phone: text("phone"),
  email: text("email").unique().notNull(),
  address: text("address"),
  about: text("about"),
  verified: boolean("verified").default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const appointment = pgTable("appointment", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("userId"),
  patientName: text("patientName").notNull(),
  patientEmail: text("patientEmail"),
  patientPhone: text("patientPhone"),
  date: timestamp("date").notNull(),
  time: varchar("time").notNull(),
  service: varchar("service").notNull(),
  duration: varchar("duration"),
  status: varchar("status").default("Pending"),
  paymentAmount: doublePrecision("paymentAmount").default(0),
  paymentStatus: varchar("paymentStatus").default("Unpaid"),
  notes: text("notes"),
  providerId: integer("providerId")
    .notNull()
    .references(() => serviceProvider.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const review = pgTable("review", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("userId"),
  name: text("name").notNull(),
  rating: integer("rating").notNull(),
  date: varchar("date").notNull(),
  comment: text("comment").notNull(),
  avatar: text("avatar"),
  providerId: integer("providerId")
    .notNull()
    .references(() => serviceProvider.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const timeSlot = pgTable("time_slot", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  providerId: integer("providerId")
    .notNull()
    .references(() => serviceProvider.id, { onDelete: "cascade" }),
  date: varchar("date").notNull(),
  startTime: varchar("startTime").notNull(),
  endTime: varchar("endTime").notNull(),
  isAvailable: boolean("isAvailable").default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const providerSpecialization = pgTable("provider_specialization", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  providerId: integer("providerId")
    .notNull()
    .references(() => serviceProvider.id, { onDelete: "cascade" }),
  specialization: varchar("specialization").notNull(),
});

export const providerLanguage = pgTable("provider_language", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  providerId: integer("providerId")
    .notNull()
    .references(() => serviceProvider.id, { onDelete: "cascade" }),
  language: varchar("language").notNull(),
});

// Relations
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  appointments: many(appointment),
  reviews: many(review),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const serviceProviderRelations = relations(
  serviceProvider,
  ({ many }) => ({
    appointments: many(appointment),
    reviews: many(review),
    timeSlots: many(timeSlot),
    specializations: many(providerSpecialization),
    languages: many(providerLanguage),
  })
);

export const appointmentRelations = relations(appointment, ({ one }) => ({
  provider: one(serviceProvider, {
    fields: [appointment.providerId],
    references: [serviceProvider.id],
  }),
  user: one(user, {
    fields: [appointment.userId],
    references: [user.id],
  }),
}));

export const reviewRelations = relations(review, ({ one }) => ({
  provider: one(serviceProvider, {
    fields: [review.providerId],
    references: [serviceProvider.id],
  }),
  user: one(user, {
    fields: [review.userId],
    references: [user.id],
  }),
}));
