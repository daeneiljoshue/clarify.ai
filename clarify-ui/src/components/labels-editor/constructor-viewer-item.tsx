import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';

import CLARIFYTooltip from 'components/common/clarify-tooltip';
import { computeTextColor } from 'utils/compute-text-color';
import config from 'config';
import { LabelOptColor } from './common';

interface ConstructorViewerItemProps {
    label: LabelOptColor;
    color?: string;
    onUpdate: (label: LabelOptColor) => void;
    onDelete: (label: LabelOptColor) => void;
}

export default function ConstructorViewerItem(props: ConstructorViewerItemProps): JSX.Element {
    const {
        color, label, onUpdate, onDelete,
    } = props;

    const backgroundColor = color || config.NEW_LABEL_COLOR;
    const textColor = computeTextColor(backgroundColor);

    return (
        <div style={{ background: backgroundColor }} className='clarify-constructor-viewer-item'>
            <Text style={{ color: textColor }}>{label.name}</Text>
            <CLARIFYTooltip title='Update attributes'>
                <span
                    style={{ color: textColor }}
                    role='button'
                    tabIndex={0}
                    onClick={(): void => onUpdate(label)}
                    onKeyPress={(): boolean => false}
                >
                    <EditOutlined />
                </span>
            </CLARIFYTooltip>
            <CLARIFYTooltip title='Delete label'>
                <span
                    style={{ color: textColor }}
                    role='button'
                    tabIndex={0}
                    onClick={(): void => onDelete(label)}
                    onKeyPress={(): boolean => false}
                >
                    <DeleteOutlined />
                </span>
            </CLARIFYTooltip>
        </div>
    );
}
