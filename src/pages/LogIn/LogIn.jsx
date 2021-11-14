import React,{Component} from "react";
import styles from "./LogIn.module.scss";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

class LogIn extends Component {
    state={
        userName:"",
        Password:""
    }
    handleChange = event => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
      };
    render(){
         return (
    <div className={styles.LogIn}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={Logo} alt="logo" />
          <h1>Please Login to your account</h1>
        </div>
        <div className={styles.form}>
            <div className={styles.formGroup}>  <label for="">Username :</label>
            <input name="userName" type="text" onChange={this.handleChange}/></div>
            <div className={styles.formGroup}>  <label for="">Password :</label>
            <input name="Password" type="password" onChange={this.handleChange}/></div>
          <button className={styles.submit}onClick={this.props.onSubmit}>Log In</button>
        </div>
        
      </div>
    </div>
  );
    }
 
};

export default LogIn;
