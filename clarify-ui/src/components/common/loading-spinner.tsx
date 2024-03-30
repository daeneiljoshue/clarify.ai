
import React from 'react';
import Spin, { SpinProps } from 'antd/lib/spin';

function CLARIFYLoadingSpinner(props: SpinProps): JSX.Element {
    return (
        <div className='clarify-spinner-container'>
            <Spin className='clarify-spinner' {...props} />
        </div>
    );
}

export default React.memo(CLARIFYLoadingSpinner);