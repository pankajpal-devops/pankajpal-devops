import { GraduationCap, Download, ExternalLink } from "lucide-react";
import { Section, Reveal } from "./Section";
import { EDUCATION, PROFILE } from "./data";

export function EducationResume() {
  return (
    <Section
      id="resume"
      label="07 / RECORD"
      title="EDUCATION & RESUME"
      description="Academic background and the full resume document."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr]">
        <Reveal>
          <div className="flex h-full flex-col gap-6">
            <div className="glass glass-hover rounded-xl p-6">
              <GraduationCap className="size-6 text-cyan" />
              <h3 className="mt-4 font-display text-lg font-bold leading-snug">
                {EDUCATION.degree}
              </h3>
              <p className="mt-2 font-mono text-xs tracking-[0.12em] text-muted-foreground">
                {EDUCATION.school}
              </p>
              <span className="mt-4 inline-block rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.12em] text-emerald">
                {EDUCATION.period}
              </span>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="mono-label">resume actions</div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={PROFILE.resume}
                  download="Pankaj-Pal-Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/15 px-4 py-2.5 font-mono text-[0.68rem] tracking-[0.16em] text-cyan transition hover:border-cyan/60 hover:bg-primary/25"
                >
                  <Download className="size-3.5" /> DOWNLOAD RESUME
                </a>
                <a
                  href={PROFILE.resume}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 font-mono text-[0.68rem] tracking-[0.16em] text-foreground transition hover:border-emerald/50 hover:text-emerald"
                >
                  <ExternalLink className="size-3.5" /> VIEW RESUME
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="glass rounded-xl p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="mono-label">Pankaj-Pal-Resume.pdf</span>
              <span className="font-mono text-[0.6rem] tracking-[0.12em] text-muted-foreground">
                PDF PREVIEW
              </span>
            </div>
            <iframe
              src={`${PROFILE.resume}#view=FitH`}
              title="Pankaj Pal resume preview"
              className="h-[560px] w-full rounded-lg border border-border/70 bg-surface/50"
            />
            <p className="mt-3 text-center text-[0.68rem] text-muted-foreground">
              Preview not loading?{" "}
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono tracking-[0.1em] text-cyan underline underline-offset-4"
              >
                OPEN THE PDF
              </a>
            </p>

          </div>
        </Reveal>
      </div>
    </Section>
  );
}
