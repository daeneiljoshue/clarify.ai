
import React from 'react';
import Icon from '@ant-design/icons';

import { CursorIcon } from 'icons';
import { ActiveControl } from 'reducers';
import { Canvas } from 'clarify-canvas-wrapper';
import { Canvas3d } from 'clarify-canvas3d-wrapper';
import CLARIFYTooltip from 'components/common/clarify-tooltip';
import GlobalHotKeys, { KeyMapItem } from 'utils/mousetrap-react';

export interface Props {
    canvasInstance: Canvas | Canvas3d;
    cursorShortkey: string;
    activeControl: ActiveControl;
    shortcuts: {
        CANCEL: {
            details: KeyMapItem;
            displayValue: string;
        };
    }
}

function CursorControl(props: Props): JSX.Element {
    const {
        canvasInstance, activeControl, cursorShortkey, shortcuts,
    } = props;

    const handler = (): void => {
        if (activeControl !== ActiveControl.CURSOR) {
            canvasInstance.cancel();
        }
    };

    return (
        <>
            <GlobalHotKeys
                keyMap={{ CANCEL: shortcuts.CANCEL.details }}
                handlers={{
                    CANCEL: (event: KeyboardEvent | undefined) => {
                        if (event) event.preventDefault();
                        handler();
                    },
                }}
            />
            <CLARIFYTooltip title={`Cursor ${cursorShortkey}`} placement='right'>
                <Icon
                    component={CursorIcon}
                    className={
                        activeControl === ActiveControl.CURSOR ?
                            'clarify-active-canvas-control clarify-cursor-control' :
                            'clarify-cursor-control'
                    }
                    onClick={handler}
                />
            </CLARIFYTooltip>
        </>
    );
}

export default React.memo(CursorControl);