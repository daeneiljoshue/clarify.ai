
import React from 'react';
import Text from 'antd/lib/typography/Text';
import Button from 'antd/lib/button';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import CLARIFYTooltip from 'components/common/clarify-tooltip';

interface Props {
    currentLabel: string;
    clientID: number;
    occluded: boolean;
    objectsCount: number;
    currentIndex: number;
    normalizedKeyMap: Record<string, string>;
    nextObject(step: number): void;
}

function ObjectSwitcher(props: Props): JSX.Element {
    const {
        currentLabel, clientID, objectsCount, currentIndex, nextObject, normalizedKeyMap,
    } = props;

    const title = `${currentLabel} ${clientID} [${currentIndex + 1}/${objectsCount}]`;
    return (
        <div className='clarify-attribute-annotation-sidebar-object-switcher'>
            <CLARIFYTooltip title={`Previous object ${normalizedKeyMap.PREVIOUS_OBJECT}`}>
                <Button
                    className='clarify-attribute-annotation-sidebar-object-switcher-left'
                    disabled={objectsCount <= 1}
                    onClick={() => nextObject(-1)}
                >
                    <LeftOutlined />
                </Button>
            </CLARIFYTooltip>
            <CLARIFYTooltip title={title}>
                <Text className='clarify-text'>{currentLabel}</Text>
                <Text className='clarify-text'>{` ${clientID} `}</Text>
                <Text strong>{`[${currentIndex + 1}/${objectsCount}]`}</Text>
            </CLARIFYTooltip>
            <CLARIFYTooltip title={`Next object ${normalizedKeyMap.NEXT_OBJECT}`}>
                <Button
                    className='clarify-attribute-annotation-sidebar-object-switcher-right'
                    disabled={objectsCount <= 1}
                    onClick={() => nextObject(1)}
                >
                    <RightOutlined />
                </Button>
            </CLARIFYTooltip>
        </div>
    );
}

export default React.memo(ObjectSwitcher);