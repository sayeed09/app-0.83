export interface NotificationState {
  recentNotifications: [];
  trackingTransparency: boolean;
}

export enum NotificationActionType {
  SET_RECENT_NOTIFICATIONS = 'SET_RECENT_NOTIFICATIONS',
  SET_TRACKING_TRANSPARENCY = 'SET_TRACKING_TRANSPARENCY',
}

export type NotificationActions = {
  type: NotificationActionType.SET_RECENT_NOTIFICATIONS;
  payload: [];
} | {  type:  NotificationActionType.SET_TRACKING_TRANSPARENCY ;
  payload: boolean;
};

export type NotificationReducerType = (
  state: NotificationState,
  action: NotificationActions,
) => NotificationState;

export type NotificationDispatch = React.Dispatch<NotificationActions>;
