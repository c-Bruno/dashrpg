import { createAction } from 'redux-actions';

import { CHARACTER } from '../modules/character'

export const updateCharacter = createAction(CHARACTER.UPDATE, data => data);