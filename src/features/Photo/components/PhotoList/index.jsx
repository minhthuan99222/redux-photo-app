import React from 'react';
import PropTypes from 'prop-types';
import PhotoCard from '../PhotoCard';
import { Col, Row } from 'reactstrap';

PhotoList.propTypes = {
    photos: PropTypes.array,
    onEditClick: PropTypes.func,
    onRemoveClick: PropTypes.func,
};

PhotoList.defaultProps = {
    photos: [],
    onEditClick: null,
    onRemoveClick: null,
}

function PhotoList(props) {
    const { photos, onRemoveClick, onEditClick } = props;

    return (
        <Row>
            {photos.map(photo => (
                <Col key={photo.title} xs="12" md="6" lg="3">
                    <PhotoCard
                        photo={photo}
                        onEditClick={onEditClick}
                        onRemoveClick={onRemoveClick}
                    />
                </Col>

            ))}
        </Row>
    );
}

export default PhotoList;