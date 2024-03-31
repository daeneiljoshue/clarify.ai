
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon, {
    LeftOutlined, RightOutlined, EyeInvisibleFilled, EyeOutlined,
    CheckCircleFilled, CheckCircleOutlined,
} from '@ant-design/icons';
import { Row, Col } from 'antd/lib/grid';
import Text from 'antd/lib/typography/Text';

import {
    activateObject, fetchAnnotationsAsync, changeFrameAsync, highlightConflict,
} from 'actions/annotation-actions';
import { reviewActions } from 'actions/review-actions';
import CLARIFYTooltip from 'components/common/clarify-tooltip';
import { ActiveControl, CombinedState, Workspace } from 'reducers';
import moment from 'moment';
import Paragraph from 'antd/lib/typography/Paragraph';
import { ConflictSeverity, QualityConflict, Issue } from 'clarify-core-wrapper';
import { changeShowGroundTruth } from 'actions/settings-actions';
import { ShowGroundTruthIcon } from 'icons';

export default function LabelsListComponent(): JSX.Element {
    const dispatch = useDispatch();
    const frame = useSelector((state: CombinedState): number => state.annotation.player.frame.number);
    const frameIssues = useSelector((state: CombinedState): Issue[] => state.review.frameIssues);
    const frameConflicts = useSelector((state: CombinedState) => state.review.frameConflicts);
    const showGroundTruth = useSelector((state: CombinedState) => state.settings.shapes.showGroundTruth);
    const issues = useSelector((state: CombinedState): Issue[] => state.review.issues);
    const conflicts = useSelector((state: CombinedState) => state.review.conflicts);
    const issuesHidden = useSelector((state: CombinedState) => state.review.issuesHidden);
    const issuesResolvedHidden = useSelector((state: CombinedState) => state.review.issuesResolvedHidden);
    const highlightedConflict = useSelector((state: CombinedState) => state.annotation.annotations.highlightedConflict);
    const workspace = useSelector((state: CombinedState) => state.annotation.workspace);
    const ready = useSelector((state: CombinedState) => state.annotation.canvas.ready);
    const activeControl = useSelector((state: CombinedState) => state.annotation.canvas.activeControl);

    let frames = issues.map((issue: Issue): number => issue.frame).sort((a: number, b: number) => +a - +b);
    if (showGroundTruth) {
        const conflictFrames = conflicts
            .map((conflict): number => conflict.frame).sort((a: number, b: number) => +a - +b);
        frames = [...new Set([...frames, ...conflictFrames])];
    }
    const nearestLeft = frames.filter((_frame: number): boolean => _frame < frame).reverse()[0];
    const dynamicLeftProps: any = Number.isInteger(nearestLeft) ?
        {
            onClick: () => dispatch(changeFrameAsync(nearestLeft)),
        } :
        {
            style: {
                pointerEvents: 'none',
                opacity: 0.5,
            },
        };

    const nearestRight = frames.filter((_frame: number): boolean => _frame > frame)[0];
    const dynamicRightProps: any = Number.isInteger(nearestRight) ?
        {
            onClick: () => dispatch(changeFrameAsync(nearestRight)),
        } :
        {
            style: {
                pointerEvents: 'none',
                opacity: 0.5,
            },
        };

    return (
        <>
            <div className='clarify-objects-sidebar-issues-list-header'>
                <Row justify='start' align='middle'>
                    <Col>
                        <CLARIFYTooltip title='Find the previous frame with issues'>
                            <LeftOutlined className='clarify-issues-sidebar-previous-frame' {...dynamicLeftProps} />
                        </CLARIFYTooltip>
                    </Col>
                    <Col offset={1}>
                        <CLARIFYTooltip title='Find the next frame with issues'>
                            <RightOutlined className='clarify-issues-sidebar-next-frame' {...dynamicRightProps} />
                        </CLARIFYTooltip>
                    </Col>
                    <Col offset={2}>
                        <CLARIFYTooltip title='Show/hide all issues'>
                            {issuesHidden ? (
                                <EyeInvisibleFilled
                                    className='clarify-issues-sidebar-hidden-issues'
                                    onClick={() => dispatch(reviewActions.switchIssuesHiddenFlag(false))}
                                />
                            ) : (
                                <EyeOutlined
                                    className='clarify-issues-sidebar-shown-issues'
                                    onClick={() => dispatch(reviewActions.switchIssuesHiddenFlag(true))}
                                />
                            )}
                        </CLARIFYTooltip>
                    </Col>
                    <Col offset={2}>
                        <CLARIFYTooltip title='Show/hide resolved issues'>
                            { issuesResolvedHidden ? (
                                <CheckCircleFilled
                                    className='clarify-issues-sidebar-hidden-resolved-status'
                                    onClick={() => dispatch(reviewActions.switchIssuesHiddenResolvedFlag(false))}
                                />
                            ) : (
                                <CheckCircleOutlined
                                    className='clarify-issues-sidebar-hidden-resolved-status'
                                    onClick={() => dispatch(reviewActions.switchIssuesHiddenResolvedFlag(true))}
                                />

                            )}
                        </CLARIFYTooltip>
                    </Col>
                    {
                        workspace === Workspace.REVIEW ? (
                            <Col offset={2}>
                                <CLARIFYTooltip title='Show Ground truth annotations and conflicts'>
                                    <Icon
                                        className={
                                            `clarify-objects-sidebar-show-ground-truth ${showGroundTruth ? 'clarify-objects-sidebar-show-ground-truth-active' : ''}`
                                        }
                                        component={ShowGroundTruthIcon}
                                        onClick={() => {
                                            dispatch(changeShowGroundTruth(!showGroundTruth));
                                            dispatch(fetchAnnotationsAsync());
                                        }}
                                    />
                                </CLARIFYTooltip>
                            </Col>
                        ) : null
                    }
                </Row>
            </div>
            <div className='clarify-objects-sidebar-issues-list'>
                {frameIssues.map(
                    (frameIssue: Issue): JSX.Element => {
                        const firstComment = frameIssue.comments[0];
                        const lastComment = frameIssue.comments.slice(-1)[0];
                        return (
                            <div
                                key={frameIssue.id}
                                id={`clarify-objects-sidebar-issue-item-${frameIssue.id}`}
                                className={
                                    `clarify-objects-sidebar-issue-item ${frameIssue.resolved ? 'clarify-objects-sidebar-issue-resolved' : ''}`
                                }
                                onMouseEnter={() => {
                                    const element = window.document.getElementById(
                                        `clarify_canvas_issue_region_${frameIssue.id}`,
                                    );
                                    if (element) {
                                        element.setAttribute('fill', 'url(#clarify_issue_region_pattern_2)');
                                    }
                                    dispatch(activateObject(null, null, null));
                                }}
                                onMouseLeave={() => {
                                    const element = window.document.getElementById(
                                        `clarify_canvas_issue_region_${frameIssue.id}`,
                                    );
                                    if (element) {
                                        element.setAttribute('fill', 'url(#clarify_issue_region_pattern_1)');
                                    }
                                }}
                            >
                                <Row justify='space-between'>
                                    <Col>
                                        <Text strong>
                                            {`#${frameIssue.id} • Issue`}
                                        </Text>
                                    </Col>
                                    <Col offset={1}>
                                        <Text type='secondary'>
                                            {`created ${moment(frameIssue.createdDate).fromNow()}`}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Paragraph ellipsis={{ rows: 2 }}>
                                        {!!firstComment?.owner?.username && (
                                            <Text strong>{`${firstComment.owner.username}: `}</Text>
                                        )}
                                        <Text>{firstComment?.message || ''}</Text>
                                    </Paragraph>
                                </Row>
                                { lastComment !== firstComment && (
                                    <>
                                        <Row justify='start'>
                                            <Col>
                                                <Text strong>&#8230;</Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Paragraph ellipsis={{ rows: 2 }}>
                                                {!!lastComment?.owner?.username && (
                                                    <Text strong>{`${lastComment.owner.username}: `}</Text>
                                                )}
                                                <Text>{lastComment?.message || ''}</Text>
                                            </Paragraph>
                                        </Row>
                                    </>
                                )}
                            </div>
                        );
                    },
                )}
                {showGroundTruth && frameConflicts.map(
                    (frameConflict: QualityConflict): JSX.Element => (
                        <div
                            key={frameConflict.id}
                            id={`cvat-objects-sidebar-conflict-item-${frameConflict.id}`}
                            className={
                                `${frameConflict.severity === ConflictSeverity.WARNING ?
                                    'cvat-objects-sidebar-warning-item' : 'clarify-objects-sidebar-conflict-item'}
                                  ${frameConflict.id === highlightedConflict?.id ? 'clarify-objects-sidebar-item-active' : ''}  `
                            }
                            onMouseEnter={() => {
                                if (ready && activeControl === ActiveControl.CURSOR) {
                                    dispatch(highlightConflict(frameConflict));
                                }
                            }}
                            onMouseLeave={() => {
                                if (ready && activeControl === ActiveControl.CURSOR) {
                                    dispatch(highlightConflict(null));
                                }
                            }}
                        >
                            <Row>
                                <Text strong>
                                    {`#${frameConflict.id} • ${frameConflict.severity === ConflictSeverity.WARNING ?
                                        'Warning' : 'Conflict'}`}
                                </Text>
                            </Row>
                            <Row>
                                <Paragraph ellipsis={{ rows: 2 }}>
                                    {frameConflict.description}
                                </Paragraph>
                                <Text />
                            </Row>
                        </div>
                    ),
                )}
            </div>
        </>
    );
}