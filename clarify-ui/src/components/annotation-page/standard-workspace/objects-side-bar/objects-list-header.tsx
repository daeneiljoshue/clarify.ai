
import React from 'react';
import Icon, {
    CaretDownOutlined,
    CaretUpFilled,
    EyeInvisibleFilled,
    EyeOutlined,
    LockFilled,
    UnlockOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd/lib/grid';

import StatesOrderingSelector from 'components/annotation-page/standard-workspace/objects-side-bar/states-ordering-selector';
import CLARIFYTooltip from 'components/common/clarify-tooltip';
import { StatesOrdering, Workspace } from 'reducers';
import { ShowGroundTruthIcon } from 'icons';

interface Props {
    workspace: Workspace;
    readonly: boolean;
    statesHidden: boolean;
    statesLocked: boolean;
    statesCollapsed: boolean;
    statesOrdering: StatesOrdering;
    switchLockAllShortcut: string;
    switchHiddenAllShortcut: string;
    showGroundTruth: boolean;
    changeStatesOrdering(value: StatesOrdering): void;
    lockAllStates(): void;
    unlockAllStates(): void;
    collapseAllStates(): void;
    expandAllStates(): void;
    hideAllStates(): void;
    showAllStates(): void;
    changeShowGroundTruth(): void;
}

function LockAllSwitcher(props: Props): JSX.Element {
    const {
        statesLocked, switchLockAllShortcut, unlockAllStates, lockAllStates,
    } = props;
    return (
        <Col span={2}>
            <CLARIFYTooltip title={`Switch lock property for all ${switchLockAllShortcut}`}>
                {statesLocked ? <LockFilled onClick={unlockAllStates} /> : <UnlockOutlined onClick={lockAllStates} />}
            </CLARIFYTooltip>
        </Col>
    );
}

function HideAllSwitcher(props: Props): JSX.Element {
    const {
        statesHidden, switchHiddenAllShortcut, showAllStates, hideAllStates,
    } = props;
    return (
        <Col span={2}>
            <CLARIFYTooltip title={`Switch hidden property for all ${switchHiddenAllShortcut}`}>
                {statesHidden ? (
                    <EyeInvisibleFilled onClick={showAllStates} />
                ) : (
                    <EyeOutlined onClick={hideAllStates} />
                )}
            </CLARIFYTooltip>
        </Col>
    );
}

function GTSwitcher(props: Props): JSX.Element {
    const {
        showGroundTruth, changeShowGroundTruth,
    } = props;
    return (
        <Col>
            <CLARIFYTooltip title='Show Ground truth annotations and conflicts'>
                <Icon
                    className={
                        `clarify-objects-sidebar-show-ground-truth ${showGroundTruth ? 'clarify-objects-sidebar-show-ground-truth-active' : ''}`
                    }
                    component={ShowGroundTruthIcon}
                    onClick={changeShowGroundTruth}
                />
            </CLARIFYTooltip>
        </Col>
    );
}

function CollapseAllSwitcher(props: Props): JSX.Element {
    const { statesCollapsed, expandAllStates, collapseAllStates } = props;
    return (
        <Col>
            <CLARIFYTooltip title='Expand/collapse all'>
                {statesCollapsed ? (
                    <CaretDownOutlined onClick={expandAllStates} />
                ) : (
                    <CaretUpFilled onClick={collapseAllStates} />
                )}
            </CLARIFYTooltip>
        </Col>
    );
}

function ObjectListHeader(props: Props): JSX.Element {
    const {
        workspace, readonly, statesOrdering, changeStatesOrdering,
    } = props;

    return (
        <div className='clarify-objects-sidebar-states-header'>
            <Row justify='space-between' align='middle'>
                {!readonly && <LockAllSwitcher {...props} />}
                <HideAllSwitcher {...props} />
                { workspace === Workspace.REVIEW && (
                    <GTSwitcher {...props} />
                )}
                <CollapseAllSwitcher {...props} />
                <StatesOrderingSelector statesOrdering={statesOrdering} changeStatesOrdering={changeStatesOrdering} />
            </Row>
        </div>
    );
}

export default React.memo(ObjectListHeader);