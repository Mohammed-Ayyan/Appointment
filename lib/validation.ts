// Appointment validation
export function validateAppointmentForm(data: any) {
  const errors: Record<string, string> = {};

  if (!data.patientName?.trim()) {
    errors.patientName = "Patient name is required";
  }

  if (!data.patientEmail?.trim()) {
    errors.patientEmail = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.patientEmail)) {
    errors.patientEmail = "Invalid email format";
  }

  if (!data.patientPhone?.trim()) {
    errors.patientPhone = "Phone number is required";
  }

  if (!data.date) {
    errors.date = "Date is required";
  }

  if (!data.time?.trim()) {
    errors.time = "Time is required";
  }

  if (!data.service?.trim()) {
    errors.service = "Service is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Provider validation
export function validateProviderForm(data: any) {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = "Provider name is required";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.specialty?.trim()) {
    errors.specialty = "Specialty is required";
  }

  if (!data.phone?.trim()) {
    errors.phone = "Phone number is required";
  }

  if (!data.location?.trim()) {
    errors.location = "Location is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Generic validation utilities
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.length >= 10;
}

export function validateRequired(value: string | undefined | null): boolean {
  return Boolean(value?.trim());
}
