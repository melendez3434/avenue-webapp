import Vue from 'vue'
import * as Sentry from '@sentry/vue'

export default function({ $config }) {
  console.log($config.sentryEnabled)
  console.log($config.sentryDSN)
  if ($config.sentryEnabled) {
    console.log('hey')
    Sentry.init({
      Vue,
      dsn: $config.sentryDSN,
    })
  }
}
