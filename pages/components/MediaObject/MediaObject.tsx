import { ReactNode } from 'react';
import classnames from 'classnames';
import Image from 'next/image';

export type MediaObjectProps = {
  body?: ReactNode;
  className?: string;
  image: string;
  imageClassName: string;
  title?: string;
};

const MediaObject = ({
  body,
  className: parentClassName,
  image,
  imageClassName,
  title,
  ...props
}: MediaObjectProps) => (
  <div className={classnames('flex items-center', parentClassName)} {...props}>
    <Image height="24" src={image} width="24" />
    <div className="ml-2">
      {title && <p className="text-lg">{title}</p>}
      {body}
    </div>
  </div>
);

export default MediaObject;
