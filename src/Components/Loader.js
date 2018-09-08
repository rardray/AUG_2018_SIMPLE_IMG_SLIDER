import React, {Component} from 'react';
import Progress from './Progress';
import ImagePreview from './imagePreview';
import '../StyleSheets/style.css'

class Loader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '',
            loading: null
        }
    }
 
    componentDidMount() {
        this.setState({loading: true})
        let photos = this.props.photos
        let img = new Image()
        let src = photos[0]
        img.src = src
        img.onload = (e) => {
            alert(this.width + this.height)
            this.setState({image: src, loading: false})  
        }
         
    }
    finishLoading = () => {
        this.setState({loading: false})
        console.log(this.state)
    }

    render() {
        const { loading } = this.state
        return (
            <div>
                <Progress/>
               <img  src = {this.state.image}  className = 'image-preview'/>
               
            </div>
        )
    }
}
 export default Loader;