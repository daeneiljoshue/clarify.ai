
import React from 'react';
import Popover from 'antd/lib/popover';
import Icon from '@ant-design/icons';

import { Canvas } from 'clarify-canvas-wrapper';
import { PointIcon } from 'icons';
import { ShapeType } from 'reducers';

import DrawShapePopoverContainer from 'containers/annotation-page/standard-workspace/controls-side-bar/draw-shape-popover';
import withVisibilityHandling from './handle-popover-visibility';

export interface Props {
    canvasInstance: Canvas;
    isDrawing: boolean;
    disabled?: boolean;
}

const CustomPopover = withVisibilityHandling(Popover, 'draw-points');
function DrawPointsControl(props: Props): JSX.Element {
    const { canvasInstance, isDrawing, disabled } = props;
    const dynamicPopoverProps = isDrawing ? {
        overlayStyle: {
            display: 'none',
        },
    } : {};

    const dynamicIconProps = isDrawing ? {
        className: 'clarify-draw-points-control clarify-active-canvas-control',
        onClick: (): void => {
            canvasInstance.draw({ enabled: false });
        },
    } : {
        className: 'clarify-draw-points-control',
    };

    return disabled ? (
        <Icon className='clarify-draw-points-control clarify-disabled-canvas-control' component={PointIcon} />
    ) : (
        <CustomPopover
            {...dynamicPopoverProps}
            overlayClassName='clarify-draw-shape-popover'
            placement='right'
            content={<DrawShapePopoverContainer shapeType={ShapeType.POINTS} />}
        >
            <Icon {...dynamicIconProps} component={PointIcon} />
        </CustomPopover>
    );
}

export default React.memo(DrawPointsControl);