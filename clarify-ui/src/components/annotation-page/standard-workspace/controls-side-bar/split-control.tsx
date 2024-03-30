

import React from 'react';
import Icon from '@ant-design/icons';

import { SplitIcon } from 'icons';
import { Canvas } from 'clarify-canvas-wrapper';
import { Canvas3d } from 'clarify-canvas3d-wrapper';
import { ActiveControl } from 'reducers';
import CLARIFYTooltip from 'components/common/clarify-tooltip';
import GlobalHotKeys, { KeyMapItem } from 'utils/mousetrap-react';

export interface Props {
    updateActiveControl(activeControl: ActiveControl): void;
    canvasInstance: Canvas | Canvas3d;
    activeControl: ActiveControl;
    disabled?: boolean;
    shortcuts: {
        SWITCH_SPLIT_MODE: {
            details: KeyMapItem;
            displayValue: string;
        };
    };
}

function SplitControl(props: Props): JSX.Element {
    const {
        shortcuts, activeControl, canvasInstance, updateActiveControl, disabled,
    } = props;

    const dynamicIconProps = activeControl === ActiveControl.SPLIT ?
        {
            className: 'clarify-split-track-control clarify-active-canvas-control',
            onClick: (): void => {
                canvasInstance.split({ enabled: false });
            },
        } :
        {
            className: 'clarify-split-track-control',
            onClick: (): void => {
                canvasInstance.cancel();
                canvasInstance.split({ enabled: true });
                updateActiveControl(ActiveControl.SPLIT);
            },
        };

    return disabled ? (
        <Icon className='clarify-split-track-control clarify-disabled-canvas-control' component={SplitIcon} />
    ) : (
        <>
            <GlobalHotKeys
                keyMap={{ SWITCH_SPLIT_MODE: shortcuts.SWITCH_SPLIT_MODE.details }}
                handlers={{
                    SWITCH_SPLIT_MODE: (event: KeyboardEvent | undefined) => {
                        if (event) event.preventDefault();
                        dynamicIconProps.onClick();
                    },
                }}
            />
            <CLARIFYTooltip title={`Split a track ${shortcuts.SWITCH_SPLIT_MODE.displayValue}`} placement='right'>
                <Icon {...dynamicIconProps} component={SplitIcon} />
            </CLARIFYTooltip>
        </>
    );
}

export default React.memo(SplitControl);