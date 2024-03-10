
import React, { ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import Tag from 'antd/lib/tag';
import Icon from '@ant-design/icons';
import CLARIFYTooltip from 'components/common/clarify-tooltip';
import { ConflictIcon } from 'icons';
import { ConflictSeverity, QualityConflict } from 'clarify-core-wrapper';

interface Props {
    top: number;
    left: number;
    angle: number;
    scale: number;
    text: string;
    darken: boolean;
    severity: ConflictSeverity;
    conflict: QualityConflict;
    tooltipVisible: boolean;
    onEnter: (conflict: QualityConflict) => void;
    onLeave: (conflict: QualityConflict) => void;
}

export default function ConflictLabel(props: Props): ReactPortal {
    const {
        top, left, angle, scale, text, severity, darken, conflict, onEnter, onLeave, tooltipVisible,
    } = props;

    const conflictColor = severity === ConflictSeverity.ERROR ? 'clarify-conflict-error' : 'clarify-conflict-warning';
    const darkenColor = darken ? 'clarify-conflict-darken' : '';

    return ReactDOM.createPortal(
        <CLARIFYTooltip
            title={text}
            visible={tooltipVisible}
        >
            <Tag
                style={{
                    top,
                    left,
                    transform: `scale(${scale}) rotate(${angle}deg) translateY(-100%) translateX(-50%)`,
                }}
                className={`clarify-conflict-label ${conflictColor} ${darkenColor}`}
            >
                <Icon
                    onMouseEnter={() => {
                        onEnter(conflict);
                    }}
                    onMouseLeave={() => {
                        onLeave(conflict);
                    }}
                    component={ConflictIcon}
                />
            </Tag>
        </CLARIFYTooltip>,
        window.document.getElementById('clarify_canvas_attachment_board') as HTMLElement,
    );
}