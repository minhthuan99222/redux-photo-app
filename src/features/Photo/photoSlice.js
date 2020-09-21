import { createSlice } from '@reduxjs/toolkit';

const photo = createSlice({
    name: 'photo',
    initialState: [
        {
            id: 1,
            title: 'xxx',
            photo: "https://picsum.photos/id/916/300/300",
            categoryId: 2,
        },
        {
            id: 2,
            title: 'city',
            photo: "https://picsum.photos/id/857/300/300",
            categoryId: 2,
        },
        {
            id: 3,
            title: 'stars',
            photo: "https://picsum.photos/id/120/300/300",
            categoryId: 2,
        },
        {
            id: 4,
            title: 'dau que',
            photo: "https://picsum.photos/id/627/300/300",
            categoryId: 2,
        },
    ],
    reducers: {
        addPhoto: (state, action) => {
            state.push(action.payload)
        },

        removePhoto: (state, action) => {
            const removePhotoId = action.payload;
            state = state.filter(photo => photo.id !== removePhotoId);
            return state;
        },
        updatePhoto: (state, action) => {
            const newPhoto = action.payload;
            const photoIndex = state.findIndex(photo => photo.id === newPhoto.id);
            if (photoIndex >= 0) {
                state[photoIndex] = newPhoto;
            }
        },

    }
})

const { reducer, actions } = photo;
export const { addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;