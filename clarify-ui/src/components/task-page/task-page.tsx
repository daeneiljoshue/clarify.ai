
import './styles.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd/lib/grid';
import Spin from 'antd/lib/spin';
import Result from 'antd/lib/result';
import notification from 'antd/lib/notification';

import { getInferenceStatusAsync } from 'actions/models-actions';
import { getCore, Task, Job } from 'clarify-core-wrapper';
import JobListComponent from 'components/task-page/job-list';
import ModelRunnerModal from 'components/model-runner-modal/model-runner-dialog';
import CLARIFYLoadingSpinner from 'components/common/loading-spinner';
import MoveTaskModal from 'components/move-task-modal/move-task-modal';
import { CombinedState } from 'reducers';
import TopBarComponent from './top-bar';
import DetailsComponent from './details';

const core = getCore();

function TaskPageComponent(): JSX.Element {
    const history = useHistory();
    const id = +useParams<{ id: string }>().id;
    const dispatch = useDispatch();
    const [taskInstance, setTaskInstance] = useState<Task | null>(null);
    const [fetchingTask, setFetchingTask] = useState(true);
    const [updatingTask, setUpdatingTask] = useState(false);
    const mounted = useRef(false);

    const deletes = useSelector((state: CombinedState) => state.tasks.activities.deletes);

    const receieveTask = (): void => {
        if (Number.isInteger(id)) {
            core.tasks.get({ id })
                .then(([task]: Task[]) => {
                    if (task && mounted.current) {
                        setTaskInstance(task);
                    }
                }).catch((error: Error) => {
                    if (mounted.current) {
                        notification.error({
                            message: 'Could not receive the requested task from the server',
                            description: error.toString(),
                        });
                    }
                }).finally(() => {
                    if (mounted.current) {
                        setFetchingTask(false);
                    }
                });
        } else {
            notification.error({
                message: 'Could not receive the requested task from the server',
                description: `Requested task id "${id}" is not valid`,
            });
            setFetchingTask(false);
        }
    };

    useEffect(() => {
        receieveTask();
        dispatch(getInferenceStatusAsync());
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (taskInstance && id in deletes && deletes[id]) {
            history.push('/tasks');
        }
    }, [deletes]);

    if (fetchingTask) {
        return <Spin size='large' className='clarify-spinner' />;
    }

    if (!taskInstance) {
        return (
            <Result
                className='clarify-not-found'
                status='404'
                title='There was something wrong during getting the task'
                subTitle='Please, be sure, that information you tried to get exist and you are eligible to access it'
            />
        );
    }

    const onUpdateTask = (task: Task): Promise<void> => (
        new Promise((resolve, reject) => {
            setUpdatingTask(true);
            task.save().then((updatedTask: Task) => {
                if (mounted.current) {
                    setTaskInstance(updatedTask);
                }
                resolve();
            }).catch((error: Error) => {
                notification.error({
                    message: 'Could not update the task',
                    className: 'clarify-notification-notice-update-task-failed',
                    description: error.toString(),
                });
                reject();
            }).finally(() => {
                if (mounted.current) {
                    setUpdatingTask(false);
                }
            });
        })
    );

    const onJobUpdate = (job: Job): void => {
        setUpdatingTask(true);
        job.save().then(() => {
            if (mounted.current) {
                receieveTask();
            }
        }).catch((error: Error) => {
            notification.error({
                message: 'Could not update the job',
                description: error.toString(),
            });
        }).finally(() => {
            if (mounted.current) {
                setUpdatingTask(false);
            }
        });
    };

    return (
        <div className='clarify-task-page'>
            { updatingTask ? <CLARIFYLoadingSpinner size='large' /> : null }
            <Row
                justify='center'
                align='top'
                className='clarify-task-details-wrapper'
            >
                <Col span={22} xl={18} xxl={14}>
                    <TopBarComponent taskInstance={taskInstance} />
                    <DetailsComponent task={taskInstance} onUpdateTask={onUpdateTask} />
                    <JobListComponent task={taskInstance} onUpdateJob={onJobUpdate} />
                </Col>
            </Row>
            <ModelRunnerModal />
            <MoveTaskModal onUpdateTask={onUpdateTask} />
        </div>
    );
}

export default React.memo(TaskPageComponent);