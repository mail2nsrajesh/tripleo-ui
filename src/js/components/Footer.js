import * as _ from 'lodash';
import React from 'react';
import ClassNames from 'classnames';

import NotificationStore from '../stores/NotificationStore';
import ValidationsApiService from '../services/ValidationsApiService';
import ValidationsStore from '../stores/ValidationsStore';

import NotificationsIndicator from './notifications/NotificationsIndicator';
import NotificationList       from './notifications/NotificationList';
import NotificationsToaster   from './notifications/NotificationsToaster';

import ValidationsIndicator from './validations/ValidationsIndicator';
import ValidationsList from './validations/ValidationsList';



import MockValidations from '../mock/mockValidations';
var mockValidations = true;

export default class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      listShown: 'notifications',
      notifications: [],
      validationTypes: []
    };

    this.validationsChangeListener = this._onValidationsChange.bind(this);
    this.notificationsChangeListener = this._onNotificationsChange.bind(this);
  }

  componentDidMount() {
    this._onValidationsChange();
    ValidationsApiService.handleGetValidations();
    ValidationsStore.addChangeListener(this.validationsChangeListener);

    this._onNotificationsChange();
    NotificationStore.addChangeListener(this.notificationsChangeListener);

  }

  componentWillUnmount() {
    ValidationsStore.removeChangeListener(this.validationsChangeListener);
    NotificationStore.removeChangeListener(this.notificationsChangeListener);
  }

  _onValidationsChange() {
    if (mockValidations) {
      this.setState({validationTypes: MockValidations.validations});
      return;
    }

    this.setState({validationTypes: ValidationsStore.getState().validations});
  }

  _onNotificationsChange() {
    this.setState({notifications: NotificationStore.getState()});
  }

  toggleOpen (e) {
    e.preventDefault();

    var nowOpen = !this.state.isOpen;
    this.setState({isOpen: nowOpen});
  }

  showNotifications (e) {
    e.preventDefault();
    this.setState({isOpen: true, listShown: 'notifications'});
  }

  showValidations (e) {
    e.preventDefault();
    this.setState({isOpen: true, listShown: 'validations'});
  }

  render() {
    let indicatorsClasses = ClassNames({
      'nav nav-tabs nav-tabs-pf drawer-nav' : true,
      'drawer-collapsed' : !this.state.isOpen
    });

    let toggleClasses = ClassNames({
      'drawer-toggle' : true,
      'collapsed': !this.state.isOpen
    });

    let contentClasses = ClassNames({
      'drawer-content' : true,
      'collapsed': !this.state.isOpen
    });

    let notificationTabClasses =  ClassNames({
      'hidden' : !this.state.isOpen,
      'active' : this.state.listShown === 'notifications'
    });
    let validationTabClasses =  ClassNames({
      'hidden' : !this.state.isOpen,
      'active' : this.state.listShown === 'validations'
    });

    let toasterNotification = _.findLast(_.filter(this.state.notifications, function(notification) {
      return !notification.viewed &&
             notification.type !== 'success' &&
             notification.type !== 'ok';
    }));

    return (
      <div>
        <NotificationsToaster notification={toasterNotification}/>
        <div className="navbar-fixed-bottom wrapper-footer">
          <div className="header-container">
            <ul className={indicatorsClasses}>
              <li className={notificationTabClasses}>
                <a onClick={this.showNotifications.bind(this)}>
                  <span>Notifications</span>
                </a>
              </li>
              <li className={validationTabClasses}>
                <a onClick={this.showValidations.bind(this)}>
                  <span>Validations</span>
                </a>
              </li>
              <li className={this.state.isOpen ? 'hidden' : ''}>
                <NotificationsIndicator notifications={this.state.notifications}
                                        onClick={this.showNotifications.bind(this)}/>
              </li>
              <li className={this.state.isOpen ? 'hidden' : ''}>
                <ValidationsIndicator validationTypes={this.state.validationTypes}
                                      onClick={this.showValidations.bind(this)}/>
              </li>
            </ul>
            <span className={toggleClasses} onClick={this.toggleOpen.bind(this)}></span>
          </div>
          <div className={contentClasses}>
            <NotificationList active={this.state.listShown === 'notifications'}
                              notifications={this.state.notifications}/>
            <ValidationsList  active={this.state.listShown === 'validations'}
                              validationTypes={this.state.validationTypes}/>
          </div>
        </div>
      </div>
    );
  }
}
