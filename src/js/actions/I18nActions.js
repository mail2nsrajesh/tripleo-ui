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

import { getEnabledLanguages } from '../services/utils';

export default {
  detectLanguage(messages) {
    const configLanguages = getEnabledLanguages();
    let language;
    // If the configuration contains only one language and there
    // are messages for it, return it;
    if (
      configLanguages &&
      configLanguages.length === 1 &&
      messages[configLanguages[0]]
    ) {
      language = configLanguages[0];
    } else {
      const locale =
        localStorage.getItem('language') ||
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage;
      // If the locale contains the country but we can't find
      // messages for it then we only use the country part:
      language = locale.match(/^[A-Za-z]+-[A-Za-z]+$/) && !messages[locale]
        ? locale.split('-')[0]
        : locale;
    }
    return {
      type: 'DETECT_LANGUAGE',
      payload: {
        language,
        messages
      }
    };
  },

  chooseLanguage(language) {
    localStorage.setItem('language', language);
    return {
      type: 'CHOOSE_LANGUAGE',
      payload: language
    };
  }
};
