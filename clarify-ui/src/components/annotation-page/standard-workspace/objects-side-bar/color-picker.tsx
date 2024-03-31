
import React, { useState } from 'react';
import { Row, Col } from 'antd/lib/grid';

import { CloseOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import Popover from 'antd/lib/popover';
import Text from 'antd/lib/typography/Text';
import { SketchPicker } from 'react-color';

import { getCore } from 'clarify-core-wrapper';
import CLARIFYTooltip from 'components/common/clarify-tooltip';

const core = getCore();

interface Props {
    children: React.ReactNode;
    value?: string;
    visible?: boolean;
    resetVisible?: boolean;
    onChange?: (value: string) => void;
    onVisibleChange?: (visible: boolean) => void;
    placement?:
    | 'left'
    | 'top'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
}

function ColorPicker(props: Props, ref: React.Ref<any>): JSX.Element {
    const {
        children, value, visible, resetVisible, onChange, onVisibleChange, placement,
    } = props;

    const [colorState, setColorState] = useState(value);
    const [pickerVisible, setPickerVisible] = useState(false);

    const colors = [...core.enums.colors];

    const changeVisible = (_visible: boolean): void => {
        if (typeof onVisibleChange === 'function') {
            onVisibleChange(_visible);
        } else {
            setPickerVisible(_visible);
        }
    };

    return (
        <Popover
            content={(
                <>
                    <SketchPicker
                        color={colorState}
                        onChange={(color) => setColorState(color.hex)}
                        presetColors={colors}
                        ref={ref}
                        disableAlpha
                    />
                    <Row>
                        <Col span={9}>
                            {resetVisible !== false && (
                                <Button
                                    className='clarify-color-picker-reset-button'
                                    onClick={() => {
                                        if (typeof onChange === 'function') onChange('');
                                        changeVisible(false);
                                    }}
                                >
                                    Reset
                                </Button>
                            )}
                        </Col>
                        <Col span={9}>
                            <Button
                                className='clarify-color-picker-cancel-button'
                                onClick={() => {
                                    changeVisible(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button
                                className='clarify-color-picker-submit-button'
                                type='primary'
                                onClick={() => {
                                    if (typeof onChange === 'function') onChange(colorState || '');
                                    changeVisible(false);
                                }}
                            >
                                Ok
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
            title={(
                <Row justify='space-between' align='middle'>
                    <Col span={12}>
                        <Text strong>Select color</Text>
                    </Col>
                    <Col span={4}>
                        <CLARIFYTooltip title='Close'>
                            <Button
                                className='clarify-color-picker-close-button'
                                type='link'
                                onClick={() => {
                                    changeVisible(false);
                                }}
                            >
                                <CloseOutlined />
                            </Button>
                        </CLARIFYTooltip>
                    </Col>
                </Row>
            )}
            placement={placement || 'left'}
            overlayClassName='clrify-label-color-picker'
            trigger='click'
            visible={typeof visible === 'boolean' ? visible : pickerVisible}
            onVisibleChange={changeVisible}
        >
            {children}
        </Popover>
    );
}

export default React.forwardRef(ColorPicker);