export const NOTIFICATION_TYPES = {
  SYSTEM: 'system', //maintenance, platform_update, downtime
  INFORMATIONAL: 'informational', // workspace_update, team_joined, project_edit
  SERVICE: 'service', // hr_message, salary_update, legal_notice
  USER_ACTION: 'user_action', //comment, reply, mention, followed
  CALENDAR_EVENT: 'calendar_event', //meeting_created, calendar_reminder, invite
  ENTITY_EVENT: 'entity_event', //task_created, chat_created, message_sent
  SUBSCRIPTIONS: 'subscriptions', //new_follower, unfollowed, subscribed_to
};
