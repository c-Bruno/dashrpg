import artwork from './rule-icon-artwork';

export type RuleIconName = keyof typeof artwork;

const RuleIcon = ({ iconKey, size = 22 }: { iconKey: string; size?: number }) => {
  const resolvedKey = Object.hasOwn(artwork, iconKey) ? (iconKey as RuleIconName) : 'sparkles';

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 32 32'
      fill='currentColor'
      shapeRendering='crispEdges'
      aria-hidden='true'
      focusable='false'
      style={{ flexShrink: 0 }}>
      {artwork[resolvedKey]}
    </svg>
  );
};

export default RuleIcon;
