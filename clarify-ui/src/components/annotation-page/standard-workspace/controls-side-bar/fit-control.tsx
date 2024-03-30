
import React from 'react';
import Icon from '@ant-design/icons';

import { FitIcon } from 'icons';
import { Canvas } from 'clarify-canvas-wrapper';
import CLARIFYTooltip from 'components/common/clarify-tooltip';

export interface Props {
    canvasInstance: Canvas;
}

function FitControl(props: Props): JSX.Element {
    const { canvasInstance } = props;

    return (
        <CLARIFYTooltip title='Fit the image [Double Click]' placement='right'>
            <Icon className='clarify-fit-control' component={FitIcon} onClick={(): void => canvasInstance.fit()} />
        </CLARIFYTooltip>
    );
}

export default React.memo(FitControl);