/**
 * [Update character state and API handlers]
 *
 */
export interface UpdateCharacterStateParams {
  character_id?: number;
  // life
  current_hit_points?: number;
  max_hit_points?: number;
  // sanity
  current_sanity_points?: number;
  max_sanity_points?: number;
  [key: string]: any;
}
