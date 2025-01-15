import React, { useEffect, useState } from 'react';

import { Button, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { EditableRow, Section } from '../../components';

import { ScrollTableBox, useSkillStyles } from './styles';
import { useTranslation } from 'react-i18next';

const SkillsList = ({ skills, skillModal, confirmationModal }) => {
  const { t } = useTranslation(['masterDashboard']);

  return (
    <Section
      title={t('skills.title')}
      image='/assets/expertise.png'
      renderButton={() => (
        <Button
          variant='outlined'
          style={{
            display: 'flex',
            alignSelf: 'center',
          }}
          onClick={() => skillModal.appear({ operation: 'create' })}
        >
          <AddIcon />
        </Button>
      )}
    >
      <ScrollTableBox item container xs={12} spacing={2}>
        {skills.map((skill, index) => (
          <Grid item xs={12} key={index}>
            <EditableRow
              data={skill}
              editRow={data => {
                skillModal.appear({ operation: 'edit', data });
              }}
              deleteRow={data => {
                confirmationModal.appear({
                  title: t('excludeSkillModal.title'),
                  text: t('excludeSkillModal.description'),
                  data: { id: data.id, type: 'skill' },
                });
              }}
            />
          </Grid>
        ))}
      </ScrollTableBox>
    </Section>
  );
};

export default SkillsList;
