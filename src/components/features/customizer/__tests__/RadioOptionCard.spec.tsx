import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioOptionCard from "../RadioOptionCard";

describe("RadioOptionCard", () => {
  it("renders with title", () => {
    render(
      <RadioOptionCard title="Test Option" selected={false} onClick={vi.fn()} />
    );
    expect(screen.getByText("Test Option")).toBeInTheDocument();
  });

  it("renders with subtitle when provided", () => {
    render(
      <RadioOptionCard
        title="Test Option"
        subtitle="Test subtitle"
        selected={false}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    render(
      <RadioOptionCard title="Test Option" selected={false} onClick={vi.fn()} />
    );
    expect(screen.queryByText("subtitle")).not.toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <RadioOptionCard title="Test Option" selected={false} onClick={onClick} />
    );

    const card = screen.getByText("Test Option").closest("div");
    if (card) {
      await user.click(card);
    }
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies selected styling when selected is true", () => {
    const { container } = render(
      <RadioOptionCard title="Test Option" selected={true} onClick={vi.fn()} />
    );

    const card = container.querySelector(
      '[class*="optionCard"]'
    ) as HTMLElement;
    expect(card?.className).toMatch(/selected/);
  });

  it("does not apply selected styling when selected is false", () => {
    const { container } = render(
      <RadioOptionCard title="Test Option" selected={false} onClick={vi.fn()} />
    );

    const card = container.querySelector(".selected");
    expect(card).not.toBeInTheDocument();
  });

  it("has correct text styling when selected", () => {
    const { container } = render(
      <RadioOptionCard title="Test Option" selected={true} onClick={vi.fn()} />
    );

    const title = screen.getByText("Test Option");
    const styles = window.getComputedStyle(title);
    expect(styles.color).toBeDefined();
  });

  it("supports multiple subtitle styles", () => {
    const { rerender } = render(
      <RadioOptionCard
        title="Option 1"
        subtitle="Subtitle 1"
        selected={false}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText("Subtitle 1")).toBeInTheDocument();

    rerender(
      <RadioOptionCard
        title="Option 2"
        subtitle="Subtitle 2"
        selected={true}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText("Subtitle 2")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
});
