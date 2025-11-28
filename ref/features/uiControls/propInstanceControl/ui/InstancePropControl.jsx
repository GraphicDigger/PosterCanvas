/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { SectionPanel, SectionPanelBody, SectionPanelHeader, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { Divider } from '../../../../shared/uiKit/Divider'; import { AddPropButton } from './addProp/AddPropButton';
import { useProps, EProp } from '../../../../entities/varProp';
import { usePropValueQueries } from '../../../../entities/varPropValue';
import { useComponents } from '../../../../entities/uiComponent';
import { Box } from '../../../../shared/uiKit/Box';
import { FieldList, Field, Label } from '../../../../shared/uiKit/Fields';
import { useInstancePropControl } from '../model';
import { Text } from '../../../../shared/uiKit/Text';
import { ListItem } from '../../../../shared/uiKit/List';
import { OverridingInstanceProp } from './components';


export const InstancePropControl = () => {

  const {
    instance,
    instanceProps,
    nestedInstances,
  } = useInstancePropControl();

  return (
    <>
      <SectionPanelBody>
        {instanceProps?.map(prop => {
          return (
            <FieldList gap={1}>
              <Field key={prop.id}>
                <Label>
                  {prop.name}
                </Label>
                <OverridingInstanceProp
                  prop={prop}
                  instanceId={instance.id}
                />
              </Field>
            </FieldList>
          );
        })}
        {nestedInstances.map(instance => {
          return (
            instance.component.props.map(prop => {
              return (
                <FieldList gap={1}>
                  <ListItem key={instance.id}>
                    <Label>
                      <Text color='primary' weight='bold'>
                        {instance.component.name}
                      </Text>
                    </Label>
                  </ListItem>
                  <Field key={prop.id}>
                    <Label>{prop.name}</Label>
                    <OverridingInstanceProp
                      prop={prop}
                      instanceId={instance.id}
                    />
                  </Field>
                </FieldList>
              );
            })
          );
        })}
      </SectionPanelBody>
    </>

  );
};

