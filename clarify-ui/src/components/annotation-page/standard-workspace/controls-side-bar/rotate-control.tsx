
import React from 'react';
import Icon from '@ant-design/icons';
import Popover from 'antd/lib/popover';

import { RotateIcon } from 'icons';
import { Rotation } from 'reducers';
import CLARIFYTooltip from 'components/common/clarify-tooltip';
import withVisibilityHandling from './handle-popover-visibility';

export interface Props {
    clockwiseShortcut: string;
    anticlockwiseShortcut: string;
    rotateFrame(rotation: Rotation): void;
}

const CustomPopover = withVisibilityHandling(Popover, 'rotate-canvas');
function RotateControl(props: Props): JSX.Element {
    const { anticlockwiseShortcut, clockwiseShortcut, rotateFrame } = props;

    return (
        <CustomPopover
            placement='right'
            content={(
                <>
                    <CLARIFYTooltip title={`Rotate the image anticlockwise ${anticlockwiseShortcut}`} placement='topRight'>
                        <Icon
                            className='clarify-rotate-canvas-controls-left'
                            onClick={(): void => rotateFrame(Rotation.ANTICLOCKWISE90)}
                            component={RotateIcon}
                        />
                    </CLARIFYTooltip>
                    <CLARIFYTooltip title={`Rotate the image clockwise ${clockwiseShortcut}`} placement='topRight'>
                        <Icon
                            className='clarify-rotate-canvas-controls-right'
                            onClick={(): void => rotateFrame(Rotation.CLOCKWISE90)}
                            component={RotateIcon}
                        />
                    </CLARIFYTooltip>
                </>
            )}
        >
            <Icon className='clarify-rotate-canvas-control' component={RotateIcon} />
        </CustomPopover>
    );
}

export default React.memo(RotateControl);