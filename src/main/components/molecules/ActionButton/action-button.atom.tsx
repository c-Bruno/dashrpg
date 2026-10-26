import { Add, Link, Delete, SvgIconComponent } from '@mui/icons-material';

import * as S from './action-button-styles';

interface ActionButtonProps {
  onClick?: () => void;
  fontSize?: 'small' | 'inherit' | 'large' | 'medium';
  type?: 'add' | 'link' | 'delete';
  outline?: boolean;
}

const ICON_MAP: Record<string, SvgIconComponent> = { add: Add, link: Link, delete: Delete } as const;
const COLOR_MAP: Record<string, string> = { delete: '#E80A67' } as const;

/**
 * A simple, reusable component that renders a box with a plus icon,
 * typically used to indicate an action.
 */
const ActionButton = ({ onClick, fontSize, type, outline }: ActionButtonProps) => {
  const IconComponent = ICON_MAP[type] || Add;
  const buttonColor = COLOR_MAP[type];

  return (
    <S.Container onClick={onClick} $outline={outline ? 'solid' : 'none'} $color={buttonColor}>
      <IconComponent fontSize={fontSize || 'large'} />
    </S.Container>
  );
};

export default ActionButton;
