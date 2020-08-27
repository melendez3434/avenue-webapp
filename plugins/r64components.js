import Vue from 'vue'
import R64Components from '@64robots/r64components'

Vue.use(R64Components, {
  R64Button: {
    outlineClass: 'border bg-transparent text-white transition duration-150 ease-in-out py-3',
    primaryOutlineClass: 'border-remate-gray text-gray-900 hover:bg-gray-800 hover:text-white',
    secondaryOutlineClass: 'border-white text-white bg-remate-black hover:border-indigo-400',
    smallClass: 'font-normal py-1 px-5 leading-none',
  },
  R64Select: {
    baseClass:
      'leading-snug w-full transition duration-150 ease-in-out appearance-none py-3 pr-10 pl-3 rounded',
    secondaryClass: 'leading-tight py-1 border border-remate-lighter-gray rounded',
  },
})
