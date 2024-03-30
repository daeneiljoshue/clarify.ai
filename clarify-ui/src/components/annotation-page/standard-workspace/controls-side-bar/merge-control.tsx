
import React from 'react';
import Icon from '@ant-design/icons';

import { MergeIcon } from 'icons';
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
        SWITCH_MERGE_MODE: {
            details: KeyMapItem;
            displayValue: string;
        }
    };
}

function MergeControl(props: Props): JSX.Element {
    const {
        shortcuts, activeControl, canvasInstance, updateActiveControl, disabled,
    } = props;

    const dynamicIconProps =
        activeControl === ActiveControl.MERGE ?
            {
                className: 'clarify-merge-control clarify-active-canvas-control',
                onClick: (): void => {
                    canvasInstance.merge({ enabled: false });
                    updateActiveControl(ActiveControl.CURSOR);
                },
            } :
            {
                className: 'clarify-merge-control',
                onClick: (): void => {
                    canvasInstance.cancel();
                    canvasInstance.merge({ enabled: true });
                    updateActiveControl(ActiveControl.MERGE);
                },
            };

    return disabled ? (
        <Icon className='clarify-merge-control clarify-disabled-canvas-control' component={MergeIcon} />
    ) : (
        <>
            <GlobalHotKeys
                keyMap={{ SWITCH_MERGE_MODE: shortcuts.SWITCH_MERGE_MODE.details }}
                handlers={{
                    SWITCH_MERGE_MODE: (event: KeyboardEvent | undefined) => {
                        if (event) event.preventDefault();
                        dynamicIconProps.onClick();
                    },
                }}
            />
            <CLARIFYTooltip title={`Merge shapes/tracks ${shortcuts.SWITCH_MERGE_MODE.displayValue}`} placement='right'>
                <Icon {...dynamicIconProps} component={MergeIcon} />
            </CLARIFYTooltip>
        </>
    );
}

export default React.memo(MergeControl);