const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.appointment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.timeSlot.deleteMany();
  await prisma.providerSpecialization.deleteMany();
  await prisma.providerLanguage.deleteMany();
  await prisma.serviceProvider.deleteMany();

  // Create Service Providers
  const provider1 = await prisma.serviceProvider.create({
    data: {
      name: "Dr. Michael Brown",
      specialty: "Dental Specialist",
      specialization: "Dental Specialist",
      rating: 4.8,
      reviewsCount: 120,
      price: "$120/hour",
      availability: "Available Today",
      image: "/placeholder.svg?height=80&width=80",
      experience: "15 years",
      location: "New York, NY",
      avatar: "/placeholder.svg?height=96&width=96",
      phone: "+1 (555) 123-4567",
      email: "dr.brown@example.com",
      address: "456 Dental Ave, Suite 200, New York, NY 10001",
      about:
        "Dr. Michael Brown is a highly experienced dental specialist known for his expertise in cosmetic dentistry and oral surgery. He has successfully treated thousands of patients and is committed to providing the highest quality of dental care.",
      languages: {
        create: [{ language: "English" }, { language: "Spanish" }],
      },
      specializations: {
        create: [
          { specialization: "Cosmetic Dentistry" },
          { specialization: "Oral Surgery" },
          { specialization: "Dental Implants" },
          { specialization: "Orthodontics" },
        ],
      },
      reviewsList: {
        create: [
          {
            name: "Emma Thompson",
            rating: 5,
            date: "2 days ago",
            comment:
              "Excellent service! Dr. Brown was very thorough and professional. The entire procedure was painless and the results are amazing.",
            avatar: "/placeholder.svg?height=48&width=48",
          },
          {
            name: "John Davis",
            rating: 4,
            date: "1 week ago",
            comment:
              "Very knowledgeable and patient-focused. The staff was friendly and the facility is modern and clean.",
            avatar: "/placeholder.svg?height=48&width=48",
          },
          {
            name: "Sarah Mitchell",
            rating: 5,
            date: "2 weeks ago",
            comment:
              "Best dental experience I've ever had. Dr. Brown explained everything clearly and made me feel comfortable throughout.",
            avatar: "/placeholder.svg?height=48&width=48",
          },
        ],
      },
      timeSlots: {
        create: [
          { time: "9:00 AM", day: "Monday" },
          { time: "10:00 AM", day: "Monday" },
          { time: "11:00 AM", day: "Monday" },
          { time: "2:00 PM", day: "Monday" },
          { time: "3:00 PM", day: "Monday" },
          { time: "4:00 PM", day: "Monday" },
        ],
      },
    },
  });

  const provider2 = await prisma.serviceProvider.create({
    data: {
      name: "Dr. Emily Wilson",
      specialty: "Physiotherapist",
      specialization: "Pediatrician",
      rating: 4.9,
      reviewsCount: 89,
      price: "$90/hour",
      availability: "Available Tomorrow",
      image: "/placeholder.svg?height=80&width=80",
      experience: "12 years",
      location: "Houston, TX",
      avatar: "/placeholder.svg?height=96&width=96",
      phone: "+1 (555) 223-7890",
      email: "dr.wilson@example.com",
      address: "789 Pediatric St, Houston, TX 77002",
      about:
        "Dr. Emily Wilson is a compassionate pediatrician with over 12 years of experience in child healthcare. She specializes in preventive care and developmental assessments.",
      languages: {
        create: [{ language: "English" }, { language: "Spanish" }],
      },
      specializations: {
        create: [
          { specialization: "Child Immunization" },
          { specialization: "Newborn Care" },
          { specialization: "Growth Monitoring" },
        ],
      },
      reviewsList: {
        create: [
          {
            name: "Sophia Adams",
            rating: 5,
            date: "3 days ago",
            comment: "Handled my baby with great care! Highly recommended.",
            avatar: "/placeholder.svg?height=48&width=48",
          },
          {
            name: "Mark Johnson",
            rating: 5,
            date: "1 week ago",
            comment:
              "Dr. Wilson is incredibly patient and knowledgeable. My kids love visiting her.",
            avatar: "/placeholder.svg?height=48&width=48",
          },
        ],
      },
      timeSlots: {
        create: [
          { time: "9:00 AM", day: "Tuesday" },
          { time: "11:30 AM", day: "Tuesday" },
          { time: "2:00 PM", day: "Wednesday" },
          { time: "3:30 PM", day: "Wednesday" },
        ],
      },
    },
  });

  const provider3 = await prisma.serviceProvider.create({
    data: {
      name: "Dr. James Smith",
      specialty: "General Practitioner",
      specialization: "General Medicine",
      rating: 4.7,
      reviewsCount: 156,
      price: "$100/hour",
      availability: "Available Today",
      image: "/placeholder.svg?height=80&width=80",
      experience: "20 years",
      location: "Chicago, IL",
      avatar: "/placeholder.svg?height=96&width=96",
      phone: "+1 (555) 987-6543",
      email: "dr.smith@example.com",
      address: "321 Medical Center Blvd, Chicago, IL 60601",
      about:
        "Dr. James Smith is a seasoned general practitioner with two decades of experience. He provides comprehensive primary care services and is known for his holistic approach to medicine.",
      languages: {
        create: [
          { language: "English" },
          { language: "French" },
          { language: "Hindi" },
        ],
      },
      specializations: {
        create: [
          { specialization: "Internal Medicine" },
          { specialization: "Preventive Care" },
          { specialization: "Chronic Disease Management" },
          { specialization: "Geriatric Care" },
        ],
      },
      reviewsList: {
        create: [
          {
            name: "Lisa Chen",
            rating: 5,
            date: "5 days ago",
            comment:
              "Dr. Smith is the best GP I've ever visited. He takes his time to listen and explain everything.",
            avatar: "/placeholder.svg?height=48&width=48",
          },
          {
            name: "Robert Taylor",
            rating: 4,
            date: "2 weeks ago",
            comment:
              "Great doctor with excellent bedside manner. The wait time can be a bit long but worth it.",
            avatar: "/placeholder.svg?height=48&width=48",
          },
        ],
      },
      timeSlots: {
        create: [
          { time: "8:00 AM", day: "Monday" },
          { time: "9:30 AM", day: "Monday" },
          { time: "11:00 AM", day: "Tuesday" },
          { time: "1:00 PM", day: "Tuesday" },
          { time: "3:00 PM", day: "Wednesday" },
          { time: "4:30 PM", day: "Thursday" },
        ],
      },
    },
  });

  // Create sample appointments
  await prisma.appointment.createMany({
    data: [
      {
        patientName: "Emma Thompson",
        patientEmail: "emma.thompson@example.com",
        patientPhone: "+1 (555) 123-4567",
        date: new Date("2025-01-15"),
        time: "09:00 AM",
        service: "Dental Cleaning",
        duration: "45 mins",
        status: "Pending",
        paymentAmount: 150,
        paymentStatus: "Unpaid",
        providerId: provider1.id,
      },
      {
        patientName: "John Davis",
        patientEmail: "john.davis@example.com",
        patientPhone: "+1 (555) 987-6543",
        date: new Date("2025-01-15"),
        time: "10:00 AM",
        service: "Root Canal",
        duration: "1.5 hrs",
        status: "Confirmed",
        paymentAmount: 450,
        paymentStatus: "Paid",
        providerId: provider1.id,
      },
      {
        patientName: "Sarah Wilson",
        patientEmail: "sarah.wilson@example.com",
        patientPhone: "+1 (555) 456-7890",
        date: new Date("2025-01-16"),
        time: "11:00 AM",
        service: "Teeth Whitening",
        duration: "1 hr",
        status: "Pending",
        paymentAmount: 200,
        paymentStatus: "Unpaid",
        providerId: provider1.id,
      },
      {
        patientName: "Michael Park",
        patientEmail: "michael.park@example.com",
        patientPhone: "+1 (555) 321-9876",
        date: new Date("2025-01-15"),
        time: "2:00 PM",
        service: "General Checkup",
        duration: "30 mins",
        status: "Completed",
        paymentAmount: 100,
        paymentStatus: "Paid",
        providerId: provider3.id,
      },
    ],
  });

  console.log("✅ Seed data created successfully!");
  console.log(`   - ${3} service providers`);
  console.log(`   - ${4} appointments`);
  console.log(`   - Reviews, specializations, languages, and time slots populated`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
