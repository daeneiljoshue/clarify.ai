
import React from 'react';
import Popover from 'antd/lib/popover';
import Icon from '@ant-design/icons';

import { Canvas } from 'clarify-canvas-wrapper';
import { PolylineIcon } from 'icons';
import { ShapeType } from 'reducers';

import DrawShapePopoverContainer from 'containers/annotation-page/standard-workspace/controls-side-bar/draw-shape-popover';
import withVisibilityHandling from './handle-popover-visibility';

export interface Props {
    canvasInstance: Canvas;
    isDrawing: boolean;
    disabled?: boolean;
}

const CustomPopover = withVisibilityHandling(Popover, 'draw-polyline');
function DrawPolylineControl(props: Props): JSX.Element {
    const { canvasInstance, isDrawing, disabled } = props;
    const dynamicPopoverProps = isDrawing ? {
        overlayStyle: {
            display: 'none',
        },
    } : {};

    const dynamicIconProps = isDrawing ? {
        className: 'clarify-draw-polyline-control clarify-active-canvas-control',
        onClick: (): void => {
            canvasInstance.draw({ enabled: false });
        },
    } : {
        className: 'clarify-draw-polyline-control',
    };

    return disabled ? (
        <Icon className='clarify-draw-polyline-control clarify-disabled-canvas-control' component={PolylineIcon} />
    ) : (
        <CustomPopover
            {...dynamicPopoverProps}
            overlayClassName='clarify-draw-shape-popover'
            placement='right'
            content={<DrawShapePopoverContainer shapeType={ShapeType.POLYLINE} />}
        >
            <Icon {...dynamicIconProps} component={PolylineIcon} />
        </CustomPopover>
    );
}

export default React.memo(DrawPolylineControl);