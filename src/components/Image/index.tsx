import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { isBrowser } from '../../utils';
import { objectFit } from '../../theme/mixins';

interface ImageProps {
  unsplash?: boolean;
  url: string;
  alt: string;
  onError?: (ev?: SyntheticEvent) => void;
  onLoad?: (ev?: SyntheticEvent) => void;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}

interface IStyledImage {
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}

const StyledImage = styled.img<IStyledImage>`
  display: block;
  width: 100%;
  height: 100%;
  ${(props: any) => objectFit(props.objectFit || 'cover')}
`;

interface ImageState {
  loadSrc?: string;
  io?: IntersectionObserver;
}

class Image extends React.Component<ImageProps, ImageState> {
  private el?: React.RefObject<any>;

  constructor(props: ImageProps) {
    super(props);
    this.el = React.createRef();
    this.state = {
      loadSrc: undefined,
      io: undefined,
    };
  }

  public componentDidMount() {
    this.addIO();
  }

  public render() {
    const { loadSrc } = this.state;
    const { alt, objectFit, unsplash } = this.props;

    if (loadSrc || unsplash) {
      return (
        <StyledImage
          decoding="async"
          ref={this.el}
          src={unsplash ? `https://source.unsplash.com/random/${Math.floor(Math.random() * 10)}` : loadSrc}
          alt={alt}
          onLoad={this.onLoad}
          onError={this.onError}
          objectFit={objectFit}
        />
      );
    }

    return <div ref={this.el}></div>;
  }

  private addIO() {
    if (this.props.url === undefined || !isBrowser()) {
      return;
    }

    if ('IntersectionObserver' in window) {
      this.removeIO();
      const instance = new IntersectionObserver(
        (data) => {
          // because there will only ever be one instance
          // of the element we are observing
          // we can just use data[0]
          if (data[0].isIntersecting) {
            this.load();
            this.removeIO();
          }
        },
        {
          rootMargin: '0px 0px 200px 0px',
        },
      );

      instance.observe((this.el as any).current);
      this.setState({
        io: instance,
      });
    } else {
      // fall back to setTimeout for Safari and IE
      setTimeout(() => this.load(), 200);
    }
  }

  private load() {
    this.setState({
      loadSrc: this.props.url,
    });
  }

  private onLoad = (ev: SyntheticEvent) => {
    //
    if (this.props.onLoad) {
      this.props.onLoad(ev);
    }
  };

  private onError = (ev: SyntheticEvent) => {
    //
    if (this.props.onError) {
      this.props.onError(ev);
    }
  };

  private removeIO() {
    if (this.state.io) {
      this.state.io.disconnect();
      this.setState({
        io: undefined,
      });
    }
  }
}

export { Image, StyledImage, ImageProps };
