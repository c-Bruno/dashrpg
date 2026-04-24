import { useEffect } from 'react';

import { Button, Container, Grid } from '@mui/material';
import { useModal } from 'common/hooks';
import { CoverTitle, Header } from 'main/components/atoms';
import { ConfirmationModal, SkillModal, AttributeModal, CreatureList } from 'main/components/molecules';
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

  const confirmationModal = useModal(({ close, custom }) => (
    <ConfirmationModal title={custom.title} text={custom.text} data={custom.data} handleClose={close} />
  ));

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
        <Header title='Dashboard do Mestre' />

        {configs.length > 0 ? (
          <>
            <WrappedCard entityType='avaliableCharacters' size={12}>
              <AvailableCharacters characters={characters} confirmationModal={confirmationModal} />
            </WrappedCard>

            <WrappedCard entityType='attributesList' modal={attributeModal} size={{ xs: 12, md: 6 }}>
              <AvailableItemsList
                type='attribute'
                items={attributes}
                itemModal={attributeModal}
                confirmationModal={confirmationModal}
              />
            </WrappedCard>

            <WrappedCard entityType='skillsList' modal={skillModal} size={{ xs: 12, md: 6 }}>
              <AvailableItemsList
                type='skill'
                items={skills}
                itemModal={skillModal}
                confirmationModal={confirmationModal}
              />
            </WrappedCard>

            <WrappedCard entityType='attribute' size={12}>
              <AttributesBySkill attributes={attributes} skills={skills} />
            </WrappedCard>

            <WrappedCard entityType='attribute' size={12}>
              <CreatureList />
            </WrappedCard>

            <WrappedCard entityType='dices' size={12}>
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
