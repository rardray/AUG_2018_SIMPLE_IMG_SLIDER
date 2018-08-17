import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../StyleSheets/style.css'
import $ from 'jquery'
const styles = {
    card: {
      maxWidth: 345,
      minWidth: 300,
      margin: 10,
      display: 'inline-block',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  };



const Albums = (props) => {
    const { classes } = props
    return (<div   onClick = {props.handleClick} style= {{display: 'inline-block', padding: 10, verticalAlign: 'top', cursor: 'pointer'}}>
        <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={props.photo[0]}
          title={props.title}
        />
           <div className = 'album-container' style = {{backgroundImage: `url(${props.photo[1]})`}} >
        </div>
        <div className = 'album-container' style = {{backgroundImage: `url(${props.photo[2]})`}} >
        </div>
        <CardContent style = {{margin: 0}}>
        <Typography gutterBottom variant="headline" component="h2">
            {props.title}
          </Typography>
          <Typography>{props.profile.firstName} {props.profile.lastName}</Typography>
       </CardContent>
      </Card>
    </div>)

}
Albums.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Albums);

