import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './RandomPhoto.scss'
import Images from '../../contants/images';
RandomPhoto.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    onImageUrlChange: PropTypes.func,
    onRandomButtonBlur: PropTypes.func,
};

RandomPhoto.defaultProps = {
    name: '',
    imageUrl: Images.COLORFUL_BG,
    onImageUrlChange: null,
    onRandomButtonBlur: null,
}

const getRandomImageUrl = () => {
    const randomId = Math.trunc(Math.random() * 2000)
    return `https://picsum.photos/id/${randomId}/300/300`
}

function RandomPhoto(props) {
    const { name, imageUrl, onRandomButtonBlur, onImageUrlChange } = props;
    const handleRandomPhotoClick = async () => {
        if (onImageUrlChange) {
            const randomImageUrl = getRandomImageUrl();
            onImageUrlChange(randomImageUrl);
        }
    }
    return (
        <div className="random-photo">
            <div className="random-photo__button">
                <Button
                    outline
                    name={name}
                    color='primary'
                    onBlur={onRandomButtonBlur}
                    onClick={handleRandomPhotoClick}
                >
                    Random a photo
                </Button>
            </div>
            <div className="random-photo__photo">
                {imageUrl &&
                    <img
                        src={imageUrl}
                        alt="Ooops ... not found. Please click again"
                        onError={e => e.target.src = { handleRandomPhotoClick }}
                    />
                }
            </div>
        </div>
    );
}

export default RandomPhoto;