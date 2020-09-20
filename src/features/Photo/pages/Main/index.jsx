import React from 'react';
import Banner from '../../../../components/Banner'
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import Images from '../../../../contants/images';
import { useSelector } from 'react-redux';
MainPage.propTypes = {

};

function MainPage(props) {
    const photos = useSelector(state => state.photos)
    console.log("List of photos", photos)
    return (
        <div className="photo-main">
            <Banner title="Your awesome photos" backgroundUrl={Images.PINK_BG} />
            <Container>
                <Link to="/photos/add">Add new photo</Link>
            </Container>

        </div>
    );
}

export default MainPage;