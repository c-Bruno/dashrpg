import { useState } from 'react';
import { toast } from 'react-toastify';

import { useModal } from 'common/hooks';
import { api } from 'common/libs';
import type { Attribute, Skill } from 'common/types';
import { ConfirmationDialog, DashboardIcon } from 'design-system/ui';
import { MasterHeader } from 'features/master/navigation/components';
import { RuleEntityModal } from 'features/master/rules/components';
import { CoverTitle } from 'main/components/atoms';

import { AttributePanel, RelationshipOverview, SkillPanel } from '../components';
import * as S from './rules.screen.styles';

export interface RulesScreenProps {
  attributes: Attribute[];
  skills: Skill[];
}

type RuleEntity = Attribute | Skill;
type EntityKind = 'attribute' | 'skill';
type EntityModalData = { kind: EntityKind; entity?: RuleEntity };

const RulesScreen = ({ attributes: initialAttributes, skills: initialSkills }: RulesScreenProps) => {
  const [attributes, setAttributes] = useState(initialAttributes);
  const [skills, setSkills] = useState(initialSkills);

  const entityModal = useModal(({ close, custom }: { close: () => void; custom?: EntityModalData }) =>
    custom ? (
      <RuleEntityModal
        kind={custom.kind}
        entity={custom.entity}
        skills={skills}
        onClose={close}
        onSaved={(savedEntity) => {
          if (custom.kind === 'attribute') {
            setAttributes((current) =>
              [...current.filter(({ id }) => id !== savedEntity.id), savedEntity as Attribute].sort((a, b) =>
                a.name.localeCompare(b.name),
              ),
            );
          } else {
            setSkills((current) =>
              [...current.filter(({ id }) => id !== savedEntity.id), savedEntity as Skill].sort((a, b) =>
                a.name.localeCompare(b.name),
              ),
            );
          }
          close();
        }}
      />
    ) : null,
  );

  const deleteModal = useModal(
    ({ close, custom }: { close: () => void; custom?: { kind: EntityKind; entity: RuleEntity } }) => (
      <ConfirmationDialog
        title={`Apagar ${custom?.kind === 'attribute' ? 'atributo' : 'perícia'}`}
        message={`Tem certeza que deseja apagar ${custom?.entity.name ?? 'este item'}?`}
        description='Esta ação não poderá ser desfeita.'
        closeLabel='Cancelar'
        confirmLabel='Apagar'
        onClose={close}
        onConfirm={async () => {
          if (!custom) return;
          try {
            const response = await api.delete<{ success: boolean; id: number }>(`/${custom.kind}/${custom.entity.id}`);
            if (!response.data.success || response.data.id !== custom.entity.id) {
              throw new Error('A API retornou uma resposta inesperada ao remover a regra.');
            }

            if (custom.kind === 'attribute') {
              setAttributes((current) => current.filter(({ id }) => id !== custom.entity.id));
            } else {
              setSkills((current) => current.filter(({ id }) => id !== custom.entity.id));
              setAttributes((current) =>
                current.map((attribute) =>
                  attribute.skill_id === custom.entity.id ? { ...attribute, skill_id: undefined } : attribute,
                ),
              );
            }
            close();
          } catch {
            console.error('[MasterRulesScreen] Erro ao remover regra.');
            toast.error('Não foi possível remover este item. Tente novamente.');
          }
        }}
      />
    ),
  );

  const openEntityModal = (kind: EntityKind, entity?: RuleEntity) => entityModal.appear({ kind, entity });

  return (
    <S.Page>
      <CoverTitle title='Mestre' />
      <MasterHeader />
      <S.Content>
        <S.Intro>
          <DashboardIcon name='book' size={38} />
          <div>
            <h2>Regras da campanha</h2>
            <p>Configure os atributos e as perícias utilizados nas fichas.</p>
          </div>
        </S.Intro>

        <S.ConfigurationGrid>
          <AttributePanel
            attributes={attributes}
            onCreate={() => openEntityModal('attribute')}
            onEdit={(attribute) => openEntityModal('attribute', attribute)}
            onDelete={(attribute) => deleteModal.appear({ kind: 'attribute', entity: attribute })}
          />
          <SkillPanel
            attributes={attributes}
            skills={skills}
            onCreate={() => openEntityModal('skill')}
            onEdit={(skill) => openEntityModal('skill', skill)}
            onDelete={(skill) => deleteModal.appear({ kind: 'skill', entity: skill })}
          />
        </S.ConfigurationGrid>

        <RelationshipOverview attributes={attributes} skills={skills} />
      </S.Content>
    </S.Page>
  );
};

export default RulesScreen;
