import React, { useMemo } from 'react';
import { Stack } from '@/shared/uiKit/Stack';
import { Backdrop } from '@/shared/uiKit/Backdrop';
import { PROJECT_SETTINGS_SECTION } from '@/shared/constants';
import { ProjectAgentRoleSettings } from '@/features/settings/memberAndAgentRoleSettings';
import { APIs } from '@/features/settings/projectApiSettings';
import { ProjectDatabaseSettings } from '@/features/settings/projectDatabaseSettings';
import { ViewerWindow, useViewer } from '@/shared/uiKit/Viewer'; // trigger in widgets/ProjectExplorerSidebar/ProjectSettingsList
import { useSidebarExplorer } from '@/widgets/projectExplorerSidebar';

const GeneralSettings = () => <div>General settings</div>;
const MemberSettings = () => <div>Member settings</div>;
const ActivitySettings = () => <div>Activity settings</div>;
const DomainSettings = () => <div>Domain settings</div>;
const SeoSettings = () => <div>Seo settings</div>;
const PlansSettings = () => <div>Plans settings</div>;
const VersionsSettings = () => <div>Versions settings</div>;
const LibrariesSettings = () => <div>Libraries settings</div>;

const SETTINGS_COMPONENTS = {
  [PROJECT_SETTINGS_SECTION.GENERAL]: GeneralSettings,
  [PROJECT_SETTINGS_SECTION.MEMBER]: MemberSettings,
  [PROJECT_SETTINGS_SECTION.ACTIVITY]: ActivitySettings,
  [PROJECT_SETTINGS_SECTION.DOMAIN]: DomainSettings,
  [PROJECT_SETTINGS_SECTION.SEO]: SeoSettings,
  [PROJECT_SETTINGS_SECTION.PLANS]: PlansSettings,
  [PROJECT_SETTINGS_SECTION.VERSIONS]: VersionsSettings,
  [PROJECT_SETTINGS_SECTION.AGENT]: ProjectAgentRoleSettings,
  [PROJECT_SETTINGS_SECTION.API]: APIs,
  [PROJECT_SETTINGS_SECTION.LIBRARIES]: LibrariesSettings,
  [PROJECT_SETTINGS_SECTION.DATABASE]: ProjectDatabaseSettings,
};

export const ProjectSettingDetail = () => {

  const { subMode } = useSidebarExplorer();

  const Component = SETTINGS_COMPONENTS[subMode];
  if (!Component) {return null;}
  return <Component />;
};
