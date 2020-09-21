import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import Banner from '../../../../components/Banner';
import Images from '../../../../contants/images';
import PhotoList from '../../../Photo/components/PhotoList';
import { removePhoto } from '../../photoSlice';
MainPage.propTypes = {

};

function MainPage(props) {
    const photos = useSelector(state => state.photos);
    const dispatch = useDispatch();
    const history = useHistory()
    console.log("List of photos", photos)

    const handleRemoveClick = (photo) => {
        console.log("Remove photo: ", photo)
        const action = removePhoto(photo.id);
        dispatch(action);
    }
    const handleEditClick = (photo) => {
        console.log("Edit photo: ", photo)
        history.push(`photos/${photo.id}`)
    }
    return (
        <div className="photo-main">
            <Banner title="Your awesome photos" backgroundUrl={Images.PINK_BG} />
            <Container>
                <Link to="/photos/add">Add new photo</Link>
            </Container>
            <PhotoList
                photos={photos}
                onRemoveClick={handleRemoveClick}
                onEditClick={handleEditClick}
            />
        </div>
    );
}

export default MainPage;