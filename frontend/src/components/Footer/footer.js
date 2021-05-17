import '../../css/footer.css'
import React from 'react'

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="container bottom_border">
                    <div className="row">
                        <div className=" col-sm-4 col-md col-sm-4  col-12 col">
                            <h5 className="headin5_amrc col_white_amrc pt2">Find us</h5>
                            <p className="mb10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                            <p><i className="fa fa-location-arrow"></i> 9878/25 sec 9 rohini 35 </p>
                            <p><i className="fa fa-phone"></i>  +91-9999878398  </p>
                            <p><i className="fa fa fa-envelope"></i> info@example.com  </p>
                        </div>
                        <div className=" col-sm-4 col-md  col-6 col">
                            <h5 className="headin5_amrc col_white_amrc pt2">Quick links</h5>
                            <ul className="footer_ul_amrc">
                                <li><a href="#">Image Rectoucing</a></li>
                                <li><a href="#">Clipping Path</a></li>
                                <li><a href="#">Hollow Man Montage</a></li>
                                <li><a href="#">Ebay & Amazon</a></li>
                                <li><a href="#">Hair Masking/Clipping</a></li>
                                <li><a href="#">Image Cropping</a></li>
                            </ul>
                        </div>
                        <div className=" col-sm-4 col-md  col-6 col">
                            <h5 className="headin5_amrc col_white_amrc pt2">Quick links</h5>
                            <ul className="footer_ul_amrc">
                                <li><a href="#">Remove Background</a></li>
                                <li><a href="#">Shadows & Mirror Reflection</a></li>
                                <li><a href="#">Logo Design</a></li>
                                <li><a href="#">Vectorization</a></li>
                                <li><a href="#">Hair Masking/Clipping</a></li>
                                <li><a href="#">Image Cropping</a></li>
                            </ul>
                        </div>
                        <div className=" col-sm-4 col-md  col-12 col">
                            <h5 className="headin5_amrc col_white_amrc pt2">Follow us</h5>
                            <ul className="footer_ul2_amrc">
                                <li><a href="https://www.facebook.com/nguyentheduc99" target="_blank"><i className="fab fa-facebook fleft padding-right"></i> <p>Nguyễn Thế Đức</p></a></li>
                                <li><a href="https://www.facebook.com/nmhieu.561273" target="_blank"><i className="fab fa-facebook fleft padding-right"></i> <p>Nguyễn Minh Hiếu</p></a></li>
                                <li><a href="https://www.facebook.com/dangnm9699" target="_blank"><i className="fab fa-facebook fleft padding-right"></i> <p>Nguyễn Minh Đăng</p></a></li>
                                <li><a href="https://www.facebook.com/tung.nguyeky" target="_blank"><i className="fab fa-facebook fleft padding-right"></i> <p>Nguyễn Kỳ Tùng</p></a></li>
                                <li><a href="https://www.facebook.com/huython.2108"target="_blank"><i className="fab fa-facebook fleft padding-right"></i> <p>Vũ Quang Huy</p></a></li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div className="container">
                    <ul className="foote_bottom_ul_amrc">
                    </ul>
                    <p className="text-center">Copyright @2021 | Designed by <a href="https://github.com/ntd275/BTL_ChuyenDe_Nhom_12" target="_blank">Group 12</a></p>
                    <ul className="social_footer_ul">
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
            </footer>
        );
    }
}