import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import api from '../../Api/api';
import './../../css/searchguestmodal.css'
import QuickBookingContext from '../../context/QuickBookingContext'
class GuestInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonColor: {
                buton1: "btn-primary",
                buton2: "btn-secondary",
            },
            type: "new",
            guestInformationNew: {
                name: "",
                phonenumber: "",
                email: "",
                country: "",
                idNumber: "",
            },
            searchnumber: "",
            modalLoading: true,
            guestList: [],
            selectedGuest: -1,
        }
    }

    changeTypeNew = () => {
        this.setState({
            buttonColor: {
                buton1: "btn-primary",
                buton2: "btn-secondary",
            },
            type: "new",
        })
        this.context.setContext('guestInformation', {
            type: "new",
            guest: this.state.guestInformationNew,
        })
    }

    changeTypeReturn = () => {
        this.setState({
            buttonColor: {
                buton1: "btn-secondary",
                buton2: "btn-primary",
            },
            type: "return",
        })
        if (this.state.selectedGuest !== -1) {
            this.context.setContext('guestInformation', {
                type: "return",
                guest: this.state.guestList[this.state.selectedGuest]
            })
        } else {
            this.context.setContext('guestInformation', {
                type: "null",
                guest: {},
            })
        }
    }

    changeNewHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let guestInformationNew = this.state.guestInformationNew;
        guestInformationNew[nam] = val;
        //console.log(guestInformationNew)
        this.context.setContext('guestInformation', {
            type: "new",
            guest: this.state.guestInformationNew
        })
        this.setState({ guestInformationNew: guestInformationNew });
    }

    changeSearchHandler = (event) => {
        this.setState({ searchnumber: event.target.value })
    }

    handleCloseModal = () => {
        this.setState({ modalShow: false })
    }

    search = async () => {
        this.setState({ modalShow: true, modalLoading: true })
        try {
            const res = await api.searchGuestByPhoneNumber(this.state.searchnumber)
            //console.log(res.data)
            this.setState({ modalLoading: false, guestList: res.data.data, selectedGuest: -1 })
        } catch (err) {
            console.log(err)
            this.setState({ modalShow: false })
        }
    }

    setSelectedGuest = (index) => {
        if (index !== -1) {
            this.context.setContext('guestInformation', {
                type: "return",
                guest: this.state.guestList[index]
            })
        } else {
            this.context.setContext('guestInformation', {
                type: "null",
                guest: {},
            })
        }
        this.setState({ selectedGuest: index })
    }

    render() {
        const type1 = (<div className="row justify-content-center">
            <div className="col-11">
                <div className="form-group">
                    <label >Tên khách hàng</label>
                    <input type="text" className="form-control" name="name" value={this.state.guestInformationNew.name} onChange={this.changeNewHandler} placeholder="Nhập tên khách hàng" required />
                </div>
                <div className="form-group">
                    <label >Quốc tịch</label>
                    <select className="form-control" name="country" value={this.state.guestInformationNew.country} onChange={this.changeNewHandler} placeholder="Nhập quốc tịch" required>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Åland Islands">Åland Islands</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Bouvet Island">Bouvet Island</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                        <option value="Brunei Darussalam">Brunei Darussalam</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">Central African Republic</option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">Christmas Island</option>
                        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cote D'ivoire">Cote D'ivoire</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">Dominican Republic</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">French Polynesia</option>
                        <option value="French Southern Territories">French Southern Territories</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guernsey">Guernsey</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-bissau">Guinea-bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                        <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Isle of Man">Isle of Man</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jersey">Jersey</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                        <option value="Korea, Republic of">Korea, Republic of</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macao">Macao</option>
                        <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">Marshall Islands</option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                        <option value="Moldova, Republic of">Moldova, Republic of</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Netherlands Antilles">Netherlands Antilles</option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">Papua New Guinea</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Pitcairn">Pitcairn</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russian Federation">Russian Federation</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Helena">Saint Helena</option>
                        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                        <option value="Saint Lucia">Saint Lucia</option>
                        <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                        <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                        <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Timor-leste">Timor-leste</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Việt Nam">Việt Nam</option>
                        <option value="Virgin Islands, British">Virgin Islands, British</option>
                        <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                        <option value="Wallis and Futuna">Wallis and Futuna</option>
                        <option value="Western Sahara">Western Sahara</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                </div>
                <div className="form-group">
                    <label >Số CMT/CCCD/Hộ chiếu</label>
                    <input type="text" className="form-control" name="idNumber" value={this.state.guestInformationNew.idNumber} onChange={this.changeNewHandler} placeholder="Nhập số CMT/CCCD/Hộ chiếu" required />
                </div>
                <div className="form-group">
                    <label >Số điện thoại</label>
                    <input type="text" className="form-control" name="phonenumber" value={this.state.guestInformationNew.phonenumber} onChange={this.changeNewHandler} placeholder="Nhập số điện thoại" required />
                </div>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" className="form-control" name="email" value={this.state.guestInformationNew.email} onChange={this.changeNewHandler} placeholder="Nhập email" />
                </div>
            </div>
        </div>
        )

        let type2;
        if (this.state.selectedGuest === -1) {
            type2 = (<div className="row justify-content-center">
                <div className="col-11">
                    <div className="form-group">
                        <label >Số điện thoại</label>
                        <div className="row">
                            <div className="col-10">
                                <input type="text" className="form-control" name="searchnumber" value={this.state.searchnumber} onChange={this.changeSearchHandler} placeholder="Nhập số điện thoại" />
                            </div>
                            <div className="col">
                                <button className="btn btn-info" onClick={this.search}>Tìm kiếm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        } else {
            let guest = this.state.guestList[this.state.selectedGuest]
            type2 = (<div className="row justify-content-center">
                <div className="col-9">
                    <div className="form-group">
                        <label >Tên khách hàng</label>
                        <input type="text" className="form-control" name="name" value={guest.name} placeholder="Nhập tên khách hàng" readOnly />
                    </div>
                    <div className="form-group">
                        <label >Quốc tịch</label>
                        <input type="text" className="form-control" name="country" value={guest.country} placeholder="Nhập quốc tịch" readOnly />
                    </div>
                    <div className="form-group">
                        <label >Số CMT/CCCD/Hộ chiếu</label>
                        <input type="text" className="form-control" name="idNumber" value={guest.idNumber} placeholder="Nhập số CMT/CCCD/Hộ chiếu " readOnly />
                    </div>
                    <div className="form-group">
                        <label >Số điện thoại</label>
                        <input type="tel" className="form-control" name="phonenumber" value={guest.phonenumber} placeholder="Nhập số điện thoại" readOnly />
                    </div>
                    <div className="form-group">
                        <label >Email</label>
                        <input type="email" className="form-control" name="email" value={guest.email} placeholder="Nhập email" readOnly />
                    </div>
                </div>
                <div className="text-center col-1 d-flex justify-content-center">
                    <div className="mt-auto mb-auto">
                        <button className="btn btn-danger" onClick={() => this.setSelectedGuest(-1)}>X</button>
                    </div>
                </div>
            </div>
            )
        }

        return (
            <div className="row">
                <Search
                    setGuest={this.setSelectedGuest}
                    show={this.state.modalShow}
                    handleClose={this.handleCloseModal}
                    loading={this.state.modalLoading}
                    guestList={this.state.guestList}
                />
                <div className="col-12">
                    <div className="row">
                        <div className="h2 col-8">Thông tin khách hàng</div>
                        <div className="col-4 mt-2">
                            <div className="btn-group btn-group-toggle w-75" data-toggle="buttons">
                                <label onClick={this.changeTypeNew} className={this.state.buttonColor.buton1 + " btn w-50"}>
                                    <input type="radio" /> Khách mới
                                </label>
                                <label onClick={this.changeTypeReturn} className={this.state.buttonColor.buton2 + " btn w-50"}>
                                    <input type="radio" /> Khách cũ
                                </label>
                            </div>
                        </div>
                    </div>
                    {this.state.type === "new" ? type1 : type2}
                </div>
            </div>
        )
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedGuest: -1,
        }
    }

    selectGuest = (id) => {
        this.setState({ selectedGuest: id })
    }

    select = () => {
        this.props.setGuest(this.state.selectedGuest)
        this.props.handleClose()
    }

    render() {
        let body = [];
        if (this.props.loading === true) {
            body = (
                <div className="d-flex justify-content-center text-primary">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        } else {
            let guestList = this.props.guestList
            for (let i = 0; i < guestList.length; i++) {
                body.push(<div className={"row pt-2 pb-2 guest-modal-row" + (i === this.state.selectedGuest ? " guest-selected" : "")} onClick={() => this.selectGuest(i)} key={guestList[i].Id} >
                    <div className="col"> {guestList[i].phonenumber} </div>
                    <div className="col"> {guestList[i].name} </div>
                    <div className="col"> {guestList[i].country} </div>
                </div>)
            }
        }
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} size="lg" scrollable={true} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Kết quả tìm kiếm</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="row">
                        <div className="col">Số điện thoại</div>
                        <div className="col">Tên</div>
                        <div className="col">Quốc tịch</div>
                    </div>
                    <hr />
                    <div className="container-fluid">
                        {body}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={this.select}>
                        Chọn
                    </Button>
                </Modal.Footer>
            </Modal >
        )
    }
}

GuestInformation.contextType = QuickBookingContext

export default GuestInformation