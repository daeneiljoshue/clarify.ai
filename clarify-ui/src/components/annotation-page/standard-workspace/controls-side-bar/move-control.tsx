
import React from 'react';
import Icon from '@ant-design/icons';

import { MoveIcon } from 'icons';
import { ActiveControl } from 'reducers';
import { Canvas } from 'clarify-canvas-wrapper';
import { Canvas3d } from 'clarify-canvas3d-wrapper';
import CLARIFYTooltip from 'components/common/clarify-tooltip';

export interface Props {
    canvasInstance: Canvas | Canvas3d;
    activeControl: ActiveControl;
}

function MoveControl(props: Props): JSX.Element {
    const { canvasInstance, activeControl } = props;

    return (
        <CLARIFYTooltip title='Move the image' placement='right'>
            <Icon
                component={MoveIcon}
                className={
                    activeControl === ActiveControl.DRAG_CANVAS ?
                        'cvat-move-control cvat-active-canvas-control' :
                        'cvat-move-control'
                }
                onClick={(): void => {
                    if (activeControl === ActiveControl.DRAG_CANVAS) {
                        canvasInstance.dragCanvas(false);
                    } else {
                        canvasInstance.cancel();
                        canvasInstance.dragCanvas(true);
                    }
                }}
            />
        </CLARIFYTooltip>
    );
}

export default React.memo(MoveControl);