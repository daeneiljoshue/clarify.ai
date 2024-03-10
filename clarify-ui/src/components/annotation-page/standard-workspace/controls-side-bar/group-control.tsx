
import React from 'react';
import Icon from '@ant-design/icons';

import { GroupIcon } from 'icons';
import { Canvas } from 'clarify-canvas-wrapper';
import { Canvas3d } from 'clarify-canvas3d-wrapper';
import { ActiveControl } from 'reducers';
import CLARIFYTooltip from 'components/common/clarify-tooltip';
import GlobalHotKeys, { KeyMapItem } from 'utils/mousetrap-react';

export interface Props {
    updateActiveControl(activeControl: ActiveControl): void;
    resetGroup(): void;
    canvasInstance: Canvas | Canvas3d;
    activeControl: ActiveControl;
    disabled?: boolean;
    shortcuts: {
        SWITCH_GROUP_MODE: {
            details: KeyMapItem;
            displayValue: string;
        };
        RESET_GROUP: {
            details: KeyMapItem;
            displayValue: string;
        };
    }
}

function GroupControl(props: Props): JSX.Element {
    const {
        updateActiveControl,
        resetGroup,
        activeControl,
        canvasInstance,
        disabled,
        shortcuts,
    } = props;

    const dynamicIconProps =
        activeControl === ActiveControl.GROUP ?
            {
                className: 'cvat-group-control cvat-active-canvas-control',
                onClick: (): void => {
                    canvasInstance.group({ enabled: false });
                    updateActiveControl(ActiveControl.CURSOR);
                },
            } :
            {
                className: 'cvat-group-control',
                onClick: (): void => {
                    canvasInstance.cancel();
                    canvasInstance.group({ enabled: true });
                    updateActiveControl(ActiveControl.GROUP);
                },
            };

    const title = [
        `Group shapes/tracks ${shortcuts.SWITCH_GROUP_MODE.displayValue}`,
        `Select and press ${shortcuts.RESET_GROUP.displayValue} to reset a group.`,
    ].join(' ');

    return disabled ? (
        <Icon className='cvat-group-control cvat-disabled-canvas-control' component={GroupIcon} />
    ) : (
        <>
            <GlobalHotKeys
                keyMap={{
                    SWITCH_GROUP_MODE: shortcuts.SWITCH_GROUP_MODE.details,
                    RESET_GROUP: shortcuts.RESET_GROUP.details,
                }}
                handlers={{
                    SWITCH_GROUP_MODE: (event: KeyboardEvent | undefined) => {
                        if (event) event.preventDefault();
                        dynamicIconProps.onClick();
                    },
                    RESET_GROUP: (event: KeyboardEvent | undefined) => {
                        if (event) event.preventDefault();
                        const grouping = activeControl === ActiveControl.GROUP;
                        if (!grouping) {
                            return;
                        }
                        resetGroup();
                        canvasInstance.group({ enabled: false });
                        updateActiveControl(ActiveControl.CURSOR);
                    },
                }}
            />
            <CLARIFYTooltip title={title} placement='right'>
                <Icon {...dynamicIconProps} component={GroupIcon} />
            </CLARIFYTooltip>
        </>
    );
}

export default React.memo(GroupControl);