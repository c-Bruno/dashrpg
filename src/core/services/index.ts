/**
 * [Client Services]
 * Safe to use in React components (browser)
 * Use only services that call API routes via axios
 */
export { default as CharacterService } from './character/character.service';

/**
 * [Server Services]
 * Only for API routes and getServerSideProps
 * Import directly when needed:
 * - import CharacterServerService from 'core/services/character/character-server.service'
 * - import MasterDashboardService from 'core/services/Master/dashboard.service'
 *
 * DO NOT export here to prevent bundling Prisma in client code
 */
