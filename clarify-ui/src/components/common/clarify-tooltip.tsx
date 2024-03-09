
import React from 'react';
import Tooltip, { TooltipProps } from 'antd/lib/tooltip';

function CLARIFYTooltip(props: TooltipProps): JSX.Element {
    const { children, ...rest } = props;

    return (
        <Tooltip destroyTooltipOnHide={{ keepParent: false }} mouseLeaveDelay={0} {...rest}>
            {children}
        </Tooltip>
    );
}

export default React.memo(CLARIFYTooltip);