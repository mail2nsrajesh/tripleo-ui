/**
 * Copyright 2017 Red Hat Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import { connect } from 'react-redux';
import { defineMessages, FormattedMessage } from 'react-intl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getNodeDrives } from '../../../selectors/nodes';
import { ListView } from '../../ui/ListView';
import Modal from '../../ui/Modal';
import NodeDrive from './NodeDrive';
import NodesActions from '../../../actions/NodesActions';

const messages = defineMessages({
  title: {
    id: 'NodeDrives.title',
    defaultMessage: 'Node Drives - {nodeId}'
  },
  close: {
    id: 'NodeDrives.close',
    defaultMessage: 'Close'
  }
});

class NodeDrives extends Component {
  componentDidMount() {
    this.props.fetchNodeIntrospectionData();
  }

  render() {
    return (
      <Modal dialogClasses="modal-xl">
        <div className="modal-header">
          <Link to="/nodes" type="button" className="close">
            <span aria-hidden="true" className="pficon pficon-close" />
          </Link>
          <h4 className="modal-title">
            <FormattedMessage
              {...messages.title}
              values={{ nodeId: this.props.match.params.nodeId }}
            />
          </h4>
        </div>
        <div className="modal-body">
          <ListView>
            {this.props.drives
              .toJS()
              .map(drive => <NodeDrive key={drive.name} drive={drive} />)}
          </ListView>
        </div>
        <div className="modal-footer">
          <Link to="/nodes" type="button" className="btn btn-default">
            <FormattedMessage {...messages.close} />
          </Link>
        </div>
      </Modal>
    );
  }
}
NodeDrives.propTypes = {
  drives: ImmutablePropTypes.list.isRequired,
  fetchNodeIntrospectionData: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  drives: getNodeDrives(state, props.match.params.nodeId)
});
const mapDispatchToProps = (dispatch, props) => ({
  fetchNodeIntrospectionData: () =>
    dispatch(NodesActions.fetchNodeIntrospectionData(props.match.params.nodeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeDrives);
