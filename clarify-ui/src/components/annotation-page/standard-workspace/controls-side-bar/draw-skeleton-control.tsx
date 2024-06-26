
import React from 'react';
import Popover from 'antd/lib/popover';
import Icon from '@ant-design/icons';

import { Canvas } from 'clarify-canvas-wrapper';
import { Canvas3d } from 'clarify-canvas3d-wrapper';
import { ShapeType } from 'reducers';

import { SkeletonIcon } from 'icons';

import DrawShapePopoverContainer from 'containers/annotation-page/standard-workspace/controls-side-bar/draw-shape-popover';
import withVisibilityHandling from './handle-popover-visibility';

export interface Props {
    canvasInstance: Canvas | Canvas3d;
    isDrawing: boolean;
    disabled: boolean;
}

const CustomPopover = withVisibilityHandling(Popover, 'draw-skeleton');
function DrawSkeletonControl(props: Props): JSX.Element {
    const { canvasInstance, isDrawing, disabled } = props;
    const dynamicPopoverProps = isDrawing ? {
        overlayStyle: {
            display: 'none',
        },
    } : {};

    const dynamicIconProps = isDrawing ? {
        className: 'clarify-draw-skeleton-control clarify-active-canvas-control',
        onClick: (): void => {
            canvasInstance.draw({ enabled: false });
        },
    } : {
        className: 'clarify-draw-skeleton-control',
    };

    return disabled ? (
        <Icon className='clarify-draw-skeleton-control clarify-disabled-canvas-control' component={SkeletonIcon} />
    ) : (
        <CustomPopover
            {...dynamicPopoverProps}
            overlayClassName='clarfy-draw-shape-popover'
            placement='right'
            content={<DrawShapePopoverContainer shapeType={ShapeType.SKELETON} />}
        >
            <Icon {...dynamicIconProps} component={SkeletonIcon} />
        </CustomPopover>
    );
}

export default React.memo(DrawSkeletonControl);