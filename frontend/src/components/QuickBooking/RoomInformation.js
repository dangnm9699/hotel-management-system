import React from 'react';

class RoomInfomation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        console.log(this.props.amount)
        let listRoom = [];
        for (let i = 0; i < this.props.amount; i++) {
            listRoom.push(
                <div className="row" key={i}>
                    <div className="col">
                        <div class="form-group">
                            <label >Room</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter guest name" />
                        </div>
                    </div>
                    <div className="col">
                        <div class="form-group">
                            <label >Adult(s)</label>
                            <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter guest name" />
                        </div>
                    </div>
                    <div className="col">
                        <div class="form-group">
                            <label >Children(s)</label>
                            <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter guest name" />
                        </div>
                    </div>
                    <div className="col">
                        <div class="form-group">
                            <label >Amount</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter guest name" />
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="row">
                <div className="col-12">
                    <div className="h2">Room Infomation</div>
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <div className="h3 row border rounded border-dark">
                                <div className="col-8">
                                    Room Type
                                </div>
                                <div className="col-4">
                                    <select class="form-control border-0">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </div>

                            </div>
                            <hr />
                            <div>
                                {listRoom}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomInfomation