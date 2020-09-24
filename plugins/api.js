import signupApi from '@/api/signup'
import forgotApi from '@/api/forgot-password'
import talentApi from '@/api/talent'
import globalApi from '@/api/global'

export default function({ $axios }, inject) {
  const repositories = {
    signup: signupApi($axios),
    forgotPassword: forgotApi($axios),
    talent: talentApi($axios),
    global: globalApi($axios),
  }

  inject('api', repositories)
}
