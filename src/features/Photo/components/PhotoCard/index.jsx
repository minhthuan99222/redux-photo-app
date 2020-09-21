import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';
import './PhotoCard.scss';

PhotoCard.propTypes = {
    photo: PropTypes.object,
    onEditClick: PropTypes.func,
    onRemoveClick: PropTypes.func,
};

PhotoCard.defaultProps = {
    photo: {},
    onEditClick: null,
    onRemoveClick: null,
}

function PhotoCard(props) {
    const { photo, onRemoveClick, onEditClick } = props;

    const handleEditClick = (photo) => {
        if (onEditClick) onEditClick(photo);
        // console.log("onEdit Photocard: ", photo)
    }

    const handleRemoveClick = (photo) => {
        if (onRemoveClick) onRemoveClick(photo);
        // console.log("onRemove Photocard: ", photo)
    }

    return (
        <div className="photo">
            <img src={photo.photo} alt={photo.title} />
            <div className="photo__overlay">
                <h3 className="photo__title">{photo.title}</h3>
                <div className="photo__actions">
                    <div>
                        <Button outline size="sm" onClick={() => handleEditClick(photo)}>
                            Edit
                        </Button>
                    </div>
                    <div>
                        <Button outline size="sm" onClick={() => handleRemoveClick(photo)}>
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PhotoCard;