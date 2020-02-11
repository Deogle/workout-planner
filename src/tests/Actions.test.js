
import * as actions from '../redux/actions';

describe('actions', () => {
    const file = {filename:'test.mp3',resource_url:'https://example.url/test.mp3'};

  it('should create an action to add an audio file',()=>{
    const expectedAction = {
      type: actions.ADD_AUDIO,
      filename:file.filename,
      resource_url:file.resource_url
    }
    expect(actions.addAudio(file)).toEqual(expectedAction);
  })

  it('should create an action to remove an audio file',()=>{
    const file = {filename:'test.mp3',resource_url:'https://example.url/test.mp3'}
    const expectedAction = {
      type:actions.REMOVE_AUDIO,
      filename:file.filename,
      resource_url:file.resource_url
    }
    expect(actions.removeAudio(file)).toEqual(expectedAction);
  })
})