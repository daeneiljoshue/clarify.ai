
import React from 'react';
import Spin, { SpinProps } from 'antd/lib/spin';

function CLARIFYLoadingSpinner(props: SpinProps): JSX.Element {
    return (
        <div className='cvat-spinner-container'>
            <Spin className='cvat-spinner' {...props} />
        </div>
    );
}

export default React.memo(CLARIFYLoadingSpinner);