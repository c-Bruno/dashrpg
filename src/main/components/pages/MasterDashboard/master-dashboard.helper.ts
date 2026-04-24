import { api } from 'common/libs';

export const updateConfigs = (config) => {
  api.put('/config/DICE_ON_SCREEN_TIMEOUT_IN_MS', {
    value: `${parseInt(config.DICE_ON_SCREEN_TIMEOUT_IN_MS) * 1000}`,
  });

  api.put('/config/TIME_BETWEEN_DICES_IN_MS', {
    value: `${parseInt(config.TIME_BETWEEN_DICES_IN_MS) * 1000}`,
  });
};

export const runInitialSetup = () => {
  api.post<{ success: boolean }>('/setup').then((res) => {
    if (res.data.success && typeof window !== 'undefined') {
      window.location.reload();
    }
  });
};
