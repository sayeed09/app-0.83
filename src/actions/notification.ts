import { makeActionCreator } from '@actions/index';
import { NotificationActionType } from '@models/notifications';

const setRecentNotifications = makeActionCreator<
  NotificationActionType.SET_RECENT_NOTIFICATIONS,
  []
>(NotificationActionType.SET_RECENT_NOTIFICATIONS);

const setTrackingTransparency = makeActionCreator<
  NotificationActionType.SET_TRACKING_TRANSPARENCY,
  boolean
>(NotificationActionType.SET_TRACKING_TRANSPARENCY);


export { setRecentNotifications, setTrackingTransparency };
