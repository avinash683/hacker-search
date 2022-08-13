import React from "react";
import {DialogContent, DialogTitle, Divider, List, ListItem, ListItemText, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import moment from "moment/moment";
import parse from 'html-react-parser';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    grow: {
        flexGrow: 1,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(3),
        color: theme.palette.grey[500],
    },
}));

function Comments(props) {
    const classes = useStyles();
    const {author, created_at, text, children} = props;
    return <div>
        {text &&  <List disablePadding component={Paper} variant="outlined" elevation={0}>
            <DialogTitle id="customized-dialog-title" color="default">
                <b> {author}</b>  <Typography
                className={classes.closeButton} component="span" variant="body2" color="textSecondary">
                {moment(created_at).fromNow()}
            </Typography>
            </DialogTitle>
            <DialogContent dividers >
                <Typography variant='body2'>
                    {text && parse(text)}
                </Typography>
            </DialogContent>
            <br/>
            <div style={{margin: '5px 25px'}}>
                {children && children.map((item, index) => <Comments key={index} {...item} />)}
            </div>
        </List> }
        <br/>
    </div>
}

export default Comments