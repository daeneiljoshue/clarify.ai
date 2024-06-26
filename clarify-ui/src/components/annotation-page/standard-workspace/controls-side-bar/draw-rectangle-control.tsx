
import React from 'react';
import Popover from 'antd/lib/popover';
import Icon from '@ant-design/icons';

import { Canvas } from 'clarify-canvas-wrapper';
import { RectangleIcon } from 'icons';
import { ShapeType } from 'reducers';

import DrawShapePopoverContainer from 'containers/annotation-page/standard-workspace/controls-side-bar/draw-shape-popover';
import withVisibilityHandling from './handle-popover-visibility';

export interface Props {
    canvasInstance: Canvas;
    isDrawing: boolean;
    disabled?: boolean;
}

const CustomPopover = withVisibilityHandling(Popover, 'draw-rectangle');
function DrawRectangleControl(props: Props): JSX.Element {
    const { canvasInstance, isDrawing, disabled } = props;
    const dynamicPopoverProps = isDrawing ? {
        overlayStyle: {
            display: 'none',
        },
    } : {};

    const dynamicIconProps = isDrawing ? {
        className: 'clarify-draw-rectangle-control clarify-active-canvas-control',
        onClick: (): void => {
            canvasInstance.draw({ enabled: false });
        },
    } : {
        className: 'clarify-draw-rectangle-control',
    };

    return disabled ? (
        <Icon className='clarify-draw-rectangle-control clarify-disabled-canvas-control' component={RectangleIcon} />
    ) : (
        <CustomPopover
            {...dynamicPopoverProps}
            overlayClassName='clarify-draw-shape-popover'
            placement='right'
            content={<DrawShapePopoverContainer shapeType={ShapeType.RECTANGLE} />}
        >
            <Icon {...dynamicIconProps} component={RectangleIcon} />
        </CustomPopover>
    );
}

export default React.memo(DrawRectangleControl);