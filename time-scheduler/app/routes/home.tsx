import type { Route } from "./+types/home";
import { Header } from "../components/layout/Header";
import { Button } from "../components/ui/Button";
import styled from "styled-components";

const HomeContainer = styled.div`
  padding-top: 64px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing[20]} ${theme.spacing[6]}`};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  max-width: 600px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: wrap;
  justify-content: center;
`;

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
      <HomeContainer>
        <HeroSection>
          <Title>School Time Scheduler</Title>
          <Subtitle>
            A comprehensive scheduling system for schools that allows administrators 
            to manage class schedules, teachers, classrooms, and students with 
            role-based access control.
          </Subtitle>
          <ButtonGroup>
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </ButtonGroup>
        </HeroSection>
      </HomeContainer>
    </>
  );
}
