import Vue from 'vue'
import R64Components from '@64robots/r64components'

Vue.use(R64Components, {
  R64Button: {
    baseClass: 'block rounded inline-flex items-center justify-center',
    primaryClass: 'bg-theavenue-white text-theavenue-black',
    secondaryClass: 'bg-theavenue-gray text-white',
  },
  R64Radio: {
    labelClass: 'ml-2 text-theavenue-white',
    wrapperClass: 'mb-1',
  },
  R64Input: {
    wrapperClass: 'mb-1',
    labelClass: 'block leading-tight text-white mb-2',
    baseClass:
      'leading-snug outline-none mt-1 px-3 py-2 block w-full text-avenue-white bg-theavenue-background-dark rounded-md focus:shadow-outline-white focus:border-white',
    primaryClass: 'placeholder-avenue-white-light',
    helpMessageClass: 'mt-1 text-xxs text-avenue-grey',
  },
  R64Textarea: {
    wrapperClass: 'mb-1',
    labelClass: 'block leading-tight text-white mb-2',
    baseClass:
      'leading-snug outline-none mt-1 px-3 py-2 block w-full text-avenue-white bg-theavenue-background-dark rounded-md focus:shadow-outline-white focus:border-white',
    primaryClass: 'placeholder-avenue-white-light',
    helpMessageClass: 'mt-1 text-xxs text-avenue-grey',
  },
  R64Select: {
    wrapperClass: 'mb-1',
    labelClass: 'block leading-tight text-white',
    baseClass:
      'leading-snug outline-none mt-1 px-3 py-2 block w-full text-avenue-white bg-theavenue-background-dark rounded-md focus:shadow-outline-white focus:border-white h-38px appearance-none',
    primaryClass: 'placeholder-avenue-white-light',
    helpMessageClass: 'mt-1 text-xxs text-avenue-grey',
  },
  R64Checkbox: {
    labelClass: 'ml-2 text-white',
    baseClass:
      'appearance-none outline-none select-none w-4 h-4 bg-white border border-gray-400 rounded transition duration-150 ease-in-out focus:shadow-outline focus:border-blue-400',
  },
})
