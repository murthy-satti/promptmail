import ProfessionalEmail from "../../components/template-email/page";
import NotFound from "../not-found";

// Server Component
export default async function TemplatePage({ params }) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/templates`, { cache: "no-store" });

  const data = await res.json();
  const template = data.templates.find((t) => t.slug === slug);

  if (!template) {
    return <NotFound/>;
  }

  return (
    <main className="mt-20 md:mt-15">
    <ProfessionalEmail
      initialSubject={template.subject}
      initialBody={template.body}
      templateTitle={template.title}
    />
    </main>
  );
}
