import React from 'react'
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { AiOutlineHome, AiFillClockCircle } from "react-icons/ai";
import { IoAccessibility } from "react-icons/io5";
import { BsFillBriefcaseFill, BsFillLightningFill, BsPeopleCircle } from "react-icons/bs";
import { withRouter } from 'react-router-dom';
import { MdVpnKey } from "react-icons/md";
// import 'react-pro-sidebar/dist/css/styles.css';
import '../../scss/sideMenu.scss';

class SideMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      image: '',
      collapsed: false,
      rtl: false,
      toggled: true,
      handleToggleSidebar: false,
    }
  }
  collapseMenu = (e) => {
    e.target.classList.toggle('active')
    e.target.classList.toggle('collapsed')
    this.setState({
      collapsed: this.state.collapsed ? false : true
    })
  }
  selectMenu = (e) => {
    let value = e.target.parentNode.getAttribute("value");
    this.setState({
      menuSelected: value
    })
    this.props.history.push('/' + value)

  }
  render() {
    let currentLocation = window.location.pathname.slice(1)
    let acctype = this.props.user.acctype;
    var room, staff, timekeeping, accountmanager;
    if (acctype === 'Quản trị viên') {
      room = <MenuItem icon={<AiOutlineHome />}
        active={true}
        value='room'
        active={currentLocation === 'room' ? true : false}
        onClick={e => this.selectMenu(e)}>
        {'Quản lý phòng'}
      </MenuItem>;
      staff = <MenuItem icon={<IoAccessibility />}
        value='staff'
        active={currentLocation === 'staff' ? true : false}
        onClick={e => this.selectMenu(e)}
      >
        {'Quản lý nhân viên'}
      </MenuItem>;
      timekeeping = <MenuItem icon={<AiFillClockCircle />}
        value='timekeeping'
        active={currentLocation === 'timekeeping' ? true : false}
        onClick={e => this.selectMenu(e)}
      >
        {'Chấm công nhân viên'}
      </MenuItem>;
      accountmanager = <SubMenu icon={<MdVpnKey />}
        title={'Quản lý các tài khoản'}
        iconshape="circle"
      >
        <MenuItem
          value='createstaffaccount'
          active={currentLocation === 'createstaffaccount' ? true : false}
          onClick={e => this.selectMenu(e)}
        >
          {'Cấp tài khoản nhân viên'}
        </MenuItem>

        <MenuItem
          value='accountmanager'
          active={currentLocation === 'accountmanager' ? true : false}
          onClick={e => this.selectMenu(e)}
        >
          {'Danh sách tài khoản '}
        </MenuItem>
      </SubMenu>;
    }
    return (
      <ProSidebar
        image={this.state.image ? '' : false}
        rtl={this.state.rtl}
        collapsed={this.state.collapsed}
        toggled={this.state.toggled}
        breakPoint="md"
        onToggle={this.state.handleToggleSidebar}
        className='side-menu'
      >
        <SidebarHeader>
          <div
            style={{
              padding: '18px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'flex',
              paddingRight: '20px'
            }}
          >
            {this.state.collapsed ? '' : 'menu'}
            <a id="hamburger-icon" className='menu-icon active' onClick={e => this.collapseMenu(e)} title="Menu">
              <span className="line line-1"></span>
              <span className="line line-2"></span>
              <span className="line line-3"></span>
            </a>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconshape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
              suffix={<span className="badge red">{'New'}</span>}
              value='dashboard'
              active={currentLocation === 'dashboard' ? true : false}
              onClick={e => this.selectMenu(e)}
            >
              {'Tổng quan'}
            </MenuItem>
            {room}
            <MenuItem icon={<BsPeopleCircle />}
              active={true}
              value='guest'
              active={currentLocation === 'guest' ? true : false}
              onClick={e => this.selectMenu(e)}>
              {'Quản lý khách hàng'}
            </MenuItem>
            {staff}
            <MenuItem icon={<BsFillLightningFill />}
              value='quickbooking'
              active={currentLocation === 'quickbooking' ? true : false}
              onClick={e => this.selectMenu(e)}
            >
              {'Đặt phòng nhanh'}
            </MenuItem>
            <SubMenu
              title={'Nghiệp vụ lễ tân'}
              icon={<BsFillBriefcaseFill />}
              iconshape="circle"
            >
              <MenuItem
                value='checkin'
                active={currentLocation === 'checkin' ? true : false}
                onClick={e => this.selectMenu(e)}
              >{'Check in'}</MenuItem>
              <MenuItem
                value='inhouse'
                active={currentLocation === 'inhouse' ? true : false}
                onClick={e => this.selectMenu(e)}
              >{'Khách đang ở'}</MenuItem>
              <MenuItem
                value='checkout'
                active={currentLocation === 'checkout' ? true : false}
                onClick={e => this.selectMenu(e)}
              >{'Check out'}</MenuItem>
            </SubMenu>
            {timekeeping}
            {accountmanager}

          </Menu>
          {/* <Menu iconShape="circle">
                <SubMenu
                  suffix={<span className="badge yellow">3</span>}
                  title={'withSuffix'}
                  icon={<FaRegLaughWink />}
                >
                  <MenuItem>{'submenu'} 1</MenuItem>
                  <MenuItem>{'submenu'} 2</MenuItem>
                  <MenuItem>{'submenu'} 3</MenuItem>
                </SubMenu>
                <SubMenu
                  prefix={<span className="badge gray">3</span>}
                  title={'withPrefix'}
                  icon={<FaHeart />}
                >
                  <MenuItem>{ 'submenu' } 1</MenuItem>
                  <MenuItem>{'submenu' } 2</MenuItem>
                  <MenuItem>{'submenu'} 3</MenuItem>
                </SubMenu>
                <SubMenu title={'multiLevel'} icon={<FaList />}>
                  <MenuItem>{'submenu' } 1 </MenuItem>
                  <MenuItem>{ 'submenu' } 2 </MenuItem>
                  <SubMenu title={ `submenu 3`}>
                    <MenuItem>{'submenu'} 3.1 </MenuItem>
                    <MenuItem>{'submenu'} 3.2 </MenuItem>
                    <SubMenu title={`submenu 3.3`}>
                      <MenuItem>{'submenu'} 3.3.1 </MenuItem>
                      <MenuItem>{'submenu'} 3.3.2 </MenuItem>
                      <MenuItem>{'submenu'} 3.3.3 </MenuItem>
                    </SubMenu>
                  </SubMenu>
                </SubMenu>
              </Menu> */}
        </SidebarContent>

        {/* <SidebarFooter style={{ textAlign: 'center' }}>

        </SidebarFooter> */}
      </ProSidebar>
    );
  }
}
export default withRouter(SideMenu)