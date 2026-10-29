import { iconNames } from 'design-system/constants';

import DashboardIcon from '../dashboard-icon/dashboard-icon';
import artwork from './rule-icon-artwork';

const RuleIcon = ({ iconKey, size = 22 }: { iconKey: string; size?: number }) => {
  if (!Object.hasOwn(artwork, iconKey)) return <DashboardIcon name={iconNames[iconKey] ?? 'sparkles'} size={size} />;

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 32 32'
      shapeRendering='crispEdges'
      aria-hidden='true'
      focusable='false'
      style={{ flexShrink: 0 }}>
      {artwork[iconKey as keyof typeof artwork]}
    </svg>
  );
};

export default RuleIcon;
