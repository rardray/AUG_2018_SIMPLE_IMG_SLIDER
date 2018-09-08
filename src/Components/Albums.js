import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import '../StyleSheets/style.css'
import {API_URL, PHOTO_URL } from './Actions/Actions'

const styles = {
    card: {
      maxWidth: 345,
      minWidth: 345,
      margin: 0,
      display: 'inline-block',
    },
    media: {
      height: 0,
      paddingTop: '45.25%', // 16:9
    },
  };

const Albums = (props) => {
    const { classes } = props
    return (
        <div   
            onClick = {props.handleClick} 
            style= {
                {display: 'inline-block', 
                padding: 0, 
                verticalAlign: 'top', 
                cursor: 'pointer'}}>
            <Card className={classes.card}>
               <CardMedia
                    className={classes.media}
                    image={`${API_URL}${PHOTO_URL}${props.photo[0]}`}
                    title={props.title}
               /> 
                 <div 
                    className = 'album-container' 
                    style = {{
                        backgroundImage: `url(${API_URL}${PHOTO_URL}${props.photo[1]})`}} 
                    >
                </div> 
                <div 
                    className = 'album-container' 
                    style = {{
                        backgroundImage: `url(${API_URL}${PHOTO_URL}${props.photo[2]})`}} 
                    >
                </div>
                <div className = 'card-overlay'>
                    <Typography gutterBottom variant="headline" component="h2" style = {{color: 'white', backgroundColor: 'rgba(0,0,0,.6)', padding: 6, margin: 0}} >
                        "{props.title}"
                    </Typography>
                    <Typography style = {{color: 'white', backgroundColor: 'rgba(0,0,0,.6)', paddingLeft: 6, margin: 0, fontFamily: 'serif', fontStyle: 'italic' }}>"by {props.profile.firstName} {props.profile.lastName}"
                    </Typography>
                </div>
            </Card>
        </div>
        )
}
Albums.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Albums);

