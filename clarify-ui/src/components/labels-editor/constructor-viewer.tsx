import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';

import ConstructorViewerItem from './constructor-viewer-item';
import { LabelOptColor } from './common';

interface ConstructorViewerProps {
    labels: LabelOptColor[];
    onUpdate: (label: LabelOptColor) => void;
    onDelete: (label: LabelOptColor) => void;
    onCreate: (creatorType: 'basic' | 'skeleton' | 'model') => void;
}

function ConstructorViewer(props: ConstructorViewerProps): JSX.Element {
    const {
        onCreate, onUpdate, onDelete, labels,
    } = props;
    const list = [
        <Button key='create' type='ghost' onClick={() => onCreate('basic')} className='clarify-constructor-viewer-new-item'>
            Add label
            <PlusCircleOutlined />
        </Button>,
        <Button key='create_skeleton' type='ghost' onClick={() => onCreate('skeleton')} className='clarifyconstructor-viewer-new-skeleton-item'>
            Setup skeleton
            <PlusCircleOutlined />
        </Button>,
        <Button key='from_model' type='ghost' onClick={() => onCreate('model')} className='clarify-constructor-viewer-new-from-model-item'>
            From model
            <PlusCircleOutlined />
        </Button>,
    ];
    for (const label of labels) {
        list.push(
            <ConstructorViewerItem
                onUpdate={onUpdate}
                onDelete={onDelete}
                label={label}
                key={label.id}
                color={label.color}
            />,
        );
    }

    return <div className='clarify-constructor-viewer'>{list}</div>;
}

export default React.memo(ConstructorViewer);
