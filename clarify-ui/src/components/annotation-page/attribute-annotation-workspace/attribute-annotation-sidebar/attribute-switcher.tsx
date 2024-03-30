

import React from 'react';
import Text from 'antd/lib/typography/Text';
import Button from 'antd/lib/button';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import CLARIFYTooltip from 'components/common/clarify-tooltip';

interface Props {
    currentAttribute: string;
    currentIndex: number;
    attributesCount: number;
    normalizedKeyMap: Record<string, string>;
    nextAttribute(step: number): void;
}

function AttributeSwitcher(props: Props): JSX.Element {
    const {
        currentAttribute, currentIndex, attributesCount, nextAttribute, normalizedKeyMap,
    } = props;

    const title = `${currentAttribute} [${currentIndex + 1}/${attributesCount}]`;
    return (
        <div className='clarify-attribute-annotation-sidebar-attribute-switcher'>
            <CLARIFYTooltip title={`Previous attribute ${normalizedKeyMap.PREVIOUS_ATTRIBUTE}`}>
                <Button
                    className='clarify-attribute-annotation-sidebar-attribute-switcher-left'
                    disabled={attributesCount <= 1}
                    onClick={() => nextAttribute(-1)}
                >
                    <LeftOutlined />
                </Button>
            </CLARIFYTooltip>
            <CLARIFYTooltip title={title}>
                <Text className='clarify-text'>{currentAttribute}</Text>
                <Text strong>{` [${currentIndex + 1}/${attributesCount}]`}</Text>
            </CLARIFYTooltip>
            <CLARIFYTooltip title={`Next attribute ${normalizedKeyMap.NEXT_ATTRIBUTE}`}>
                <Button
                    className='clarify-attribute-annotation-sidebar-attribute-switcher-right'
                    disabled={attributesCount <= 1}
                    onClick={() => nextAttribute(1)}
                >
                    <RightOutlined />
                </Button>
            </CLARIFYTooltip>
        </div>
    );
}

export default React.memo(AttributeSwitcher);