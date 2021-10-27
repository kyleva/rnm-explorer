import { ReactNode } from 'react';
import classnames from 'classnames';
import Image from 'next/image';

export type MediaObjectProps = {
  alt?: string;
  body?: ReactNode;
  className?: string;
  height?: string;
  image: string;
  imageClassName: string;
  title?: string;
  width?: string;
};

const MediaObject = ({
  alt = '',
  body,
  className: parentClassName,
  height = '24',
  image,
  imageClassName,
  title,
  width = '24',
  ...props
}: MediaObjectProps) => (
  <div className={classnames('flex items-start', parentClassName)} {...props}>
    <Image alt={alt} height={height} src={image} width={width} />
    <div className="ml-2">
      {title && <p className="text-lg">{title}</p>}
      {body}
    </div>
  </div>
);

export default MediaObject;
