import Link from "next/link";
import { Header } from "@/components/common/header";

export default function SettingsPage() {
  return (
    <main className="shell">
      <div className="app-card">
        <Header />
        <section className="panel">
          <h1>Settings</h1>
          <p className="muted">
            This MVP keeps settings URL-driven. Add cookies, local storage, or a
            database when you want user persistence.
          </p>
        </section>
        <section className="panel stack">
          <Link className="action-link" href="/?unit=metric">
            Use metric units
          </Link>
          <Link className="action-link" href="/?unit=imperial">
            Use imperial units
          </Link>
          <p className="muted">
            Next extensions: saved cities, severe weather alerts, and push
            notifications.
          </p>
        </section>
      </div>
    </main>
  );
}
