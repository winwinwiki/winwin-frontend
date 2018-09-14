import * as React from 'react';
import { ClipLoader } from 'halogenium';

const fullscreenParentStyle = {
    width: '100%',
    textAlign: 'center',
    background: 'rgba(0,0,0,0.8)',
    position: 'fixed',
    zIndex: '2000',
    height: '100%'
};

const fullscreenChildStyle = {
    position: 'fixed',
    zIndex: '2001',
    top: '40%',
    width: '100%'
};

const style = {
    width: '100%',
    margin: '0px auto',
    padding: '10px',
    textAlign: 'center'
};

const fullscreenTextStyle = {
    fontSize: '18px',
    marginLeft: '10px',
    color: 'white'
};

const textStyle = {
    fontSize: '18px',
    marginLeft: '10px'
};

class LoadingSpinner extends React.Component {

    render() {
        const { message, fullscreen } = this.props;
        return (
            <div style={fullscreen ? fullscreenParentStyle : style}>
                <div style={fullscreen ? fullscreenChildStyle : null}>
                    <ClipLoader color={fullscreen ? 'white' : '#1d3b64'} size="30px" />
                    <div style={fullscreen ? fullscreenTextStyle : textStyle}>{message}</div>
                </div>
            </div>
        );
    }
}

export default LoadingSpinner;
