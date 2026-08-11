export const PROFILE = {
  name: "Pankaj Pal",
  role: "DevOps Engineer",
  email: "pankajpal1163@gmail.com",
  phone: "+91 7302554281",
  linkedin: "https://linkedin.com/in/pankaj-pal",
  linkedinLabel: "linkedin.com/in/pankaj-pal",
  github: "https://github.com/pankajpal-devops",
  githubLabel: "github.com/pankajpal-devops",
  resume: "/resume/Pankaj-Pal-Resume.pdf",
  summary:
    "Cloud & DevOps Engineer with hands-on experience in Microsoft Azure, Azure DevOps, Terraform, Linux, Git/GitHub and Azure Networking.",
  fullSummary:
    "Cloud & DevOps Engineer with hands-on experience in Microsoft Azure, Azure DevOps, Terraform, Linux, Git/GitHub, and Azure Networking. Skilled in Infrastructure as Code (IaC), Azure Landing Zone, CI/CD pipelines, cloud infrastructure deployment, automation, and building secure, scalable cloud solutions. Seeking an entry-level Cloud/DevOps Engineer role to apply my skills and continuously grow in cloud technologies.",
};

export const NAV_ITEMS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "ARCHITECTURE", href: "#architecture" },
  { label: "CONTACT", href: "#contact" },
];

export const ROTATING_PHRASES = [
  "AZURE INFRASTRUCTURE",
  "TERRAFORM AUTOMATION",
  "CI/CD PIPELINES",
  "CLOUD ENGINEERING",
];

export const SKILL_GROUPS: {
  title: string;
  icon: "cloud" | "code" | "box" | "pipeline" | "git" | "terminal" | "network" | "server" | "brain";
  items: string[];
}[] = [
  { title: "CLOUD", icon: "cloud", items: ["Microsoft Azure"] },
  {
    title: "INFRASTRUCTURE AS CODE",
    icon: "code",
    items: ["Terraform", "Reusable Terraform Modules"],
  },
  { title: "CONTAINERS", icon: "box", items: ["Docker", "Kubernetes (Basics)"] },
  { title: "CI/CD", icon: "pipeline", items: ["Azure DevOps", "GitHub Actions"] },
  { title: "VERSION CONTROL", icon: "git", items: ["Git", "GitHub"] },
  { title: "OPERATING SYSTEMS", icon: "terminal", items: ["Linux (Ubuntu)", "Windows"] },
  {
    title: "NETWORKING",
    icon: "network",
    items: ["VNet", "Subnet", "NSG", "TCP/IP", "Load Balancer", "Application Gateway", "DNS", "VPNs"],
  },
  {
    title: "AZURE SERVICES",
    icon: "server",
    items: ["Resource Group", "Virtual Machine", "Azure Bastion", "Storage Account"],
  },
  {
    title: "CONCEPTS",
    icon: "brain",
    items: [
      "DevOps",
      "Cloud Computing",
      "Infrastructure Automation",
      "Azure Landing Zone",
      "Hub-Spoke Architecture",
    ],
  },
];

export const EXPERIENCE = {
  role: "DevOps Engineer",
  position: "DevOps Intern",
  company: "DevOps Insider",
  period: "December 2025 — June 2026",
  points: [
    "Automated Azure infrastructure deployment using Terraform",
    "Built and maintained CI/CD pipelines",
    "Managed Azure resources including VMs, VNets, Storage Accounts and NSGs",
    "Configured monitoring and alerting",
    "Used Git and reusable Terraform modules",
    "Assisted in troubleshooting deployment and Linux issues",
  ],
};

export const PROJECTS = [
  {
    id: "01",
    title: "Reusable Infrastructure Deployment Using Terraform on Microsoft Azure",
    tech: ["Terraform", "Microsoft Azure", "IaC"],
    description: "Developed reusable Terraform modules for Azure infrastructure.",
    highlights: [
      "Provisioned VMs, VNets, Subnets and Storage Accounts using Infrastructure as Code (IaC)",
      "Automated resource deployment using for_each",
      "Managed Terraform state files to track infrastructure changes and maintain desired state",
      "Used Terraform lock files to ensure consistent provider versions across environments",
    ],
  },
  {
    id: "02",
    title: "Azure Network Infrastructure & Security Setup",
    tech: ["Azure VNet", "Subnet", "NSG", "Azure Bastion", "Virtual Machine", "VPN Gateway"],
    description: "Built and secured Azure network infrastructure with controlled, private access paths.",
    highlights: [
      "Built Azure VNets and Subnets for secure network infrastructure",
      "Configured NSGs to control and secure network traffic",
      "Configured Azure Bastion for secure VM access",
      "Configured VPN Gateway for secure connectivity",
      "Provisioned and managed Azure Virtual Machines",
      "Troubleshot network connectivity issues and ensured smooth resource communication",
    ],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Computer Applications (BCA)",
  school: "JP Institute of Technology",
  period: "2023 — 2026",
};

export const TERMINAL_LINES = [
  { cmd: "terraform init", out: "Terraform has been successfully initialized!" },
  { cmd: "terraform plan", out: "Plan: 7 to add, 0 to change, 0 to destroy." },
  { cmd: "terraform apply", out: "Apply complete! Resources: 7 added." },
  { cmd: "az login", out: "Subscription: azure-landing-zone   State: Enabled" },
  { cmd: "git push origin main", out: "main -> main   pipeline triggered" },
  { cmd: "docker build .", out: "Successfully tagged app:latest" },
  { cmd: "kubectl get pods", out: "app-7c9d   1/1   Running   0   42s" },
];
