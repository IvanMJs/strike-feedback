import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Clear existing data
  await prisma.vulnerability.deleteMany()

  // Create sample vulnerabilities
  const vulnerabilities = [
    {
      title: "SQL Injection in User Authentication",
      description:
        "The login form is vulnerable to SQL injection attacks, allowing attackers to bypass authentication by manipulating SQL queries through user input fields.",
      severity: "CRITICAL",
      cwe: "CWE-89",
      cvssScore: 9.8,
      affectedSystems: JSON.stringify(["Web Application", "Database", "User Management"]),
      suggestedFix:
        "Implement parameterized queries, input validation, and prepared statements. Consider using an ORM with built-in SQL injection protection.",
      reporter: "Security Team",
      assignee: "John Doe",
      status: "IN_PROGRESS",
    },
    {
      title: "Stored Cross-Site Scripting in User Comments",
      description:
        "User-generated comments are not properly sanitized before being stored and displayed, allowing attackers to inject malicious scripts.",
      severity: "HIGH",
      cwe: "CWE-79",
      cvssScore: 7.2,
      affectedSystems: JSON.stringify(["Web Application", "Comment System"]),
      suggestedFix: "Implement proper input sanitization, output encoding, and Content Security Policy (CSP) headers.",
      reporter: "Bug Bounty Hunter",
      assignee: "Jane Smith",
      status: "PENDING_FIX",
    },
    {
      title: "Insecure Direct Object Reference in User Profiles",
      description:
        "Users can access other users' profile data by manipulating URL parameters, bypassing proper authorization checks.",
      severity: "MEDIUM",
      cwe: "CWE-639",
      cvssScore: 6.5,
      affectedSystems: JSON.stringify(["API", "Web Application", "User Profiles"]),
      suggestedFix:
        "Implement proper authorization checks, use indirect object references, and validate user permissions before data access.",
      reporter: "Internal Audit",
      assignee: "Mike Johnson",
      status: "SOLVED",
    },
    {
      title: "Missing Authentication on Admin Panel",
      description:
        "Administrative functions can be accessed without proper authentication, allowing unauthorized users to perform privileged operations.",
      severity: "CRITICAL",
      cwe: "CWE-306",
      cvssScore: 9.1,
      affectedSystems: JSON.stringify(["Admin Panel", "Web Application", "User Management"]),
      suggestedFix:
        "Implement robust authentication mechanisms, multi-factor authentication, and proper session management for admin functions.",
      reporter: "Penetration Tester",
      assignee: "Security Team",
      status: "PENDING_FIX",
    },
    {
      title: "Weak Password Policy Implementation",
      description:
        "The current password policy allows weak passwords and doesn't enforce complexity requirements, making accounts vulnerable to brute force attacks.",
      severity: "MEDIUM",
      cwe: "CWE-521",
      cvssScore: 5.3,
      affectedSystems: JSON.stringify(["Authentication System", "User Registration"]),
      suggestedFix:
        "Implement strong password requirements, password strength meter, and account lockout mechanisms after failed attempts.",
      reporter: "Security Audit",
      assignee: "Backend Team",
      status: "IN_PROGRESS",
    },
    {
      title: "Information Disclosure in Error Messages",
      description:
        "Detailed error messages expose sensitive system information including database structure and file paths to potential attackers.",
      severity: "LOW",
      cwe: "CWE-209",
      cvssScore: 3.7,
      affectedSystems: JSON.stringify(["Web Application", "API", "Error Handling"]),
      suggestedFix:
        "Implement generic error messages for users while logging detailed errors securely for developers. Use proper error handling middleware.",
      reporter: "Code Review",
      assignee: "Frontend Team",
      status: "PENDING_FIX",
    },
  ]

  for (const vulnerability of vulnerabilities) {
    await prisma.vulnerability.create({
      data: vulnerability,
    })
  }

  console.log("✅ Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
