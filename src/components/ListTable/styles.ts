import { styled, IThemeStyledFunction } from "../../styles";
import { SpaceProps, space, BorderProps, border } from 'styled-system';
import { darken } from "polished";


export type IStyledListTableProps = IThemeStyledFunction<'table'> & SpaceProps & {
  type?: 'default' | 'striped';
  border?: 'default' | 'all' | 'none';
}

export type IStyledListTableCellProps = IThemeStyledFunction<'td'|'th'> & BorderProps & SpaceProps;

const TableBody = styled.tbody``;
const TableHeader = styled.thead``;
const TableRow = styled.tr``;
const TableTh = styled.th<IStyledListTableCellProps>`
  border-bottom: 1px solid ${props => darken(0.2, props.theme.colors.light.base)};  
  padding: ${props => props.theme.space[3]} ${props => props.theme.space[5]};

  ${border}
  ${space}
`;
const TableTd = styled.td<IStyledListTableCellProps>`
  border-bottom: 1px solid ${props => darken(0.2, props.theme.colors.light.base)};  
  padding: ${props => props.theme.space[3]} ${props => props.theme.space[5]};
  
  ${border}
  ${space}
`;

const Table = styled.table<IStyledListTableProps>`
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    text-align: left;

    ${props => props.border === 'none' && `
      border-bottom: none;
    `}

    ${props => props.border === 'all' && `
      border: 1px solid ${darken(0.2, props.theme.colors.light.base)};
    `}
  }

  ${TableBody} {
    ${TableRow} {
      ${props => props.type === 'striped' && `
        &:nth-child(odd) {
          background-color: ${props.theme.colors.light.base};
        }
      `}
    }
  }

  ${space}
`;

const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
`;

export { Table, TableContainer, TableHeader, TableBody, TableRow, TableTh, TableTd };