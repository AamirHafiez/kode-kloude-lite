import * as Notifications from "expo-notifications";

export function scheduleNotification(options: {
  time: number;
  title: string;
  body?: string;
  data?: Record<string, unknown>;
}) {
  const { time, title, body, data } = options;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: time,
    },
  });
}
