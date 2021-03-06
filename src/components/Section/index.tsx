import styled from 'styled-components';
import { SpaceProps, space, ColorProps, color } from 'styled-system';
import { objectFit } from '../../theme/mixins';

type SectionProps = SpaceProps &
  Omit<ColorProps, 'color'> & {
    /** Image url for background image */
    image?: string;
    video?: boolean;
  };

const Section = styled.section<SectionProps>`
  display: block;
  width: 100%;
  transition: margin 0.2s ease-in-out, padding 0.2s ease-in-out;
  ${(props: any) => props.image && `background-image: url(${props.image})`};
  background-position: center;
  background-size: cover;
  position: relative;

  ${props => props.video && `
    & > video {
      position: absolute;
      ${objectFit('cover')};
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      z-index: 0;
    }
  `}

  ${color};
  ${space};
`;

export { Section, SectionProps };
