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

import keyMirror from 'keymirror';

export default keyMirror({
  REQUEST_PLANS: null,
  RECEIVE_PLANS: null,
  REQUEST_PLAN: null,
  RECEIVE_PLAN: null,
  REQUEST_PLAN_DELETE: null,
  RECEIVE_PLAN_DELETE: null,
  PLAN_CHOSEN: null,
  PLAN_DETECTED: null,
  DELETE_PLAN_PENDING: null,
  DELETE_PLAN_SUCCESS: null,
  DELETE_PLAN_FAILED: null,
  UPDATE_PLAN_PENDING: null,
  UPDATE_PLAN_SUCCESS: null,
  UPDATE_PLAN_FAILED: null,
  CANCEL_CREATE_PLAN: null,
  CREATE_PLAN_PENDING: null,
  CREATE_PLAN_SUCCESS: null,
  CREATE_PLAN_FAILED: null,
  START_DEPLOYMENT_SUCCESS: null,
  START_DEPLOYMENT_PENDING: null,
  START_DEPLOYMENT_FAILED: null,
  EXPORT_PLAN_PENDING: null,
  EXPORT_PLAN_SUCCESS: null,
  EXPORT_PLAN_FAILED: null
});
