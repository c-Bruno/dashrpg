import { useEffect } from 'react';

import { Button, Container, Grid } from '@mui/material';
import { EntityTypeEnum } from 'common/enums';
import { useModal } from 'common/hooks';
import { CoverTitle, PageHeader } from 'main/components/atoms';
import { SkillModal, AttributeModal, CreatureList } from 'main/components/molecules';
import { AttributesBySkill, AvailableItemsList, AvailableCharacters, AvailableDices } from 'main/components/organisms';
import { WrappedCard } from 'main/components/templates';
import { useDashboardStore } from 'main/store';

import { runInitialSetup } from './master-dashboard.helper';

const Dashboard = ({ configs, initialSkills, initialCharacters, initialAttributes }: any) => {
  const { characters, setCharacters, attributes, setAttributes, skills, setSkills, setConfig } = useDashboardStore();

  useEffect(() => {
    setSkills(initialSkills);
    setCharacters(initialCharacters);
    setAttributes(initialAttributes);

    configs.forEach((config) => {
      setConfig((prevState) => ({
        ...prevState,
        [config.name]: config.value,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCharacters, initialAttributes, initialSkills, configs]);

  const attributeModal = useModal(({ close, custom }) => {
    return (
      <AttributeModal
        handleClose={close}
        data={custom.data || null}
        attributeSkill={skills}
        attributes={attributes}
        onSubmit={(newAttribute) => {
          setAttributes(newAttribute);
          close();
        }}
        operation={custom.operation}
      />
    );
  });

  const skillModal = useModal(({ close, custom }) => {
    const onSubmit = (newSkill) => {
      setSkills(newSkill);
      close();
    };

    return (
      <SkillModal
        handleClose={close}
        data={custom.data || null}
        onSubmit={onSubmit}
        skills={skills}
        operation={custom.operation}
      />
    );
  });

  return (
    <Container maxWidth='lg' style={{ marginBottom: '30px' }}>
      <CoverTitle title='Mestre' />

      <Grid container spacing={3}>
        <PageHeader title='Dashboard do Mestre' />

        {configs.length > 0 ? (
          <>
            <WrappedCard entityType={EntityTypeEnum.CHARACTER_INFO_FORM}>
              <AvailableCharacters characters={characters} />
            </WrappedCard>

            <WrappedCard entityType={EntityTypeEnum.ATTRIBUTES_LIST} modal={attributeModal} size={{ xs: 12, md: 6 }}>
              <AvailableItemsList type='attribute' items={attributes} itemModal={attributeModal} />
            </WrappedCard>

            <WrappedCard entityType={EntityTypeEnum.SKILLS_LIST} modal={skillModal} size={{ xs: 12, md: 6 }}>
              <AvailableItemsList type='skill' items={skills} itemModal={skillModal} />
            </WrappedCard>

            <WrappedCard entityType={EntityTypeEnum.ATTRIBUTE}>
              <AttributesBySkill attributes={attributes} skills={skills} />
            </WrappedCard>

            <WrappedCard entityType={EntityTypeEnum.ATTRIBUTE}>
              <CreatureList />
            </WrappedCard>

            <WrappedCard entityType={EntityTypeEnum.DICES}>
              <AvailableDices />
            </WrappedCard>
          </>
        ) : (
          <Grid size={12}>
            <Button variant='contained' onClick={runInitialSetup} fullWidth>
              REALIZAR CONFIGURAÇÃO INICIAL
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
