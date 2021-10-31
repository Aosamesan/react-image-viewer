import React from 'react';
import clsx from 'clsx';
import LoadingImage from './heart-loading.svg';

export type LazyLoadingImageProps = {
    className?: string,
    src: string,
    alt?: string
};

type ImageAspectRatioType = "portrait" | "landscape" | "loading";

export default function LazyLoadingImage({ src, alt, className }: LazyLoadingImageProps): React.ReactElement<LazyLoadingImageProps> {
    const imageRef = React.createRef<HTMLImageElement>();
    const [isLoad, setIsLoad] = React.useState(false);
    const [aspectRatio, setAspectRatio] = React.useState<ImageAspectRatioType>("loading");
    const image = new Image();

    image.src = src;
    image.onload = function (e: any) {
        const imageInfo = e.path[0];
        if (imageInfo) {
            const width = imageInfo.width as number;
            const height = imageInfo.height as number;
            if (width > height) {
                setAspectRatio("landscape");
            } else {
                setAspectRatio("portrait");
            }
        }
        setIsLoad(true);
    }

    return <img ref={imageRef} src={isLoad ? src : LoadingImage} alt={alt ?? src} className={clsx(className, aspectRatio)}/>;
}