
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Card from 'antd/lib/card';
import Descriptions from 'antd/lib/descriptions';
import { MoreOutlined } from '@ant-design/icons';
import Dropdown from 'antd/lib/dropdown';

import { Job } from 'clarify-core-wrapper';
import { useCardHeightHOC } from 'utils/hooks';
import Preview from 'components/common/preview';
import JobActionsMenu from 'components/job-item/job-actions-menu';

const useCardHeight = useCardHeightHOC({
    containerClassName: 'clarify-jobs-page',
    siblingClassNames: ['clarify-jobs-page-pagination', 'clarify-jobs-page-top-bar'],
    paddings: 40,
    minHeight: 200,
    numberOfRows: 3,
});

interface Props {
    job: Job;
    onJobUpdate: (job: Job) => void;
}

function JobCardComponent(props: Props): JSX.Element {
    const { job, onJobUpdate } = props;
    const [expanded, setExpanded] = useState<boolean>(false);
    const history = useHistory();
    const height = useCardHeight();
    const onClick = (event: React.MouseEvent): void => {
        const url = `/tasks/${job.taskId}/jobs/${job.id}`;
        if (event.ctrlKey) {
            window.open(url, '_blank', 'noopener noreferrer');
        } else {
            history.push(url);
        }
    };

    return (
        <Card
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            style={{ height }}
            className='clarify-job-page-list-item'
            cover={(
                <>
                    <Preview
                        job={job}
                        onClick={onClick}
                        loadingClassName='clarify-job-item-loading-preview'
                        emptyPreviewClassName='clarify-job-item-empty-preview'
                        previewWrapperClassName='clarify-jobs-page-job-item-card-preview-wrapper'
                        previewClassName='clarify-jobs-page-job-item-card-preview'
                    />
                    <div className='clarify-job-page-list-item-id'>
                        ID:
                        {` ${job.id}`}
                    </div>
                    <div className='clarify-job-page-list-item-dimension'>{job.dimension.toUpperCase()}</div>
                </>
            )}
        >
            <Descriptions column={1} size='small'>
                <Descriptions.Item label='Stage'>{job.stage}</Descriptions.Item>
                <Descriptions.Item label='State'>{job.state}</Descriptions.Item>
                { expanded ? (
                    <Descriptions.Item label='Size'>{job.stopFrame - job.startFrame + 1}</Descriptions.Item>
                ) : null}
                { expanded && job.assignee ? (
                    <Descriptions.Item label='Assignee'>{job.assignee.username}</Descriptions.Item>
                ) : null}
            </Descriptions>
            <Dropdown
                trigger={['click']}
                destroyPopupOnHide
                overlay={<JobActionsMenu onJobUpdate={onJobUpdate} job={job} />}
            >
                <MoreOutlined className='clarify-job-card-more-button' />
            </Dropdown>
        </Card>
    );
}

export default React.memo(JobCardComponent);