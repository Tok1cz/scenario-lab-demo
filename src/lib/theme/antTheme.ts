import type { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    // Primary brand color
    colorPrimary: "#1890ff",

    // Semantic colors matching risk statuses
    colorSuccess: "#10b981", // Safe - green
    colorWarning: "#f59e0b", // Risky - amber
    colorError: "#ef4444", // Dangerous - red

    // Typography
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 16,
    fontSizeHeading1: 40,
    fontSizeHeading2: 32,
    fontSizeHeading3: 24,

    // Spacing & Layout
    borderRadius: 8,
    controlHeight: 44,

    // Colors
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f5f5f5",
    colorText: "#1f2937",
    colorTextSecondary: "#6b7280",
  },

  components: {
    Button: {
      controlHeight: 44,
      fontWeight: 600,
      borderRadius: 8,
      paddingContentHorizontal: 24,
    },

    Card: {
      borderRadiusLG: 12,
      paddingLG: 24,
    },

    Input: {
      controlHeight: 44,
      borderRadius: 8,
    },

    Select: {
      controlHeight: 44,
    },

    Slider: {
      trackBg: "#d1d5db",
      trackHoverBg: "#9ca3af",
    },
  },
};
