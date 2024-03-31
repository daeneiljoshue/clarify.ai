
import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import Icon, {
    UnlockOutlined,
    LockFilled,
    TeamOutlined,
    UserOutlined,
    PushpinFilled,
    PushpinOutlined,
    EyeInvisibleFilled,
    StarFilled,
    SelectOutlined,
    StarOutlined,
    EyeOutlined,
} from '@ant-design/icons';

import CLARIFYTooltip from 'components/common/clarify-tooltip';
import { ObjectType, ShapeType } from 'reducers';
import {
    ObjectOutsideIcon, FirstIcon, LastIcon, PreviousIcon, NextIcon,
} from 'icons';

interface Props {
    readonly: boolean;
    parentID: number;
    objectType: ObjectType;
    shapeType: ShapeType;
    occluded: boolean;
    outside: boolean | undefined;
    locked: boolean;
    pinned: boolean;
    hidden: boolean;
    keyframe: boolean | undefined;
    outsideDisabled: boolean;
    hiddenDisabled: boolean;
    keyframeDisabled: boolean;
    switchOccludedShortcut: string;
    switchOutsideShortcut: string;
    switchLockShortcut: string;
    switchHiddenShortcut: string;
    switchKeyFrameShortcut: string;
    nextKeyFrameShortcut: string;
    prevKeyFrameShortcut: string;

    navigateFirstKeyframe: null | (() => void);
    navigatePrevKeyframe: null | (() => void);
    navigateNextKeyframe: null | (() => void);
    navigateLastKeyframe: null | (() => void);

    setOccluded(): void;
    unsetOccluded(): void;
    setOutside(): void;
    unsetOutside(): void;
    setKeyframe(): void;
    unsetKeyframe(): void;
    lock(): void;
    unlock(): void;
    pin(): void;
    unpin(): void;
    hide(): void;
    show(): void;
}

const classes = {
    firstKeyFrame: { className: 'clarify-object-item-button-first-keyframe' },
    prevKeyFrame: { className: 'clarify-object-item-button-prev-keyframe' },
    nextKeyFrame: { className: 'clarify-object-item-button-next-keyframe' },
    lastKeyFrame: { className: 'clarify-object-item-button-last-keyframe' },
    outside: {
        enabled: { className: 'clarify-object-item-button-outside clarify-object-item-button-outside-enabled' },
        disabled: { className: 'clarify-object-item-button-outside' },
    },
    lock: {
        enabled: { className: 'clarify-object-item-button-lock clarify-object-item-button-lock-enabled' },
        disabled: { className: 'clarify-object-item-button-lock' },
    },
    occluded: {
        enabled: { className: 'clarify-object-item-button-occluded clarify-object-item-button-occluded-enabled' },
        disabled: { className: 'clarify-object-item-button-occluded' },
    },
    pinned: {
        enabled: { className: 'clarify-object-item-button-pinned clarify-object-item-button-pinned-enabled' },
        disabled: { className: 'clarify-object-item-button-pinned' },
    },
    hidden: {
        enabled: { className: 'clarify-object-item-button-hidden clarify-object-item-button-hidden-enabled' },
        disabled: { className: 'clarify-object-item-button-hidden' },
    },
    keyframe: {
        enabled: { className: 'clarify-object-item-button-keyframe clarify-object-item-button-keyframe-enabled' },
        disabled: { className: 'clarify-object-item-button-keyframe' },
    },
};

function NavigateFirstKeyframe(props: Props): JSX.Element {
    const { navigateFirstKeyframe } = props;
    return navigateFirstKeyframe ? (
        <Icon {...classes.firstKeyFrame} component={FirstIcon} onClick={navigateFirstKeyframe} />
    ) : (
        <Icon {...classes.firstKeyFrame} component={FirstIcon} style={{ opacity: 0.5, pointerEvents: 'none' }} />
    );
}

function NavigatePrevKeyframe(props: Props): JSX.Element {
    const { prevKeyFrameShortcut, navigatePrevKeyframe } = props;
    return navigatePrevKeyframe ? (
        <CLARIFYTooltip title={`Go to previous keyframe ${prevKeyFrameShortcut}`}>
            <Icon {...classes.prevKeyFrame} component={PreviousIcon} onClick={navigatePrevKeyframe} />
        </CLARIFYTooltip>
    ) : (
        <Icon {...classes.prevKeyFrame} component={PreviousIcon} style={{ opacity: 0.5, pointerEvents: 'none' }} />
    );
}

function NavigateNextKeyframe(props: Props): JSX.Element {
    const { navigateNextKeyframe, nextKeyFrameShortcut } = props;
    return navigateNextKeyframe ? (
        <CLARIFYTooltip title={`Go to next keyframe ${nextKeyFrameShortcut}`}>
            <Icon {...classes.nextKeyFrame} component={NextIcon} onClick={navigateNextKeyframe} />
        </CLARIFYTooltip>
    ) : (
        <Icon {...classes.nextKeyFrame} component={NextIcon} style={{ opacity: 0.5, pointerEvents: 'none' }} />
    );
}

function NavigateLastKeyframe(props: Props): JSX.Element {
    const { navigateLastKeyframe } = props;
    return navigateLastKeyframe ? (
        <Icon {...classes.lastKeyFrame} component={LastIcon} onClick={navigateLastKeyframe} />
    ) : (
        <Icon {...classes.lastKeyFrame} component={LastIcon} style={{ opacity: 0.5, pointerEvents: 'none' }} />
    );
}

function SwitchLock(props: Props): JSX.Element {
    const {
        locked, switchLockShortcut, lock, unlock,
    } = props;
    return (
        <CLARIFYTooltip title={`Switch lock property ${switchLockShortcut}`}>
            {locked ? (
                <LockFilled {...classes.lock.enabled} onClick={unlock} />
            ) : (
                <UnlockOutlined {...classes.lock.disabled} onClick={lock} />
            )}
        </CLARIFYTooltip>
    );
}

function SwitchOccluded(props: Props): JSX.Element {
    const {
        switchOccludedShortcut, occluded, unsetOccluded, setOccluded,
    } = props;
    return (
        <CLARIFYTooltip title={`Switch occluded property ${switchOccludedShortcut}`}>
            {occluded ? (
                <TeamOutlined {...classes.occluded.enabled} onClick={unsetOccluded} />
            ) : (
                <UserOutlined {...classes.occluded.disabled} onClick={setOccluded} />
            )}
        </CLARIFYTooltip>
    );
}

function SwitchPinned(props: Props): JSX.Element {
    const { pinned, pin, unpin } = props;
    return (
        <CLARIFYTooltip title='Switch pinned property'>
            {pinned ? (
                <PushpinFilled {...classes.pinned.enabled} onClick={unpin} />
            ) : (
                <PushpinOutlined {...classes.pinned.disabled} onClick={pin} />
            )}
        </CLARIFYTooltip>
    );
}

function SwitchHidden(props: Props): JSX.Element {
    const {
        switchHiddenShortcut, hidden, hiddenDisabled, show, hide,
    } = props;
    const hiddenStyle = hiddenDisabled ? { opacity: 0.5, pointerEvents: 'none' as const } : {};
    return (
        <CLARIFYTooltip title={`Switch hidden property ${switchHiddenShortcut}`}>
            {hidden ? (
                <EyeInvisibleFilled {...classes.hidden.enabled} onClick={show} style={hiddenStyle} />
            ) : (
                <EyeOutlined {...classes.hidden.disabled} onClick={hide} style={hiddenStyle} />
            )}
        </CLARIFYTooltip>
    );
}

function SwitchOutside(props: Props): JSX.Element {
    const {
        outside, switchOutsideShortcut, outsideDisabled, unsetOutside, setOutside,
    } = props;
    const outsideStyle = outsideDisabled ? { opacity: 0.5, pointerEvents: 'none' as const } : {};
    return (
        <CLARIFYTooltip title={`Switch outside property ${switchOutsideShortcut}`}>
            {outside ? (
                <Icon
                    {...classes.outside.enabled}
                    component={ObjectOutsideIcon}
                    onClick={unsetOutside}
                    style={outsideStyle}
                />
            ) : (
                <SelectOutlined {...classes.outside.disabled} onClick={setOutside} style={outsideStyle} />
            )}
        </CLARIFYTooltip>
    );
}

function SwitchKeyframe(props: Props): JSX.Element {
    const {
        keyframe, switchKeyFrameShortcut, keyframeDisabled, unsetKeyframe, setKeyframe,
    } = props;
    const keyframeStyle = keyframeDisabled ? { opacity: 0.5, pointerEvents: 'none' as const } : {};
    return (
        <CLARIFYTooltip title={`Switch keyframe property ${switchKeyFrameShortcut}`}>
            {keyframe ? (
                <StarFilled {...classes.keyframe.enabled} onClick={unsetKeyframe} style={keyframeStyle} />
            ) : (
                <StarOutlined {...classes.keyframe.disabled} onClick={setKeyframe} style={keyframeStyle} />
            )}
        </CLARIFYTooltip>
    );
}

function ItemButtonsComponent(props: Props): JSX.Element {
    const {
        readonly, objectType, shapeType, parentID,
    } = props;

    if (objectType === ObjectType.TRACK) {
        return (
            <Row align='middle' justify='space-around'>
                <Col span={20} style={{ textAlign: 'center' }}>
                    <Row justify='space-around'>
                        <Col>
                            <NavigateFirstKeyframe {...props} />
                        </Col>
                        <Col>
                            <NavigatePrevKeyframe {...props} />
                        </Col>
                        <Col>
                            <NavigateNextKeyframe {...props} />
                        </Col>
                        <Col>
                            <NavigateLastKeyframe {...props} />
                        </Col>
                    </Row>
                    {readonly ? (
                        <Row justify='space-around'>
                            <Col>
                                <SwitchHidden {...props} />
                            </Col>
                        </Row>
                    ) : (
                        <Row justify='space-around'>
                            <Col>
                                <SwitchOutside {...props} />
                            </Col>
                            <Col>
                                <SwitchLock {...props} />
                            </Col>
                            <Col>
                                <SwitchOccluded {...props} />
                            </Col>
                            <Col>
                                <SwitchHidden {...props} />
                            </Col>
                            <Col>
                                <SwitchKeyframe {...props} />
                            </Col>
                            {shapeType !== ShapeType.POINTS && (
                                <Col>
                                    <SwitchPinned {...props} />
                                </Col>
                            )}
                        </Row>
                    )}
                </Col>
            </Row>
        );
    }

    if (objectType === ObjectType.SHAPE) {
        return (
            <Row align='middle' justify='space-around'>
                <Col span={20} style={{ textAlign: 'center' }}>
                    { readonly ? (
                        <Row justify='space-around'>
                            <Col>
                                <SwitchHidden {...props} />
                            </Col>
                        </Row>
                    ) : (
                        <Row justify='space-around'>
                            { Number.isInteger(parentID) && (
                                <Col>
                                    <SwitchOutside {...props} />
                                </Col>
                            )}
                            <Col>
                                <SwitchLock {...props} />
                            </Col>
                            <Col>
                                <SwitchOccluded {...props} />
                            </Col>
                            <Col>
                                <SwitchHidden {...props} />
                            </Col>
                            {shapeType !== ShapeType.POINTS && (
                                <Col>
                                    <SwitchPinned {...props} />
                                </Col>
                            )}
                        </Row>
                    )}
                </Col>
            </Row>
        );
    }

    if (readonly) {
        return <div />;
    }

    return (
        <Row align='middle' justify='space-around'>
            <Col span={20} style={{ textAlign: 'center' }}>
                <Row justify='space-around'>
                    <Col>
                        <SwitchLock {...props} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default React.memo(ItemButtonsComponent);