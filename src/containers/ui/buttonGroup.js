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
            <div className="btn-group dropdown dropdown-with-checkbox" role="group" aria-label="group">
                <button id="filterDropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-outline-secondary m-0"><i className="icon-filter"></i></button>
                <form aria-labelledby="filterDropdown" className="dropdown-menu pt-4 px-4">
                    <div className="row">
                        <div className="col">
                            <h5>Sector Level</h5>
                            <div className="custom-control custom-checkbox">
                                <input id="customCheckCustom1" type="checkbox" className="custom-control-input"/>
                                <label htmlFor="customCheckCustom1"className="custom-control-label">Federal</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input id="customCheckCustom2" type="checkbox" className="custom-control-input"/>
                                <label htmlFor="customCheckCustom2"className="custom-control-label">State</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input id="customCheckCustom3" type="checkbox" className="custom-control-input"/>
                                <label htmlFor="customCheckCustom3"className="custom-control-label">County</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input id="customCheckCustom4" type="checkbox" className="custom-control-input"/>
                                <label htmlFor="customCheckCustom4"className="custom-control-label">City</label>
                            </div>

                            <h5>Status</h5>
                            <div className="custom-control custom-checkbox">
                                <input id="customCheckCustom5" type="checkbox" className="custom-control-input"/>
                                <label htmlFor="customCheckCustom5"className="custom-control-label">Auto Tag</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input id="customCheckCustom6" type="checkbox" className="custom-control-input"/>
                                <label htmlFor="customCheckCustom6"className="custom-control-label">Complete Tag</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input id="customCheckCustom7" type="checkbox" className="custom-control-input"/>
                                <label htmlFor="customCheckCustom7"className="custom-control-label">Organization Tag</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input id="customCheckCustom8" type="checkbox" className="custom-control-input"/>
                                <label htmlFor="customCheckCustom8"className="custom-control-label">Untagged</label>
                            </div>
                        </div>
                        <div className="col">
                            <h5>Priority</h5>
                            <div className="btn-group btn-group-toggle mb-3" data-toggle="buttons">
                                <label className="btn btn-outline-secondary">
                                    <input type="radio" name="options" id="normal" autoComplete="off" /> Normal
                                </label>
                                <label className="btn btn-outline-secondary">
                                    <input type="radio" name="options" id="high" autoComplete="off"/> High
                                </label>
                            </div>

                            <h5>Edited by User</h5>
                            <div className="dropdown dropdown-with-searchbox mb-3">
                                <button id="dropdownMenuButton2" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">Allison Zimmer..</button>
                                <div aria-labelledby="dropdownMenuButton2" className="dropdown-menu">
                                    <div className="menu-conteiner">
                                        <div className="menu-section">
                                            <a href="#" className="dropdown-item">Allison Zimmer..</a>
                                            <a href="#" className="dropdown-item">User 1</a>
                                            <a href="#" className="dropdown-item">User 2</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5>Industry Classification</h5>
                            <div className="dropdown dropdown-with-searchbox mb-3">
                                <button id="dropdownMenuButton3" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">NTEE</button>
                                <div aria-labelledby="dropdownMenuButton3" className="dropdown-menu">
                                    <div className="menu-conteiner">
                                        <div className="menu-section">
                                            <a href="#" className="dropdown-item">NTEE</a>
                                            <a href="#" className="dropdown-item">Option 1</a>
                                            <a href="#" className="dropdown-item">Option 2</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown dropdown-with-searchbox mb-3">
                                <button id="dropdownMenuButton4" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">Arts & Culture (A20)</button>
                                <div aria-labelledby="dropdownMenuButton4" className="dropdown-menu">
                                    <div className="menu-conteiner">
                                        <div className="menu-section">
                                            <a href="#" className="dropdown-item">Arts & Culture (A20)</a>
                                            <a href="#" className="dropdown-item">Option 1</a>
                                            <a href="#" className="dropdown-item">Option 2</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <h5>Revenue</h5>
                        </div>
                        <div className="col">
                            <h5>Framework Tag</h5>
                            <div className="dropdown dropdown-with-searchbox mb-3">
                                <button id="dropdownMenuButton5" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">Social Progress Index</button>
                                <div aria-labelledby="dropdownMenuButton5" className="dropdown-menu">
                                    <div className="menu-conteiner">
                                        <div className="menu-section">
                                            <a href="#" className="dropdown-item">Social Progress Index</a>
                                            <a href="#" className="dropdown-item">Option 1</a>
                                            <a href="#" className="dropdown-item">Option 2</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5>Level 1</h5>
                            <div className="dropdown dropdown-with-searchbox mb-3">
                                <button id="dropdownMenuButton6" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">Basic Human N..</button>
                                <div aria-labelledby="dropdownMenuButton6" className="dropdown-menu">
                                    <div className="menu-conteiner">
                                        <div className="menu-section">
                                            <a href="#" className="dropdown-item">Basic Human N</a>
                                            <a href="#" className="dropdown-item">Option 1</a>
                                            <a href="#" className="dropdown-item">Option 2</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5>Level 2</h5>
                            <div className="dropdown dropdown-with-searchbox mb-3">
                                <button id="dropdownMenuButton5" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">Shelter</button>
                                <div aria-labelledby="dropdownMenuButton5" className="dropdown-menu">
                                    <div className="menu-conteiner">
                                        <div className="menu-section">
                                            <a href="#" className="dropdown-item">Shelter</a>
                                            <a href="#" className="dropdown-item">Another name</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5>Level 3</h5>
                            <div className="dropdown dropdown-with-searchbox mb-3">
                                <button id="dropdownMenuButton5" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown btn-block btn-sm">All</button>
                                <div aria-labelledby="dropdownMenuButton5" className="dropdown-menu">
                                    <div className="menu-conteiner">
                                        <div className="menu-section">
                                            <a href="#" className="dropdown-item">All</a>
                                            <a href="#" className="dropdown-item">Option 1</a>
                                            <a href="#" className="dropdown-item">Option 2</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ButtonGroup;