import { useEffect } from 'react';

import {   Button, Container, Grid   } from '@mui/material';
import { useModal } from 'common/hooks';
import { Header } from 'main/components/atoms';
import { ConfirmationModal, SkillModal, AttributeModal } from 'main/components/molecules';
import { AttributesBySkill, AvailableItemsList, AvailableCharacters, AvailableDices } from 'main/components/organisms';
import { WrappedCard } from 'main/components/templates';
import { useDashboardStore } from 'main/store';
import Head from 'next/head';

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
      <Head>
        <title>Mestre | RPG</title>
      </Head>

      <Grid container spacing={3}>
        <Header title='Dashboard do Mestre' />

        {configs.length > 0 ? (
          <>
            <Grid size={12}>
              <WrappedCard entityType='avaliableCharacters' character={null}>
                <AvailableCharacters characters={characters} confirmationModal={confirmationModal} />
              </WrappedCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <WrappedCard entityType='attributesList' character={null} modal={attributeModal}>
                <AvailableItemsList
                  type='attribute'
                  items={attributes}
                  itemModal={attributeModal}
                  confirmationModal={confirmationModal}
                />
              </WrappedCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <WrappedCard entityType='skillsList' character={null} modal={skillModal}>
                <AvailableItemsList
                  type='skill'
                  items={skills}
                  itemModal={skillModal}
                  confirmationModal={confirmationModal}
                />
              </WrappedCard>
            </Grid>

            <Grid size={12}>
              <WrappedCard entityType='attribute' character={null}>
                <AttributesBySkill attributes={attributes} skills={skills} />
              </WrappedCard>
            </Grid>

            <Grid size={12}>
              <WrappedCard entityType='dices' character={null}>
                <AvailableDices />
              </WrappedCard>
            </Grid>
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
