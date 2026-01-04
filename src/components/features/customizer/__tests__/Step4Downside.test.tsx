import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step4Downside from "../Step4Downside";
import styles from "../RadioOptionCard.module.css";

describe("Step4Downside", () => {
  it("renders step header with correct step number", () => {
    render(
      <Step4Downside
        utilizationDownside=""
        paymentRisk=""
        onChangeUtilizationDownside={vi.fn()}
        onChangePaymentRisk={vi.fn()}
      />
    );
    expect(screen.getByText(/Step 4 of 4/)).toBeInTheDocument();
  });

  it("renders all utilization downside options", () => {
    render(
      <Step4Downside
        utilizationDownside=""
        paymentRisk=""
        onChangeUtilizationDownside={vi.fn()}
        onChangePaymentRisk={vi.fn()}
      />
    );
    expect(screen.getByText("step4.options.slight.title")).toBeInTheDocument();
    expect(
      screen.getByText("step4.options.moderate.title")
    ).toBeInTheDocument();
    expect(screen.getByText("step4.options.severe.title")).toBeInTheDocument();
  });

  it("renders utilization downside subtitles", () => {
    render(
      <Step4Downside
        utilizationDownside=""
        paymentRisk=""
        onChangeUtilizationDownside={vi.fn()}
        onChangePaymentRisk={vi.fn()}
      />
    );
    expect(
      screen.getByText("step4.options.slight.subtitle")
    ).toBeInTheDocument();
    expect(
      screen.getByText("step4.options.moderate.subtitle")
    ).toBeInTheDocument();
    expect(
      screen.getByText("step4.options.severe.subtitle")
    ).toBeInTheDocument();
  });

  it("renders all payment risk options", () => {
    render(
      <Step4Downside
        utilizationDownside=""
        paymentRisk=""
        onChangeUtilizationDownside={vi.fn()}
        onChangePaymentRisk={vi.fn()}
      />
    );
    expect(
      screen.getByText("step4.sidebar.options.low.title")
    ).toBeInTheDocument();
    expect(
      screen.getByText("step4.sidebar.options.medium.title")
    ).toBeInTheDocument();
    expect(
      screen.getByText("step4.sidebar.options.high.title")
    ).toBeInTheDocument();
  });

  it("renders payment risk subtitles", () => {
    render(
      <Step4Downside
        utilizationDownside=""
        paymentRisk=""
        onChangeUtilizationDownside={vi.fn()}
        onChangePaymentRisk={vi.fn()}
      />
    );
    expect(
      screen.getByText("step4.sidebar.options.low.subtitle")
    ).toBeInTheDocument();
    expect(
      screen.getByText("step4.sidebar.options.medium.subtitle")
    ).toBeInTheDocument();
    expect(
      screen.getByText("step4.sidebar.options.high.subtitle")
    ).toBeInTheDocument();
  });

  it("calls onChangeUtilizationDownside when downside option is clicked", async () => {
    const user = userEvent.setup();
    const onChangeUtilizationDownside = vi.fn();
    render(
      <Step4Downside
        utilizationDownside=""
        paymentRisk=""
        onChangeUtilizationDownside={onChangeUtilizationDownside}
        onChangePaymentRisk={vi.fn()}
      />
    );

    const option = screen
      .getByText("step4.options.moderate.title")
      .closest("div");
    if (option) {
      await user.click(option);
    }
    expect(onChangeUtilizationDownside).toHaveBeenCalledWith("moderate");
  });

  it("calls onChangePaymentRisk when payment risk option is clicked", async () => {
    const user = userEvent.setup();
    const onChangePaymentRisk = vi.fn();
    render(
      <Step4Downside
        utilizationDownside=""
        paymentRisk=""
        onChangeUtilizationDownside={vi.fn()}
        onChangePaymentRisk={onChangePaymentRisk}
      />
    );

    const option = screen
      .getByText("step4.sidebar.options.high.title")
      .closest("div");
    if (option) {
      await user.click(option);
    }
    expect(onChangePaymentRisk).toHaveBeenCalledWith("high");
  });

  it("displays selected utilization downside option", () => {
    const { container } = render(
      <Step4Downside
        utilizationDownside="slight"
        paymentRisk=""
        onChangeUtilizationDownside={vi.fn()}
        onChangePaymentRisk={vi.fn()}
      />
    );

    const card = screen
      .getByText("step4.options.slight.title")
      .closest("." + styles.optionCard);
    expect(card).toHaveClass(styles.selected);
  });

  it("displays selected payment risk option", () => {
    const { container } = render(
      <Step4Downside
        utilizationDownside=""
        paymentRisk="medium"
        onChangeUtilizationDownside={vi.fn()}
        onChangePaymentRisk={vi.fn()}
      />
    );

    const card = screen
      .getByText("step4.sidebar.options.medium.title")
      .closest("." + styles.optionCard);
    expect(card).toHaveClass(styles.selected);
  });

  it("renders step title and subtitle", () => {
    render(
      <Step4Downside
        utilizationDownside=""
        paymentRisk=""
        onChangeUtilizationDownside={vi.fn()}
        onChangePaymentRisk={vi.fn()}
      />
    );
    expect(screen.getByText("step4.title")).toBeInTheDocument();
    expect(screen.getByText("step4.subtitle")).toBeInTheDocument();
  });

  it("renders question text", () => {
    render(
      <Step4Downside
        utilizationDownside=""
        paymentRisk=""
        onChangeUtilizationDownside={vi.fn()}
        onChangePaymentRisk={vi.fn()}
      />
    );
    expect(screen.getByText("step4.question")).toBeInTheDocument();
  });

  it("renders sidebar title", () => {
    render(
      <Step4Downside
        utilizationDownside=""
        paymentRisk=""
        onChangeUtilizationDownside={vi.fn()}
        onChangePaymentRisk={vi.fn()}
      />
    );
    expect(screen.getByText("step4.sidebar.title")).toBeInTheDocument();
  });

  it("allows changing both options independently", async () => {
    const user = userEvent.setup();
    const onChangeUtilizationDownside = vi.fn();
    const onChangePaymentRisk = vi.fn();

    const { rerender } = render(
      <Step4Downside
        utilizationDownside="severe"
        paymentRisk="low"
        onChangeUtilizationDownside={onChangeUtilizationDownside}
        onChangePaymentRisk={onChangePaymentRisk}
      />
    );

    let card = screen
      .getByText("step4.options.severe.title")
      .closest("." + styles.optionCard);
    expect(card).toHaveClass(styles.selected);

    card = screen
      .getByText("step4.sidebar.options.low.title")
      .closest("." + styles.optionCard);
    expect(card).toHaveClass(styles.selected);

    // Change to different values
    rerender(
      <Step4Downside
        utilizationDownside="moderate"
        paymentRisk="high"
        onChangeUtilizationDownside={onChangeUtilizationDownside}
        onChangePaymentRisk={onChangePaymentRisk}
      />
    );

    card = screen
      .getByText("step4.options.moderate.title")
      .closest("." + styles.optionCard);
    expect(card).toHaveClass(styles.selected);

    card = screen
      .getByText("step4.sidebar.options.high.title")
      .closest("." + styles.optionCard);
    expect(card).toHaveClass(styles.selected);
  });

  it("handles all downside levels correctly", async () => {
    const user = userEvent.setup();
    const onChangeUtilizationDownside = vi.fn();

    const { rerender } = render(
      <Step4Downside
        utilizationDownside=""
        paymentRisk=""
        onChangeUtilizationDownside={onChangeUtilizationDownside}
        onChangePaymentRisk={vi.fn()}
      />
    );

    // Test slight
    let option = screen.getByText("step4.options.slight.title").closest("div");
    if (option) {
      await user.click(option);
    }
    expect(onChangeUtilizationDownside).toHaveBeenCalledWith("slight");

    // Test moderate
    rerender(
      <Step4Downside
        utilizationDownside="slight"
        paymentRisk=""
        onChangeUtilizationDownside={onChangeUtilizationDownside}
        onChangePaymentRisk={vi.fn()}
      />
    );
    option = screen.getByText("step4.options.moderate.title").closest("div");
    if (option) {
      await user.click(option);
    }
    expect(onChangeUtilizationDownside).toHaveBeenCalledWith("moderate");

    // Test severe
    rerender(
      <Step4Downside
        utilizationDownside="moderate"
        paymentRisk=""
        onChangeUtilizationDownside={onChangeUtilizationDownside}
        onChangePaymentRisk={vi.fn()}
      />
    );
    option = screen.getByText("step4.options.severe.title").closest("div");
    if (option) {
      await user.click(option);
    }
    expect(onChangeUtilizationDownside).toHaveBeenCalledWith("severe");
  });
});
