
import React from 'react';
import Icon from '@ant-design/icons';

import { getCLARIFYStore } from 'clarify-store';
import { Canvas } from 'clarify-canvas-wrapper';
import { ActiveControl } from 'reducers';
import CLARIFYTooltip from 'components/common/clarify-tooltip';
import GlobalHotKeys, { KeyMapItem } from 'utils/mousetrap-react';
import opencvWrapper from 'utils/opencv-wrapper/opencv-wrapper';
import { SliceIcon } from 'icons';

export interface Props {
    updateActiveControl(activeControl: ActiveControl): void;
    canvasInstance: Canvas;
    activeControl: ActiveControl;
    disabled?: boolean;
    shortcuts: {
        SWITCH_SLICE_MODE: {
            details: KeyMapItem;
            displayValue: string;
        };
    };
}

function SliceControl(props: Props): JSX.Element {
    const {
        updateActiveControl, canvasInstance, activeControl, disabled, shortcuts,
    } = props;

    const dynamicIconProps =
        activeControl === ActiveControl.SLICE ?
            {
                className: 'clarify-slice-control clarify-active-canvas-control',
                onClick: (): void => {
                    canvasInstance.slice({ enabled: false });
                },
            } :
            {
                className: 'clarify-slice-control',
                onClick: (event?: React.MouseEvent): void => {
                    const triggeredByShorcut = !event;
                    canvasInstance.cancel();
                    canvasInstance.slice({
                        enabled: true,
                        getContour: opencvWrapper.getContourFromState,
                        ...(triggeredByShorcut ? {
                            clientID: getCLARIFYStore().getState().annotation.annotations.activatedStateID || undefined,
                        } : {}),
                    });
                    updateActiveControl(ActiveControl.SLICE);
                },
            };

    return disabled ? (
        <Icon className='clarify-slice-control clarify-disabled-canvas-control' component={SliceIcon} />
    ) : (
        <>
            <GlobalHotKeys
                keyMap={{ SWITCH_SLICE_MODE: shortcuts.SWITCH_SLICE_MODE.details }}
                handlers={{
                    SWITCH_SLICE_MODE: (event: KeyboardEvent | undefined) => {
                        if (event) event.preventDefault();
                        dynamicIconProps.onClick();
                    },
                }}
            />
            <CLARIFYTooltip title={`Slice a mask/polygon shape ${shortcuts.SWITCH_SLICE_MODE.displayValue}`} placement='right'>
                <Icon {...dynamicIconProps} component={SliceIcon} />
            </CLARIFYTooltip>
        </>
    );
}

export default React.memo(SliceControl);