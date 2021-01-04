import Vue from 'vue'
import * as Sentry from '@sentry/vue'

export default function({ $config }) {
  if ($config.sentryEnabled) {
    Sentry.init({
      Vue,
      dsn: $config.sentryDSN,
    })
  }
}
