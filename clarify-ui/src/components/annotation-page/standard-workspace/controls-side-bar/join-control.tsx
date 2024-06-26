
import React from 'react';
import Icon from '@ant-design/icons';

import { Canvas } from 'clarify-canvas-wrapper';
import { ActiveControl } from 'reducers';
import CLARIFYTooltip from 'components/common/clarify-tooltip';
import GlobalHotKeys, { KeyMapItem } from 'utils/mousetrap-react';
import { JoinIcon } from 'icons';

export interface Props {
    updateActiveControl(activeControl: ActiveControl): void;
    canvasInstance: Canvas;
    disabled?: boolean;
    activeControl: ActiveControl;
    shortcuts: {
        SWITCH_JOIN_MODE: {
            details: KeyMapItem;
            displayValue: string;
        };
    }
}

function JoinControl(props: Props): JSX.Element {
    const {
        updateActiveControl,
        canvasInstance,
        activeControl,
        disabled,
        shortcuts,
    } = props;

    const dynamicIconProps =
        activeControl === ActiveControl.JOIN ?
            {
                className: 'clarify-join-control clarify-active-canvas-control',
                onClick: (): void => {
                    canvasInstance.join({ enabled: false });
                },
            } :
            {
                className: 'clarify-join-control',
                onClick: (): void => {
                    canvasInstance.cancel();
                    canvasInstance.join({ enabled: true });
                    updateActiveControl(ActiveControl.JOIN);
                },
            };

    return disabled ? (
        <Icon className='clarify-join-control clarify-disabled-canvas-control' component={JoinIcon} />
    ) : (
        <>
            <GlobalHotKeys
                keyMap={{ SWITCH_JOIN_MODE: shortcuts.SWITCH_JOIN_MODE.details }}
                handlers={{
                    SWITCH_JOIN_MODE: (event: KeyboardEvent | undefined) => {
                        if (event) event.preventDefault();
                        dynamicIconProps.onClick();
                    },
                }}
            />
            <CLARIFYTooltip title={`Join masks ${shortcuts.SWITCH_JOIN_MODE.displayValue}`} placement='right'>
                <Icon {...dynamicIconProps} component={JoinIcon} />
            </CLARIFYTooltip>
        </>
    );
}

export default React.memo(JoinControl);