
import React, { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import Text from 'antd/lib/typography/Text';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import Slider from 'antd/lib/slider';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Collapse from 'antd/lib/collapse';
import Button from 'antd/lib/button';

import ColorPicker from 'components/annotation-page/standard-workspace/objects-side-bar/color-picker';
import { ColorizeIcon } from 'icons';
import { ColorBy, CombinedState, Workspace } from 'reducers';
import { DimensionType } from 'clarify-core-wrapper';
import { collapseAppearance as collapseAppearanceAction } from 'actions/annotation-actions';
import {
    changeShapesColorBy as changeShapesColorByAction,
    changeShapesOpacity as changeShapesOpacityAction,
    changeSelectedShapesOpacity as changeSelectedShapesOpacityAction,
    changeShapesOutlinedBorders as changeShapesOutlinedBordersAction,
    changeShowBitmap as changeShowBitmapAction,
    changeShowProjections as changeShowProjectionsAction,
} from 'actions/settings-actions';

interface StateToProps {
    appearanceCollapsed: boolean;
    colorBy: ColorBy;
    opacity: number;
    selectedOpacity: number;
    outlined: boolean;
    outlineColor: string;
    showBitmap: boolean;
    showProjections: boolean;
    workspace: Workspace;
    jobInstance: any;
}

interface DispatchToProps {
    collapseAppearance(): void;
    changeShapesColorBy(event: RadioChangeEvent): void;
    changeShapesOpacity(value: number): void;
    changeSelectedShapesOpacity(value: number): void;
    changeShapesOutlinedBorders(outlined: boolean, color: string): void;
    changeShowBitmap(event: CheckboxChangeEvent): void;
    changeShowProjections(event: CheckboxChangeEvent): void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const {
        annotation: {
            appearanceCollapsed,
            workspace,
            job: { instance: jobInstance },
        },
        settings: {
            shapes: {
                colorBy, opacity, selectedOpacity, outlined, outlineColor, showBitmap, showProjections,
            },
        },
    } = state;

    return {
        appearanceCollapsed,
        colorBy,
        opacity,
        selectedOpacity,
        outlined,
        outlineColor,
        showBitmap,
        showProjections,
        workspace,
        jobInstance,
    };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
    return {
        collapseAppearance(): void {
            dispatch(collapseAppearanceAction());
        },
        changeShapesColorBy(event: RadioChangeEvent): void {
            dispatch(changeShapesColorByAction(event.target.value));
        },
        changeShapesOpacity(value: number): void {
            dispatch(changeShapesOpacityAction(value));
        },
        changeSelectedShapesOpacity(value: number): void {
            dispatch(changeSelectedShapesOpacityAction(value));
        },
        changeShapesOutlinedBorders(outlined: boolean, color: string): void {
            dispatch(changeShapesOutlinedBordersAction(outlined, color));
        },
        changeShowBitmap(event: CheckboxChangeEvent): void {
            dispatch(changeShowBitmapAction(event.target.checked));
        },
        changeShowProjections(event: CheckboxChangeEvent): void {
            dispatch(changeShowProjectionsAction(event.target.checked));
        },
    };
}

type Props = StateToProps & DispatchToProps;

function AppearanceBlock(props: Props): JSX.Element {
    const {
        appearanceCollapsed,
        colorBy,
        opacity,
        selectedOpacity,
        outlined,
        outlineColor,
        showBitmap,
        showProjections,
        collapseAppearance,
        changeShapesColorBy,
        changeShapesOpacity,
        changeSelectedShapesOpacity,
        changeShapesOutlinedBorders,
        changeShowBitmap,
        changeShowProjections,
        jobInstance,
    } = props;

    const is2D = jobInstance.dimension === DimensionType.DIMENSION_2D;

    return (
        <Collapse
            onChange={collapseAppearance}
            activeKey={appearanceCollapsed ? [] : ['appearance']}
            className='clarify-objects-appearance-collapse'
        >
            <Collapse.Panel
                header={(
                    <Text strong className='clarify-objects-appearance-collapse-header'>
                        Appearance
                    </Text>
                )}
                key='appearance'
            >
                <div className='clarify-objects-appearance-content'>
                    <Text type='secondary'>Color by</Text>
                    <Radio.Group
                        className='clarify-appearance-color-by-radio-group'
                        value={colorBy}
                        onChange={changeShapesColorBy}
                    >
                        <Radio.Button value={ColorBy.LABEL}>{ColorBy.LABEL}</Radio.Button>
                        <Radio.Button value={ColorBy.INSTANCE}>{ColorBy.INSTANCE}</Radio.Button>
                        <Radio.Button value={ColorBy.GROUP}>{ColorBy.GROUP}</Radio.Button>
                    </Radio.Group>
                    <Text type='secondary'>Opacity</Text>
                    <Slider
                        className='clarify-appearance-opacity-slider'
                        onChange={changeShapesOpacity}
                        value={opacity}
                        min={0}
                        max={100}
                    />
                    <Text type='secondary'>Selected opacity</Text>
                    <Slider
                        className='clarify-appearance-selected-opacity-slider'
                        onChange={changeSelectedShapesOpacity}
                        value={selectedOpacity}
                        min={0}
                        max={100}
                    />
                    <Checkbox
                        className='clarify-appearance-outlinded-borders-checkbox'
                        onChange={(event: CheckboxChangeEvent) => {
                            changeShapesOutlinedBorders(event.target.checked, outlineColor);
                        }}
                        checked={outlined}
                    >
                        Outlined borders
                        <ColorPicker
                            onChange={(color) => changeShapesOutlinedBorders(outlined, color)}
                            value={outlineColor}
                            placement='top'
                            resetVisible={false}
                        >
                            <Button className='clarify-appearance-outlined-borders-button' type='link' shape='circle'>
                                <ColorizeIcon />
                            </Button>
                        </ColorPicker>
                    </Checkbox>
                    {is2D && (
                        <Checkbox
                            className='clarify-appearance-bitmap-checkbox'
                            onChange={changeShowBitmap}
                            checked={showBitmap}
                        >
                            Show bitmap
                        </Checkbox>
                    )}
                    {is2D && (
                        <Checkbox
                            className='clarify-appearance-cuboid-projections-checkbox'
                            onChange={changeShowProjections}
                            checked={showProjections}
                        >
                            Show projections
                        </Checkbox>
                    )}
                </div>
            </Collapse.Panel>
        </Collapse>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AppearanceBlock));