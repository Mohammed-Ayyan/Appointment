import { db, pool } from "@/lib/db";
import { hash } from "bcryptjs";

// Sample data for seeding
const USERS = [
  {
    id: "user_1",
    name: "John Doe",
    email: "john@example.com",
    emailVerified: true,
    password: "password123",
    image: null,
    role: "patient",
    phone: "+1-555-0101",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "user_2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    emailVerified: true,
    password: "password123",
    image: null,
    role: "patient",
    phone: "+1-555-0102",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "provider_1",
    name: "Dr. Emily Johnson",
    email: "emily.johnson@example.com",
    emailVerified: true,
    password: "password123",
    image: null,
    role: "provider",
    phone: "+1-555-0201",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "provider_2",
    name: "Dr. Michael Chen",
    email: "michael.chen@example.com",
    emailVerified: true,
    password: "password123",
    image: null,
    role: "provider",
    phone: "+1-555-0202",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "admin_1",
    name: "Admin User",
    email: "admin@example.com",
    emailVerified: true,
    password: "password123",
    image: null,
    role: "admin",
    phone: "+1-555-0301",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

const SERVICE_PROVIDERS = [
  {
    userId: "provider_1",
    name: "Dr. Emily Johnson",
    specialty: "Dermatology",
    rating: 4.8,
    reviewsCount: 45,
    price: "$150-200",
    availability: "Mon-Fri, 9AM-5PM",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    specialization: "Dermatology, Cosmetic Procedures",
    experience: "12 years",
    location: "New York, NY",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    phone: "+1-555-0201",
    email: "emily.johnson@example.com",
    address: "123 Medical Plaza, New York, NY 10001",
    about:
      "Highly experienced dermatologist specializing in medical and cosmetic skin care treatments.",
    verified: true,
  },
  {
    userId: "provider_2",
    name: "Dr. Michael Chen",
    specialty: "Orthopedic Surgery",
    rating: 4.9,
    reviewsCount: 52,
    price: "$200-300",
    availability: "Mon-Fri, 8AM-6PM",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    specialization: "Orthopedic Surgery, Sports Medicine",
    experience: "15 years",
    location: "San Francisco, CA",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    phone: "+1-555-0202",
    email: "michael.chen@example.com",
    address: "456 Health Center, San Francisco, CA 94105",
    about:
      "Expert orthopedic surgeon with extensive experience in joint replacement and sports injuries.",
    verified: true,
  },
];

// Note: providerId will be set dynamically after providers are created
const APPOINTMENTS = [
  {
    userId: "user_1",
    patientName: "John Doe",
    patientEmail: "john@example.com",
    patientPhone: "+1-555-0101",
    date: "2024-02-15T10:00:00",
    time: "10:00 AM",
    service: "Consultation",
    duration: "30 minutes",
    status: "Confirmed",
    paymentAmount: 150.0,
    paymentStatus: "Paid",
    notes: "Initial consultation for skin condition",
    providerIndex: 0,
  },
  {
    userId: "user_1",
    patientName: "John Doe",
    patientEmail: "john@example.com",
    patientPhone: "+1-555-0101",
    date: "2024-02-20T14:00:00",
    time: "2:00 PM",
    service: "Treatment",
    duration: "60 minutes",
    status: "Pending",
    paymentAmount: 300.0,
    paymentStatus: "Unpaid",
    notes: "Follow-up treatment session",
    providerIndex: 1,
  },
  {
    userId: "user_2",
    patientName: "Sarah Smith",
    patientEmail: "sarah@example.com",
    patientPhone: "+1-555-0102",
    date: "2024-02-18T11:30:00",
    time: "11:30 AM",
    service: "Consultation",
    duration: "45 minutes",
    status: "Completed",
    paymentAmount: 175.0,
    paymentStatus: "Paid",
    notes: "Sports injury assessment",
    providerIndex: 1,
  },
];

const REVIEWS = [
  {
    userId: "user_1",
    name: "John Doe",
    rating: 5,
    date: "2024-02-01",
    comment: "Excellent service! Dr. Johnson is very professional and caring.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    providerIndex: 0,
  },
  {
    userId: "user_2",
    name: "Sarah Smith",
    rating: 4,
    date: "2024-02-05",
    comment: "Great experience. Would recommend to others.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    providerIndex: 1,
  },
];

const TIME_SLOTS = [
  {
    providerIndex: 0,
    date: "2024-02-16",
    startTime: "09:00",
    endTime: "09:30",
    isAvailable: false,
  },
  {
    providerIndex: 0,
    date: "2024-02-16",
    startTime: "09:30",
    endTime: "10:00",
    isAvailable: true,
  },
  {
    providerIndex: 0,
    date: "2024-02-16",
    startTime: "10:00",
    endTime: "10:30",
    isAvailable: true,
  },
  {
    providerIndex: 1,
    date: "2024-02-17",
    startTime: "14:00",
    endTime: "14:30",
    isAvailable: true,
  },
  {
    providerIndex: 1,
    date: "2024-02-17",
    startTime: "14:30",
    endTime: "15:00",
    isAvailable: true,
  },
];

async function seed() {
  try {
    console.log("🌱 Starting database seed...");

    const client = await pool.connect();

    try {
      // Clear existing data (in reverse order of foreign keys)
      console.log("Clearing existing data...");
      await client.query("DELETE FROM provider_language");
      await client.query("DELETE FROM provider_specialization");
      await client.query("DELETE FROM time_slot");
      await client.query("DELETE FROM review");
      await client.query("DELETE FROM appointment");
      await client.query("DELETE FROM service_provider");
      await client.query("DELETE FROM account");
      await client.query("DELETE FROM session");
      await client.query("DELETE FROM verification");
      await client.query("DELETE FROM \"user\"");

      // Seed users with hashed passwords
      console.log("Seeding users...");
      for (const user of USERS) {
        const hashedPassword = user.password
          ? await hash(user.password, 10)
          : null;
        await client.query(
          `INSERT INTO "user" (id, name, email, "emailVerified", image, password, role, phone, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            user.id,
            user.name,
            user.email,
            user.emailVerified,
            user.image,
            hashedPassword,
            user.role,
            user.phone,
            user.createdAt,
            user.updatedAt,
          ]
        );
      }
      console.log(`✓ Seeded ${USERS.length} users`);

      // Seed service providers
      console.log("Seeding service providers...");
      const providerResults = [];
      for (const provider of SERVICE_PROVIDERS) {
        const result = await client.query(
          `INSERT INTO service_provider (
            "userId", name, specialty, rating, "reviewsCount", price, availability,
            image, specialization, experience, location, avatar, phone, email, address, about, verified,
            "createdAt", "updatedAt"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW(), NOW())
          RETURNING id`,
          [
            provider.userId,
            provider.name,
            provider.specialty,
            provider.rating,
            provider.reviewsCount,
            provider.price,
            provider.availability,
            provider.image,
            provider.specialization,
            provider.experience,
            provider.location,
            provider.avatar,
            provider.phone,
            provider.email,
            provider.address,
            provider.about,
            provider.verified,
          ]
        );
        providerResults.push(result.rows[0]);
      }
      console.log(`✓ Seeded ${providerResults.length} service providers`);

      // Seed appointments
      console.log("Seeding appointments...");
      for (const appointment of APPOINTMENTS) {
        const providerId = providerResults[appointment.providerIndex]?.id;
        if (!providerId) {
          console.warn(
            `Warning: Provider not found for appointment, skipping...`
          );
          continue;
        }
        await client.query(
          `INSERT INTO appointment (
            "userId", "patientName", "patientEmail", "patientPhone", date, time,
            service, duration, status, "paymentAmount", "paymentStatus", notes, "providerId",
            "createdAt", "updatedAt"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())`,
          [
            appointment.userId,
            appointment.patientName,
            appointment.patientEmail,
            appointment.patientPhone,
            appointment.date,
            appointment.time,
            appointment.service,
            appointment.duration,
            appointment.status,
            appointment.paymentAmount,
            appointment.paymentStatus,
            appointment.notes,
            providerId,
          ]
        );
      }
      console.log(`✓ Seeded ${APPOINTMENTS.length} appointments`);

      // Seed reviews
      console.log("Seeding reviews...");
      for (const review of REVIEWS) {
        const providerId = providerResults[review.providerIndex]?.id;
        if (!providerId) {
          console.warn(`Warning: Provider not found for review, skipping...`);
          continue;
        }
        await client.query(
          `INSERT INTO review (
            "userId", name, rating, date, comment, avatar, "providerId", "createdAt"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
          [
            review.userId,
            review.name,
            review.rating,
            review.date,
            review.comment,
            review.avatar,
            providerId,
          ]
        );
      }
      console.log(`✓ Seeded ${REVIEWS.length} reviews`);

      // Seed time slots
      console.log("Seeding time slots...");
      for (const slot of TIME_SLOTS) {
        const providerId = providerResults[slot.providerIndex]?.id;
        if (!providerId) {
          console.warn(`Warning: Provider not found for time slot, skipping...`);
          continue;
        }
        await client.query(
          `INSERT INTO time_slot (
            "providerId", date, "startTime", "endTime", "isAvailable", "createdAt"
          ) VALUES ($1, $2, $3, $4, $5, NOW())`,
          [
            providerId,
            slot.date,
            slot.startTime,
            slot.endTime,
            slot.isAvailable,
          ]
        );
      }
      console.log(`✓ Seeded ${TIME_SLOTS.length} time slots`);

      console.log(
        "\n✅ Database seeded successfully!\n\nTest credentials:"
      );
      console.log("Admin: admin@example.com / password123");
      console.log("Provider: emily.johnson@example.com / password123");
      console.log("Patient: john@example.com / password123");
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed().then(() => {
  console.log("Seed script completed");
  process.exit(0);
});
