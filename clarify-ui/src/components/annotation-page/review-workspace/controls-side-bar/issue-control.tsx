
import React from 'react';
import Icon from '@ant-design/icons';

import { ActiveControl } from 'reducers';
import { Canvas } from 'clarify-canvas-wrapper';
import { RectangleIcon } from 'icons';
import CLARIFYTooltip from 'components/common/clarify-tooltip';
import GlobalHotKeys, { KeyMapItem } from 'utils/mousetrap-react';

interface Props {
    canvasInstance: Canvas;
    activeControl: ActiveControl;
    disabled: boolean;
    shortcuts: {
        OPEN_REVIEW_ISSUE: {
            details: KeyMapItem;
            displayValue: string;
        };
    }
    updateActiveControl(activeControl: ActiveControl): void;
}

function CreateIssueControl(props: Props): JSX.Element {
    const {
        activeControl, canvasInstance, updateActiveControl, disabled, shortcuts,
    } = props;

    const handler = (): void => {
        if (activeControl === ActiveControl.OPEN_ISSUE) {
            canvasInstance.selectRegion(false);
            updateActiveControl(ActiveControl.CURSOR);
        } else {
            canvasInstance.cancel();
            canvasInstance.selectRegion(true);
            updateActiveControl(ActiveControl.OPEN_ISSUE);
        }
    };

    const shortcutHandlers = {
        OPEN_REVIEW_ISSUE: (event: KeyboardEvent | undefined) => {
            if (event) event.preventDefault();
            handler();
        },
    };

    return (
        disabled ? (
            <Icon component={RectangleIcon} className='clarify-issue-control clarify-disabled-canvas-control' />
        ) : (
            <>
                <GlobalHotKeys
                    keyMap={{ OPEN_REVIEW_ISSUE: shortcuts.OPEN_REVIEW_ISSUE.details }}
                    handlers={shortcutHandlers}
                />
                <CLARIFYTooltip title='Open an issue' placement='right'>
                    <Icon
                        component={RectangleIcon}
                        className={
                            activeControl === ActiveControl.OPEN_ISSUE ?
                                'clarify-issue-control clarify-active-canvas-control' :
                                'clarify-issue-control'
                        }
                        onClick={handler}
                    />
                </CLARIFYTooltip>
            </>
        )
    );
}

export default React.memo(CreateIssueControl);