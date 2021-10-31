import React from 'react';
import './main.css';
import LazyLoadingImage from "./lazy-loading-image";
import clsx from "clsx";

type ImageViewType = "" | "fit" | "fit-height" | "fit-width";

export default function ImageViewer({
                                        images,
                                        view,
                                        menuTop,
                                        title
                                    }: ImageViewerProps): React.ReactElement<ImageViewerProps> {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [menuAlwaysTop, setMenuAlwaysTop] = React.useState(menuTop ?? false);
    const [viewType, setViewType] = React.useState<ImageViewType>(view ?? "");

    function canMovePrevious() {
        return currentPage > 0;
    }

    function canMoveNext() {
        return currentPage < images.length - 1;
    }

    function previousPage() {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage < images.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    function changeViewType(e: React.MouseEvent) {
        const targetElement = e.target as HTMLInputElement;
        setViewType(targetElement.value as ImageViewType);
    }

    function changeMenuTop(e: React.ChangeEvent) {
        const targetElement = e.target as HTMLInputElement;
        setMenuAlwaysTop(targetElement.checked);
    }

    return (
        <div className="image-viewer-wrapper">
            <nav className={clsx("image-viewer-nav", {on: menuAlwaysTop})}>
                <input type="radio" name="view-type" id="view-type-origin" value="" defaultChecked={viewType === ""}
                       onClick={changeViewType}/>
                <label htmlFor="view-type-origin">Original</label>
                <input type="radio" name="view-type" id="view-type-auto" value="fit"
                       defaultChecked={viewType === "fit"} onClick={changeViewType}/>
                <label htmlFor="view-type-auto">Auto Fit</label>
                <input type="radio" name="view-type" id="view-type-fit-width" value="fit-width"
                       defaultChecked={viewType === "fit-width"} onClick={changeViewType}/>
                <label htmlFor="view-type-fit-width">Fit to width</label>
                <input type="radio" name="view-type" id="view-type-fit-height" value="fit-height"
                       defaultChecked={viewType === "fit-height"} onClick={changeViewType}/>
                <label htmlFor="view-type-fit-height">Fit to height</label>
                <input type="checkbox" name="menu-top" id="menu-top" defaultChecked={menuTop}
                       onChange={changeMenuTop}/>
                <label htmlFor="menu-top">Always Menu Top</label>
            </nav>
            <section className={clsx("image-viewer", viewType)}>
                <div className={clsx("page-button-panel page-previous", {disabled: !canMovePrevious()})}
                     onClick={previousPage}/>
                <div className={clsx("page-button-panel page-next", {disabled: !canMoveNext()})} onClick={nextPage}/>
                {
                    images.map((path, idx) => (
                        <div className="image-wrapper" key={idx} style={{
                            transform: `translateX(-${100 * currentPage}%)`
                        }}>
                            <LazyLoadingImage src={path} className="image-content"/>
                        </div>
                    ))
                }
            </section>
        </div>
    );
}

type ImageViewerProps = {
    images: string[],
    title?: string,
    view?: ImageViewType,
    menuTop?: boolean
};