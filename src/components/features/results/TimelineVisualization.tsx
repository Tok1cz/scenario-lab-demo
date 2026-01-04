import { Typography } from "antd";
import { spacing, fontSize } from "../../../lib/theme/designTokens";
import styles from "./TimelineVisualization.module.css";

const { Text } = Typography;

interface TimelineEvent {
  month: number;
  label: string;
  color: string;
}

interface TimelineVisualizationProps {
  layoffMonth?: number | null;
  payrollMonth?: number | null;
  horizonMonths: number;
}

export function TimelineVisualization({
  layoffMonth,
  payrollMonth,
  horizonMonths = 6,
}: TimelineVisualizationProps) {
  const events: TimelineEvent[] = [];

  if (layoffMonth) {
    events.push({
      month: layoffMonth,
      label: "Layoff zone",
      color: "#faad14",
    });
  }

  if (payrollMonth && payrollMonth <= horizonMonths) {
    events.push({
      month: payrollMonth,
      label: "Payroll breach (6+)",
      color: "#ff4d4f",
    });
  }

  const hasEvents = events.length > 0;

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineWrapper}>
        {/* Event markers layer */}
        <div className={styles.timelineEvents}>
          {events.map((event, idx) => (
            <div
              key={idx}
              className={styles.eventMarker}
              style={{ left: `${(event.month / horizonMonths) * 100}%` }}
            >
              <div
                className={styles.markerPin}
                style={{ backgroundColor: event.color }}
              />
              <Text
                strong
                style={{
                  fontSize: fontSize.xs,
                  color: event.color,
                  display: "block",
                  marginTop: spacing.xxs + 2,
                  whiteSpace: "nowrap",
                }}
              >
                {event.label}
              </Text>
            </div>
          ))}
        </div>

        {/* Timeline bar with ticks */}
        <div className={styles.timelineBar}>
          {Array.from({ length: horizonMonths + 1 }, (_, i) => i).map(
            (month) => (
              <div key={month} className={styles.timelineTick}>
                <div className={styles.tickMark} />
                <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                  {month}
                </Text>
              </div>
            )
          )}
        </div>
      </div>

      <Text
        type="secondary"
        style={{
          fontSize: fontSize.xs,
          display: "block",
          marginTop: spacing.sm,
          textAlign: "center",
        }}
      >
        {hasEvents
          ? "Note: Pins mark threshold crossings under tested downside"
          : "No threshold crossings within horizon"}
      </Text>
    </div>
  );
}
