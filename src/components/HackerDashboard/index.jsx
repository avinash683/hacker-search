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
import Loader from "../Loader";
const useStyles = makeStyles({
    grow: {
        flexGrow: 1,
    },
});
 function HackerDashboard({setSearchQuery, searchQuery}) {
    const classes = useStyles();
     const history = useHistory();
     const dispatch = useDispatch();
     const isLoading = useSelector(state => state.configs.loading);
     const searchResults = useSelector((state) => state.configs.recentSearch);
     const handleView = (oneDetail) => {
         dispatch(getSelectedBlogAction(oneDetail.objectID))
         history.push(`/news/${oneDetail.title}/${oneDetail.objectID}`);
         setSearchQuery("")
     }

     const buildPieces = (str, match) => {
         let pieces = [];
         let index,
             pos = 0;
         while ((index = str.indexOf(match, pos)) >= 0) {
             if (pos !== index) {
                 pieces.push(str.substr(pos, index - pos));
             }
             pieces.push(match);
             pos = index + match.length;
         }
         if (pos < str.length) {
             pieces.push(str.substr(pos));
         }
         return <span>{pieces.map(item => {
             if(item === match){
                 return <span className="match">{item}</span>
             }else{
                 return item
             }
         })}</span>;
     }

     return <>
        <CssBaseline/>
        <br/>
        {isLoading
            ? <Loader/>
            : <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                {searchResults.filter((value) => value.title && value).map((oneDetail, index) => <Grid item md={4} xs={12} key={`${oneDetail.objectId}-${index}`}>
                    <Card variant="outlined" elevation={0} className='card' onClick={(e)=> handleView(oneDetail)}>
                        <CardHeader
                            action={
                                <IconButton aria-label="settings" href={oneDetail.url} target="_blank" >
                                    <LinkIcon />
                                </IconButton>
                            }
                            title={<Typography gutterBottom variant="body1" component="h2">
                                <b> {oneDetail.title ? buildPieces(oneDetail.title, searchQuery) : buildPieces(oneDetail.story_text, searchQuery)}</b>
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
                           {/* <Button variant="outlined" size="small" color="primary"
                                    onClick={()=> handleView(oneDetail)}
                                    style={{align:'right', textTransform:"capitalize"}}>
                                View Details
                            </Button>*/}
                        </CardActions>
                    </Card>
                </Grid>)}
            </Grid>
        }

    </>
}
export default HackerDashboard;