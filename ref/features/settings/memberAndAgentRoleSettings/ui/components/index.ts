import { AgentGeneralSettings, MemberGeneralSettings } from './GeneralSettings';
import { AgentGuardRailsSettings } from './GuardRailsSettings';
import { AgentPromptSettings } from './PromptSettings';
import { MemberInteractionSettings } from './InteractionSettings';
import { MemberPermissionSettings } from './PermissionSettings';
import { MemberSkillSettings } from './SkillSettings';
import { AGENT_ROLE_SETTINGS_SECTIONS, MEMBER_ROLE_SETTINGS_SECTIONS } from '../../model';


export const AGENT_TAB_CONTENT = {
  [AGENT_ROLE_SETTINGS_SECTIONS.GENERAL]: AgentGeneralSettings,
  [AGENT_ROLE_SETTINGS_SECTIONS.PROMPT]: AgentPromptSettings,
  [AGENT_ROLE_SETTINGS_SECTIONS.GUARD_RAILS]: AgentGuardRailsSettings,
};

export const MEMBER_TAB_CONTENT = {
  [MEMBER_ROLE_SETTINGS_SECTIONS.GENERAL]: MemberGeneralSettings,
  [MEMBER_ROLE_SETTINGS_SECTIONS.INTERACTION]: MemberInteractionSettings,
  [MEMBER_ROLE_SETTINGS_SECTIONS.SKILLS]: MemberSkillSettings,
  [MEMBER_ROLE_SETTINGS_SECTIONS.PERMISSIONS]: MemberPermissionSettings,
};

export const AGENT_ROLE_SETTINGS_TABS = Object.values(AGENT_ROLE_SETTINGS_SECTIONS);
export const MEMBER_ROLE_SETTINGS_TABS = Object.values(MEMBER_ROLE_SETTINGS_SECTIONS);
