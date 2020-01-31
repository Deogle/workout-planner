
import * as actions from '../redux/actions';

describe('actions', () => {
  it('should create an action to add an audio file',()=>{
    const filename = 'test.mp3'
    const expectedAction = {
      type: actions.ADD_AUDIO,
      filename
    }
    expect(actions.addAudio(filename)).toEqual(expectedAction);
  })

  it('should create an action to remove an audio file',()=>{
    const filename = 'test.mp3'
    const expectedAction = {
      type:actions.REMOVE_AUDIO,
      filename
    }
    expect(actions.removeAudio(filename)).toEqual(expectedAction);
  })
})