import React, {useEffect} from "react";
import { CardHeader, CssBaseline, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import { useHistory} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from '@material-ui/icons/Link';
import {getRecentSearchAction, getSelectedBlogAction} from "../../store/actions/config";
const useStyles = makeStyles({
    grow: {
        flexGrow: 1,
    },
});
 function HackerDashboard({setSearchQuery}) {
    const classes = useStyles();
     const history = useHistory();
     const dispatch = useDispatch();
     const searchResults = useSelector((state) => state.configs.recentSearch);
     const handleView = (oneDetail) => {
         dispatch(getSelectedBlogAction(oneDetail.objectID))
         history.push(`/news/${oneDetail.title}/${oneDetail.objectID}`);
         setSearchQuery("")
     }
    return <>
        <CssBaseline/>
        <br/>
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
        >
            {searchResults.map((oneDetail, index) => <Grid item xs={4} key={`${oneDetail.objectId}-${index}`}>
                <Card variant="outlined" elevation={0}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings" href={oneDetail.url} target="_blank">
                                <LinkIcon />
                            </IconButton>
                        }
                        title={<Typography gutterBottom variant="body1" component="h2">
                            <b> {oneDetail.title ? oneDetail.title : oneDetail.story_text}</b>
                        </Typography>}
                        subheader={oneDetail.author}
                    />
                    <CardMedia
                        className={classes.media}
                        image="/static/images/cards/paella.jpg"
                        title="Paella dish"
                    />
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon fontSize="small" color="error" style={{verticalAlign:"bottom"}}/>
                        </IconButton>
                        {oneDetail.points} {" "}
                        <IconButton aria-label="share">
                            <CommentIcon fontSize="small" style={{verticalAlign:"bottom"}}/>
                        </IconButton>
                        {oneDetail.num_comments}{" "}
                        <div className={classes.grow}/>
                        <Button variant="outlined" size="small" color="primary"
                                onClick={()=> handleView(oneDetail)}
                                style={{align:'right', textTransform:"capitalize"}}>
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>)}

        </Grid>
    </>
}
export default HackerDashboard;