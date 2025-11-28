import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { PlusIcon } from '../../../../shared/assets/icons';
import { useProjects, ProjectListItem } from '../../../../entities/project';
import { List } from '../../../../shared/uiKit/List';

export const FilterProjects = () => {

  const { allProjects } = useProjects();

  return (

    <SectionPanel dividerBottom >
      <SectionPanelHeader>
        <SectionPanelName>Projects</SectionPanelName>
        {/* <ButtonTool>
                    <PlusIcon />
                </ButtonTool> */}
      </SectionPanelHeader>
      <SectionPanelBody>
        <List gap={0}>
          {allProjects?.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </List>
      </SectionPanelBody>
    </SectionPanel>


  );
};

