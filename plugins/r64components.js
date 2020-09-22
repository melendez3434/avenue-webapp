import Vue from 'vue'
import R64Components from '@64robots/r64components'

Vue.use(R64Components, {
  R64Button: {
    baseClass: 'block rounded inline-flex items-center justify-center',
    primaryClass: 'bg-avenue-red-light text-white hover:bg-gray-800 w-full',
  },
  R64Input: {
    wrapperClass: 'mb-1',
    labelClass: 'block leading-tight text-white uppercase',
    baseClass:
      'leading-snug outline-none mt-1 px-3 py-2 block w-full text-avenue-white bg-avenue-grey rounded-md focus:shadow-outline focus:border-blue-400 uppercase',
    primaryClass: 'placeholder-avenue-white-light',
    helpMessageClass: 'mt-1 text-xxs text-avenue-grey',
  },
  R64Select: {
    wrapperClass: 'mb-1',
    labelClass: 'block leading-tight text-white uppercase',
    baseClass:
      'leading-snug outline-none mt-1 px-3 py-2 block w-full text-avenue-white bg-avenue-grey rounded-md focus:shadow-outline focus:border-blue-400 h-38px appearance-none uppercase',
    primaryClass: 'placeholder-avenue-white-light',
    helpMessageClass: 'mt-1 text-xxs text-avenue-grey',
  },
  R64Checkbox: {
    labelClass: 'ml-2 text-white',
  },
})
