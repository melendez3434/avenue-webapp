import { mount } from '@vue/test-utils'
import ExampleComponent from '@/components/ExampleComponent'

describe('ExampleComponent', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(ExampleComponent)
    expect(wrapper.html()).toContain('Example')
  })
})
