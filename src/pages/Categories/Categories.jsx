import React, { Component } from "react";
import styles from "./Categories.module.scss";
import Menu from "../../Components/Menu/Menu"
import FiltersContainer from "../../Components/FiltersContainer/FiltersContainer";
import {Link} from "react-router-dom"
class Categories extends Component {
    state={
        showFirstCategory:false,
        showSecondCategory:false,
        showThirdCategory:false,
        filters:null
    }
    componentDidMount(){
      this.setState({
        filters:this.props.filters
      }
      )
    }
    showFirstCategoryHandler=()=>{
        this.setState({
            showFirstCategory:true,
            showSecondCategory:false,
            showThirdCategory:false,
        })
      }
      showSecondCategoryHandler=()=>{
        this.setState({
            showFirstCategory:false,
            showSecondCategory:true,
            showThirdCategory:false,

        })
      }
      showThirdCategoryHandler=()=>{
        this.setState({
            showFirstCategory:false,
            showSecondCategory:false,
            showThirdCategory:true,

        })
      }

      FiltersContainerHandler=(id,category)=>{
          const filters = [...this.props.filters]
          const example=  filters.filter(item=>item.category==category)
            this.setState({
                filters:example
            })
            
          if(id===1){
            this.setState({
                showFirstCategory:true,
                showSecondCategory:false,
                showThirdCategory:false,
            })
          }else if (id ===2){
            this.setState({
                showFirstCategory:false,
                showSecondCategory:true,
                showThirdCategory:false,
            })
          }else if (id===3){
            this.setState({
                showFirstCategory:false,
                showSecondCategory:false,
                showThirdCategory:true,
            })
          }
      }
    render(){
        return(
            <div className={styles.Categories}>
                <Menu/>
                <div className={styles.categoriesFilter}>
            
                <button style={this.state.showFirstCategory ?{backgroundColor:"#d5293f",color:"#fff"}: null} onClick={()=>this.FiltersContainerHandler(1,this.props.categories[0])}>{this.props.categories[0]}</button>
                <button style={this.state.showSecondCategory ?{backgroundColor:"#d5293f",color:"#fff"}: null} onClick={()=>this.FiltersContainerHandler(2,this.props.categories[1])} >{this.props.categories[1]}</button>
                <button style={this.state.showThirdCategory ?{backgroundColor:"#d5293f",color:"#fff"}: null} onClick={()=>this.FiltersContainerHandler(3,this.props.categories[2])} >{this.props.categories[2]}</button>
        </div>     
               
               {this.state.filters &&  <FiltersContainer DeleteFilter={(id)=>this.props.DeleteFilter(id)} filters={this.state.filters}/>}
               <Link to={process.env.PUBLIC_URL+"/AddNewFilter"}>

               <button className={styles.add}>Add Filter</button>
</Link>
            </div>
        )
    }
}

export default Categories