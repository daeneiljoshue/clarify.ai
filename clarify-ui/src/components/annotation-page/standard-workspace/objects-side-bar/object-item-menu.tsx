

import React from 'react';
import Menu from 'antd/lib/menu';
import Button from 'antd/lib/button';
import Icon, {
    LinkOutlined, CopyOutlined, BlockOutlined, RetweetOutlined, DeleteOutlined, EditOutlined,
} from '@ant-design/icons';

import {
    BackgroundIcon, ForegroundIcon, ResetPerspectiveIcon, ColorizeIcon, SliceIcon,
} from 'icons';
import CLARIFYTooltip from 'components/common/clarify-tooltip';
import { ObjectType, ShapeType, ColorBy } from 'reducers';
import { DimensionType, Job } from 'clarify-core-wrapper';

interface Props {
    readonly: boolean;
    serverID: number | null;
    locked: boolean;
    shapeType: ShapeType;
    objectType: ObjectType;
    color: string;
    colorBy: ColorBy;
    colorPickerVisible: boolean;
    changeColorShortcut: string;
    copyShortcut: string;
    pasteShortcut: string;
    sliceShortcut: string;
    propagateShortcut: string;
    toBackgroundShortcut: string;
    toForegroundShortcut: string;
    removeShortcut: string;
    changeColor(value: string): void;
    copy(): void;
    remove(): void;
    propagate(): void;
    createURL(): void;
    switchOrientation(): void;
    toBackground(): void;
    toForeground(): void;
    resetCuboidPerspective(): void;
    setColorPickerVisible(visible: boolean): void;
    edit(): void;
    slice(): void;
    jobInstance: Job;
}

interface ItemProps {
    toolProps: Props;
}

function CreateURLItem(props: ItemProps): JSX.Element {
    const { toolProps, ...rest } = props;
    const { serverID, createURL } = toolProps;
    return (
        <Menu.Item {...rest}>
            <Button
                className='clarify-object-item-menu-create-url'
                disabled={!Number.isInteger(serverID)}
                type='link'
                icon={<LinkOutlined />}
                onClick={createURL}
            >
                Create object URL
            </Button>
        </Menu.Item>
    );
}

function MakeCopyItem(props: ItemProps): JSX.Element {
    const { toolProps, ...rest } = props;
    const { copyShortcut, pasteShortcut, copy } = toolProps;
    return (
        <Menu.Item {...rest}>
            <CLARIFYTooltip title={`${copyShortcut} and ${pasteShortcut}`}>
                <Button
                    className='clarify-object-item-menu-make-copy'
                    type='link'
                    icon={<CopyOutlined />}
                    onClick={copy}
                >
                    Make a copy
                </Button>
            </CLARIFYTooltip>
        </Menu.Item>
    );
}

function EditMaskItem(props: ItemProps): JSX.Element {
    const { toolProps, ...rest } = props;
    const { edit } = toolProps;
    return (
        <Menu.Item {...rest}>
            <CLARIFYTooltip title='Shift + Double click'>
                <Button
                    type='link'
                    icon={<EditOutlined />}
                    onClick={edit}
                    className='clarify-object-item-menu-edit-object'
                >
                    Edit
                </Button>
            </CLARIFYTooltip>
        </Menu.Item>
    );
}

function SliceItem(props: ItemProps): JSX.Element {
    const { toolProps, ...rest } = props;
    const { slice, sliceShortcut } = toolProps;
    return (
        <Menu.Item {...rest}>
            <CLARIFYTooltip title={`Cut the shape into two parts ${sliceShortcut}`}>
                <Button
                    type='link'
                    icon={<Icon component={SliceIcon} />}
                    onClick={slice}
                    className='clarify-object-item-menu-slice-object'
                >
                    Slice
                </Button>
            </CLARIFYTooltip>
        </Menu.Item>
    );
}

function PropagateItem(props: ItemProps): JSX.Element {
    const { toolProps, ...rest } = props;
    const { propagateShortcut, propagate } = toolProps;
    return (
        <Menu.Item {...rest}>
            <CLARIFYTooltip title={`${propagateShortcut}`}>
                <Button
                    type='link'
                    icon={<BlockOutlined />}
                    onClick={propagate}
                    className='clarify-object-item-menu-propagate-item'
                >
                    Propagate
                </Button>
            </CLARIFYTooltip>
        </Menu.Item>
    );
}

function SwitchOrientationItem(props: ItemProps): JSX.Element {
    const { toolProps, ...rest } = props;
    const { switchOrientation } = toolProps;
    return (
        <Menu.Item {...rest}>
            <Button
                type='link'
                icon={<RetweetOutlined />}
                onClick={switchOrientation}
                className='clarify-object-item-menu-switch-orientation'
            >
                Switch orientation
            </Button>
        </Menu.Item>
    );
}

function ResetPerspectiveItem(props: ItemProps): JSX.Element {
    const { toolProps, ...rest } = props;
    const { resetCuboidPerspective } = toolProps;
    return (
        <Menu.Item {...rest}>
            <Button
                type='link'
                onClick={resetCuboidPerspective}
                className='clarify-object-item-menu-reset-perspective'
            >
                <Icon component={ResetPerspectiveIcon} />
                Reset perspective
            </Button>
        </Menu.Item>
    );
}

function ToBackgroundItem(props: ItemProps): JSX.Element {
    const { toolProps, ...rest } = props;
    const { toBackgroundShortcut, toBackground } = toolProps;
    return (
        <Menu.Item {...rest}>
            <CLARIFYTooltip title={`${toBackgroundShortcut}`}>
                <Button
                    type='link'
                    onClick={toBackground}
                    className='clarify-object-item-menu-to-background'
                >
                    <Icon component={BackgroundIcon} />
                    To background
                </Button>
            </CLARIFYTooltip>
        </Menu.Item>
    );
}

function ToForegroundItem(props: ItemProps): JSX.Element {
    const { toolProps, ...rest } = props;
    const { toForegroundShortcut, toForeground } = toolProps;
    return (
        <Menu.Item {...rest}>
            <CLARIFYTooltip title={`${toForegroundShortcut}`}>
                <Button
                    type='link'
                    onClick={toForeground}
                    className='clarify-object-item-menu-to-foreground'
                >
                    <Icon component={ForegroundIcon} />
                    To foreground
                </Button>
            </CLARIFYTooltip>
        </Menu.Item>
    );
}

function SwitchColorItem(props: ItemProps): JSX.Element {
    const { toolProps, ...rest } = props;
    const { changeColorShortcut, colorBy, setColorPickerVisible } = toolProps;

    return (
        <Menu.Item {...rest} onClick={() => setColorPickerVisible(true)}>
            <CLARIFYTooltip title={`${changeColorShortcut}`}>
                <Button type='link' className='clarify-object-item-menu-change-color'>
                    <Icon component={ColorizeIcon} />
                    {`Change ${colorBy.toLowerCase()} color`}
                </Button>
            </CLARIFYTooltip>
        </Menu.Item>
    );
}

function RemoveItem(props: ItemProps): JSX.Element {
    const { toolProps, ...rest } = props;
    const { removeShortcut, remove } = toolProps;
    return (
        <Menu.Item {...rest}>
            <CLARIFYTooltip title={`${removeShortcut}`}>
                <Button
                    type='link'
                    icon={<DeleteOutlined />}
                    onClick={remove}
                    className='clarify-object-item-menu-remove-object'
                >
                    Remove
                </Button>
            </CLARIFYTooltip>
        </Menu.Item>
    );
}

export default function ItemMenu(props: Props): JSX.Element {
    const {
        readonly, shapeType, objectType, colorBy, jobInstance,
    } = props;

    enum MenuKeys {
        CREATE_URL = 'create_url',
        COPY = 'copy',
        PROPAGATE = 'propagate',
        SWITCH_ORIENTATION = 'switch_orientation',
        RESET_PERSPECIVE = 'reset_perspective',
        TO_BACKGROUND = 'to_background',
        TO_FOREGROUND = 'to_foreground',
        SWITCH_COLOR = 'switch_color',
        REMOVE_ITEM = 'remove_item',
        EDIT_MASK = 'edit_mask',
        SLICE_ITEM = 'slice_item',
    }

    const is2D = jobInstance.dimension === DimensionType.DIMENSION_2D;

    return (
        <Menu
            onClick={() => window.document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))}
            className='clarify-object-item-menu'
            selectable={false}
        >
            <CreateURLItem key={MenuKeys.CREATE_URL} toolProps={props} />
            {!readonly && objectType !== ObjectType.TAG && (
                <MakeCopyItem key={MenuKeys.COPY} toolProps={props} />
            )}
            {!readonly && shapeType === ShapeType.MASK && (
                <EditMaskItem key={MenuKeys.EDIT_MASK} toolProps={props} />
            )}
            {!readonly && objectType === ObjectType.SHAPE &&
                [ShapeType.MASK, ShapeType.POLYGON].includes(shapeType) && (
                <SliceItem key={MenuKeys.SLICE_ITEM} toolProps={props} />
            )}
            {!readonly && <PropagateItem key={MenuKeys.PROPAGATE} toolProps={props} />}
            {is2D && !readonly && [ShapeType.POLYGON, ShapeType.POLYLINE, ShapeType.CUBOID].includes(shapeType) && (
                <SwitchOrientationItem key={MenuKeys.SWITCH_ORIENTATION} toolProps={props} />
            )}
            {is2D && !readonly && shapeType === ShapeType.CUBOID && (
                <ResetPerspectiveItem key={MenuKeys.RESET_PERSPECIVE} toolProps={props} />
            )}
            {is2D && !readonly && objectType !== ObjectType.TAG && (
                <ToBackgroundItem key={MenuKeys.TO_BACKGROUND} toolProps={props} />
            )}
            {is2D && !readonly && objectType !== ObjectType.TAG && (
                <ToForegroundItem key={MenuKeys.TO_FOREGROUND} toolProps={props} />
            )}
            {[ColorBy.INSTANCE, ColorBy.GROUP].includes(colorBy) && (
                <SwitchColorItem key={MenuKeys.SWITCH_COLOR} toolProps={props} />
            )}
            {!readonly && <RemoveItem key={MenuKeys.REMOVE_ITEM} toolProps={props} />}
        </Menu>
    );
}