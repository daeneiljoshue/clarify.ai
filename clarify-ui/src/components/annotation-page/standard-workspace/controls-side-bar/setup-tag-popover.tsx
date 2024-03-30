
import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import Button from 'antd/lib/button';
import Text from 'antd/lib/typography/Text';

import LabelSelector from 'components/label-selector/label-selector';
import { PlusOutlined } from '@ant-design/icons';
import CLARIFYTooltip from 'components/common/clarify-tooltip';

interface Props {
    labels: any[];
    selectedLabelID: number | null;
    repeatShapeShortcut: string;
    onChangeLabel(value: string): void;
    onSetup(): void;
}

function SetupTagPopover(props: Props): JSX.Element {
    const {
        labels, selectedLabelID, repeatShapeShortcut, onChangeLabel, onSetup,
    } = props;

    return (
        <div className='clarify-setup-tag-popover-content'>
            <Row justify='start'>
                <Col>
                    <Text className='clarify-text-color' strong>
                        Setup tag
                    </Text>
                </Col>
            </Row>
            <Row justify='start'>
                <Col>
                    <Text className='clarify-text-color'>Label</Text>
                </Col>
            </Row>
            <Row justify='start'>
                <Col>
                    <LabelSelector
                        labels={labels}
                        value={selectedLabelID}
                        onChange={onChangeLabel}
                        onEnterPress={() => onSetup()}
                    />
                    <CLARIFYTooltip title={`Press ${repeatShapeShortcut} to add a tag again`}>
                        <Button
                            type='primary'
                            className='clarify-add-tag-button'
                            onClick={() => onSetup()}
                            icon={<PlusOutlined />}
                        />
                    </CLARIFYTooltip>
                </Col>
            </Row>
        </div>
    );
}

export default React.memo(SetupTagPopover);