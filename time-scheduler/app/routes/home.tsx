import type { Route } from "./+types/home";
import { Header } from "../components/layout/Header";
import { Button } from "../components/ui/Button";

const homeContainerStyles = {
  paddingTop: '64px',
  minHeight: '100vh',
  backgroundColor: '#f9fafb',
};

const heroSectionStyles = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center' as const,
  padding: '5rem 1.5rem',
};

const titleStyles = {
  fontSize: '3rem',
  fontWeight: 800,
  color: '#111827',
  marginBottom: '1.5rem',
  fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  letterSpacing: '-0.025em',
  lineHeight: 1.1,
};

const subtitleStyles = {
  fontSize: '1.25rem',
  color: '#4b5563',
  marginBottom: '2rem',
  maxWidth: '600px',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  lineHeight: 1.6,
  fontWeight: 400,
};

const buttonGroupStyles = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap' as const,
  justifyContent: 'center',
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "School Time Scheduler" },
    { name: "description", content: "Comprehensive school scheduling system" },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <div style={homeContainerStyles}>
        <section style={heroSectionStyles}>
          <h1 style={titleStyles}>School Time Scheduler</h1>
          <p style={subtitleStyles}>
            A comprehensive scheduling system for schools that allows administrators 
            to manage class schedules, teachers, classrooms, and students with 
            role-based access control.
          </p>
          <div style={buttonGroupStyles}>
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
