import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StepHeader from "../StepHeader";

describe("StepHeader", () => {
  it("renders step counter with correct text", () => {
    render(
      <StepHeader
        currentStep={1}
        totalSteps={4}
        title="Step 1"
        subtitle="Subtitle"
      />
    );
    expect(screen.getByText(/Guided Intake - Step 1 of 4/)).toBeInTheDocument();
  });

  it("renders title", () => {
    render(
      <StepHeader
        currentStep={2}
        totalSteps={4}
        title="Custom Title"
        subtitle="Subtitle"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(
      <StepHeader
        currentStep={3}
        totalSteps={4}
        title="Title"
        subtitle="Custom Subtitle"
      />
    );
    expect(screen.getByText("Custom Subtitle")).toBeInTheDocument();
  });

  it("displays correct progress percentage for step 1", () => {
    render(
      <StepHeader
        currentStep={1}
        totalSteps={4}
        title="Title"
        subtitle="Subtitle"
      />
    );
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("displays correct progress percentage for step 2", () => {
    render(
      <StepHeader
        currentStep={2}
        totalSteps={4}
        title="Title"
        subtitle="Subtitle"
      />
    );
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("displays correct progress percentage for step 3", () => {
    render(
      <StepHeader
        currentStep={3}
        totalSteps={4}
        title="Title"
        subtitle="Subtitle"
      />
    );
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("displays correct progress percentage for step 4", () => {
    render(
      <StepHeader
        currentStep={4}
        totalSteps={4}
        title="Title"
        subtitle="Subtitle"
      />
    );
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders Progress label", () => {
    render(
      <StepHeader
        currentStep={1}
        totalSteps={4}
        title="Title"
        subtitle="Subtitle"
      />
    );
    expect(screen.getByText("Progress")).toBeInTheDocument();
  });

  it("handles different total step counts", () => {
    const { rerender } = render(
      <StepHeader
        currentStep={2}
        totalSteps={5}
        title="Title"
        subtitle="Subtitle"
      />
    );
    expect(screen.getByText(/Step 2 of 5/)).toBeInTheDocument();

    rerender(
      <StepHeader
        currentStep={3}
        totalSteps={6}
        title="Title"
        subtitle="Subtitle"
      />
    );
    expect(screen.getByText(/Step 3 of 6/)).toBeInTheDocument();
  });
});
