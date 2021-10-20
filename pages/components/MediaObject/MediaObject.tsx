import { ReactNode } from 'react';
import classnames from 'classnames';

type MediaObjectProps = {
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
    <img
      className={classnames({
        'w-24 mr-8': !Boolean(imageClassName),
        [imageClassName]: Boolean(imageClassName),
      })}
      src={image}
    />
    <div>
      {title && <p className="text-lg">{title}</p>}
      {body}
    </div>
  </div>
);

export default MediaObject;
