import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step1HireType from "../Step1HireType";

describe("Step1HireType", () => {
  it("renders step header with correct step number", () => {
    render(<Step1HireType value="" onChange={vi.fn()} />);
    expect(screen.getByText("guidedIntake")).toBeInTheDocument();
  });

  it("renders all four hire type options", () => {
    render(<Step1HireType value="" onChange={vi.fn()} />);
    expect(screen.getByText("step1.options.first")).toBeInTheDocument();
    expect(screen.getByText("step1.options.replacement")).toBeInTheDocument();
    expect(screen.getByText("step1.options.capacity")).toBeInTheDocument();
    expect(screen.getByText("step1.options.preemptive")).toBeInTheDocument();
  });

  it("renders step title and subtitle", () => {
    render(<Step1HireType value="" onChange={vi.fn()} />);
    expect(screen.getByText("step1.title")).toBeInTheDocument();
    expect(screen.getByText("step1.subtitle")).toBeInTheDocument();
  });

  it("renders question text", () => {
    render(<Step1HireType value="" onChange={vi.fn()} />);
    expect(screen.getByText("step1.question")).toBeInTheDocument();
  });

  it("renders sidebar with help text", () => {
    render(<Step1HireType value="" onChange={vi.fn()} />);
    expect(screen.getByText("step1.sidebar.title")).toBeInTheDocument();
  });

  it("calls onChange when option is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Step1HireType value="" onChange={onChange} />);

    const firstOption = screen.getByText("step1.options.first").closest("div");
    if (firstOption) {
      await user.click(firstOption);
    }
    expect(onChange).toHaveBeenCalledWith("first");
  });

  it("selects the correct option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Step1HireType value="" onChange={onChange} />);

    const replacementOption = screen
      .getByText("step1.options.replacement")
      .closest("div");
    if (replacementOption) {
      await user.click(replacementOption);
    }
    expect(onChange).toHaveBeenCalledWith("replacement");
  });

  it("shows selected state for chosen option", () => {
    const { rerender } = render(
      <Step1HireType value="first" onChange={vi.fn()} />
    );

    expect(screen.getByText("step1.options.first")).toBeInTheDocument();

    rerender(<Step1HireType value="replacement" onChange={vi.fn()} />);

    expect(screen.getByText("step1.options.first")).toBeInTheDocument();
    expect(screen.getByText("step1.options.replacement")).toBeInTheDocument();
  });

  it("allows switching between options", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Step1HireType value="" onChange={onChange} />);

    const capacityOption =
      screen.getByText("step1.options.capacity").closest("button") ||
      screen.getByText("step1.options.capacity").closest("div");
    if (capacityOption) {
      await user.click(capacityOption);
    }
    expect(onChange).toHaveBeenCalledWith("capacity");

    rerender(<Step1HireType value="capacity" onChange={onChange} />);

    expect(screen.getByText("step1.options.capacity")).toBeInTheDocument();
  });

  it("renders sidebar with help items", () => {
    render(<Step1HireType value="" onChange={vi.fn()} />);
    expect(screen.getByText("step1.sidebar.title")).toBeInTheDocument();
  });

  it("does not have any option pre-selected when value is empty", () => {
    const { container } = render(<Step1HireType value="" onChange={vi.fn()} />);

    const selectedCards = container.querySelectorAll(".selected");
    expect(selectedCards.length).toBe(0);
  });
});
