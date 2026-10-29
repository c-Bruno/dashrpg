import { useState, type SubmitEvent } from 'react';

import { Alert, IconButton } from '@mui/material';
import { useFetchMutation } from 'common/hooks';
import { api } from 'common/libs';
import type { Attribute, Skill } from 'common/types';
import { DashboardIcon, RuleIcon } from 'design-system/ui';
import { iconOptions } from 'features/master/rules/constants';

import * as S from './rule-entity-modal.styles';

type RuleEntity = Attribute | Skill;
type EntityKind = 'attribute' | 'skill';
type RuleEntityPayload = Pick<RuleEntity, 'name' | 'description' | 'icon_key'> & {
  skill_id?: number | null;
};

interface RuleEntityModalProps {
  kind: EntityKind;
  entity?: RuleEntity;
  skills: Skill[];
  onClose: () => void;
  onSaved: (entity: RuleEntity) => void;
}

const RuleEntityModal = ({ kind, entity, skills, onClose, onSaved }: RuleEntityModalProps) => {
  const isAttribute = kind === 'attribute';
  const attribute = isAttribute ? (entity as Attribute | undefined) : undefined;
  const [name, setName] = useState(entity?.name ?? '');
  const [description, setDescription] = useState(entity?.description ?? '');
  const [iconKey, setIconKey] = useState(entity?.icon_key ?? iconOptions[kind][0]);
  const [skillId, setSkillId] = useState(attribute?.skill_id?.toString() ?? '');
  const isEditing = entity != null;
  const entityLabel = isAttribute ? 'atributo' : 'perícia';
  const {
    trigger,
    errors,
    isLoading: isSaving,
  } = useFetchMutation(
    (payload: RuleEntityPayload) =>
      entity ? api.put<RuleEntity>(`/${kind}/${entity.id}`, payload) : api.post<RuleEntity>(`/${kind}`, payload),
    {
      onSuccess: onSaved,
    },
  );
  let modalTitle: string;

  if (isEditing) {
    modalTitle = `Editar ${entityLabel}`;
  } else if (isAttribute) {
    modalTitle = 'Novo atributo';
  } else {
    modalTitle = 'Nova perícia';
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || isSaving) return;

    await trigger({
      name: trimmedName,
      description,
      icon_key: iconKey,
      ...(isAttribute && { skill_id: skillId ? Number(skillId) : null }),
    });
  };

  return (
    <S.RulesDialog open onClose={isSaving ? undefined : onClose} aria-labelledby='rule-entity-dialog-title'>
      <form onSubmit={handleSubmit}>
        <S.DialogHeader>
          <RuleIcon iconKey={iconKey} size={26} />
          <S.DialogHeading id='rule-entity-dialog-title'>{modalTitle}</S.DialogHeading>
          <IconButton type='button' aria-label='Fechar modal' onClick={onClose} disabled={isSaving}>
            <DashboardIcon name='close' size={18} />
          </IconButton>
        </S.DialogHeader>
        <S.DialogBody>
          {errors && !isSaving && (
            <Alert severity='error'>
              {`Não foi possível ${isEditing ? 'atualizar' : 'criar'} ${isAttribute ? 'o atributo' : 'a perícia'}. Tente novamente.`}
            </Alert>
          )}
          <S.FieldGroup>
            <S.FieldLabel htmlFor='rule-entity-name'>Nome</S.FieldLabel>
            <S.DialogField
              id='rule-entity-name'
              required
              fullWidth
              size='small'
              slotProps={{ htmlInput: { maxLength: 80 } }}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={isAttribute ? 'Ex.: Força' : 'Ex.: Atletismo'}
            />
          </S.FieldGroup>
          <S.FieldGroup>
            <S.FieldLabel htmlFor='rule-entity-description'>Descrição</S.FieldLabel>
            <S.DialogField
              id='rule-entity-description'
              required
              fullWidth
              size='small'
              slotProps={{ htmlInput: { maxLength: 80 } }}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder='Descreva como esta regra é utilizada.'
            />
          </S.FieldGroup>
          {isAttribute && (
            <S.FieldGroup>
              <S.FieldLabel htmlFor='rule-entity-skill'>Perícia vinculada</S.FieldLabel>
              <S.DialogField
                id='rule-entity-skill'
                select
                fullWidth
                size='small'
                slotProps={{ select: { native: true } }}
                value={skillId}
                onChange={(event) => setSkillId(event.target.value)}>
                <option value=''>Sem vínculo</option>
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </S.DialogField>
            </S.FieldGroup>
          )}
          <div>
            <S.FieldLabel as='span'>Ícone</S.FieldLabel>
            <S.IconHelp>Selecione o símbolo que será exibido nas fichas.</S.IconHelp>
            <S.IconGrid role='group' aria-label='Selecione um ícone'>
              {iconOptions[kind].map((option) => (
                <S.IconOption
                  key={option}
                  type='button'
                  aria-label={`Ícone ${option}`}
                  aria-pressed={iconKey === option}
                  title={option}
                  onClick={() => setIconKey(option)}>
                  <RuleIcon iconKey={option} size={32} />
                  {iconKey === option && <span aria-hidden='true'>✓</span>}
                </S.IconOption>
              ))}
            </S.IconGrid>
          </div>
        </S.DialogBody>
        <S.DialogFooter>
          <S.DialogButton type='button' onClick={onClose} disabled={isSaving}>
            Cancelar
          </S.DialogButton>
          <S.DialogButton type='submit' data-variant='primary' disabled={isSaving || !name.trim()}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </S.DialogButton>
        </S.DialogFooter>
      </form>
    </S.RulesDialog>
  );
};

export default RuleEntityModal;
