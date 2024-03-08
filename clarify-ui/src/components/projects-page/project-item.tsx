
import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Text from 'antd/lib/typography/Text';
import Card from 'antd/lib/card';
import Meta from 'antd/lib/card/Meta';
import Dropdown from 'antd/lib/dropdown';
import Button from 'antd/lib/button';
import Badge from 'antd/lib/badge';
import { MoreOutlined } from '@ant-design/icons';

import { CombinedState, Project } from 'reducers';
import { useCardHeightHOC, usePlugins } from 'utils/hooks';
import Preview from 'components/common/preview';
import ProjectActionsMenuComponent from './actions-menu';

interface Props {
    projectInstance: Project;
}

const useCardHeight = useCardHeightHOC({
    containerClassName: 'cvat-projects-page',
    siblingClassNames: ['cvat-projects-pagination', 'cvat-projects-page-top-bar'],
    paddings: 40,
    minHeight: 200,
    numberOfRows: 3,
});

export default function ProjectItemComponent(props: Props): JSX.Element {
    const {
        projectInstance: instance,
    } = props;

    const history = useHistory();
    const ribbonPlugins = usePlugins((state: CombinedState) => state.plugins.components.projectItem.ribbon, props);
    const height = useCardHeight();
    const ownerName = instance.owner ? instance.owner.username : null;
    const updated = moment(instance.updatedDate).fromNow();
    const deletes = useSelector((state: CombinedState) => state.projects.activities.deletes);
    const deleted = instance.id in deletes ? deletes[instance.id] : false;

    const onOpenProject = (): void => {
        history.push(`/projects/${instance.id}`);
    };

    const style: React.CSSProperties = { height };
    if (deleted) {
        style.pointerEvents = 'none';
        style.opacity = 0.5;
    }

    return (
        <Badge.Ribbon
            style={{ visibility: ribbonPlugins.length ? 'visible' : 'hidden' }}
            className='clarify-project-item-ribbon'
            placement='start'
            text={(
                <div>
                    {ribbonPlugins.sort((item1, item2) => item1.weight - item2.weight)
                        .map((item) => item.component).map((Component, index) => (
                            <Component key={index} targetProps={props} />
                        ))}
                </div>
            )}
        >
            <Card
                cover={(
                    <Preview
                        project={instance}
                        loadingClassName='clarify-project-item-loading-preview'
                        emptyPreviewClassName='clarify-project-item-empty-preview'
                        previewWrapperClassName='clarify-projects-project-item-card-preview-wrapper'
                        previewClassName='clarify-projects-project-item-card-preview'
                        onClick={onOpenProject}
                    />
                )}
                size='small'
                style={style}
                className='clarify-projects-project-item-card'
            >
                <Meta
                    title={(
                        <span onClick={onOpenProject} className='clarify-projects-project-item-title' aria-hidden>
                            {instance.name}
                        </span>
                    )}
                    description={(
                        <div className='clarify-projects-project-item-description'>
                            <div>
                                {ownerName && (
                                    <>
                                        <Text type='secondary'>{`Created ${ownerName ? `by ${ownerName}` : ''}`}</Text>
                                        <br />
                                    </>
                                )}
                                <Text type='secondary'>{`Last updated ${updated}`}</Text>
                            </div>
                            <div>
                                <Dropdown
                                    destroyPopupOnHide
                                    trigger={['click']}
                                    overlay={<ProjectActionsMenuComponent projectInstance={instance} />}
                                >
                                    <Button className='clarify-project-details-button' type='link' size='large' icon={<MoreOutlined />} />
                                </Dropdown>
                            </div>
                        </div>
                    )}
                />
            </Card>
        </Badge.Ribbon>
    );
}