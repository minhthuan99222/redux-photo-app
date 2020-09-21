import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../../../../components/Banner';
import PhotoForm from '../../components/PhotoForm';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, updatePhoto } from '../../photoSlice';
import { useHistory, useParams } from 'react-router-dom';
import { randomNumber } from '../../../../utils/common';

AddEditPage.propTypes = {

};

function AddEditPage(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { photoId } = useParams();

    const isAddMode = !photoId;
    const editedPhoto = useSelector(state => state.photos.find(p => p.id === +photoId));
    console.log(isAddMode);
    console.log(editedPhoto)

    const initialValues = isAddMode
        ? {
            title: '',
            categoryId: null,
            photo: '',
        } : editedPhoto

    const handleSubmit = (values) => {
        return new Promise(resolve => {
            console.log("Form Submit: ", values)
            setTimeout(() => {
                if (isAddMode) {
                    const newPhoto = {
                        ...values,
                        id: randomNumber(10000, 99999)
                    }
                    const action = addPhoto(newPhoto)
                    console.log('Add photo action: ', { action })
                    dispatch(action)

                }
                else {
                    const action = updatePhoto(values);
                    dispatch(action)
                }

                history.push('/photos')
                resolve(true)
            }, 2000);
        })



    }
    return (
        <div className="photo-edit">
            <Banner title="Pick your amazing photo" />
            <div className="photo-edit__form">
                <PhotoForm onSubmit={handleSubmit} isAddMode={isAddMode} initialValues={initialValues} />
            </div>
        </div>
    );
}

export default AddEditPage;