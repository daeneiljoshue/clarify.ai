
import React from 'react';
import { Col } from 'antd/lib/grid';
import Icon, { StopOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Text from 'antd/lib/typography/Text';
import Dropdown from 'antd/lib/dropdown';

import AnnotationMenuContainer from 'containers/annotation-page/top-bar/annotation-menu';
import { MainMenuIcon, UndoIcon, RedoIcon } from 'icons';
import { ActiveControl, ToolsBlockerState } from 'reducers';
import CLARIFYTooltip from 'components/common/clarify-tooltip';
import customizableComponents from 'components/customizable-components';
import GlobalHotKeys, { KeyMap } from 'utils/mousetrap-react';

interface Props {
    saving: boolean;
    undoAction?: string;
    redoAction?: string;
    undoShortcut: string;
    redoShortcut: string;
    drawShortcut: string;
    switchToolsBlockerShortcut: string;
    toolsBlockerState: ToolsBlockerState;
    activeControl: ActiveControl;
    keyMap: KeyMap;
    onSaveAnnotation(): void;
    onUndoClick(): void;
    onRedoClick(): void;
    onFinishDraw(): void;
    onSwitchToolsBlockerState(): void;
}

function LeftGroup(props: Props): JSX.Element {
    const {
        saving,
        keyMap,
        undoAction,
        redoAction,
        undoShortcut,
        redoShortcut,
        drawShortcut,
        switchToolsBlockerShortcut,
        activeControl,
        toolsBlockerState,
        onSaveAnnotation,
        onUndoClick,
        onRedoClick,
        onFinishDraw,
        onSwitchToolsBlockerState,
    } = props;

    const includesDoneButton = [
        ActiveControl.DRAW_POLYGON,
        ActiveControl.DRAW_POLYLINE,
        ActiveControl.DRAW_POINTS,
        ActiveControl.AI_TOOLS,
        ActiveControl.OPENCV_TOOLS,
    ].includes(activeControl);

    const includesToolsBlockerButton =
        [ActiveControl.OPENCV_TOOLS, ActiveControl.AI_TOOLS].includes(activeControl) && toolsBlockerState.buttonVisible;

    const shouldEnableToolsBlockerOnClick = [ActiveControl.OPENCV_TOOLS].includes(activeControl);
    const SaveButtonComponent = customizableComponents.SAVE_ANNOTATION_BUTTON;

    const subKeyMap = {
        UNDO: keyMap.UNDO,
        REDO: keyMap.REDO,
    };

    const handlers = {
        UNDO: (event: KeyboardEvent | undefined) => {
            event?.preventDefault();
            if (undoAction) {
                onUndoClick();
            }
        },
        REDO: (event: KeyboardEvent | undefined) => {
            event?.preventDefault();
            if (redoAction) {
                onRedoClick();
            }
        },
    };

    return (
        <>
            <GlobalHotKeys keyMap={subKeyMap} handlers={handlers} />
            <Modal className='clarify-saving-job-modal' title='Saving changes on the server' visible={saving} footer={[]} closable={false}>
                <Text>CVAT is saving your annotations, please wait </Text>
                <LoadingOutlined />
            </Modal>
            <Col className='clarify-annotation-header-left-group'>
                <Dropdown
                    trigger={['click']}
                    destroyPopupOnHide
                    overlay={<AnnotationMenuContainer />}
                >
                    <Button type='link' className='clarify-annotation-header-menu-button clarify-annotation-header-button'>
                        <Icon component={MainMenuIcon} />
                        Menu
                    </Button>
                </Dropdown>
                <SaveButtonComponent
                    isSaving={saving}
                    onClick={saving ? undefined : onSaveAnnotation}
                    type='link'
                    className={saving ? 'clarify-annotation-header-save-button clarify-annotation-disabled-header-button' :
                        'clarify-annotation-header-save-button clarify-annotation-header-button'}
                />
                <CLARIFYTooltip overlay={`Undo: ${undoAction} ${undoShortcut}`}>
                    <Button
                        style={{ pointerEvents: undoAction ? 'initial' : 'none', opacity: undoAction ? 1 : 0.5 }}
                        type='link'
                        className='clarify-annotation-header-undo-button clarify-annotation-header-button'
                        onClick={onUndoClick}
                    >
                        <Icon component={UndoIcon} />
                        <span>Undo</span>
                    </Button>
                </CLARIFYTooltip>
                <CLARIFYTooltip overlay={`Redo: ${redoAction} ${redoShortcut}`}>
                    <Button
                        style={{ pointerEvents: redoAction ? 'initial' : 'none', opacity: redoAction ? 1 : 0.5 }}
                        type='link'
                        className='clarify-annotation-header-redo-button clarify-annotation-header-button'
                        onClick={onRedoClick}
                    >
                        <Icon component={RedoIcon} />
                        Redo
                    </Button>
                </CLARIFYTooltip>
                {includesDoneButton ? (
                    <CLARIFYTooltip overlay={`Press "${drawShortcut}" to finish`}>
                        <Button type='link' className='clarify-annotation-header-done-button clarify-annotation-header-button' onClick={onFinishDraw}>
                            <CheckCircleOutlined />
                            Done
                        </Button>
                    </CLARIFYTooltip>
                ) : null}
                {includesToolsBlockerButton ? (
                    <CLARIFYTooltip overlay={`Press "${switchToolsBlockerShortcut}" to postpone running the algorithm `}>
                        <Button
                            type='link'
                            className={`clarify-annotation-header-block-tool-button clarify-annotation-header-button ${
                                toolsBlockerState.algorithmsLocked ? 'clarify-button-active' : ''
                            }`}
                            onClick={shouldEnableToolsBlockerOnClick ? onSwitchToolsBlockerState : undefined}
                        >
                            <StopOutlined />
                            Block
                        </Button>
                    </CLARIFYTooltip>
                ) : null}
            </Col>
        </>
    );
}

export default React.memo(LeftGroup);