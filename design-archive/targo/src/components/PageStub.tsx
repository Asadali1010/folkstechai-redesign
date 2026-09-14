import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Container } from "./Container";
import { PillButton } from "./PillButton";

type PageStubProps = {
  title: string;
};

export function PageStub({ title }: PageStubProps) {
  return (
    <div className="flex min-h-screen flex-col bg-void">
      <Navbar />
      <main className="flex flex-1 items-center justify-center pt-64">
        <Container className="flex flex-col items-center gap-24 py-160 text-center">
          <span className="rounded-full border border-slate-edge px-16 py-8 text-caption text-frost">
            {title}
          </span>
          <h1 className="text-display-sm font-display font-semibold text-snow">
            Redesign coming soon.
          </h1>
          <p className="max-w-[480px] text-body-lg text-smoke">
            We&apos;re still bringing the {title.toLowerCase()} page into the
            new FolksTechAI look. In the meantime, get in touch and we&apos;ll
            walk you through it directly.
          </p>
          <PillButton variant="primary" href="mailto:hello@folkstechai.com">
            Book a free consultation
          </PillButton>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
