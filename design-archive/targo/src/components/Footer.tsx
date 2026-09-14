import { Link } from "react-router-dom";
import { Container } from "./Container";

const SERVICE_LINKS = [
  "AI Agents & Automation",
  "Rapid Delivery & Iteration",
  "AI Enablement & Strategy",
  "Custom Software Development",
  "Data & Analytics",
  "Legacy Modernization",
];

const COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "About", to: "/company" },
  { label: "Process", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Trust", to: "/trust" },
  { label: "Insights", to: "/company" },
  { label: "Careers", to: "/company" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-edge bg-void">
      <Container className="py-64">
        <div className="grid grid-cols-1 gap-40 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-16">
            <Link to="/" className="text-body-lg font-bold text-snow">
              FolksTechAI
            </Link>
            <p className="max-w-[320px] text-body text-smoke">
              AI enablement for every business. Strategy to production
              software in weeks.
            </p>
            <a
              href="mailto:hello@folkstechai.com"
              className="text-body text-electric-iris hover:brightness-110"
            >
              hello@folkstechai.com
            </a>
          </div>

          <div className="flex flex-col gap-16">
            <span className="text-caption uppercase tracking-caption text-iron-veil">
              Services
            </span>
            <ul className="flex flex-col gap-12">
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <Link
                    to="/services"
                    className="text-body text-smoke transition-colors duration-150 hover:text-snow"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-16">
            <span className="text-caption uppercase tracking-caption text-iron-veil">
              Company
            </span>
            <ul className="flex flex-col gap-12">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-body text-smoke transition-colors duration-150 hover:text-snow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-64 flex flex-col gap-16 border-t border-slate-edge pt-24 text-caption text-iron-veil md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} FolksTechAI. All rights reserved.</span>
          <span>Made for humans, run by AI.</span>
        </div>
      </Container>
    </footer>
  );
}
