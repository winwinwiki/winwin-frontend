import React from 'react';
import './button-group.css';

const ButtonGroup = () => {
    return (
        <div className="">
            <div className="btn-group btn-group-toggle mx-3" data-toggle="buttons">
                <label className="btn btn-outline-secondary active">
                    <input type="radio" name="options" id="option1" autocomplete="off" checked/> All
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option2" autocomplete="off"/> Public
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" autocomplete="off"/> Private
                </label>
                <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option4" autocomplete="off"/> Social
                </label>
            </div>
        </div>
    )
}

export default ButtonGroup;