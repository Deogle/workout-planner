import reducer from '../redux/reducers/reducer'
import * as actions from '../redux/actions'

describe('audio reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                "musicFiles": []
            }
        )
    })

    const file = { filename: 'test.mp3', resource_url: 'https://example.url/test.mp3' }

    it('should handle ADD_AUDIO', () => {
        expect(
            reducer({ "musicFiles": [] }, {
                type: actions.ADD_AUDIO,
                filename: file.filename,
                resource_url: file.resource_url
            })
        ).toEqual(
            {
                "musicFiles": [file]
            }
        )
    })

    it('should handle REMOVE_AUDIO', () => {
        expect(
            reducer({ "musicFiles": [file] }, {
                type: actions.REMOVE_AUDIO,
                filename: "test.mp3"
            })
        ).toEqual(
            {
                "musicFiles": []
            }
        )
    })

    it('should fail to add duplicate audio file', () => {
        expect(
            reducer({ "musicFiles": [file] }, {
                type: actions.ADD_AUDIO,
                filename: "test.mp3",
                resource_url: "https://example.url/test.mp3"
            })
        ).toEqual(
            {
                "musicFiles": [file]
            }
        )
    })
})