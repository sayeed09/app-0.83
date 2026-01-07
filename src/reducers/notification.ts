import {
  NotificationActionType,
  NotificationReducerType,
  NotificationState,
} from '@models/notifications';

export const notificationInitialState: NotificationState = {
  recentNotifications: [],
  trackingTransparency: false
};

const recentNotificationsReducer: NotificationReducerType = (state, action) => {
  switch (action.type) {
    case NotificationActionType.SET_RECENT_NOTIFICATIONS:
      return {
        ...state,
        recentNotifications: action.payload,
      };
    case NotificationActionType.SET_TRACKING_TRANSPARENCY:
      return {
        ...state,
        trackingTransparency: action.payload,
      };
    default:
      return state;
  }
};

export default recentNotificationsReducer;
