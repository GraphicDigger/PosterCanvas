/**
 * Мок-ответы для демонстрации работы LLM
 * Каждый объект содержит паттерн-триггер и соответствующий ответ
 */
export const mockResponses = [
  {
    pattern: /create.*data/i,
    response: '🥳 Done! Models created:\n\nUser: {id, name, email, role_id}\nRole: {id, name, permissions[]}\nRelationship: one to many — one Role can have many Users.',
    action: 'createMockData',
  },
  {
    pattern: /merge|connect.*data/i,
    response: 'Great! I’ve applied the migrations and connected the design with the database. Would you like to send it to the development team for review?\n\n{{button:Review:primary}}{{button:Cancel:default}}',
    hasButton: true,
  },
  {
    pattern: /design/i,
    response: '🥳 Done! Created designs for screens:\n\n- Members\n- Tasks Manager',
    action: 'createMockScreen',
  },
  {
    pattern: /валид|valid|email/i,
    response: '✅ Validation added:\n\n-	the email field is required\n- it must be a valid email format',
  },
  {
    pattern: /миграц|migration|database/i,
    response: '✅ Migrations generated:\n\n- create_users_table\n- create_roles_table',
  },
  {
    pattern: /отправ|проверк|check|review|team|command/i,
    response: '✅ Sent! Models and migrations code has been sent to the backend team for review.',
  },
  {
    pattern: /разверн|deploy|test/i,
    response: '🥳 Changes deployed to the dev-server. You can test it now.',
  },
  {
    pattern: /привет|hello|hi/i,
    response: "👋 Hello! I'm an AI assistant for development. How can I help you today? I can help you create models, add validation, generate migrations, and other tasks.",
  },
  {
    pattern: /помощь|help|документ|docs/i,
    response: "📘 Here's what I can do:\n\n- Create models and data schemas\n- Add validation to fields\n- Generate database migrations\n- Send code for review\n- Deploy changes\n\nJust describe what you need to do.",
  },


];
// Словарь ответов на клик по кнопке
export const buttonResponses = {
  'Approve': 'Action completed successfully.',
  'Cancel': 'Action canceled. Let me know if you need additional help.',
  'Yes': 'Great! Your confirmation has been accepted. The task will be completed in the near future.',
  'No': "I understand. Let's consider other options or come back to this later.",

  'Deploy': 'Code successfully deployed to production server. The system is working properly.',
  'Review': 'The code has been sent to the team for additional review. Results will be available soon, as soon as the team returns from their vacation on Mars! 🚀',

};
