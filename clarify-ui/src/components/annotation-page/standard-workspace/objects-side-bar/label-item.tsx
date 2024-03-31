
import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import Button from 'antd/lib/button';
import Text from 'antd/lib/typography/Text';
import {
    LockFilled, UnlockOutlined, EyeInvisibleFilled, EyeOutlined,
} from '@ant-design/icons';

import CLARIFYTooltip from 'components/common/clarify-tooltip';
import LabelKeySelectorPopover from './label-key-selector-popover';

interface Props {
    labelName: string;
    labelColor: string;
    labelID: number;
    visible: boolean;
    statesHidden: boolean;
    statesLocked: boolean;
    keyToLabelMapping: Record<string, number>;
    hideStates(): void;
    showStates(): void;
    lockStates(): void;
    unlockStates(): void;
    updateLabelShortcutKey(updatedKey: string, labelID: number): void;
}

function LabelItemComponent(props: Props): JSX.Element {
    const {
        labelName,
        labelColor,
        labelID,
        keyToLabelMapping,
        visible,
        statesHidden,
        statesLocked,
        hideStates,
        showStates,
        lockStates,
        unlockStates,
        updateLabelShortcutKey,
    } = props;

    // create reversed mapping just to receive key easily
    const labelToKeyMapping: Record<string, string> = Object.fromEntries(
        Object.entries(keyToLabelMapping).map(([key, _labelID]) => [_labelID, key]),
    );
    const labelShortcutKey = labelToKeyMapping[labelID] || '?';
    const classes = {
        lock: {
            enabled: { className: 'clarify-label-item-button-lock clarify-label-item-button-lock-enabled' },
            disabled: { className: 'clarify-label-item-button-lock' },
        },
        hidden: {
            enabled: { className: 'clarify-label-item-button-hidden clarify-label-item-button-hidden-enabled' },
            disabled: { className: 'clarify-label-item-button-hidden' },
        },
    };

    return (
        <Row
            align='stretch'
            justify='space-around'
            className={[
                'clarify-objects-sidebar-label-item',
                visible ? '' : 'clarify-objects-sidebar-label-item-disabled',
            ].join(' ')}
        >
            <Col span={2}>
                <div style={{ background: labelColor }} className='clarify-label-item-color'>
                    {' '}
                </div>
            </Col>
            <Col span={12}>
                <CLARIFYTooltip title={labelName}>
                    <Text strong className='clarify-text'>
                        {labelName}
                    </Text>
                </CLARIFYTooltip>
            </Col>
            <Col span={3}>
                <LabelKeySelectorPopover
                    keyToLabelMapping={keyToLabelMapping}
                    labelID={labelID}
                    updateLabelShortcutKey={updateLabelShortcutKey}
                >
                    <Button className='clarify-label-item-setup-shortcut-button' size='small' ghost type='dashed'>
                        {labelShortcutKey}
                    </Button>
                </LabelKeySelectorPopover>
            </Col>
            <Col span={2} offset={1}>
                {statesLocked ? (
                    <LockFilled {...classes.lock.enabled} onClick={unlockStates} />
                ) : (
                    <UnlockOutlined {...classes.lock.disabled} onClick={lockStates} />
                )}
            </Col>
            <Col span={3}>
                {statesHidden ? (
                    <EyeInvisibleFilled {...classes.hidden.enabled} onClick={showStates} />
                ) : (
                    <EyeOutlined {...classes.hidden.disabled} onClick={hideStates} />
                )}
            </Col>
        </Row>
    );
}

export default React.memo(LabelItemComponent);