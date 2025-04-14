import { Card, CardHeader, Divider, styled } from '@mui/material';

export const CardContainer = styled(Card)`
  width: 100%;
`;

export const Header = styled(CardHeader)`
  padding: 8px 16px;
  font-size: 10px;
`;

export const DividerLine = styled(Divider)`
  margin: 3px 0;
`;

export const List = styled('ul')`
  width: 300px;
  height: 230px;
  background-color: ${(props) => props.theme.palette.background.paper};
  overflow: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled('li')`
  padding: 8px 16px;
`;