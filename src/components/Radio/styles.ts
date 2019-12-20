import { get } from 'lodash';
import { styled, IThemeStyledFunction } from '../../styles';
import { colors } from '../../theme';
import { SpaceProps, BorderProps, space, border, display, DisplayProps } from 'styled-system';
import { variant } from 'styled-system';

export type IRadioWrapper = IThemeStyledFunction<'div'> & SpaceProps & DisplayProps & BorderProps & {
  variant?: keyof typeof colors;
  disabled?: boolean;
}

export type IRadioLabel = IThemeStyledFunction<'div'> & {
  size?: 'small' | 'medium' | 'large';
  fill?: 'default' | 'full' | 'thick';
}

export type IStyledRadioProps = IThemeStyledFunction<'input'> & {
  disabled?: boolean;
  variant?: keyof typeof colors;
  size?: 'small' | 'medium' | 'large';
  fill?: 'default' | 'full' | 'thick';
}

const fillVariant = variant({
  prop: 'fill',
  variants: {
    default: {
      '&:after': {
        transform: 'scale(0.6)'
      }
    },
    full: {

    },
    thick: {
      '&:before': {
        borderWidth: '3px'
      },
      '&:after': {
        transform: 'scale(0.4)'
      }
    }
  }
})

export const RadioWrapper = styled.div<IRadioWrapper>`
  --input-color-base: ${(props) => get(props.theme, `colors.${props.variant}.base`)};
  --input-color-contrast: ${(props) => get(props.theme, `colors.${props.variant}.contrast`)};

  display: inline-block;
  line-height: 1;
  position: relative;
  white-space: nowrap;
  ${props => props.disabled ? 'cursor: not-allowed;' : ''};
  width: 100%;

  .state {
    padding: ${props => props.theme.space[3]} 0;
    margin-right: ${props => props.theme.space[3]};

    [slot="inner"] {
      color: var(--input-color-contrast);
      font-size: 1em;
      height: calc(1.25em + 2px);
      left: 1px;
      opacity: 0;
      line-height: normal;
      position: absolute;
      text-align: center;
      top: 0;
      width: calc(1.25em + 2px);
      z-index: 1;

      svg {
        fill: var(--input-color-contrast);
        stroke: var(--input-color-contrast);
      }
    }
  }

  ${display};
  ${space};
  ${border};
`;

const labelSize = variant({
  prop: 'size',
  variants: {
    small: {
      fontSize: '1rem'
    },
    medium: {
      fontSize: '1.25rem'
    },
    large: {
      fontSize: '1.5rem'
    },
  }
})

export const RadioLabel = styled.label<IRadioLabel>`
  display: inline-block;
  font-weight: ${props => props.theme.fontWeights.normal};
  margin: 0;
  min-width: calc(1em + 2px);
  position: initial;
  text-indent: 1.5em;
  position: relative;

  &:after,
  &:before {
    background-color: transparent;
    border-radius: 0;
    border: 1px solid transparent;
    box-sizing: border-box;
    border-radius: 50%;
    content: '';
    display: block;
    height: calc(1em + 2px);
    left: 0;
    position: absolute;
    top: calc((0% - (100% - 1em)) - 8%);
    width: calc(1em + 2px);
    z-index: 0;
  }

  &:before {
    border-color: #ddd;
  }

  ${labelSize};
  ${fillVariant};
`;

export const RadioInput = styled.input<IStyledRadioProps>`
  cursor: pointer;
  height: 100%;
  left: 0;
  margin: 0;
  min-width: 1em;
  opacity: 0;
  padding: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
  ${props => props.disabled ? 'cursor: not-allowed;' : ''};

  &:not([disabled]) {
    &:hover,
    &:focus {
      ~ .state ${RadioLabel} {
        &:before {
          border-color: var(--input-color-base);
        }
      }
    }
  }

  &:checked {
    ~ .state {
      [slot="inner"] {
        opacity: 1;
      }

      ${RadioLabel} {
        &:before {
          border-color: var(--input-color-base);
        }
        &:after {
          background: var(--input-color-base);
        }
      }
    }
  }
`;
