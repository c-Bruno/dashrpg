import React, { useEffect, useState } from 'react';

import { Button, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { EditableRow, Section } from '../../components';

import { useTranslation } from 'react-i18next';
import { ScrollTableBox } from './styles';

const AttributesList = ({ attributes, attributeModal, confirmationModal }) => {
  const { t } = useTranslation(['masterDashboard']);

  return (
    <Section
      title={t('attributes.title')}
      image='/assets/atributes.png'
      renderButton={() => (
        <Button
          variant='outlined'
          style={{
            display: 'flex',
            alignSelf: 'center',
          }}
          onClick={() => attributeModal.appear({ operation: 'create' })}
        >
          <AddIcon />
        </Button>
      )}
    >
      <ScrollTableBox item container xs={12} spacing={2}>
        {/* Para cada atributo existente, exiba as informações */}
        {attributes.map((attribute, index) => (
          <Grid item xs={12} key={index}>
            <EditableRow
              data={attribute}
              editRow={data => {
                attributeModal.appear({ operation: 'edit', data });
              }}
              deleteRow={data => {
                confirmationModal.appear({
                  title: t('excludeAttributeModal.title'),
                  text: t('excludeAttributeModal.description'),
                  data: { id: data.id, type: 'attribute' },
                });
              }}
            />
          </Grid>
        ))}
      </ScrollTableBox>
    </Section>
  );
};

export default AttributesList;
