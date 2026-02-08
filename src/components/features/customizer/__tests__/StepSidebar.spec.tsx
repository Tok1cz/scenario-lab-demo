import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StepSidebar from "../StepSidebar";

describe("StepSidebar", () => {
  it("renders title", () => {
    render(<StepSidebar title="Test Sidebar" items={[]} />);
    expect(screen.getByText("Test Sidebar")).toBeInTheDocument();
  });

  it("renders no items when items array is empty", () => {
    const { container } = render(
      <StepSidebar title="Test Sidebar" items={[]} />
    );
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(0);
  });

  it("renders all items", () => {
    const items = ["Item 1", "Item 2", "Item 3"];
    render(<StepSidebar title="Test Sidebar" items={items} />);
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("renders items as list items", () => {
    const items = ["First item", "Second item"];
    const { container } = render(
      <StepSidebar title="Test Sidebar" items={items} />
    );
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(2);
  });

  it("renders sidebar in correct card styling", () => {
    const { container } = render(
      <StepSidebar title="Test Sidebar" items={["Item 1"]} />
    );
    const card = container.querySelector('[class*="ant-card"]');
    expect(card).toBeInTheDocument();
  });

  it("handles large number of items", () => {
    const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);
    const { container } = render(
      <StepSidebar title="Test Sidebar" items={items} />
    );
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(10);
  });

  it("displays items with secondary text styling", () => {
    render(<StepSidebar title="Test Sidebar" items={["Item 1"]} />);
    const item = screen.getByText("Item 1");
    expect(item.tagName).toBe("SPAN");
  });

  it("renders with different title texts", () => {
    const { rerender } = render(<StepSidebar title="First Title" items={[]} />);
    expect(screen.getByText("First Title")).toBeInTheDocument();

    rerender(<StepSidebar title="Second Title" items={[]} />);
    expect(screen.getByText("Second Title")).toBeInTheDocument();
    expect(screen.queryByText("First Title")).not.toBeInTheDocument();
  });
});
