import React,{Component} from "react";
import styles from "./MenuSidebar.module.scss"
import Logo from "../../assets/logo.png";
import { CloseIcon } from "../svg";
import { Link } from "react-router-dom";

class MenuSidebar extends Component{
    state={
        showMenuSidebar:false
    }
    componentDidUpdate(){
        const {open} =this.props;
        if(open){
            document.body.style.overflow="hidden";
        }else document.body.style.overflow="unset";
    }
    componentDidMount(){
        document.body.style.overflow="auto"
    }
    showMenuSidebarToggleHandler=()=>{
        this.setState((prevState)=>{
            return{showMenuSidebar:!prevState.showMenuSidebar}
        })
    }
    showMenuSidebarClosedHandler=()=>{
        this.setState({showMenuSidebar:false})
    }
    render(){
        const {closed,open}=this.props
        let attachedStyles=[styles.sidebar,styles.Close];
        if(open){
            attachedStyles=[styles.sidebar,styles.Open];
        }
        return(
            <div className={attachedStyles.join(" ")}>
                <div className={styles.title}>
                <div className={styles.logo}>
          <Link to={process.env.PUBLIC_URL + "/"}>
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className={styles.close} onClick={closed}><CloseIcon/></div>
                </div>
                <ul className={styles.Links}>
          <Link to={process.env.PUBLIC_URL + "/Orders"}>
            <li className={styles.Link}>Orders</li>
          </Link>
          <Link to={process.env.PUBLIC_URL + "/Products/"}>
            <li className={styles.Link}>Products</li>
          </Link>
          <Link to={process.env.PUBLIC_URL + "/Categories/"}>
            <li className={styles.Link}>Categories</li>
          </Link>
          <Link to={process.env.PUBLIC_URL + "/Showcase"}>
            <li className={styles.Link}>Showcase</li>
          </Link>
        </ul>
            </div>
        )
    }
}

export default MenuSidebar