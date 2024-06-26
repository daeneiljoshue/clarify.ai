
import './styles.scss';
import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import Text from 'antd/lib/typography/Text';

import CreateProjectContent from './create-project-content';

function CreateProjectPageComponent(): JSX.Element {
    return (
        <Row justify='center' align='top' className='clarify-create-work-form-wrapper'>
            <Col md={20} lg={16} xl={14} xxl={9}>
                <Text className='clarify-title'>Create a new project</Text>
                <CreateProjectContent />
            </Col>
        </Row>
    );
}

export default React.memo(CreateProjectPageComponent);