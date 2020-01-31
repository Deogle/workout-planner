import reducer from '../redux/reducers/reducer'
import * as actions from '../redux/actions'

describe('audio reducer', () => {
    it('should return the initial state',()=>{
        expect(reducer(undefined,{})).toEqual(
            {
                "musicFiles":[]
            }
        )
    })

    it('should handle ADD_AUDIO',() => {
        expect(
            reducer({"musicFiles":[]},{
                type:actions.ADD_AUDIO,
                filename:"test.mp3"
            })
        ).toEqual(
            {
                "musicFiles":["test.mp3"]
            }
        )
    })

    it('should handle REMOVE_AUDIO',()=>{
        expect(
            reducer({"musicFiles":["test.mp3"]},{
                type:actions.REMOVE_AUDIO,
                filename:"test.mp3"
            })
        ).toEqual(
            {
                "musicFiles":[]
            }
        )
    })

    it('should fail to add duplicate audio file',()=>{
        expect(
            reducer({"musicFiles":["test.mp3"]},{
                type:actions.ADD_AUDIO,
                filename:"test.mp3"
            })
        ).toEqual(
            {
                "musicFiles":["test.mp3"]
            }
        )
    })
})