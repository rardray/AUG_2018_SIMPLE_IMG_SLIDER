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
        let img = new Image
        let src = this.props.photos
        img.src = src
        img.onload = (e) => {
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