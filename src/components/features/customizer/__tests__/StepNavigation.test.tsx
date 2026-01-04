import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StepNavigation from "../StepNavigation";

describe("StepNavigation", () => {
  it("renders back button when showBack is true", () => {
    render(
      <StepNavigation onBack={vi.fn()} onNext={vi.fn()} showBack={true} />
    );
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("does not render back button when showBack is false", () => {
    render(
      <StepNavigation onBack={vi.fn()} onNext={vi.fn()} showBack={false} />
    );
    expect(screen.queryByText("Back")).not.toBeInTheDocument();
  });

  it("renders next button with default label", () => {
    render(<StepNavigation onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("renders next button with custom label", () => {
    render(
      <StepNavigation
        onBack={vi.fn()}
        onNext={vi.fn()}
        nextLabel="Submit Form"
      />
    );
    expect(screen.getByText("Submit Form")).toBeInTheDocument();
  });

  it("calls onBack when back button is clicked", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    render(<StepNavigation onBack={onBack} onNext={vi.fn()} showBack={true} />);

    const backButton = screen.getByText("Back");
    await user.click(backButton);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("calls onNext when next button is clicked", async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();
    render(<StepNavigation onBack={vi.fn()} onNext={onNext} />);

    const nextButton = screen.getByText("Next");
    await user.click(nextButton);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("disables next button when nextDisabled is true", () => {
    render(
      <StepNavigation onBack={vi.fn()} onNext={vi.fn()} nextDisabled={true} />
    );

    const nextButton = screen.getByRole("button", { name: "Next" });
    expect(nextButton).toBeDisabled();
  });

  it("enables next button when nextDisabled is false", () => {
    render(
      <StepNavigation onBack={vi.fn()} onNext={vi.fn()} nextDisabled={false} />
    );

    const nextButton = screen.getByRole("button", { name: "Next" });
    expect(nextButton).toBeEnabled();
  });

  it("buttons have different styling (back vs next)", () => {
    const { container } = render(
      <StepNavigation onBack={vi.fn()} onNext={vi.fn()} showBack={true} />
    );

    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe("Back");
    expect(buttons[1].textContent).toBe("Next");
  });

  it("does not call onBack when back button is disabled", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    render(
      <StepNavigation onBack={onBack} onNext={vi.fn()} showBack={false} />
    );

    expect(screen.queryByText("Back")).not.toBeInTheDocument();
  });

  it("handles multiple rapid clicks on next button", async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();
    render(<StepNavigation onBack={vi.fn()} onNext={onNext} />);

    const nextButton = screen.getByText("Next");
    await user.click(nextButton);
    await user.click(nextButton);
    await user.click(nextButton);
    expect(onNext).toHaveBeenCalledTimes(3);
  });
});
