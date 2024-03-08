
import './styles.scss';

import React, { useState } from 'react';
import { Col, Row } from 'antd/lib/grid';
import Card from 'antd/lib/card';
import Text from 'antd/lib/typography/Text';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Badge from 'antd/lib/badge';

import { Invitation } from 'clarify-core/src/organization';

interface Props {
    invitation: Invitation;
    onAccept: (invitationKey: string) => Promise<void>;
    onDecline: (invitationKey: string) => Promise<void>;
}

function InvitationItem(props: Props): JSX.Element {
    const { invitation, onAccept, onDecline } = props;
    const { key, expired } = invitation;

    const [declined, setDeclined] = useState(false);

    const { slug } = invitation.organizationInfo;
    const owner = invitation.owner?.username;
    const clampOwner = !!owner && owner?.length > 50 && { tooltip: owner };
    const text = (
        <>
            <Text
                strong
                style={clampOwner ? { width: 250 } : {}}
                ellipsis={clampOwner}
            >
                {owner}
            </Text>
            <Text>&nbsp;has invited you to join the&nbsp;</Text>
            <Text strong>{slug}</Text>
            <Text>&nbsp;organization&nbsp;</Text>
        </>
    );

    return (
        <Col span={24}>
            <Badge.Ribbon
                style={{ visibility: expired ? 'visible' : 'hidden' }}
                className='clarify-invitation-item-ribbon'
                placement='start'
                text='Expired'
                color='gray'
            >
                <Card className={`clarify-invitation-item ${declined ? 'clarify-invitation-item-declined' : ''}`}>
                    <Row justify='space-between'>
                        <Col className='clarify-invitation-description'>
                            {text}
                        </Col>
                        <Col className='clarify-invitation-actions'>
                            <Button
                                type='primary'
                                disabled={expired}
                                onClick={() => {
                                    onAccept(key);
                                }}
                            >
                                Accept
                            </Button>
                            {
                                expired ? (
                                    <Button
                                        type='primary'
                                        danger
                                        onClick={() => {
                                            onDecline(key).then(() => {
                                                setDeclined(true);
                                            });
                                        }}
                                    >
                                        Remove
                                    </Button>
                                ) : (
                                    <Button
                                        type='primary'
                                        danger
                                        onClick={() => {
                                            Modal.confirm({
                                                title: (
                                                    <>
                                                        <Text>
                                                            Would you like to decline the invitation to the&nbsp;
                                                        </Text>
                                                        <Text strong>{slug}</Text>
                                                        <Text>&nbsp;organization&nbsp;</Text>
                                                    </>
                                                ),
                                                className: 'clarify-invitation-decline-modal',
                                                onOk: () => {
                                                    onDecline(key).then(() => {
                                                        setDeclined(true);
                                                    });
                                                },
                                                okText: 'Decline',
                                                okButtonProps: { danger: true },
                                            });
                                        }}
                                    >
                                        Decline
                                    </Button>
                                )
                            }
                        </Col>
                    </Row>
                </Card>
            </Badge.Ribbon>
        </Col>
    );
}

export default React.memo(InvitationItem);