import { lazy, Suspense } from "react";
import { Container } from "./Container";
import { PillButton } from "./PillButton";

const HeroSphere = lazy(() =>
  import("./HeroSphere").then((mod) => ({ default: mod.HeroSphere })),
);

const CODE_LINES: { indent: number; tokens: { text: string; cls: string }[] }[] = [
  { indent: 0, tokens: [{ text: "const agent = await", cls: "text-frost" }, { text: " defineAgent", cls: "text-electric-iris" }, { text: "({", cls: "text-frost" }] },
  { indent: 1, tokens: [{ text: "task:", cls: "text-smoke" }, { text: " \"triage_inbound_lead\"", cls: "text-ember-pulse" }, { text: ",", cls: "text-frost" }] },
  { indent: 1, tokens: [{ text: "guardrails: {", cls: "text-smoke" }] },
  { indent: 2, tokens: [{ text: "human_in_loop:", cls: "text-smoke" }, { text: " true", cls: "text-electric-iris" }, { text: ",", cls: "text-frost" }] },
  { indent: 2, tokens: [{ text: "pii:", cls: "text-smoke" }, { text: " \"redacted\"", cls: "text-ember-pulse" }, { text: ",", cls: "text-frost" }] },
  { indent: 2, tokens: [{ text: "confidence_threshold:", cls: "text-smoke" }, { text: " 0.9", cls: "text-electric-iris" }, { text: ",", cls: "text-frost" }] },
  { indent: 2, tokens: [{ text: "escalate_below_threshold:", cls: "text-smoke" }, { text: " true", cls: "text-electric-iris" }] },
  { indent: 1, tokens: [{ text: "},", cls: "text-frost" }] },
  { indent: 0, tokens: [{ text: "});", cls: "text-frost" }] },
  { indent: 0, tokens: [{ text: "", cls: "text-frost" }] },
  { indent: 0, tokens: [{ text: "// production in 3 weeks", cls: "text-iron-veil" }] },
];

export function AuroraHero() {
  return (
    <section className="relative overflow-hidden bg-void pt-160 pb-160 md:pt-240">
      {/* Aurora beam — the only two-color iris→ember vertical gradient treatment
          on the page. The final-CTA band (Home.tsx) echoes a single hue in a
          soft radial glow of a different shape/size; it's deliberately not a
          repeat of this beam. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-full w-[520px] -translate-x-1/2 opacity-60 blur-[110px]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, var(--color-electric-iris) 0%, rgb(from var(--color-electric-iris) r g b / 0.35) 35%, rgb(from var(--color-ember-pulse) r g b / 0.35) 65%, var(--color-ember-pulse) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-void)_75%)]"
      />

      <Container className="relative flex flex-col items-center text-center">
        <div className="relative flex w-full flex-col items-center">
          {/* Ambient 3D centerpiece — sits behind the headline, same iris/ember
              palette as the aurora beam. Fixed-size wrapper keeps it out of
              document flow; hidden on the smallest screens so it never
              collides with the text. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-70 sm:block sm:h-[380px] sm:w-[380px] md:h-[460px] md:w-[460px]"
          >
            <Suspense fallback={null}>
              <HeroSphere />
            </Suspense>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <span className="mb-24 inline-flex items-center gap-8 rounded-full border border-slate-edge px-16 py-8 text-caption text-frost">
              <span className="h-8 w-8 rounded-full bg-ember-pulse" aria-hidden="true" />
              AI enablement, delivered in weeks
            </span>

            <h1 className="max-w-[820px] text-display-sm font-display font-semibold text-snow md:text-display">
              AI enablement for every business.
            </h1>

            <p className="mt-24 max-w-[620px] text-body-lg text-frost md:text-subheading">
              We make AI trustworthy, and we deliver it fast. From strategy to
              production software in weeks — with humans in the loop, your
              data kept private, and outcomes you can measure.
            </p>

            <div className="mt-40 flex flex-col items-center gap-16 sm:flex-row">
              <PillButton variant="primary" href="mailto:hello@folkstechai.com">
                Book a free consultation
              </PillButton>
              <PillButton variant="ghost" to="/work">
                See our work
              </PillButton>
            </div>
          </div>
        </div>

        {/* Floating code-snippet panel, standing in for a product screenshot */}
        <div className="relative mt-64 w-full max-w-[640px] self-end text-left md:mt-160 md:translate-x-16">
          <div className="rounded-xl border border-slate-edge bg-charcoal-card p-24 shadow-xl">
            <div className="mb-16 flex items-center gap-8">
              <span className="h-8 w-8 rounded-full bg-iron-veil" />
              <span className="h-8 w-8 rounded-full bg-smoke" />
              <span className="h-8 w-8 rounded-full bg-ash" />
              <span className="ml-8 text-caption text-iron-veil">
                agent.config.ts
              </span>
            </div>
            <pre className="overflow-x-auto text-body leading-body">
              {CODE_LINES.map((line, i) => (
                <div key={i} style={{ paddingLeft: line.indent * 20 }}>
                  {line.tokens.map((t, j) => (
                    <span key={j} className={t.cls}>
                      {t.text}
                    </span>
                  ))}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </Container>
    </section>
  );
}
