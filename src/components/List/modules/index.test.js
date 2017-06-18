import { default as list, listType } from './index'

describe('List component\'s module', () => {
  it('Should return reducer\'s initial state', () => {
    const initialState = {
      type: 'all'
    }

    const uselessAction = {}

    expect(list(undefined, uselessAction)).toEqual(initialState)
  })

  it('Should change list type', () => {
    expect(listType('all')).toHaveProperty('listType', 'all');
  })
})
