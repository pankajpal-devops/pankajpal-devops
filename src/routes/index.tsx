import { createFileRoute } from "@tanstack/react-router";
import { BootScreen } from "@/components/portfolio/BootScreen";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { CommandBackground } from "@/components/portfolio/CommandBackground";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Architecture } from "@/components/portfolio/Architecture";
import { Pipeline } from "@/components/portfolio/Pipeline";
import { TerminalPanel } from "@/components/portfolio/TerminalPanel";
import { EducationResume } from "@/components/portfolio/EducationResume";
import { Contact } from "@/components/portfolio/Contact";

const TITLE = "Pankaj Pal | DevOps Engineer | Azure | Terraform";
const DESCRIPTION =
  "Portfolio of Pankaj Pal, DevOps Engineer specializing in Microsoft Azure, Terraform, Infrastructure as Code, CI/CD, Linux and cloud networking.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Pankaj Pal, DevOps Engineer, Microsoft Azure, Terraform, Infrastructure as Code, CI/CD, Azure DevOps, Linux, Azure Networking",
      },
      { name: "author", content: "Pankaj Pal" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Pankaj Pal",
          jobTitle: "DevOps Engineer",
          email: "mailto:pankajpal1163@gmail.com",
          telephone: "+91 7302554281",
          sameAs: ["https://linkedin.com/in/pankaj-pal", "https://github.com/pankajpal-devops"],
          knowsAbout: [
            "Microsoft Azure",
            "Terraform",
            "Infrastructure as Code",
            "CI/CD",
            "Azure Networking",
            "Linux",
          ],
          alumniOf: { "@type": "CollegeOrUniversity", name: "JP Institute of Technology" },
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <BootScreen />
      <ScrollProgress />
      <CommandBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Architecture />
        <Pipeline />
        <TerminalPanel />
        <EducationResume />
        <Contact />
      </main>
    </div>
  );
}
