import Spin from 'antd/lib/spin';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { saveLogsAsync } from 'actions/annotation-actions';
import { logoutAsync } from 'actions/auth-actions';

function LogoutComponent(): JSX.Element {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(saveLogsAsync()).then(() => {
            dispatch(logoutAsync()).then(() => {
                history.goBack();
            });
        });
    }, []);

    return (
        <div className='clarify-logout-page clarify-spinner-container'>
            <Spin className='clarify-spinner' />
        </div>
    );
}

export default React.memo(LogoutComponent);