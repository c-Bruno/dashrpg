import { api } from 'common/libs';
import { DefaultResponse } from 'common/types';

import { UpdateCharacterStateParams } from './character.interface';

export type Response<T = DefaultResponse> = Promise<T>;

class CharacterService {
  /**
   * Updates character state (HP, Sanity, etc.) on the server.
   */
  static updateCharacter(params?: UpdateCharacterStateParams): Response<any> {
    const { character_id, ...data } = params || {};

    return api.put(`/character/${character_id}`, data);
  }
}

export default CharacterService;
