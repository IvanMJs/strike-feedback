// Common CWE database with searchable descriptions
export interface CWE {
  id: string
  name: string
  description: string
  category: string
}

export const commonCWEs: CWE[] = [
  // OWASP Top 10 Related
  {
    id: "CWE-79",
    name: "Cross-site Scripting (XSS)",
    description: "Improper neutralization of input during web page generation",
    category: "Web Security"
  },
  {
    id: "CWE-89",
    name: "SQL Injection",
    description: "Improper neutralization of special elements used in SQL commands",
    category: "Web Security"
  },
  {
    id: "CWE-20",
    name: "Improper Input Validation",
    description: "Product does not validate or incorrectly validates input",
    category: "Input Validation"
  },
  {
    id: "CWE-352",
    name: "Cross-Site Request Forgery (CSRF)",
    description: "Web application does not verify that requests came from user",
    category: "Web Security"
  },
  {
    id: "CWE-862",
    name: "Missing Authorization",
    description: "Software does not perform authorization check when accessing resource",
    category: "Authorization"
  },
  {
    id: "CWE-269",
    name: "Improper Privilege Management",
    description: "Software does not properly assign, modify, track privileges",
    category: "Authorization"
  },
  {
    id: "CWE-200",
    name: "Information Exposure",
    description: "Product exposes sensitive information to unauthorized actors",
    category: "Information Disclosure"
  },
  {
    id: "CWE-22",
    name: "Path Traversal",
    description: "Software uses external input to construct pathname for file/directory",
    category: "File Handling"
  },
  {
    id: "CWE-434",
    name: "Unrestricted Upload",
    description: "Software allows attacker to upload dangerous file types",
    category: "File Handling"
  },
  {
    id: "CWE-78",
    name: "OS Command Injection",
    description: "Software constructs OS command using externally-influenced input",
    category: "Command Injection"
  },
  
  // Authentication & Session Management
  {
    id: "CWE-287",
    name: "Improper Authentication",
    description: "When actor claims to have identity, software does not prove the claim",
    category: "Authentication"
  },
  {
    id: "CWE-306",
    name: "Missing Authentication",
    description: "Software does not perform authentication for critical functionality",
    category: "Authentication"
  },
  {
    id: "CWE-384",
    name: "Session Fixation",
    description: "Authenticating user without invalidating existing session ID",
    category: "Session Management"
  },
  {
    id: "CWE-613",
    name: "Insufficient Session Expiration",
    description: "Software in security-sensitive context allows session to remain active",
    category: "Session Management"
  },
  
  // Cryptography
  {
    id: "CWE-327",
    name: "Broken Crypto Algorithm",
    description: "Use of broken or risky cryptographic algorithm",
    category: "Cryptography"
  },
  {
    id: "CWE-328",
    name: "Reversible One-Way Hash",
    description: "Product uses weak hash function that is reversible",
    category: "Cryptography"
  },
  {
    id: "CWE-311",
    name: "Missing Encryption",
    description: "Software does not encrypt sensitive or critical information",
    category: "Cryptography"
  },
  
  // Memory Safety
  {
    id: "CWE-119",
    name: "Buffer Overflow",
    description: "Software performs operations on memory buffer beyond its bounds",
    category: "Memory Safety"
  },
  {
    id: "CWE-125",
    name: "Out-of-bounds Read",
    description: "Software reads data past end or before beginning of buffer",
    category: "Memory Safety"
  },
  {
    id: "CWE-416",
    name: "Use After Free",
    description: "Referencing memory after it has been freed",
    category: "Memory Safety"
  },
  
  // Configuration & Deployment
  {
    id: "CWE-16",
    name: "Configuration",
    description: "Weaknesses in this category are typically introduced during configuration",
    category: "Configuration"
  },
  {
    id: "CWE-798",
    name: "Hard-coded Credentials",
    description: "Software contains hard-coded credentials for its own authentication",
    category: "Configuration"
  },
  {
    id: "CWE-502",
    name: "Unsafe Deserialization",
    description: "Application deserializes untrusted data without verification",
    category: "Serialization"
  },
  
  // Business Logic
  {
    id: "CWE-840",
    name: "Business Logic Errors",
    description: "Weaknesses in this category identify some of the underlying problems",
    category: "Business Logic"
  },
  {
    id: "CWE-639",
    name: "Insecure Direct Object References",
    description: "System's authorization model allows users to access each other's data",
    category: "Business Logic"
  },
  
  // API Security
  {
    id: "CWE-918",
    name: "Server-Side Request Forgery (SSRF)",
    description: "Web server receives URL and retrieves contents without validation",
    category: "API Security"
  },
  {
    id: "CWE-776",
    name: "XML External Entity (XXE)",
    description: "Software processes XML document that can contain XML entities with URIs",
    category: "API Security"
  }
]

export const cweCategories = [
  "Web Security",
  "Authentication", 
  "Authorization",
  "Input Validation",
  "Information Disclosure",
  "File Handling",
  "Command Injection",
  "Session Management",
  "Cryptography",
  "Memory Safety",
  "Configuration",
  "Serialization",
  "Business Logic",
  "API Security"
]

export function searchCWEs(query: string): CWE[] {
  if (!query.trim()) return commonCWEs

  const lowerQuery = query.toLowerCase()
  
  return commonCWEs.filter(cwe => 
    cwe.id.toLowerCase().includes(lowerQuery) ||
    cwe.name.toLowerCase().includes(lowerQuery) ||
    cwe.description.toLowerCase().includes(lowerQuery) ||
    cwe.category.toLowerCase().includes(lowerQuery)
  )
}

export function getCWEById(id: string): CWE | undefined {
  return commonCWEs.find(cwe => cwe.id === id)
}
